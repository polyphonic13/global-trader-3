var TurnManager = function() {
	var turnData = {
		bankAdjustments: 0,
		profit: 0,
		newFactories: 0,
		newRetailers: 0,
		newTractorModels: 0,
		newSkidsteerModels: 0,
		newTractors: 0,
		newSkidsteers: 0,
		newBuildings: [],
		newMachineModels: [],
		newMachines: [],
		machinesSold: []
	};
	
	var module = {};

	module.turns;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		// trace('--- TurnManager/init');
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
		module.playerData.bank += gameData.levels[module.playerData.level].startingBank;
	};
	
	module.startTurn = function() {
		trace('--- TurnManager/startTurn');
		module.currentData = PWG.Utils.clone(turnData);
		TurnManager.tempRetailerCount = (module.playerData.buildingCount.retailer);
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
		trace('--- TurnManager/addBuilding, building = ', building);
		module.playerData.sectors[building.sector][building.id] = building;
		module.currentData.newBuildings.push(building);
		module.playerData.buildingCount[building.type]++;
		
		switch(building.type) {
			case BuildingTypes.FACTORY: 
			module.currentData.newFactories++;
			break;
			
			case BuildingTypes.RETAILER: 
			module.currentData.newRetailers++;
			break;
			
			case BuildingTypes.TRADE_ROUTE:
			modeul.currentData.newTraderoutes++;
			break;
			
			default: 
			trace('ERROR unknown building type: ' + building.type);
			break;
			
		}
	};
	
	module.updateBuilding = function(building) {
		trace('--- TurnManager/updateBuilding, building = ', building);
		module.playerData.sectors[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(model) {
		trace('--- TurnManager/addMachineModel, model = ', model);
		// module.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[PhaserGame.activeMachine.config.id] = model;
		BuildingManager.addMachineModelToFactory(PhaserGame.activeSector, PhaserGame.activeBuilding.id, model)
		module.playerData.modelCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels.push(model);
		if(model.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractorModels++;
		} else if(model.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteerModels++;
		}
	};

	module.addFactoryInventory = function(machine) {
		// trace('--- TurnManager/addFactoryInventory, machine = ', machine);
		module.currentData.newMachines.push(machine);
		if(machine.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractors++;
		} else if(machine.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteers++;
		}
	};
	
	module.removeFactoryInventory = function(machine) {
		
	};
	
	module.sellMachine = function(machine, amount) {
		trace('TurnManager/sellMachine, amount = ' + amount + ', machine = ', machine);
		module.currentData.machinesSold.push(machine);
		module.updateBank(amount);
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
