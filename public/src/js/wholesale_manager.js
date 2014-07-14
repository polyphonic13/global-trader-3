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
	
	return module;
}();