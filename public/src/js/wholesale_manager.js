var WholesaleManager = function() {
	var module = {};
	
	module.DISTRIBUTORS_PER_PART_MAX = 3;			// max number of distributors per part type
	module.DISTRIBUTORS_PER_TURN_MULTIPLIER = 5; 	// random number x level of max distributors available per turn
	module.WEEK_LAG_AMOUNT = 3;						// delay between each timer (week) tick before possible distributor add
	module.POSSIBILE_DISTRIBUTOR_CHANCE = 3;		// 1 - x chance of adding a distributor (dice > this number)
	module.PARTS_COST_MODIFIER_MAX = 5;				// maximum cost to reduce parts cost by (100/multipler)
	module.PARTS_COST_MODIFIER_MIN = 2;				// minium cost to reduce parts cost by (100/multiplier)
	module.PARTS_QUANTITY_MAX = 10;					// maximum base quantity of parts
	module.PARTS_QUANTITY_MIN = 1;					// mimimum base quantity of parts
	module.PARTS_QUANTITY_MULTIPLIER = 100;			// base part quantity multiplier
	
	function Distributor(config) {
		trace('Distributor/constructor, config = ', config);
		this.config = config;

		this.config.quantity = config.quantity || module.calculateQuantity();
		this.config.unitCost = config.unitCost || module.calculateCostModifier(this.config);
	}
	module.distributors = {};
	// module.parts = [{}, {}, {}, {}, {}];
	module.parts = {};
	
	module.init = function() {
		trace('WholesaleManager/init');
		module.distributorsAdded = 0;
		// establish 
		module.turnMax = (Math.floor(Math.random() * (module.DISTRIBUTORS_PER_TURN_MULTIPLIER - 1) + 1)) + TurnManager.playerData.level;
		module.weekLag = 0;

		PWG.Utils.each(
			PartTypes,
			function(type) {
				module.parts[type] = {};
				PWG.Utils.each(
					PartSizes,
					function(size) {
						module.parts[type][size] = {};
					},
					this
				);
			},
			this
		);

		PWG.Utils.each(
			TurnManager.playerData.distributors,
			function(distributor) {
				trace('\t\tdistributors['+distributor.id+'] = ', distributor);
				module.distributors[distributor.id] = new Distributor(distributor);
				// only add this distributor to the available parts if it still has inventory
				if(distributor.quantity > 0) {
					module.parts[distributor.part.type][distributor.part.size][distributor.id] = distributor;
				}
			},
			this
		);
	};
	
	module.update = function() {
		// haven't made max number of distributors for this turn
		if(module.distributorsAdd < module.turnMax) { 
			module.weekLag++;
			// waited long enough since last new distributor
			if(module.weekLag > module.WEEK_LAG_AMOUNT) {
				trace('WholesaleManager/update\n\tadded = ' + module.distributorsAdd + ' / ' + module.turnMax + '\n\tweekLag = ' + module.weekLag + ' / ' + module.WEEK_LAG_AMOUNT);
				module.weekLag = 0;

				var diceRoll = PWG.Utils.diceRoll(); 
				trace('\tdiceRoll = ' + diceRoll + ', change = ' + module.POSSIBILE_DISTRIBUTOR_CHANCE);
				// beat add probability test
				if(diceRoll >= module.POSSIBILE_DISTRIBUTOR_CHANCE) {

					var config = {};
					var parts = gameData.parts;
					var type = PWG.Utils.randomProperty(PartTypes);
					var size = PWG.Utils.randomProperty(PartSizes);

					// don't already have max distributors for this part type
					if(PWG.Utils.objLength(module.parts[type][size]) < module.DISTRIBUTORS_PER_PART_MAX) {
						var quality = (Math.floor(Math.random() * (gameData.parts[type].length - 1)));

						config.part = gameData.parts[type][quality][size];
						config.partDescription = gameData.parts[type][quality].description;
						config.partType = type;
						config.partSize = size;

						module.createDistributor(config);
					}
				}
			}
		}
	};
	
	module.createDistributor = function(config) {
		trace('WholesaleManager/createDistributor');
		var type = BuildingTypes.DISTRIBUTOR;
		var count = TurnManager.tempDistributorCount;

		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		config.location = DistributorLocations[(Math.floor(Math.random() * DistributorLocations.length))];
		TurnManager.tempDistributorCount++;

		var distributor = new Distributor(config);
		PWG.EventCenter.trigger({ type: Events.ADD_DISTRIBUTOR_NOTIFICATION, distributor: distributor });
	};

	module.addDistributor = function(distributor) {
		trace('WhoelsaleManager/addDistributor');
		module.distributors[distributor.config.id] = distributor;
		module.parts[distributor.config.partType][distributor.config.partSize][distributor.config.id] = distributor.config;
		TurnManager.addDistributor(config);
	};
	
	module.getTotalPartTypeCount = function(type, size) {
		var partCount = 0;
		if(module.parts.hasOwnProperty(type)) {
			if(module.parts[type].hasOwnProperty(size)) {
				var distributors = module.parts[part][size];
				PWG.Utils.each(
					distributors,
					function(distributor) {
						partCount += distributor.quantity;
					},
					this
				);
			}
		}
		trace('WholesaleManager/hasPart: ' + type + '.' + size + ' = ' + partCount);
		return partCount;
	};
	
	module.usePart = function(type, size, distributorId) {
		trace('WholesaleManager/usePart: ' + type + '.' + size + ', quantity = ' + module.parts[type][size].quantity);
		var distributor = module.parts[type][size][distributorId];
		if(distributor.quantity > 0) {
			distributor.quantity--;
			TurnManager.wholesalePartUsed();

			if(distributor.quantity <= 0) {
				module.removeDistributorFromParts(distributor);
			}
		}
	};
	
	module.removeDistributorFromParts = function(distributor) {
		trace('WholesaleManager/removeDistributorFromParts');
		delete module.parts[distributor.partType][distributor.partSize][distributor.id];
		TurnManager.wholesaleInventoryEmptied(distributor);
	};
	
	module.calculateQuantity = function() {
		return (Math.floor(Math.random() * (module.PARTS_QUANTITY_MAX - module.PARTS_QUANTITY_MIN) + module.PARTS_QUANTITY_MIN) * module.PARTS_QUANTITY_MULTIPLIER);
	};
	
	module.calculateCostModifier = function(config) {
		var baseCost = gameData.parts[this.config.part.type][this.config.part.size].cost;
		var costMultiplier = 100/(Math.floor(Math.random() * (module.PARTS_COST_MODIFIER_MAX - module.PARTS_COST_MODIFIER_MIN) + module.PARTS_COST_MODIFIER_MIN));

		return (baseCost * costModifier) * this.config.quantity;
	};

	return module;
}();