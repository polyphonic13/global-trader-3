var TurnManager = function() {
	var turnData = {
		bankAdjustments: 0,
		profit: 0,
		newBuildings: [],
		newMachineModels: [],
		newMachines: []
	};
	
	var module = {};

	module.turns;
	module.currentLevel = 0;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		// trace('--- TurnManager/init');
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
	};
	
	module.startTurn = function() {
		// trace('--- TurnManager/startTurn');
		module.currentData = PWG.Utils.clone(turnData);
		module.currentLevel++;
	};
	
	module.completeTurn = function() {
		// trace('--- TurnManager/completeTurn');
		PhaserGame.playerData = module.playerData;
		PhaserGame.setSavedData();
	};
	
	module.stopTurn = function() {
		// trace('--- TurnManager/stopTurn');
		// reset turn data, all info lost
		module.currentData = PWG.Utils.clone(turnData);
	};
	
	module.updateBank = function(event) {
		// trace('--- TurnManager/updateBank, event =', event);
		module.playerData.bank += event.value;
		module.currentData.bankAdjustments += event.value;
		if(event.value > 0) {
			module.currentData.profit += event.value;
		}
	};

	module.addBuilding = function(building) {
		// trace('--- TurnManager/addBuilding, buildin = ', building);
		module.playerData.buildings[building.sector][building.id] = building;
		module.currentData.newBuildings.push(building);
	};
	
	module.updateBuilding = function(building) {
		// trace('--- TurnManager/updateBuilding, building = ', building);
		module.playerData.buildings[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(machine) {
		// trace('--- TurnManager/addMachineModel, machine = ', machine);
		module.playerData.buildings[PhaserGame.activeSector][PhaserGame.activeFactory.id].equipment[PhaserGame.activeMachine.config.id] = machine;
		module.playerData.machineCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels.push(machine);
	};

	module.addInventory = function(machine) {
		// trace('--- TurnManager/addMachineModel, machine = ', machine);
		module.currentData.newMachines.push(machine);
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
