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
		var requiredParts = gameData.machines[config.type][config.size].requiredParts;

		this.requiredParts = {};
		this.requiredPartsTotal = requiredParts.length;
		this.requiredPartsCount = 0;
		this.isComplete = false;
		
		PWG.Utils.each(
			requiredParts,
			function(part) {
				if(config.parts && config.parts[part]) {
					this.requiredParts[part] = true;
					this.requiredPartsCount++;
				} else {
					this.requiredParts[part] = false;
				}
			},
			this
		);
		
		if(this.requiredPartsCount >= this.requiredPartsTotal) {
			this.isComplete = true;
		}
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
		trace('Machine/setPart, part = ' + part + ', val = ', val);
		this.config.parts[part] = val;
		if(!this.isComplete) {
			trace('\trequiredParts = ', this.requiredParts);
			if(this.requiredParts.hasOwnProperty(part) && !this.requiredParts[part]) {
				this.requiredParts[part] = true;
				this.requiredPartsCount++;
				trace('\trequiredParts now: ', this.requiredParts);
				if(this.requiredPartsCount >= this.requiredPartsTotal) {
					this.isComplete = true;
					PWG.EventCenter.trigger({ type: Events.MACHINE_PARTS_COMPLETE, value: this.config });
				}
			}
		}
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