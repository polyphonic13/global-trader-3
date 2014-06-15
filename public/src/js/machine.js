var Machine = function() {
	
	var module = {};
	var defaults = {
		id: '',
		name: '',
		type: '',
		size: '',
		cost: 0,
		sell: 0,
		factoryId: -1,
		parts: {}
	};
	
	function Machine(config) {
		this.config = PWG.Utils.extend(PWG.Utils.clone(defaults), config);
		trace('Machine/constructor, config = ', config, '\tthis.config = ', this.config);
	}

	Machine.prototype.set = function(prop, val) {
		this.config[prop] = val;
	};
	
	Machine.prototype.get = function(prop) {
		if(!this.config.hasOwnProperty(prop)) {
			return;
		}
		return this.config[prop];
	};
	
	Machine.prototype.setPart = function(part, val) {
		this.config.parts[part] = val;
	};
	
	Machine.prototype.save = function() {
		this.calculateCostAndPoints();
	};
	
	Machine.prototype.calculateCostAndPoints = function() {
		// trace('Machine['+this.config.id+']/calculateCost, this = ', this);
		PWG.Utils.each(
			this.config.parts,
			function(val, key) {
				// trace('\tval = ' + val + ', key = ' + key);
				this.config.cost += gameData.parts[key][val][this.config.size].cost;
				this.config.sell += gameData.parts[key][val][this.config.size].sell;
			},
			this
		);
		// trace('post calculate cost, cost = ' + this.config.cost);
	};
	
	Machine.prototype.reset = function(part) {
		this.config.parts[part] = -1;
	};
	
	return Machine;
}();