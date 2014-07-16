var WholesaleManager = function() {
	var module = {};
	
	module.DISTRIBUTORS_PER_PART_MAX = 3;			// max number of distributors per part type
	module.DISTRIBUTORS_PER_TURN_MULTIPLIER = 5; 	// random number x level of max distributors available per turn
	module.WEEK_LAG_AMOUNT = 3;						// delay between each timer (week) tick before possible distributor add
	module.POSSIBILE_DISTRIBUTOR_CHANCE = 1;		// 1 - x chance of adding a distributor (dice > this number)
	module.PARTS_COST_MODIFIER_MAX = 5;				// maximum cost to reduce parts cost by (100/multipler)
	module.PARTS_COST_MODIFIER_MIN = 2;				// minium cost to reduce parts cost by (100/multiplier)
	module.PARTS_QUANTITY_MAX = 10;					// maximum base quantity of parts
	module.PARTS_QUANTITY_MIN = 1;					// mimimum base quantity of parts
	module.PARTS_QUANTITY_MULTIPLIER = 100;			// base part quantity multiplier
	
	function Distributor(config) {
		trace('Distributor/constructor, config = ', config);
		this.config = config;

		this.config.quantity = config.quantity || module.calculateQuantity();
		this.config.cost = config.cost || module.calculateCostModifier(this.config);
	}
	module.distributors = {};
	// module.parts = [{}, {}, {}, {}, {}];
	module.parts = {};
	
	module.init = function() {
		trace('WholesaleManager/init');
		module.distributorsAdded = 0;
		module.notificationActive = false;
		// establish 
		module.turnMax = (Math.floor(Math.random() * (module.DISTRIBUTORS_PER_TURN_MULTIPLIER - 1) + 1)) + TurnManager.playerData.level;
		module.weekLag = 0;

		PWG.Utils.each(
			PartTypes,
			function(type) {
				module.parts[type] = {};
				PWG.Utils.each(
					EquipmentSizes,
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
					module.parts[distributor.partType][distributor.partSize][distributor.id] = distributor;
				}
			},
			this
		);
	};
	
	module.update = function() {
		// there isn't a current notification pending
		if(!module.notificationActive) {
			trace('WholesaleManager/update\n');
			// haven't made max number of distributors for this turn
			// if(module.distributorsAdded < module.turnMax) { 
			if(module.distributorsAdded < 1) { 
				module.weekLag++;
				// waited long enough since last new distributor
				if(module.weekLag > module.WEEK_LAG_AMOUNT) {
					trace('\tadded = ' + module.distributorsAdded + ' / ' + module.turnMax + '\n\tweekLag = ' + module.weekLag + ' / ' + module.WEEK_LAG_AMOUNT);
					module.weekLag = 0;

					var diceRoll = PWG.Utils.diceRoll(); 
					trace('\tdiceRoll = ' + diceRoll + ', chance = ' + module.POSSIBILE_DISTRIBUTOR_CHANCE);
					// beat add probability test
					if(diceRoll >= module.POSSIBILE_DISTRIBUTOR_CHANCE) {

						var config = {};
						var parts = gameData.parts;
						var type = PWG.Utils.randomProperty(PartTypes);
						// var size = PWG.Utils.randomProperty(EquipmentSizes);
						trace('\ttype = ' + type);
						var size = PWG.Utils.randomKey(gameData.parts[type]);
						trace('\tsize = ' + size);
						var quality = (Math.floor(Math.random() * (gameData.parts[type][size].length - 1)));
						trace('\tquality = ' + quality);
						// don't already have max distributors for this part type
						if(PWG.Utils.objLength(module.parts[type][size]) < module.DISTRIBUTORS_PER_PART_MAX) {
							config.part = gameData.parts[type][size][quality];
							config.partType = type;
							config.partSize = size;
							config.partDescription = PartDescriptions[type];
							module.notificationActive = true;
							module.createDistributor(config);
						}
					}
				}
			}
		}
	};
	
	module.createDistributor = function(config) {
		trace('WholesaleManager/createDistributor, confg = ', config);
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
		module.notificationActive = false;
		module.distributorsAdded++;
		module.distributors[distributor.config.id] = distributor;
		trace('\tadding distributor to parts['+distributor.config.partType+']['+distributor.config.partSize+']['+distributor.config.id+']');
		module.parts[distributor.config.partType][distributor.config.partSize][distributor.config.id] = distributor.config;
		trace('\tparts now = ', module.parts);
		TurnManager.addDistributor(distributor.config);
	};
	
	module.getTotalPartTypeCount = function(type, size) {
		var partCount = 0;
		if(module.parts.hasOwnProperty(type)) {
			if(module.parts[type].hasOwnProperty(size)) {
				var distributors = module.parts[type][size];
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
		trace('WholesaleManager/usePart: ' + type + '.' + size + ', quantity = ' + module.parts[type][size][distributorId].quantity);
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
		trace('WholesaleManager/calculateCostModifier');
		var baseCost = config.part.cost;
		trace('baseCost = ' + baseCost);
		var rand = (Math.floor(Math.random() * (module.PARTS_COST_MODIFIER_MAX - module.PARTS_COST_MODIFIER_MIN) + module.PARTS_COST_MODIFIER_MIN));
		trace('\trand = ' + rand)
		var costModifier = rand / 100;
		trace('\tcostModifier = ' + costModifier);
		return (baseCost * costModifier) * config.quantity;
	};

	return module;
}();