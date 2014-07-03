var BuildingManager = function() {
	var module = {};
	
	module.TIME_TO_BUILD = 5;
	module.FACTORY_MAX_MODELS = 6;
	module.FACTORY_MIN_SELL_INVENTORY = 3;
	module.FACTORY_MAX_INVENTORY = 100;
	module.RETAILER_MAX_INVENTORY = 50;
	module.RETAILER_TIME_TO_SELL = 5;
	
	// BUILDING BASE CLASS
	function Building(config) {
		// trace('Building/constructor, config = ', config);
		this.config = config;
		this.config.type = config.type;
		this.config.state = config.state || BuildingStates.CONSTRUCTION;
		this.config.age = config.age || 0;
	};
	
	Building.prototype.capacity = 0;
	Building.prototype.equipment = {};
	Building.prototype.inventory = [];
	Building.prototype.update = function() {
		// trace('Building/update');
		if(this.config.state === BuildingStates.CONSTRUCTION && this.config.age >= this.buildTime) {
			this.config.state = BuildingStates.ACTIVE;
			// trace('building construction completed');
			PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
		}
		this.config.age++;
		module.updateBuildingData.call(this, this.config);
	};
	Building.prototype.move = function(position) {
		this.location = position;
	};
	
	// FACTORY
	function Factory(config) {
		Building.call(this, config);
		this.config.equipment = config.equipment || {};
		this.config.inventory = config.inventory || [];
		this.config.showrooms = config.showrooms || [];
	}

	PWG.Utils.inherit(Factory, Building);
	
	Factory.prototype.buildTime = 3;
	Factory.prototype.modelCapacity = 6;
 	Factory.prototype.update = function() {
		Factory._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							trace('machine = ', machine);
							if(TurnManager.playerData.bank > machine.cost) {
								if(this.config.inventory.length < module.FACTORY_MAX_INVENTORY) {
									// trace('build machine: machine = ', machine);
									PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-machine.cost) });
									PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
									this.config.inventory.push(machine.id);

									TurnManager.addInventory(machine);
									TurnManager.updateBuilding(this.config);
									
									if(this.config.showrooms.length === 0 && this.config.inventory.length > module.FACTORY_MIN_SELL_INVENTORY) {
										if(!this.notifiedOfShowroomAdd) {
											// alert(this.config.id + ' needs a showroom to sell inventory');
											this.notifiedOfShowroomAdd = true;
										}
									}
								} else {
									// notify output capacity reached
									// alert(this.config.id + ' created max inventory');
								}
							} 
							else 
							{
								// notifiy out of bank
								// alert('not enough money to create inventory');
							}
						},
						this
					);
					this.buildTime = 0;
				} else {
					this.buildTime++;
				}
			} else {
				// notify equipment needed
				if(!this.notifiedOfEquipmentNeeded) {
					this.notifiedOfEquipmentNeeded = true;
					// alert(this.config.id + ' needs Tractor and Skid Steer models to manufacture');
				}
			}
		
		}
	};

	// SHOWROOM
	function Showroom(config) {
		Building.call(this, config);
		this.config.inventory = [];
	}
	PWG.Utils.inherit(Showroom, Building);

	Showroom.prototype.buildTime = 0;
	Showroom.prototype.capacity = 50;
	Showroom.prototype.update = function() {
		Showroom._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {

			}
		}
	};

	module.buildings = [ {}, {}, {}, {}, {} ];
	
	module.init = function() {
		trace('initializing building data with: ', TurnManager.playerData.buildings);
		PWG.Utils.each(
			TurnManager.playerData.buildings,
			function(sector, s) {
				// trace('\tsectors['+s+'] = ', sector)
				PWG.Utils.each(
					sector,
					function(building, id) {
						trace('\t\tbuildings['+id+'] = ', building);
						module.buildings[s][building.id] = new Factory(building);
					},
					this
				);
			},
			this
		);
		// trace('BuildingManager.buildings now = ', module.buildings);
	};
	
	module.create = function(type, config) {
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + TurnManager.playerData.bank);
		var count = TurnManager.playerData.buildingCount[type];
		trace('======== count = ' + count);
		config.type = type;
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var building = new Factory(config);
			// trace('\tbuilding made');
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.buildings[config.sector][building.config.id] = building;
			module.addNewBuilding(building.config);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
	};
	
	module.update = function() {
		PWG.Utils.each(
			module.buildings,
			function(sector) {
				PWG.Utils.each(
					sector,
					function(building) {
						building.update();
					},
					this
				)
			},
			module
		);
	};

	module.getBuilding = function(sector, cell) {
		var config = {};
		// trace('BuildingManager/getBuilding, sector = ' + sector + ', cell = ' + cell);
		
		PWG.Utils.each(
			module.buildings[sector],
			function(building) {
				if(building.config.cell === cell) {
					// trace('\tfound it: ', building);
					config = building.config;
				}
			},
			this
		);
		return config;
	};
	
	module.addMachineTypeToFactory = function(machineType, factoryIdx) {
		module.buildings.factories[factoryIdx].equipment[machineType.id] = machineType;
	};
	
	module.addInventoryToShowroom = function(factoryIdx, showroomIdx) {
		var equipment = module.buildings.factories[factoryIdx].equipment;
		var showroom = module.buildings.showrooms[showroomIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					showroom.inventory.push(machine);
				},
				this
			);
		} else {
			// notify factory has no equipment
		}
	};
	
	module.addNewBuilding = function(config) {
		// trace('save new building, config = ', config);
		TurnManager.addBuilding(config);
	};
	
	module.updateBuildingData = function(config) {
		// trace('BuildingManager/updateBuildingData, config = ', config);
		TurnManager.updateBuilding(config);
	};

	module.getFactoryModelCapacity = function() {
		return Factory.modelCapacity;
	};
	
	module.move = function(type, buildingIdx, position) {
		this.buildings[type][buildingIdx].move(position);
	};
	
	return module;
	
}();