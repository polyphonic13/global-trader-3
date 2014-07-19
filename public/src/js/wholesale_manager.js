var WholesaleManager = function() {
	var module = {};
	
	module.SUPPLIERS_PER_PART_MAX = 3;			// max number of suppliers per part type
	module.SUPPLIERS_PER_TURN_MULTIPLIER = 5; 	// random number x level of max suppliers available per turn
	module.WEEK_LAG_AMOUNT = 3;						// delay between each timer (week) tick before possible supplier add
	module.POSSIBILE_SUPPLIER_CHANCE = 4;		// 1 - x chance of adding a supplier (dice > this number)
	module.PARTS_COST_MODIFIER_MAX = 5;				// maximum cost to reduce parts cost by (100/multipler)
	module.PARTS_COST_MODIFIER_MIN = 2;				// minium cost to reduce parts cost by (100/multiplier)
	module.PARTS_QUANTITY_MAX = 10;					// maximum base quantity of parts
	module.PARTS_QUANTITY_MIN = 1;					// mimimum base quantity of parts
	module.PARTS_QUANTITY_MULTIPLIER = 100;			// base part quantity multiplier
	
	function Supplier(config) {
		// trace('Supplier/constructor, config = ', config);
		this.config = config;

		this.config.quantity = config.quantity || module.calculateQuantity();
		this.config.cost = config.cost || module.calculateCostModifier(this.config);
	}
	module.suppliers = {};
	// module.parts = [{}, {}, {}, {}, {}];
	module.parts = {};
	
	module.init = function() {
		// trace('WholesaleManager/init');
		module.suppliersAdded = 0;
		module.notificationActive = false;
		// establish 
		module.turnMax = (Math.floor(Math.random() * (module.SUPPLIERS_PER_TURN_MULTIPLIER - 1) + 1)) + TurnManager.playerData.level;
		// trace('\tturnMax = ' + module.turnMax);
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
			TurnManager.playerData.suppliers,
			function(supplier) {
				// trace('\t\tsuppliers['+supplier.id+'] = ', supplier);
				module.suppliers[supplier.id] = new Supplier(supplier);
				// only add this supplier to the available parts if it still has inventory
				// if(supplier.quantity > 0) {
					module.parts[supplier.partType][supplier.partSize][supplier.id] = supplier;
				// }
			},
			this
		);
	};
	
	module.update = function() {
		// there isn't a current notification pending
		if(!module.notificationActive) {
			// trace('WholesaleManager/update\n');
			// haven't made max number of suppliers for this turn
			if(module.suppliersAdded < module.turnMax) { 
				module.weekLag++;
				// waited long enough since last new supplier
				if(module.weekLag > module.WEEK_LAG_AMOUNT) {
					// trace('\tadded = ' + module.suppliersAdded + ' / ' + module.turnMax + '\n\tweekLag = ' + module.weekLag + ' / ' + module.WEEK_LAG_AMOUNT);
					module.weekLag = 0;

					var diceRoll = PWG.Utils.diceRoll(); 
					// trace('\tdiceRoll = ' + diceRoll + ', chance = ' + module.POSSIBILE_SUPPLIER_CHANCE);
					// beat add probability test
					if(diceRoll >= module.POSSIBILE_SUPPLIER_CHANCE) {

						var config = {};
						var parts = gameData.parts;
						var type = PWG.Utils.randomProperty(PartTypes);
						// var size = PWG.Utils.randomProperty(EquipmentSizes);
						// trace('\ttype = ' + type);
						var size = PWG.Utils.randomKey(gameData.parts[type]);
						// trace('\tsize = ' + size);
						var quality = (Math.floor(Math.random() * (gameData.parts[type][size].length - 1)));
						// trace('\tquality = ' + quality);
						// don't already have max suppliers for this part type
						if(PWG.Utils.objLength(module.parts[type][size]) < module.SUPPLIERS_PER_PART_MAX) {
							config.part = gameData.parts[type][size][quality];
							config.partType = type;
							config.partSize = size;
							config.partDescription = PartDescriptions[type];
							module.notificationActive = true;
							module.createSupplier(config);
						}
					}
				}
			}
		}
	};
	
	module.createSupplier = function(config) {
		// trace('WholesaleManager/createSupplier, confg = ', config);
		var type = BuildingTypes.SUPPLIER;
		var count = TurnManager.tempSupplierCount;

		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		config.location = SupplierLocations[(Math.floor(Math.random() * SupplierLocations.length))];
		TurnManager.tempSupplierCount++;

		var supplier = new Supplier(config);
		PWG.EventCenter.trigger({ type: Events.ADD_SUPPLIER_NOTIFICATION, supplier: supplier });
	};

	module.addSupplier = function(supplier) {
		// trace('WhoelsaleManager/addSupplier');
		module.notificationActive = false;
		module.suppliersAdded++;
		module.suppliers[supplier.config.id] = supplier;
		// trace('\tadding supplier to parts['+supplier.config.partType+']['+supplier.config.partSize+']['+supplier.config.id+']');
		module.parts[supplier.config.partType][supplier.config.partSize][supplier.config.id] = supplier.config;
		// trace('\tparts now = ', module.parts);
		TurnManager.addSupplier(supplier.config);
	};
	
	module.getTotalPartTypeCount = function(type, size) {
		var partCount = 0;
		if(module.parts.hasOwnProperty(type)) {
			if(module.parts[type].hasOwnProperty(size)) {
				var suppliers = module.parts[type][size];
				PWG.Utils.each(
					suppliers,
					function(supplier) {
						partCount += supplier.quantity;
					},
					this
				);
			}
		}
		// trace('WholesaleManager/hasPart: ' + type + '.' + size + ' = ' + partCount);
		return partCount;
	};
	
	module.usePart = function(type, size, supplierId) {
		// trace('WholesaleManager/usePart: ' + type + '.' + size + ', supplierId = ' + supplierId);
		var supplier = module.parts[type][size][supplierId];
		if(supplier) {
			if(supplier.quantity > 0) {
				supplier.quantity--;
				TurnManager.wholesalePartUsed();
				return true;
				// if(supplier.quantity <= 0) {
					// module.removeSupplierFromParts(supplier);
				// }
			} else {
				return false;
			}
		} else {
			return false;
		}
	};
	
	module.removeSupplierFromParts = function(supplier) {
		// trace('WholesaleManager/removeSupplierFromParts');
		delete module.parts[supplier.partType][supplier.partSize][supplier.id];
		TurnManager.wholesaleInventoryEmptied(supplier);
	};
	
	module.calculateQuantity = function() {
		return (Math.floor(Math.random() * (module.PARTS_QUANTITY_MAX - module.PARTS_QUANTITY_MIN) + module.PARTS_QUANTITY_MIN) * module.PARTS_QUANTITY_MULTIPLIER);
	};
	
	module.calculateCostModifier = function(config) {
		// trace('WholesaleManager/calculateCostModifier, config = ', config);
		var baseCost = config.part.cost;
		// trace('baseCost = ' + baseCost);
		var rand = (Math.floor(Math.random() * (module.PARTS_COST_MODIFIER_MAX - module.PARTS_COST_MODIFIER_MIN) + module.PARTS_COST_MODIFIER_MIN));
		// trace('\trand = ' + rand)
		var costModifier = rand / 100;
		// trace('\tcostModifier = ' + costModifier);
		return (baseCost * costModifier) * config.quantity;
	};

	return module;
}();