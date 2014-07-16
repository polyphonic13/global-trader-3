var Machine = function() {
	
	var module = {};
	var defaults = {
		id: '',
		name: '',
		type: '',
		size: '',
		cost: 0,
		plantId: '',
		dealershipId: '',
		tradeRouteId: '',
		active: true,
		parts: {},
		wholesaleParts: {},
		optionalParts: {}
	};
	
	function Machine(config) {
		this.config = PWG.Utils.extend(PWG.Utils.clone(defaults), config);

		// trace('Machine/constructor, config = ', config, '\tthis.config = ', this.config);
		var requiredParts = gameData.machines[config.type][config.size].requiredParts;

		this.requiredParts = {};
		this.requiredPartsTotal = requiredParts.length;
		this.requiredPartsCount = 0;
		this.isComplete = false;

		PWG.Utils.each(
			requiredParts,
			function(part) {
				if(config.parts && config.parts[part.name]) {
					this.requiredParts[part.name] = true;
					this.requiredPartsCount++;
				} else {
					this.requiredParts[part.name] = false;
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
	
	Machine.prototype.isComplete = function() {
		var complete = false;
		if(this.requiredPartsCount >= this.requiredPartsTotal) {
			complete = true;
		}
		return complete;
	};
	
	Machine.prototype.setPart = function(part, val, wholesale) {
		trace('Machine/setPart, part = ' + part + ', val = ', val, ', wholesale = ' + wholesale);
		if(wholesale) {
			this.config.wholesaleParts[part] = val;
		} else {
			this.config.parts[part] = val;
		}

		if(!this.isComplete) {
			// trace('\trequiredParts = ', this.requiredParts);
			if(this.requiredParts.hasOwnProperty(part) && !this.requiredParts[part]) {
				this.requiredParts[part] = true;
				this.requiredPartsCount++;
				PWG.EventCenter.trigger({ type: Event.REQUIRED_PART_ADDED });
				trace('\trequiredPartsCount now: ' + this.requiredPartsCount + '/' + this.requiredPartsTotal);
			}

			if(this.requiredPartsCount >= this.requiredPartsTotal) {
				this.isComplete = true;
				PWG.EventCenter.trigger({ type: Events.MACHINE_PARTS_COMPLETE, value: this.config });
			}
		}
	};
	
	Machine.prototype.save = function() {
		this.calculateCostAndPoints();
	};
	
	Machine.prototype.calculateCostAndPoints = function() {
		trace('Machine['+this.config.id+']/calculateCost, this = ', this);
		PWG.Utils.each(
			this.config.parts,
			function(val, key) {
				trace('\tval = ' + val + ', key = ' + key);
				this.config.cost += gameData.parts[key][this.config.size][val].cost;
			},
			this
		);
		PWG.Utils.each(
			this.config.optionalParts,
			function(part, p) {
				this.config.cost += gameData.parts[part][this.config.size][val].cost;
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