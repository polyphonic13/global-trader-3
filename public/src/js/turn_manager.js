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
		newMachines: []
	};
	
	var module = {};

	module.turns;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		// trace('--- TurnManager/init');
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
	};
	
	module.startTurn = function() {
		trace('--- TurnManager/startTurn');
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
		// trace('--- TurnManager/updateBuilding, building = ', building);
		module.playerData.sectors[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(machine) {
		trace('--- TurnManager/addMachineModel, machine = ', machine);
		// module.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[PhaserGame.activeMachine.config.id] = machine;
		BuildingManager.addMachineModelToFactory(PhaserGame.activeSector, PhaserGame.activeBuilding.id, machine)
		module.playerData.machineCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels.push(machine);
		if(machine.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractorModels++;
		} else if(machine.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteerModels++;
		}
	};

	module.addInventory = function(machine) {
		// trace('--- TurnManager/addInventory, machine = ', machine);
		module.currentData.newMachines.push(machine);
		if(machine.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractors++;
		} else if(machine.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteers++;
		}
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
