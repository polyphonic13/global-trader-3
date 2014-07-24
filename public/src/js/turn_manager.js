var TurnManager = function() {
	var turnData = {
		bankAdjustments: 0,
		profit: 0,
		bonuses: 0,
		newPlants: 0,
		newDealers: 0,
		newTradeRoutes: 0,
		newTractorModels: 0,
		newSkidsteerModels: 0,
		newTractors: 0,
		newSkidsteers: 0,
		wholesalePartsUsed: 0,
		emptiedWholesaleInventories: 0,
		newBuildings: [],
		newMachineModels: [],
		newMachines: [],
		machinesSold: [],
		newSuppliers: []
	};
	
	var module = {};

	module.turns;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		// trace('--- TurnManager/init');
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
		trace('TURN MANAGER: bank = ' + module.playerData.bank);
	};
	
	module.startTurn = function() {
		// trace('--- TurnManager/startTurn');
		module.currentData = PWG.Utils.clone(turnData);
		trace('\tpre initiative, bank ' + module.playerData.bank);
		module.playerData.bank += gameData.levels[module.playerData.level].startingBank;
		trace('\tpost initiative, bank = ' + module.playerData.bank);
		module.tempDealerCount = (module.playerData.buildingCount.dealer);
		// TurnManager.tempTradeRouteCount = (module.playerData.buildingCount.tradeRoute);
		module.tempSupplierCount = (module.playerData.suppliers.length) || 0;

		module.tempTradeRouteCount = {
			africa: 0,
			asia: 0,
			europe: 0,
			middleEast: 0,
			northPacific: 0,
			southPacific: 0,
			southAmerica: 0
		};

		PWG.Utils.each(
			module.playerData.sectors,
			function(sectorBuildings) {
				PWG.Utils.each(
					sectorBuildings,
					function(building) {
						if(building.type === BuildingTypes.TRADE_ROUTE) {
							module.tempTradeRouteCount[TradeRouteLocations[building.worldLocation]]++;
						}
					},
					this
				);
			},
			this
		);
	};
	
	module.updateBank = function(value) {
		// trace('--- TurnManager/updateBank, event =', event);
		module.playerData.bank += value;
		module.currentData.bankAdjustments += value;
		if(value > 0) {
			module.currentData.profit += value;
			module.playerData.profit += value;
		}
		PWG.EventCenter.trigger({ type: Events.BANK_UPDATED });
	};

	module.addBuilding = function(building) {
		// trace('--- TurnManager/addBuilding, building = ', building);
		module.playerData.sectors[building.sector][building.id] = building;
		module.currentData.newBuildings.push(building);
		module.playerData.buildingCount[building.type]++;
		
		switch(building.type) {
			case BuildingTypes.PLANT: 
			module.currentData.newPlants++;
			break;
			
			case BuildingTypes.DEALER: 
			module.currentData.newDealers++;
			break;
			
			case BuildingTypes.TRADE_ROUTE:
			module.currentData.newTradeRoutes++;
			break;
			
			default: 
			// trace('ERROR unknown building type: ' + building.type);
			break;
		}
		// trace('adding bonus points for new ' + building.type + ': ' + gameData.bonuses.buildings[building.type]);
		module.playerData.bonusPoints += gameData.bonuses.buildings[building.type];

		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};
	
	module.updateBuilding = function(building) {
		// trace('--- TurnManager/updateBuilding, building = ', building);
		module.playerData.sectors[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(model) {
		// trace('--- TurnManager/addMachineModel, model = ', model);
		// module.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[PhaserGame.activeMachine.config.id] = model;
		BuildingManager.addMachineModelToPlant(PhaserGame.activeSector, PhaserGame.activeBuilding.id, model);
		module.playerData.modelCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels.push(model);
		if(model.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractorModels++;
		} else if(model.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteerModels++;
		}
	};

	module.addPlantInventory = function(machine) {
		// trace('--- TurnManager/addPlantInventory, machine = ', machine);
		module.currentData.newMachines.push(machine);
		if(machine.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractors++;
		} else if(machine.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteers++;
		}

		module.playerData.machinesBuilt[machine.type]++;
		module.playerData.machinesBuilt.total++;

		// test bonus points
		var total = module.playerData.machinesBuilt.total;

		PWG.Utils.each(
			gameData.bonuses.manufacturing,
			function(machineBonus, key) {
				// trace('total = ' + total + ', machineBonus = ' + machineBonus + ', key = ' + key);
				if(total >= machineBonus && !module.playerData.bonusesAchieved[key]) {
					// trace('adding bonus points for ' + machineBonus + ' machines built: ' + gameData.bonuses.manufacturing[key]);
					module.playerData.bonusesAchieved[key] = true;
					module.playerData.bonusPoints += gameData.bonuses.manufacturing[key];
					PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
				}
			},
			this
		);
	};
	
	module.removePlantInventory = function(machine) {
		
	};
	
	module.sellMachine = function(machine, amount) {
		// trace('TurnManager/sellMachine, amount = ' + amount + ', machine = ', machine);
		module.currentData.machinesSold.push(machine);
		module.updateBank(amount);
	};
	
	module.addSupplier = function(supplier) {
		module.playerData.suppliers[supplier.id] = supplier;
		module.currentData.newSuppliers.push(supplier);
		module.playerData.bonusPoints += gameData.bonuses.suppliers.added;
		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};
	
	module.wholesalePartUsed = function() {
		module.currentData.wholesalePartsUsed++;
	};
	
	module.wholesaleInventoryEmptied = function(supplier) {
		trace('TurnManager/wholesaleInventoryEmptied');
		module.currentData.emptiedWholesaleInventories++;
		module.playerData.bonusPoints += gameData.bonuses.suppliers.allPartsUsed;
		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};

	module.get = function(prop) {
		// trace('--- TurnManager/get, prop = ', prop);
		if(module.playerData.hasOwnProperty(prop)) {
			return module.playerData[prop];
		} else if(module.currentData.hasOwnProperty(prop)) {
			return module.currentData[prop];
		} else {
			return;
		}
	};
	
	return module;
}();
