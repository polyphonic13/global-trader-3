var BuildingManager = function() {
	var module = {};
	
	module.TIME_TO_BUILD = 5;
	module.FACTORY_MAX_MODELS = 6;
	module.FACTORY_MIN_SELL_INVENTORY = 3;
	module.FACTORY_MAX_INVENTORY = 100;
	module.RETAILER_MAX_INVENTORY = 50;
	module.RETAILER_TIME_TO_SELL = 5;
	
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
		if(this.config.state === BuildingStates.CONSTRUCTION && this.config.age >= this.buildTime) {
			this.config.state = BuildingStates.ACTIVE;
			trace('building construction completed');
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

		if(PWG.Utils.objLength(this.config.inventory)) {
			PWG.Utils.each(
				this.config.inventory,
				function(machineTypeInventory) {
					this.config.totalInventory += machineTypeInventory.length;
				},
				this
			);
		} else {
			this.config.totalInventory = 0;
		}
	}

	PWG.Utils.inherit(Factory, Building);
	
	Factory.prototype.buildTime = 0;
	Factory.prototype.modelCapacity = 6;
 	Factory.prototype.update = function() {
		if(this.config.state !== BuildingStates.PAUSED) {
			Factory._super.update.apply(this, arguments);
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							// trace('machine = ', machine);
							if(TurnManager.playerData.bank > machine.cost) {
								if(this.config.totalInventory < module.FACTORY_MAX_INVENTORY) {
									// trace('build machine: machine = ', machine);
									PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-machine.cost) });
									PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
									this.config.inventory[machine.id].push(machine);
									this.config.totalInventory++;
									
									TurnManager.addInventory(machine);
									TurnManager.updateBuilding(this.config);
									
									// if there is enough inventory of this machine to sell and it doesn't already have a retailer...
									if(this.config.inventory[machine.id].length > module.FACTORY_MIN_SELL_INVENTORY && !this.config.retailers.hasOwnProperty(machine.id)) {
										var model;
										var count = PWG.Utils.objLength(this.config.equipment);
										var index = 0;
										var randomModelIdx = Math.floor(Math.random() * (count - 0) + 0);
										var resell; 
										
										trace('randomModelIdx = ' + randomModelIdx + ', count = ' + count);
										PWG.Utils.each(
											this.config.equipment,
											function(machine) {
												trace('\tindex = ' + index + ', machine = ', machine);
												if(index === randomModelIdx) {
													trace('\t\tsetting model');
													model = machine;
												}
												index++;
											},
											this
										);

										trace('model now = ', model);
										if(!this.config.retailers.hasOwnProperty(model.id)) {
											var retailer = new Retailer({
												model: model,
												factoryId: this.config.id
											});

											PWG.EventCenter.trigger({ type: Events.ADD_RETAILER_NOTIFICATION, factory: this.config, retailer: retailer });
										}
									} else {
										PWG.Utils.each(
											this.config.retailers,
											function(retailer) {
												
											},
											this
										);
									}
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
		this.config.retailers[retailer.config.model.id] = retailer;
		trace('Factory/addRetailer, retailers now = ', this.config.retailers);
		TurnManager.updateBuilding(this.config);
	};
	
	// RETAILER
	function Retailer(config) {
		config.type = BuildingTypes.RETAILER;
		Building.call(this, config);
		if(this.config.model) {
			this.config.resell = this.resellMultiplier * this.config.model.cost;
		}
		this.config.inventory = [];
	}
	PWG.Utils.inherit(Retailer, Building);

	Retailer.prototype.buildTime = 0;
	Retailer.prototype.capacity = 50;
	Retailer.prototype.resellMultiplier = 3;
	Retailer.prototype.quantityPerYear = 50;
	Retailer.prototype.update = function() {
		trace('retailer id: ' + retailer.id);
		// if(this.config.state === BuildingStates.ACTIVE) {
			// Retailer._super.update.apply(this, arguments);
			if(this.config.inventory.length > 0) {

			}
		// }
	};

	module.sectors = [ {}, {}, {}, {}, {} ];
	module.retailers = [];
	
	module.init = function() {
		trace('initializing building data with: ', TurnManager.playerData.buildings);
		PWG.Utils.each(
			TurnManager.playerData.buildings,
			function(sector, s) {
				// trace('\tsectors['+s+'] = ', sector)
				PWG.Utils.each(
					sector,
					function(building, id) {
						trace('\t\tbuildings['+id+'] = ', building);
						module.sectors[s][building.id] = new Factory(building);
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
	
	module.createFactory = function(type, config) {
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + TurnManager.playerData.bank);
		var count = TurnManager.playerData.buildingCount[type];
		// trace('\tcount = ' + count);
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var building = new Factory(config);
			// trace('\tbuilding made');
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.sectors[config.sector][building.config.id] = building;
			module.addNewBuilding(building.config);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
	};
	
	module.addMachineModelToFactory = function(sector, factoryId, machine) {
		module.sectors[sector][factoryId].addMachineModel(machine);
	};
	
	module.addRetailer = function(retailer) {
		var factory = module.findFactory(retailer.config.factoryId);
		factory.addRetailer(retailer);
		module.retailers.push(retailer);
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
		trace('module retailer = ', module.retailers);
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
	
	module.findFactory = function(factoryId) {
		var building = null;
		
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				if(sector.hasOwnProperty(factoryId)) {
					building = sector[factoryId];
				}
			},
			this
		);
		return building;
	};
	
	module.getMachineModelInventory = function(factoryId, machineId) {
		var factory = module.findFactory(factoryId);
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
	
	module.addNewBuilding = function(config) {
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
		trace('BuildingManager/removeBuilding, sector = ' + sector + ', factoryId = ' + factoryId + ', buildings = ', module.sectors);
		if(module.sectors[sector].hasOwnProperty(factoryId)) {
			delete module.sectors[sector][factoryId];
		}
	};
	
	
	return module;
	
}();