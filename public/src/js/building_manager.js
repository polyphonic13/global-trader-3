var BuildingManager = function() {
	var module = {};
	
	module.PLANT_MAX_MODELS = 6;
	module.PLANT_MIN_SELL_INVENTORY = 3;
	module.PLANT_MAX_INVENTORY = 100;
	module.PLANT_MAX_DEALERSHIPS = 6;
	
	module.DEALERSHIP_MAX_INVENTORY = 50;
	module.DEALERSHIP_MAX_SALE_QUANTITY = 5;

	module.TIME_TO_BUILD_MACHINE = 2;
	module.TIME_TO_SELL_MACHINES = 3;
	
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

	// PLANT
	function Plant(config) {
		config.type = BuildingTypes.PLANT;
		Building.call(this, config);
		this.config.equipment = config.equipment || {};
		this.config.inventory = config.inventory || {};
		this.config.dealerships = config.dealerships || {};

		this.dealershipNotifications = {};
		if(PWG.Utils.objLength(this.config.equipment) > 0) {
			PWG.Utils.each(
				this.config.equipment,
				function(model) {
					this.dealershipNotifications[model.id] = false;
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

	PWG.Utils.inherit(Plant, Building);
	
	Plant.prototype.constructionTime = 3;
	Plant.prototype.buildTime = 0;
	Plant.prototype.modelCapacity = 6;
 	Plant.prototype.update = function() {
		if(this.config.state !== BuildingStates.PAUSED) {
			Plant._super.update.apply(this, arguments);
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD_MACHINE) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							// trace('machine = ', machine);
							if(TurnManager.playerData.bank > machine.cost) {
								if(this.config.totalInventory < module.PLANT_MAX_INVENTORY) {
									// trace('manufactored machine: ' +  machine.id + ', dealerships: ', this.config.dealerships);
									PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-machine.cost) });
									PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
									PWG.EventCenter.trigger({ type: Events.INVENTORY_ADDED, plant: this.config, machine: machine.id });
									
									this.config.inventory[machine.id].push(machine);
									this.config.totalInventory++;
									
									TurnManager.addPlantInventory(machine);

									// if there is enough inventory of this machine to sell and it doesn't already have a dealership...
									if(this.config.inventory[machine.id].length > module.PLANT_MIN_SELL_INVENTORY) {
										if(!this.config.dealerships.hasOwnProperty(machine.id)) {
											trace('\tplant['+this.config.id+'].dealershipNotifications['+machine.id+'] = ' + this.dealershipNotifications[machine.id]);
											if(!this.dealershipNotifications[machine.id]) {
												module.createDealership(this, machine.id);
												this.dealershipNotifications[machine.id] = true;
											}
										} else {
											var dealershipId = this.config.dealerships[machine.id];
											var dealership = module.findBuilding(dealershipId);
											if(dealership.config.state === BuildingStates.ACTIVE) {
												var inventory = this.config.inventory[machine.id];
												dealership.addInventory(this.config);
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
	Plant.prototype.addMachineModel = function(machine) {
		this.config.equipment[machine.id] = machine; 
		this.config.inventory[machine.id] = [];
		this.dealershipNotifications[machine.id] = false;
	};
	Plant.prototype.addDealership = function(dealership) {
		// trace('Plant/addDealership, dealership = ', dealership);
		this.config.dealerships[dealership.config.modelId] = dealership.config.id;
		// trace('\tdealerships now = ', this.config.dealerships);
		TurnManager.updateBuilding(this.config);
	};
	
	// DEALERSHIP
	function Dealership(config) {
		config.type = BuildingTypes.DEALERSHIP;
		var plant = module.findBuilding(config.plantId);
		var model = plant.config.equipment[config.modelId]
		var resellMultiplier = Math.floor(Math.random() * (this.resellMaxMultiplier - 1) + 2);
		trace('resellMultilplier = ' + resellMultiplier);
		Building.call(this, config);
		this.config.resell = config.resell || (resellMultiplier * model.cost);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
	}
	PWG.Utils.inherit(Dealership, Building);

	Dealership.prototype.constructionTime = 1;
	Dealership.prototype.sellTime = 0;
	Dealership.prototype.capacity = 50;
	Dealership.prototype.resellMaxMultiplier = 5;
	Dealership.prototype.quantityPerYear = 25;
	Dealership.prototype.update = function() {
		// trace('dealership/update: ', this);
		Dealership._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.DEALERSHIP_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// trace('numToSell = ' + numToSell + ', inventory = ' + this.config.inventory.length);
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// trace('------- Dealership about to sell a machine:', this);
						PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, dealership: this.config });
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

	Dealership.prototype.addInventory = function(plant) {
		// trace('Dealership/addInventory, dealership = ', this.config, '\tplant = ', plant);
		if(this.config.inventory.length < this.capacity) {
			var modelId = this.config.modelId;
			while(plant.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
				// trace('\ttransferring inventory to dealership');
				this.config.inventory.push(plant.inventory[modelId].pop());
				plant.totalInventory--;
			}
			TurnManager.updateBuilding(this.config);
		}
	};
	
	module.sectors = [ {}, {}, {}, {}, {} ];
	module.dealerships = [];
	
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
						if(building.type === BuildingTypes.PLANT) {
							module.sectors[s][building.id] = new Plant(building);
						} else if(building.type === BuildingTypes.DEALERSHIP) {
							module.sectors[s][building.id] = new Dealership(building);
						}
					},
					this
				);
			},
			this
		);
		PWG.Utils.each(
			TurnManager.playerData.dealerships,
			function(dealership) {
				module.dealerships.push(new Dealership(dealership));
			},
			this
		);
		// trace('BuildingManager.sectors now = ', module.sectors);
	};
	
	module.createPlant = function(config) {
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + TurnManager.playerData.bank);
		var type = BuildingTypes.PLANT;
		var count = TurnManager.playerData.buildingCount[type];
		// trace('\tcount = ' + count);
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var plant = new Plant(config);
			// trace('\tbuilding made');
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.updateBuildings(plant);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
	};
	
	module.addMachineModelToPlant = function(sector, plantId, machine) {
		module.sectors[sector][plantId].addMachineModel(machine);
	};
	
	// create dealership instance to store for later use if user chooses to add
	module.createDealership = function(plant, modelId) {
		var model;
		var count = PWG.Utils.objLength(plant.config.equipment);
		var index = 0;

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.DEALERSHIP];
		var type = BuildingTypes.DEALERSHIP;
		var dealershipId = type + ((TurnManager.tempDealershipCount) + 1);
		var dealershipName = type.toUpperCase() + ' ' + TurnManager.tempDealershipCount;
		TurnManager.tempDealershipCount++;
		
		trace('\tmodelId = ' + modelId + ', count = ' + count);
		model = plant.config.equipment[modelId]

		// trace('model now = ', model);
		if(!plant.config.dealerships.hasOwnProperty(model.id)) {
			var dealership = new Dealership({
				id: dealershipId,
				name: dealershipName,
				modelId: model.id,
				plantId: plant.config.id,
				// plant: plant.config,
				sector: plant.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_DEALERSHIP_NOTIFICATION, plant: plant.config, dealership: dealership });
		}
	};
	
	module.addDealership = function(dealership) {
		var plant = module.findBuilding(dealership.config.plantId);
		plant.addDealership(dealership);
		module.dealerships.push(dealership);
		module.updateBuildings(dealership);
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
					function(plant) {
						plant.update();
					},
					this
				)
			},
			module
		);
		// update dealerships
		PWG.Utils.each(
			module.dealerships,
			function(dealership) {
				dealership.update();
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
	
	module.getMachineModelInventory = function(plantId, machineId) {
		var count = 0;
		var plant = module.findBuilding(plantId);
		// trace('BuildingManager/getMachineModelInventory, machineId = ' + machineId + ', plant.inventory = ', plant.config.inventory);
		if(plant.config.inventory[machineId]) {
			count = plant.config.inventory[machineId].length;
		}
		return count;
	};
	
	module.addInventoryToDealership = function(plantId, dealershipIdx) {
		var equipment = module.sectors.factories[plantId].equipment;
		var dealership = module.sectors.dealerships[dealershipIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					dealership.inventory.push(machine);
				},
				this
			);
		} else {
			// notify plant has no equipment
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

	module.getPlantModelCapacity = function() {
		return Plant.modelCapacity;
	};
	
	module.removeBuilding = function(sector, plantId) {
		// trace('BuildingManager/removeBuilding, sector = ' + sector + ', plantId = ' + plantId + ', buildings = ', module.sectors);
		if(module.sectors[sector].hasOwnProperty(plantId)) {
			delete module.sectors[sector][plantId];
		}
	};
	
	
	return module;
	
}();