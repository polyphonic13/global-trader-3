var TIME_TO_BUILD = 5;

var BuildingManager = function() {
	var module = {};
	
	var states = {
		CONSTRUCTION: 'construction',
		ACTIVE: 'active',
		INACTIVE: 'inactive'
	};

	// BUILDING BASE CLASS
	function Building(config) {
		// trace('Building/constructor, config = ', config);
		this.config = config;
		this.config.type = config.type;
		this.config.state = config.state || states.CONSTRUCTION;
		this.config.age = config.age || 0;
	};
	
	Building.prototype.capacity = 0;
	Building.prototype.equipment = {};
	Building.prototype.inventory = [];
	Building.prototype.update = function() {
		// trace('Building/update');
		if(this.config.state === states.CONSTRUCTION && this.config.age >= this.buildTime) {
			this.config.state = states.ACTIVE;
			// trace('building construction completed');
			PWG.EventCenter.trigger({ type: PWG.Events.BUILDING_STATE_UPDATED, config: this.config });
		}
		this.config.age++;
		module.saveBuildingData.call(this, this.config);
	};
	Building.prototype.move = function(position) {
		this.location = position;
	};
	
	// FACTORY
	function Factory(config) {
		
		Building.call(this, config);
		this.config.equipment = config.equipment || {};
		this.config.inventory = config.inventory || [];
	}
	PWG.Utils.inherit(Factory, Building);
	
	Factory.prototype.buildTime = 3;
	Factory.prototype.typeCapacity = 10;
	Factory.prototype.outputCapacity = 100;
 	Factory.prototype.update = function() {
		Factory._super.update.apply(this, arguments);
		if(this.config.state === states.ACTIVE) {
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				this.buildTime++;
				
				if(this.buildTime === TIME_TO_BUILD) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							trace('machine = ', machine);
							if(PhaserGame.playerData.bank > machine.cost) {
								if(this.config.inventory.length < this.outputCapacity) {
									// trace('build machine: machine = ', machine);
									PWG.EventCenter.trigger({ type: PWG.Events.UPDATE_BANK, value: (-machine.cost) });
									this.config.inventory.push(machine.id);
								} else {
									// notify output capacity reached
								}
							} 
							else 
							{
								// notifiy out of bank
							}
						},
						this
					);
					this.buildTime = 0;
				}
			}
			else
			{
				// notify equipment needed
			}
		
		}
	};

	// SHOWROOM
	function Showroom(config) {
		Building.call(this, config);
		this.config.inventory = [];
	}
	PWG.Utils.inherit(Showroom, Building);

	Showroom.prototype.buildTime = 2;
	Showroom.prototype.capacity = 50;
	Showroom.prototype.update = function() {
		Showroom._super.update.apply(this, arguments);
		if(this.config.state === states.ACTIVE) {
			if(this.config.inventory.length > 0) {

			}
		}
	};
	
	module.buildings = [ {}, {}, {}, {}, {} ];
	
	module.init = function() {
		// trace('initializing building data with: ', PhaserGame.playerData.buildings);
		PWG.Utils.each(
			PhaserGame.playerData.buildings,
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
		// trace('BuildingManager/create, type = ' + type + ', cost = ' + gameData.buildings[type].cost + ', bank = ' + PhaserGame.playerData.bank);
		var count = PhaserGame.playerData.buildingCount[type];
		config.type = type;
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(PhaserGame.playerData.bank >= gameData.buildings[type].cost) {
			var building = new Factory(config);
			// trace('\tbuilding made');
			PhaserGame.playerData.buildingCount[type]++;
			// trace('\tremoving bank from bank');
			PWG.EventCenter.trigger({ type: PWG.Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// trace('\tabout to save building data, building  = ', building);
			module.buildings[config.sector][building.config.id] = building;
			module.saveNewBuilding(building.config);
			return true;
		} else {
			// trace('no more money');
			return false;
		}
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
	
	module.saveNewBuilding = function(config) {
		// trace('save new building, config = ', config);
		PhaserGame.playerData.buildings[config.sector][config.id] = config;
		PhaserGame.setSavedData();
	};
	
	module.saveBuildingData = function(config) {
		// trace('BuildingManager/saveBuildingData, config = ', config);
		PhaserGame.playerData.buildings[config.sector][config.id] = config;
		PhaserGame.setSavedData();
	};
	
	module.move = function(type, buildingIdx, position) {
		this.buildings[type][buildingIdx].move(position);
	};
	
	return module;
	
}();