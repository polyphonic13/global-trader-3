var WholesaleManager = function() {
	var module = {};
	
	function Distributor(config) {
		this.config = config;
		this.config.inventory = config.inventory || {};
		this.config.parts = config.parts || [];
	}

	Distributor.prototype.getInventory = function(type) {
		var inventory;
		if(this.config.inventory.hasOwnProperty) {
			inventory = this.config.inventroy[type];
		}
		return inventory;
	};
	
	module.sectors = [{}, {}, {}, {}, {}];

	module.init = function() {
		PWG.Utils.each(
			TurnManager.playerData.distributors,
			function(sector, s) {
				// trace('\tsectors['+s+'] = ', sector)
				PWG.Utils.each(
					sector,
					function(distributor, id) {
						// trace('\t\tdistributors['+id+'] = ', distributor);
						module.sectors[s][distributor.id] = new Distributor(distributor);
					},
					this
				);
			},
			this
		);
	};
	
	module.update = function() {

	};
	
	module.addDistributor = function(config) {
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + TurnManager.playerData.bank);
		var type = BuildingTypes.DISTRIBUTOR;
		var count = PWG.Utils.objLength(TurnManager.playerData.distributors[config.sector]);
		// trace('\tcount = ' + count);
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);

		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var plant = new Plant(config);
			// trace('\tbuilding made');
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.updateSectors(plant);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
	}
	
	module.updateSectors = function(distributor) {
		module.sectors[distributor.config.sector][distributor.config.id] = distributor;
		module.addDistrubutorToTurnManager(distributor.config);
	};
	
	module.addDistrubutorToTurnManager = function(config) {
		// trace('save new building, config = ', config);
		TurnManager.addDistributor(config);
	};
	
	return module;
}();