var BuildingManager = function() {
	var module = {};
	
	module.FACTORY_MAX_MODELS = 6;
	module.FACTORY_MIN_SELL_INVENTORY = 3;
	module.FACTORY_MAX_INVENTORY = 100;

	module.RETAILER_MAX_INVENTORY = 50;
	module.RETAILER_MAX_SALE_QUANTITY = 5;

	module.TIME_TO_BUILD_MACHINE = 3;
	module.TIME_TO_SELL_MACHINES = 2;
	
	// BUILDING BASE CLASS
	function Building(config) {
		// trace('Building/constructor, config = ', config);
		this.config = config;
		this.config.state = config.state || BuildingStates.CONSTRUCTION;
		this.config.age = config.age || 0;
	};
	
	Building.prototype.capacity = 0;
	Building.prototype.equipment = {};
	Building.prototype.inventory = {};
	Building.prototype.update = function() {
		// trace('Building/update');
		if(this.config.state === BuildingStates.CONSTRUCTION && this.config.age >= this.constructionTime) {
			this.config.state = BuildingStates.ACTIVE;
			// trace('building['+this.config.id+'] construction completed');
			PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
		}
		this.config.age++;
		module.updateBuildingData.call(this, this.config);
	};

	// FACTORY
	function Factory(config) {
		config.type = BuildingTypes.FACTORY;
		Building.call(this, config);
		this.config.equipment = config.equipment || {};
		this.config.inventory = config.inventory || {};
		this.config.retailers = config.retailers || {};

		this.retailerNotifications = {};
		if(PWG.Utils.objLength(this.config.equipment) > 0) {
			PWG.Utils.each(
				this.config.equipment,
				function(model) {
					this.retailerNotifications[model.id] = false;
				},
				this
			);
		}
		
		this.config.totalInventory = 0;
		if(PWG.Utils.objLength(this.config.inventory) > 0) {
			PWG.Utils.each(
				this.config.inventory,
				function(machineTypeInventory) {
					this.config.totalInventory += machineTypeInventory.length;
				},
				this
			);
		}
		
	}

	PWG.Utils.inherit(Factory, Building);
	
	Factory.prototype.constructionTime = 3;
	Factory.prototype.buildTime = 0;
	Factory.prototype.modelCapacity = 6;
 	Factory.prototype.update = function() {
		if(this.config.state !== BuildingStates.PAUSED) {
			Factory._super.update.apply(this, arguments);
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD_MACHINE) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							// trace('machine = ', machine);
							if(TurnManager.playerData.bank > machine.cost) {
								if(this.config.totalInventory < module.FACTORY_MAX_INVENTORY) {
									trace('manufactored machine: ' +  machine.id + ', retailers: ', this.config.retailers);
									PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-machine.cost) });
									PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
									PWG.EventCenter.trigger({ type: Events.INVENTORY_ADDED, factory: this.config });
									
									this.config.inventory[machine.id].push(machine);
									this.config.totalInventory++;
									
									TurnManager.addFactoryInventory(machine);

									// if there is enough inventory of this machine to sell and it doesn't already have a retailer...
									if(this.config.inventory[machine.id].length > module.FACTORY_MIN_SELL_INVENTORY) {
										if(!this.config.retailers.hasOwnProperty(machine.id)) {
											trace('\tretailerNotifications['+machine.id+'] = ' + this.retailerNotifications[machine.id]);
											if(!this.retailerNotifications[machine.id]) {
												this.retailerNotifications[machine.id] = true;

												module.createRetailer(this);
											}
										} else {
											var retailerId = this.config.retailers[machine.id];
											var retailer = module.findBuilding(retailerId);
											if(retailer.config.state === BuildingStates.ACTIVE) {
												var inventory = this.config.inventory[machine.id];
												retailer.addInventory(this.config);
											}
										}
									} 

									TurnManager.updateBuilding(this.config);
									
								} else {
									// notify output capacity reached
									// alert(this.config.id + ' created max inventory');
								}
							} 
							else 
							{
								// notifiy out of bank
								// alert('not enough money to create inventory');
							}
						},
						this
					);
					this.buildTime = 0;
				} else {
					this.buildTime++;
				}
			} else {
				// notify equipment needed
				if(!this.notifiedOfEquipmentNeeded) {
					this.notifiedOfEquipmentNeeded = true;
					// alert(this.config.id + ' needs Tractor and Skid Steer models to manufacture');
				}
			}
		
		}
	};

	Factory.prototype.addMachineModel = function(machine) {
		this.config.equipment[machine.id] = machine; 
		this.config.inventory[machine.id] = [];
	};
	Factory.prototype.getMachineModelInventory = function(machineId) {
		var inventory = [];
		
		PWG.Utils.each(
			this.config.inventory,
			function(machine) {
				if(machine.id === machineId) {
					inventory.push(machine);
				}
			},
			this
		);

		return inventory;
	};
	Factory.prototype.addRetailer = function(retailer) {
		// trace('Factory/addRetailer, retailer = ', retailer);
		this.config.retailers[retailer.config.modelId] = retailer.config.id;
		// trace('\tretailers now = ', this.config.retailers);
		TurnManager.updateBuilding(this.config);
	};
	
	// RETAILER
	function Retailer(config) {
		config.type = BuildingTypes.RETAILER;
		var factory = module.findBuilding(config.factoryId);
		var model = factory.config.equipment[config.modelId];
		Building.call(this, config);
		this.config.resell = config.resell || (this.resellMultiplier * model.cost);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
	}
	PWG.Utils.inherit(Retailer, Building);

	Retailer.prototype.constructionTime = 1;
	Retailer.prototype.sellTime = 0;
	Retailer.prototype.capacity = 50;
	Retailer.prototype.resellMultiplier = 3;
	Retailer.prototype.quantityPerYear = 25;
	Retailer.prototype.update = function() {
		// trace('retailer/update: ', this);
		Retailer._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.RETAILER_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// trace('numToSell = ' + numToSell + ', inventory = ' + this.config.inventory.length);
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// trace('------- Retailer about to sell a machine:', this);
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, retailer: this.config });
						this.config.totalSales += this.config.resell;
						
						numToSell--;
					}
					// PWG.Utils.each(
					// 	this.config.inventory,
					// 	function(machine) {
					// 		TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
					// 	},
					// 	this
					// );
					TurnManager.updateBuilding(this.config);
					this.sellTime = 0;
				} else {
					this.sellTime++;
				}
			}
		}
	};

	Retailer.prototype.addInventory = function(factory) {
		// trace('Retailer/addInventory, retailer = ', this.config, '\tfactory = ', factory);
		if(this.config.inventory.length < this.capacity) {
			var modelId = this.config.modelId;
			while(factory.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
				// trace('\ttransferring inventory to retailer');
				this.config.inventory.push(factory.inventory[modelId].pop());
				factory.totalInventory--;
			}
			TurnManager.updateBuilding(this.config);
		}
	};
	
	module.sectors = [ {}, {}, {}, {}, {} ];
	module.retailers = [];
	
	module.init = function() {
		// trace('initializing building data with: ', TurnManager.playerData.sectors);
		PWG.Utils.each(
			TurnManager.playerData.sectors,
			function(sector, s) {
				// trace('\tsectors['+s+'] = ', sector)
				PWG.Utils.each(
					sector,
					function(building, id) {
						// trace('\t\tbuildings['+id+'] = ', building);
						if(building.type === BuildingTypes.FACTORY) {
							module.sectors[s][building.id] = new Factory(building);
						} else if(building.type === BuildingTypes.RETAILER) {
							module.sectors[s][building.id] = new Retailer(building);
						}
					},
					this
				);
			},
			this
		);
		PWG.Utils.each(
			TurnManager.playerData.retailers,
			function(retailer) {
				module.retailers.push(new Retailer(retailer));
			},
			this
		);
		// trace('BuildingManager.sectors now = ', module.sectors);
	};
	
	module.createFactory = function(config) {
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + TurnManager.playerData.bank);
		var type = BuildingTypes.FACTORY;
		var count = TurnManager.playerData.buildingCount[type];
		// trace('\tcount = ' + count);
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var factory = new Factory(config);
			// trace('\tbuilding made');
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.updateBuildings(factory);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
	};
	
	module.addMachineModelToFactory = function(sector, factoryId, machine) {
		module.sectors[sector][factoryId].addMachineModel(machine);
	};
	
	// create retailer instance to store for later use if user chooses to add
	module.createRetailer = function(factory) {
		var model;
		var count = PWG.Utils.objLength(factory.config.equipment);
		var index = 0;
		var randomModelIdx = Math.floor(Math.random() * (count - 0) + 0);

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.RETAILER];
		var retailerId = BuildingTypes.RETAILER + TurnManager.tempRetailerCount;
		
		TurnManager.tempRetailerCount++;
		
		// trace('randomModelIdx = ' + randomModelIdx + ', count = ' + count);
		PWG.Utils.each(
			factory.config.equipment,
			function(machine) {
				// trace('\tindex = ' + index + ', machine = ', machine);
				if(index === randomModelIdx) {
					// trace('\t\tsetting model');
					model = machine;
				}
				index++;
			},
			this
		);

		// trace('model now = ', model);
		if(!factory.config.retailers.hasOwnProperty(model.id)) {
			var retailer = new Retailer({
				modelId: model.id,
				factoryId: factory.config.id,
				id: retailerId,
				// factory: factory.config,
				sector: factory.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_RETAILER_NOTIFICATION, factory: factory.config, retailer: retailer });
		}
	};
	
	module.addRetailer = function(retailer) {
		var factory = module.findBuilding(retailer.config.factoryId);
		factory.addRetailer(retailer);
		module.retailers.push(retailer);
		module.updateBuildings(retailer);
	};
	
	module.updateBuildings = function(building) {
		module.sectors[building.config.sector][building.config.id] = building;
		module.addBuildingToTurnManager(building.config);
	};
	
	module.update = function() {
		// update factories
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				PWG.Utils.each(
					sector,
					function(factory) {
						factory.update();
					},
					this
				)
			},
			module
		);
		// update retailers
		PWG.Utils.each(
			module.retailers,
			function(retailer) {
				retailer.update();
			},
			this
		);
	};

	module.getBuilding = function(sector, cell) {
		var config = {};
		// trace('BuildingManager/getBuilding, sector = ' + sector + ', cell = ' + cell);
		
		PWG.Utils.each(
			module.sectors[sector],
			function(building) {
				if(building.config.cell === cell) {
					// trace('\tfound it: ', building);
					config = building.config;
				}
			},
			this
		);
		return config;
	};
	
	module.findBuilding = function(buildingId) {
		var building = null;
		
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				if(sector.hasOwnProperty(buildingId)) {
					building = sector[buildingId];
				}
			},
			this
		);
		return building;
	};
	
	module.getMachineModelInventory = function(factoryId, machineId) {
		var factory = module.findBuilding(factoryId);
		var inventory = factory.getMachineModelInventory();
		
		return inventory;
	};
	
	module.addInventoryToRetailer = function(factoryId, retailerIdx) {
		var equipment = module.sectors.factories[factoryId].equipment;
		var retailer = module.sectors.retailers[retailerIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					retailer.inventory.push(machine);
				},
				this
			);
		} else {
			// notify factory has no equipment
		}
	};
	
	module.addBuildingToTurnManager = function(config) {
		// trace('save new building, config = ', config);
		TurnManager.addBuilding(config);
	};
	
	module.updateBuildingData = function(config) {
		// trace('BuildingManager/updateBuildingData, config = ', config);
		TurnManager.updateBuilding(config);
	};

	module.getFactoryModelCapacity = function() {
		return Factory.modelCapacity;
	};
	
	module.removeBuilding = function(sector, factoryId) {
		// trace('BuildingManager/removeBuilding, sector = ' + sector + ', factoryId = ' + factoryId + ', buildings = ', module.sectors);
		if(module.sectors[sector].hasOwnProperty(factoryId)) {
			delete module.sectors[sector][factoryId];
		}
	};
	
	
	return module;
	
}();