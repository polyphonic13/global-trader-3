var TurnManager = function() {
	var turnData = {
		bankAdjustments: 0,
		factoriesBuilt: 0,
		newMachineModels: 0,
		newMachine: []
	};
	
	var module = {};

	module.turns;
	module.currentLevel = 0;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
	};
	
	module.startTurn = function() {
		module.currentData = PWG.Utils.clone(turnData);
		module.currentLevel++;
	};
	
	module.completeTurn = function() {
		PhaserGame.playerData = module.playerData;
		PhaserGame.setSavedData();
		module.currentData = {};
	};
	
	module.stopTurn = function() {
		// reset turn data, all info lost
		module.currentData = PWG.Utils.clone(turnData);
	};
	
	module.updateBank = function(event) {
		module.playerData.bank += event.value;
		module.currentData.bankAdjustments += event.value;
	};

	module.addBuilding = function(building) {
		module.playerData.buildings[building.sector][building.id] = building;
		module.currentData.newBuildings++;
	};
	
	module.updateBuilding = function(building) {
		module.playerData.buildings[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(machine) {
		module.playerData.buildings[PhaserGame.activeSector][PhaserGame.activeFactory.id].equipment[PhaserGame.activeMachine.config.id] = machine;
		module.playerData.machineCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels++;
	};

	module.addInventory = function(machine) {
		module.currentData.newMachines.push(machine);
	};
	
	module.get = function(prop) {
		if(module.playerData.hasOwnProperty(prop)) {
			return module.playerData[prop];
		} else if(module.levelsData.hasOwnProperty(prop)) {
			return module.levelsData[prop];
		} else {
			return;
		}
	};
	
	return module;
}();
