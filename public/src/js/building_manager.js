var BuildingManager = function() {
	var module = {};
	
	module.PLANT_MAX_MODELS = 6;
	module.PLANT_MIN_SELL_INVENTORY = 3;
	module.PLANT_MIN_EXPORT_INVENTORY = 5;
	module.PLANT_MAX_INVENTORY = 100;
	module.PLANT_MAX_DEALERS = 6;

	module.DEALER_MAX_INVENTORY = 50;
	module.DEALER_MAX_SALE_QUANTITY = 5;
	module.DEALER_MAX_SALES_PER_YEAR = 25;
	module.DEALER_MIN_SALES_PER_YEAR = 10;
	
	module.TRADE_ROUTE_MAX_SALE_QUANTITY = 10;
	module.TRADE_ROUTE_MAX_SALES_PER_YEAR = 25;
	module.TRADE_ROUTE_MIN_SALES_PER_YEAR = 10;
	
	module.TIME_TO_BUILD_MACHINE = 2;
	module.TIME_TO_SELL_MACHINES = 3;
	module.MACHINE_PRODUCTION_COST = 1000;
	
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
		this.config.dealers = config.dealers || {};
		this.config.tradeRoutes = config.tradeRoutes || {};
		
		this.dealerNotifications = {};
		this.tradeRouteNotifications = {};
		
		if(PWG.Utils.objLength(this.config.equipment) > 0) {
			PWG.Utils.each(
				this.config.equipment,
				function(model) {
					this.dealerNotifications[model.id] = false;
					this.tradeRouteNotifications[model.id] = false;
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
 	Plant.prototype.addMachineModel = function(machine) {
		this.config.equipment[machine.id] = machine; 
		this.config.inventory[machine.id] = [];
		this.dealerNotifications[machine.id] = false;
		this.tradeRouteNotifications[machine.id] = false;
	};
	Plant.prototype.associateBuilding = function(building, property) {
		this.config[property][building.config.modelId] = building.config.id;
		TurnManager.updateBuilding(this.config);
	};
	Plant.prototype.update = function() {
		if(this.config.state !== BuildingStates.PAUSED) {
			Plant._super.update.apply(this, arguments);
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD_MACHINE) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							// trace('machine = ', machine);
							if(machine.active) {
								var productionCost = machine.cost + module.MACHINE_PRODUCTION_COST;
								if(TurnManager.playerData.bank > productionCost) {
									if(this.config.totalInventory < module.PLANT_MAX_INVENTORY) {

										var allPartsAdded = true;
										if(PWG.Utils.objLength(machine.wholesaleParts) > 0) {
											// trace('THIS MACHINE ' + machine.id + ' USES WHOLESALE PARTS');
											PWG.Utils.each(
												machine.wholesaleParts,
												function(supplierId, part) {
													// trace('\tsupplierId = ' + supplierId + ', part = ' + part + ', supplier = ', WholesaleManager.suppliers[supplierId]);
													var supplier = WholesaleManager.suppliers[supplierId];
													if(supplier.config.quantity > 0) {
														var partUsed = WholesaleManager.usePart(part, machine.size, supplierId);
														if(!partUsed) {
															// trace('\tfailed to add part, deactivating machine');
															this.config.equipment[machine.id].active = false;
														}
													} else {
														// trace('\tand there are none left. :(');
														this.config.equipment[machine.id].active = false;
														wholesalePartsAdded = false;
													}
												},
												this
											);
										}

										if(allPartsAdded) {
											// trace('manufactured machine: ' +  machine.id + ', dealers: ', this.config.dealers);
											PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-productionCost) });
											PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
											PWG.EventCenter.trigger({ type: Events.INVENTORY_ADDED, plant: this.config, machine: machine.id });

											this.config.totalInventory++;
											this.config.inventory[machine.id].push(machine);

											TurnManager.addPlantInventory(machine);

											// TRADE ROUTES
											if(this.config.inventory[machine.id].length > module.PLANT_MIN_EXPORT_INVENTORY && TurnManager.get('level') >= MIN_TRADE_ROUTE_LEVEL) {
												trace('trade route check for ' + machine.id);
												if(!this.config.tradeRoutes.hasOwnProperty(machine.id)) {
													trace('\tplant['+this.config.id+'].tradeRouteNotifications['+machine.id+'] = ' + this.tradeRouteNotifications[machine.id]);
													if(!this.tradeRouteNotifications[machine.id]) {
														module.createTradeRoute(this, machine.id);
														this.tradeRouteNotifications[machine.id] = true;
													}
												} else {
													var tradeRouteId = this.config.tradeRoutes[machine.id];
													trace('sending inventory to tradeRouteId = ' + tradeRouteId);
													var tradeRoute = module.findBuilding(tradeRouteId);
													if(tradeRoute.config.state === BuildingStates.ACTIVE) {
														var inventory = this.config.inventory[machine.id];
														tradeRoute.addInventory(this.config);
													}
												}
											}

											// DEALERS
											// if there is enough inventory of this machine to sell and it doesn't already have a dealer...
											if(this.config.inventory[machine.id].length > module.PLANT_MIN_SELL_INVENTORY) {
												if(!this.config.dealers.hasOwnProperty(machine.id)) {
													// trace('\tplant['+this.config.id+'].dealerNotifications['+machine.id+'] = ' + this.dealerNotifications[machine.id]);
													if(!this.dealerNotifications[machine.id]) {
														module.createDealer(this, machine.id);
														this.dealerNotifications[machine.id] = true;
													}
												} else {
													var dealerId = this.config.dealers[machine.id];
													var dealer = module.findBuilding(dealerId);
													if(dealer.config.state === BuildingStates.ACTIVE) {
														var inventory = this.config.inventory[machine.id];
														dealer.addInventory(this.config);
													}
												}
											} 

											TurnManager.updateBuilding(this.config);
										} else {
											// notify issue with wholesale part supply
											// alert(this.config.id + ' could not manufacture ' + machine.id + ': no more wholesale parts');
										}

									} else {
										// notify output capacity reached
										// alert(this.config.id + ' created max inventory');
									}
								} else {
									// notify out of bank
									// alert('not enough money to create inventory');
								}
							} else {
								// notify machine needs attention
								// alert('machine needs attention');
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
	
	// DEALER
	function Dealer(config) {
		config.type = BuildingTypes.DEALER;
		var plant = module.findBuilding(config.plantId);
		var model = plant.config.equipment[config.modelId];
		var resellMultiplier = Math.floor(Math.random() * (this.resellMaxMultiplier - 1) + 2);
		// trace('resellMultilplier = ' + resellMultiplier);
		Building.call(this, config);
		this.config.resell = config.resell || (resellMultiplier * model.cost) + module.MACHINE_PRODUCTION_COST;
		this.config.maxPerYear = config.maxPerYear || Math.floor(Math.random() * (module.DEALER_MAX_SALES_PER_YEAR - module.DEALER_MIN_SALES_PER_YEAR) + module.DEALER_MIN_SALES_PER_YEAR);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
		this.numberSold = 0;
	}
	PWG.Utils.inherit(Dealer, Building);

	Dealer.prototype.constructionTime = 1;
	Dealer.prototype.sellTime = 0;
	Dealer.prototype.capacity = 50;
	Dealer.prototype.resellMaxMultiplier = 6;
	Dealer.prototype.quantityPerYear = 25;
	Dealer.prototype.addInventory = function(plant) {
		// trace('Dealer/addInventory, dealer = ', this.config, '\tplant = ', plant);
		// if(this.config.inventory.length < this.capacity) {
		if(this.numberSold < this.config.maxPerYear) {	
			var modelId = this.config.modelId;
			if(typeof(plant.inventory[modelId] !== 'undefined')) {
				try {
					while(plant.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
						// trace('\ttransferring inventory to dealer');
						this.config.inventory.push(plant.inventory[modelId].pop());
						plant.totalInventory--;
						this.numberSold++;
					}
					TurnManager.updateBuilding(this.config);
				} catch(e) {}
			}
		}
	};
	Dealer.prototype.update = function() {
		// trace('dealer/update: ', this);
		Dealer._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.DEALER_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// trace('numToSell = ' + numToSell + ', inventory = ' + this.config.inventory.length);
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// trace('------- Dealer about to sell a machine:', this);
						PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, building: this.config });
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

	// TRADE_ROUTE
	function TradeRoute(config) {
		config.type = BuildingTypes.TRADE_ROUTE;
		var plant = module.findBuilding(config.plantId);
		var model = plant.config.equipment[config.modelId];
		var resellMultiplier = Math.floor(Math.random() * (this.resellMaxMultiplier - 1) + 3);
		Building.call(this, config);
		this.config.resell = config.resell || (resellMultiplier * model.cost) + module.MACHINE_PRODUCTION_COST;
		this.config.maxPerYear = config.maxPerYear || Math.floor(Math.random() * (module.TRADE_ROUTE_MAX_SALES_PER_YEAR - module.TRADE_ROUTE_MIN_SALES_PER_YEAR) + module.DEALER_MIN_SALES_PER_YEAR);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
		// trace('TradeRoute/constructor: ', this);
	}
	PWG.Utils.inherit(TradeRoute, Building);

	TradeRoute.prototype.constructionTime = 1;
	TradeRoute.prototype.sellTime = 0;
	TradeRoute.prototype.capacity = 50;
	TradeRoute.prototype.resellMaxMultiplier = 10;
	TradeRoute.prototype.quantityPerYear = 25;
	TradeRoute.prototype.addInventory = function(plant) {
		// trace('TradeRoute/addInventory, tradeRoute = ', this.config, '\tplant = ', plant);
		if(this.config.inventory.length < this.capacity) {
			var modelId = this.config.modelId;
			if(typeof(plant.inventory[modelId] !== 'undefined')) {
				try {
					while(plant.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
						// trace('\ttransferring inventory to tradeRoute');
						this.config.inventory.push(plant.inventory[modelId].pop());
						plant.totalInventory--;
					}
					TurnManager.updateBuilding(this.config);
				} catch(e) {}
			}
		}
	};
	TradeRoute.prototype.update = function() {
		// trace('tradeRoute/update: ', this);
		TradeRoute._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.DEALER_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// trace('numToSell = ' + numToSell + ', inventory = ' + this.config.inventory.length);
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// trace('------- TradeRoute about to sell a machine:', this);
						PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, building: this.config });
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

	module.sectors = [ {}, {}, {}, {}, {} ];
	module.dealers = [];
	module.tradeRoutes = [];
	
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
						} else if(building.type === BuildingTypes.DEALER) {
							module.sectors[s][building.id] = new Dealer(building);
						} else if(building.type === BuildingTypes.TRADE_ROUTE) {
							module.sectors[s][building.id] = new TradeRoute(building);
						}
					},
					this
				);
			},
			this
		);
		// PWG.Utils.each(
		// 	TurnManager.playerData.dealers,
		// 	function(dealer) {
		// 		module.dealers.push(new Dealer(dealer));
		// 	},
		// 	this
		// );
		// PWG.Utils.each(
		// 	TurnManager.playerData.tradeRoutes,
		// 	function(tradeRoute) {
		// 		// trace("BYILDING MANAGER ADDING TRADE ROUTE: ", tradeRoute);
		// 		module.tradeRoutes.push(new TradeRoute(tradeRoute));
		// 	},
		// 	this
		// );
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
	
	// create dealer instance to store for later use if user chooses to add
	module.createDealer = function(plant, modelId) {
		var model;
		var count = PWG.Utils.objLength(plant.config.equipment);
		var index = 0;

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.DEALER];
		var type = BuildingTypes.DEALER;
		var dealerId = type + ((TurnManager.tempDealerCount) + 1);
		var dealerName = type.toUpperCase() + ' ' + TurnManager.tempDealerCount;
		TurnManager.tempDealerCount++;
		
		// trace('\tmodelId = ' + modelId + ', count = ' + count);
		model = plant.config.equipment[modelId];

		// trace('model now = ', model);
		if(!plant.config.dealers.hasOwnProperty(model.id)) {
			var dealer = new Dealer({
				id: dealerId,
				name: dealerName,
				modelId: model.id,
				plantId: plant.config.id,
				// plant: plant.config,
				sector: plant.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_DEALER_NOTIFICATION, plant: plant.config, dealer: dealer });
		}
	};
	
	module.addDealer = function(dealer) {
		var plant = module.findBuilding(dealer.config.plantId);
		plant.associateBuilding(dealer, 'dealers');
		module.dealers.push(dealer);
		module.updateBuildings(dealer);
	};
	
	module.addInventoryToDealer = function(plantId, dealerIdx) {
		var equipment = module.sectors.factories[plantId].equipment;
		var dealer = module.sectors.dealers[dealerIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					dealer.inventory.push(machine);
				},
				this
			);
		} else {
			// notify plant has no equipment
		}
	};
	
	module.createTradeRoute = function(plant, modelId) {
		// for testing, to trigger in console: 
		// var plant1 = BuildingManager.findBuilding('plant1')
		// BuildingManager.createTradeRoute(plant1, [ a model id from plant1.config.equipement ])
		var model;
		var count = PWG.Utils.objLength(plant.config.equipment);
		var index = 0;

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.TRADE_ROUTE];
		var type = BuildingTypes.TRADE_ROUTE;
		var worldLocation = Math.floor(Math.random() * (TradeRouteLocations.length));
		var area = TradeRouteLocations[worldLocation];

		var tradeRouteId = type + '_' + area + ((TurnManager.tempTradeRouteCount[area]) + 1);
		var tradeRouteName = TradeRouteNames[area].toUpperCase() + '\n' + TradeRouteNames.global.toUpperCase() + ' ' + ((TurnManager.tempTradeRouteCount[area]) + 1);
		
		TurnManager.tempTradeRouteCount[area]++;

		// trace('\tmodelId = ' + modelId + ', count = ' + count);
		model = plant.config.equipment[modelId];

		// trace('model now = ', model);
		if(!plant.config.tradeRoutes.hasOwnProperty(model.id)) {
			var tradeRoute = new TradeRoute({
				id: tradeRouteId,
				name: tradeRouteName,
				worldLocation: worldLocation,
				modelId: model.id,
				plantId: plant.config.id,
				// plant: plant.config,
				sector: plant.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_TRADE_ROUTE_NOTIFICATION, plant: plant.config, tradeRoute: tradeRoute });
		}
	};

	module.addTradeRoute = function(tradeRoute) {
		var plant = module.findBuilding(tradeRoute.config.plantId);
		plant.associateBuilding(tradeRoute, 'tradeRoutes');
		module.tradeRoutes.push(tradeRoute);
		module.updateBuildings(tradeRoute);
	};

	module.addInventoryToTradeRoute = function(plantId, tradeRouteIdx) {
		var equipment = module.sectors.factories[plantId].equipment;
		var tradeRoute = module.sectors.tradeRoutes[tradeRouteIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					tradeRoute.inventory.push(machine);
				},
				this
			);
		} else {
			// notify plant has no equipment
		}
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
				);
			},
			module
		);
		// update dealers
		PWG.Utils.each(
			module.dealers,
			function(dealer) {
				dealer.update();
			},
			this
		);

		PWG.Utils.each(
			module.tradeRoutes,
			function(tradeRoute) {
				tradeRoute.update();
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
	
	module.getExistingTradeRoutes = function() {
		var existingTradeRoutes = {};
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				PWG.Utils.each(
					sector,
					function(building) {
						if(building.config.type === BuildingTypes.TRADE_ROUTE) {
							existingTradeRoutes[building.config.id] = building.config;
						}
					},
					this
		 		);
			},
			this
		);
		
		return existingTradeRoutes;
	};
	
	module.removeBuilding = function(sector, buildingId) {
		// trace('BuildingManager/removeBuilding, sector = ' + sector + ', buildingId = ' + buildingId + ', buildings = ', module.sectors);
		if(module.sectors[sector].hasOwnProperty(buildingId)) {
			delete module.sectors[sector][buildingId];
		}
	};
	
	return module;
	
}();