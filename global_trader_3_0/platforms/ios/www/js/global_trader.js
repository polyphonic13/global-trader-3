(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- Global Trader 3.0 created: 2014-07-30T20:59:15')})();
var Events = {
	CHANGE_SCREEN: 'changeScreen',
	CHANGE_STATE: 'changeState',
	SHOW_GROUP: 'showGroup',
	HIDE_GROUP: 'hideGroup',
	SWITCH_GROUP: 'switchGroup',
	START_TURN: 'startTurn',
	GAME_TIME_UPDATED: 'gameTimeUpdated',
	TURN_COMPLETED: 'turnCompleted',
	PAUSE_GAME: 'pauseGame',
	RESUME_GAME: 'resumeGame',
	INCREMENT_LEVEL: 'incrementLevel',
	UPDATE_BANK: 'updateBank',
	BANK_UPDATED: 'bankUpdated',
	BONUSES_UPDATED: 'bonusesUpdated',
	OPEN_NOTIFICATION: 'openNotification',
	CLOSE_NOTIFICATION: 'closeNotification',

	WORLD_ZOOMED_IN: 'worldZoomedIn',
	WORLD_ZOOMED_OUT: 'worldZoomedOut',

	OPEN_BUILDINGS_MENU: 'openBuildingsMenu',
	CLOSE_BUILDINGS_MENU: 'closeBuildingsMenu',
	ADD_BUILDING: 'addBuilding',
	BUILDING_AGE_UPDATED: 'buildingAgeUpdated',
	BUILDING_STATE_UPDATED: 'buildingStateUpdated',

	ADD_DEALER_OPPORTUNITY: 'addDealerOpportunity',
	ADD_DEALER: 'addDealer',

	ADD_SUPPLIER_OPPORTUNITY: 'addSupplierOpportunity',
	ADD_SUPPLIER: 'addSupplier',

	ADD_TRADE_ROUTE_OPPORTUNITY: 'addTradeRouteOpportunity',
	ADD_TRADE_ROUTE: 'addTradeRoute',

	INVENTORY_ADDED: 'inventoryAdded',
	MACHINE_SOLD: 'machineSold',
	SHOW_BUILD_GROUP: 'showBuildGroup',
	NEXT_MACHINE_PIECE_ICON: 'nextMachinePieceIcon',
	PREV_MACHINE_PIECE_ICON: 'prevMachinePieceIcon',
	MACHINE_TYPE_SELECTION: 'machineTypeSelection',
	MACHINE_SIZE_SELECTION: 'machineSizeSelection',
	REQUIRED_PART_ADDED: 'requirePartAdded',
	MACHINE_PARTS_COMPLETE: 'machinePartsComplete',
	OPEN_OPTIONAL_PARTS_MENU: 'openOptionalPartsMenu',
	OPEN_PARTS_MENU: 'openPartsMenu',
	CLOSE_PARTS_MENU: 'closePartsMenu',
	OPEN_WHOLESALE_PARTS_MENU: 'openWholesalePartsMenu',
	CLOSE_WHOLESALE_PARTS_MENU: 'closeWholesalePartsMenu',
	ADD_PART: 'addPart',
	ADD_WHOLESALE_PART: 'addWholesalePart',
	ADD_OPTIONAL_PART: 'addOptionalPart',
	SAVE_MACHINE: 'saveMachine',
	EDIT_MACHINE: 'editMachine',
	
	ADD_SUPPLIER_PROMPT: 'addSupplierPrompt',
};

var TutorialTypes = {
	INIT: 'init',
	WORLD: 'world',
	US_DETAIL: 'usDetail',
	PLANT: 'plant',
	PLANT_DETAILS: 'plantDetails',
	EQUIPMENT_LIST: 'equipmentList',
	EQUIPMENT_CREATE: 'equipmentCreate',
	EQUIPMENT_EDIT: 'equipmentEdit',
	DEALER: 'dealer',
	SUPPLIER: 'supplier',
	TRADE_ROUTE: 'tradeRoute',
	ALL_COMPLETED: 'allCompleted'
};
var BuildingTypes = {
	PLANT: 'plant',
	DEALER: 'dealer',
	SUPPLIER: 'supplier',
	TRADE_ROUTE: 'tradeRoute'
};

var BuildingStates = {
	CONSTRUCTION: 'construction',
	ACTIVE: 'active',
	PAUSED: 'paused',
	INACTIVE: 'inactive'
};

var BuildingNames = {
	plant: 'Plant',
	dealer: 'Dealer',
	tradeRoute: 'Trade Route'
};

var TileCellFrames = {
	EMPTY: 0,
	PLANT_CONSTRUCTION: 1,
	PLANT_ACTIVE: 2,
	PLANT_PAUSED: 1,
	DEALER_CONSTRUCTION: 3,
	DEALER_ACTIVE: 4,
	DEALER_PAUSED: 3
};

var EquipmentActions = {
	CREATE: 'create',
	EDIT: 'edit',
	DELETE: 'delete'
};

var EquipmentTypes = {
	TRACTOR: 'tractor',
	SKIDSTEER: 'skidsteer'
};

var EquipmentSizes = {
	BASIC: 'basic',
	MEDIUM: 'medium',
	HEAVY: 'heavy'
};

var PartTypes = {
	TIRES: 'tires',
	ENGINE: 'engine',
	TRANSMISSION: 'transmission',
	HEADLIGHTS: 'headlights',
	BUCKET: 'bucket',
	TRACKS: 'tracks',
	THREE_POINT_HITCH: 'threePointHitch',
	POWER_TAKE_OFF: 'powerTakeoff',
	QUICK_COUPLER: 'quickCoupler'
};

var OptionalPartTypes = {	
	CAB_HEATER: 'cabHeater',
	AUTO_PILOT: 'autoPilot',
	STAINLESS_EXHAUST: 'stainlessExhaust',
	GPS: 'gps',
	DECAL: 'decal'
};

var PartDescriptions = {
	tires: 'Tires',
	tracks: 'Tracks',
	engine: 'Engine',
	transmission: 'Transmission',
	cab: 'Cab',
	headlights: 'Headlights',
	bucket: 'Bucket Attachment',
	track: 'Track',
	threePointHitch: 'Three Point Hitch',
	quickCoupler: 'Quick Coupler',
	powerTakeoff: 'Power Takeoff',
	heater: 'Heater and A/C',
	flameDecal: 'Flame Decal',
	autoPilot: 'Auto Pilot',
	gps: 'GPS',
	stainlessExhaust: 'Stainless Steel Exhaust'
	
};

var SupplierLocations = [
	'Goodfield, IL',
	'Fargo, ND',
	'Grand Island, NE',
	'Wichita, KS',
	'Benson, MN',
	'Calhoun, GA',
	'New Holland, PA',
	'Racine, WI',
	'Burlington, IL'
];

var TradeRouteLocations = [
	'africa',
	'asia',
	'europe',
	'middleEast',
	// 'northPacific',
	'southPacific',
	'southAmerica'
];

var TradeRouteNames = {
	africa: 'African',
	asia: 'Asian',
	europe: 'European',
	middleEast: 'Middle Eastern',
	// northPacific: 'North Pacific',
	southPacific: 'South Pacific',
	southAmerica: 'South American',
	global: 'Trade Route'
};

var USSectors = {
	NORTH_EAST: 0,
	SOUTH_EAST: 1,
	MID_WEST: 2,
	NORTH_WEST: 3,
	SOUTH_WEST: 4
};

var SectorGrids = [
	'sectorGridNE',
	'sectorGridSE',
	'sectorGridMW',
	'sectorGridNW',
	'sectorGridSW'
];

var IconAnimations = {
	DOLLAR_SIGN: 'dollarSign',
	PLUS_SIGN: 'plusSign'
};


var Animations = {
	ignitionKey: {
		idle: {
			frameRate: 10,
			looped: false,
			keyFrames: [0]
		},
		turnOn: {
			frameRate: 10,
			looped: false,
			keyFrames: [0, 0, 0, 1, 1, 1, 2, 2, 2]
		}
	},
	dollarIcon: {
		idle: {
			frameRate: 10,
			looped: false,
			keyFrames: [5]
		},
		expand: {
			frameRate: 15,
			loops: false,
			keyFrames: [0, 0, 0, 1, 1, 2, 3, 4, 5]
		}
	},
	plusIcon: {
		idle: {
			frameRate: 10,
			looped: false,
			keyFrames: [5]
		},
		expand: {
			frameRate: 15,
			loops: false,
			keyFrames: [0, 0, 0, 1, 1, 2, 3, 4, 5]
		}
	}
};

var gameData = {
	buildings: {
		plant: {
			id: BuildingTypes.PLANT,
			img: 'iconPlant',
			description: 'Build your machines',
			cost: 500000
		},
		dealer: {
			id: BuildingTypes.DEALER,
			img: 'iconDealer',
			description: 'Sell your machines',
			cost: 500000
		}
	},
	machines: {
		tractor: {
			basic: {
				requiredParts: [
				{
					name: 'tires',
					sprite: true
				},
				{
					name: 'engine',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				}
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				],
				spriteTranslations: {
					tires: 'tires',
					engine: 'engine',
					transmission: 'transmission'
				}
			},
			medium: {
				requiredParts: [
				{
					name: 'tires',
					sprite: true
				},
				{
					name: 'engine',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				},
				{
					name: 'headlights',
					sprite: false
				}
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				],
				spriteTranslations: {
					tires: 'tires',
					engine: 'engine',
					transmission: 'transmission',
					headlights: 'engine'
				}
			},
			heavy: {
				requiredParts: [
				{
					name: 'tracks',
					sprite: true
				},
				{
					name: 'engine',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				},
				{
					name: 'headlights',
					sprite: false
				},
				{
					name: 'threePointHitch',
					sprite: false
				}
				],
				optionalParts: [
					'autoPilot',
					'gps',
					'heater'
				],
				spriteTranslations: {
					tracks: 'tracks',
					engine: 'engine',
					threePointHitch: 'transmission',
					transmission: 'transmission',
					headlights: 'engine'
				}
			}
		},
		skidsteer: {
			basic: {
				requiredParts: [
				{
					name: 'tires',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				},
				{
					name: 'engine',
					sprite: false
				},
				{
					name: 'bucket',
					sprite: true
				}
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				],
				spriteTranslations: {
					tires: 'tires',
					engine: 'transmission',
					transmission: 'transmission',
					bucket: 'bucket'
				}
			},
			medium: {
				requiredParts: [
				{
					name: 'tires',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				},
				{
					name: 'engine',
					sprite: false
				},
				{
					name: 'bucket',
					sprite: true
				},
				{
					name: 'quickCoupler',
					sprite: false
				}
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				],
				spriteTranslations: {
					tires: 'tires',
					engine: 'transmission',
					transmission: 'transmission',
					quickCoupler: 'transmission',
					bucket: 'bucket'
				}
			},
			heavy: {
				requiredParts: [
				{
					name: 'tracks',
					sprite: true
				},
				{
					name: 'engine',
					sprite: true
				},
				{
					name: 'transmission',
					sprite: true
				},
				{
					name: 'bucket',
					sprite: true
				},
				{
					name: 'powerTakeoff',
					sprite: false
				},
				{
					name: 'quickCoupler',
					sprite: false
				}
				],
				optionalParts: [
					'autoPilot',
					'gps',
					'heater'
				],
				spriteTranslations: {
					tracks: 'tracks',
					engine: 'engine',
					transmission: 'transmission',
					quickCoupler: 'transmission',
					powerTakeoff: 'bucket',
					bucket: 'bucket'
				}
			}
		}
	},
	partNames: {
		tires: 'Tires',
		tracks: 'Tracks',
		engine: 'Engine',
		transmission: 'Transmission',
		bucket: 'Bucket',
		headlights: 'Headlights',
		quickCoupler: 'Quick Coupler',
		threePointHitch: 'Three Point Hitch',
		powerTakeoff: 'Power Takeoff'
	},
	parts: {
		tires: {
			basic: [
			{
				description: 'Standard',
				img: 'tiresBasicStandard',
				cost: 350,
				build: 50,
				sell: 1000
			},
			{
				description: 'Premium',
				img: 'tiresBasicPremium',
				cost: 1000,
				build: 250,
				sell: 5000
			},
			{
				description: 'Deluxe',
				img: 'tiresBasicDeluxe',
				cost: 1350,
				build: 250,
				sell: 5000
			}
			],
			medium: [
			{
				description: 'Standard',
				img: 'tiresMediumStandard',
				cost: 700,
				build: 200,
				sell: 1400
			},
			{
				description: 'Premium',
				img: 'tiresMediumPremium',
				cost: 1000,
				build: 200,
				sell: 4000
			},
			{
				description: 'Deluxe',
				img: 'tiresMediumDeluxe',
				cost: 2000,
				build: 500,
				sell: 10000
			}
			]
		},
		tracks: {
			heavy: [
			{
				description: 'Standard',
				img: 'tracksHeavyStandard',
				cost: 1000,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'tracksHeavyPremium',
				cost: 1500,
				build: 250,
				sell: 5000
			},
			{
				description: 'Deluxe',
				img: 'tracksHeavyDeluxe',
				cost: 4000,
				build: 1000,
				sell: 20000
			}
			]
		},
		engine: {
			basic: [
			{
				description: 'Standard',
				img: 'engineBasicStandard',
				cost: 2000,
				build: 500,
				sell: 10000
			},
			{
				description: 'Premium',
				img: 'engineBasicPremium',
				cost: 3000,
				build: 750,
				sell: 15000
			},
			{
				description: 'Deluxe',
				img: 'engineBasicDeluxe',
				cost: 5000,
				build: 500,
				sell: 10000
			}
			],
			medium: [
			{
				description: 'Standard',
				img: 'engineMediumStandard',
				cost: 4000,
				build: 1000,
				sell: 20000
			},
			{
				description: 'Premium',
				img: 'engineMediumPremium',
				cost: 6000,
				build: 1500,
				sell: 30000
			},
			{
				description: 'Deluxe',
				img: 'engineMediumDeluxe',
				cost: 10000,
				build: 1000,
				sell: 20000
			}
			],
			heavy: [
			{
				description: 'Standard',
				img: 'engineHeavyStandard',
				cost: 6000,
				build: 1500,
				sell: 30000
			},
			{
				description: 'Premium',
				img: 'engineHeavyPremium',
				cost: 9000,
				build: 2000,
				sell: 40000
			},
			{
				description: 'Deluxe',
				img: 'engineHeavyDeluxe',
				cost: 15000,
				build: 1500,
				sell: 30000
			}
			]
		},
		transmission: {
			basic: [
			{
				description: 'Standard',
				img: 'transmissionBasicStandard',
				cost: 300,
				build: 50,
				sell: 1000
			},
			{
				description: 'Premium',
				img: 'transmissionBasicPremium',
				cost: 400,
				build: 75,
				sell: 1500
			},
			{
				description: 'Deluxe',
				img: 'transmissionBasicDeluxe',
				cost: 1000,
				build: 250,
				sell: 500
			}
			],
			medium: [
			{
				description: 'Standard',
				img: 'transmissionMediumStandard',
				cost: 600,
				build: 100,
				sell: 2000
			},
			{
				description: 'Premium',
				img: 'transmissionMediumPremium',
				cost: 800,
				build: 150,
				sell: 3000
			},
			{
				description: 'Deluxe',
				img: 'transmissionMediumDeluxe',
				cost: 2000,
				build: 500,
				sell: 1000
			}
			],
			heavy: [
			{
				description: 'Standard',
				img: 'transmissionHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'transmissionHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'transmissionHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		},
		bucket: {
			basic: [
			{
				description: 'Standard',
				img: 'bucketBasicStandard',
				cost: 300,
				build: 50,
				sell: 1000
			},
			{
				description: 'Premium',
				img: 'bucketBasicPremium',
				cost: 400,
				build: 75,
				sell: 1500
			},
			{
				description: 'Deluxe',
				img: 'bucketBasicDeluxe',
				cost: 1000,
				build: 250,
				sell: 500
			}
			],
			medium: [
			{
				description: 'Standard',
				img: 'bucketBasicStandard',
				cost: 600,
				build: 100,
				sell: 2000
			},
			{
				description: 'Premium',
				img: 'bucketMediumPremium',
				cost: 800,
				build: 150,
				sell: 3000
			},
			{
				description: 'Deluxe',
				img: 'bucketMediumDeluxe',
				cost: 2000,
				build: 500,
				sell: 1000
			}
			],
			heavy: [
			{
				description: 'Standard',
				img: 'bucketHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'bucketHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'bucketHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		},
		headlights: {
			medium: [
			{
				description: 'Standard',
				img: 'headlightsMediumStandard',
				cost: 600,
				build: 100,
				sell: 2000
			},
			{
				description: 'Premium',
				img: 'headlightsMediumPremium',
				cost: 800,
				build: 150,
				sell: 3000
			},
			{
				description: 'Deluxe',
				img: 'headlightsMediumDeluxe',
				cost: 2000,
				build: 500,
				sell: 1000
			}
			],
			heavy: [
			{
				description: 'Standard',
				img: 'headlightsHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'headlightsHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'headlightsHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		},
		threePointHitch: {
			heavy: [
			{
				description: 'Standard',
				img: 'threePointHitchHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'threePointHitchHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'threePointHitchHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		},
		quickCoupler: {
			medium: [
			{
				description: 'Standard',
				img: 'quickCouplerMediumStandard',
				cost: 500,
				build: 150,
				sell: 1500
			},
			{
				description: 'Premium',
				img: 'quickCouplerMediumPremium',
				cost: 750,
				build: 150,
				sell: 1500
			},
			{
				description: 'Deluxe',
				img: 'quickCouplerMediumDeluxe',
				cost: 1000,
				build: 150,
				sell: 1500
			}
			],
			heavy: [
			{
				description: 'Standard',
				img: 'quickCouplerHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'quickCouplerHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'quickCouplerHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		},
		powerTakeoff: {
			heavy: [
			{
				description: 'Standard',
				img: 'powerTakeoffHeavyStandard',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'powerTakeoffHeavyPremium',
				cost: 1200,
				build: 225,
				sell: 4500
			},
			{
				description: 'Deluxe',
				img: 'powerTakeoffHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
			]
		}
	},
	optionalParts: {
		heater: [
		{
			id: 'c1',
			frame: 1,
			description: 'standard heater',
			img: 'heaterStandard',
			cost: 900,
			build: 150,
			sell: 3000
		},
		{
			id: 'c2',
			frame: 2,
			description: 'premium heater',
			img: 'heaterPremium',
			cost: 1200,
			build: 225,
			sell: 4500
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe heater',
			img: 'heaterDeluxe',
			cost: 3000,
			build: 1000,
			sell: 2000
		}
		],
		flameDecal: [
		{
			id: 'c1',
			frame: 1,
			description: 'flame decal',
			img: 'flameDecal',
			cost: 30,
			build: 50,
			sell: 1000
		}
		],
		gps: [
		{
			id: 'c1',
			frame: 1,
			description: 'GPS',
			img: 'gps',
			cost: 50,
			build: 50,
			sell: 1000
		}
		],
		stainlessExhaust: [
		{
			id: 'c1',
			frame: 1,
			description: 'stainless exhaust',
			img: 'stainlessExhause',
			cost: 100,
			build: 50,
			sell: 1000
		}
		],
		autoPilot: [
		{
			id: 'c1',
			frame: 1,
			description: 'auto pilot',
			img: 'autoPilot',
			cost: 300,
			build: 50,
			sell: 1000
		}
		]
	},
	levels: [
	// level 1
	{
		startingBank: 999999,
		brief: {
			background: 'briefBg01',
			text: [
				'Build 1 Plant',
				'Create 1 Machine Model',
				'Manufacture 5 Machines'
			]
		},
		goals: [
		{
			type: 'newPlants',
			value: 1,
			calculation: 'number'
		},
		{
			type: 'newMachineModels',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 2
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg03',
			text: [
				'Make $100,000 in profits',
				'Sell 10 machines',
				'Manufacture 15 machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 100000,
			calculation: 'money'
		},
		{
			type: 'machinesSold',
			value: 10,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 15,
			calculation: 'length'
		}
		]
	},
	// level 3
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg03',
			text: [
				'Make $250,000 in profits',
				'Sell 30 machines',
				'Establish 1 Parts Supplier'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 250000,
			calculation: 'money'
		},
		{
			type: 'machinesSold',
			value: 30,
			calculation: 'length'
		},
		{
			type: 'newSuppliers',
			value: 1,
			calculation: 'length'
		}
		]
	},
	// level 4
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Establish 3 Dealers',
				'Create 5 Machine Models',
				'Produce 100 Machines'
			]
		},
		goals: [
		{
			type: 'newDealers',
			value: 3,
			calculation: 'number'
		},
		{
			type: 'newMachineModels',
			value: 5,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 100,
			calculation: 'length'
		}
		]
	},
	// level 5
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Create 1 Trade Route'
			]
		},
		goals: [
		{
			type: 'newTradeRoutes',
			value: 1,
			calculation: 'number'
		}
		]
	},
	// level 6
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Make $1,000,000 in profits',
				'Build 5 Plants',
				'Establish 5 Parts Suppliers',
				'Produce 100 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 1000000,
			calculation: 'money'
		},
		{
			type: 'newPlants',
			value: 5,
			calculation: 'number'
		},
		{
			type: 'newSuppliers',
			value: 5,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 100,
			calculation: 'length'
		}
		]
	},
	// level 7
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Build 2 Plants',
				'Create 5 Machine Models',
				'Produce 200 Machines'
			]
		},
		goals: [
		{
			type: 'newPlants',
			value: 2,
			calculation: 'number'
		},
		{
			type: 'newMachineModels',
			value: 5,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 200,
			calculation: 'length'
		}
		]
	},
	// level 8
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Make $5,000,000 in profits',
				'Establish 3 Trade Routes'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 5000000,
			calculation: 'money'
		},
		{
			type: 'newTradeRoutes',
			value: 3,
			calculation: 'number'
		}
		]
	},
	// level 9
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Build 10 Plants',
				'Create 10 Machine Models',
				'Produce 100 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 1000000,
			calculation: 'money'
		},
		{
			type: 'newPlants',
			value: 10,
			calculation: 'number'
		},
		{
			type: 'newMachineModels',
			value: 10,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 100,
			calculation: 'length'
		}
		]
	},
	// level 10
	{
		startingBank: 100000,
		brief: {
			background: 'briefBg04',
			text: [
				'Establish 5 Trade Routes',
				'Make $10,000,000 in profits'
			]
		},
		goals: [
		{
			type: 'newTradeRoutes',
			value: 5,
			calculation: 'number'
		},
		{
			type: 'profit',
			value: 10000000,
			calculation: 'money'
		}
		]
	}
	],
	bonuses: {
		buildings: {
			plant: 5000,
			dealer: 1000,
			tradeRoute: 10000
		},
		suppliers: {
			added: 5000,
			partsPurchased: 1000,
			allPartsUsed: 10000
		},
		manufacturing: {
			machine50: 50,
			machine100: 100,
			machine500: 500,
			machine1000: 1000,
			machine5000: 5000,
			machine10000: 10000,
			machine50000: 50000
		},
		jobs: {
			plant: 500,
			dealer: 100,
			tradeRoute: 1000
		}
	}
};


var playerData = {
	firstPlay: {
		init: true,
		world: true,
		usDetail: true,
		plant: true,
		plantDetails: true,
		equipmentList: true,
		equipmentCreate: true,
		equipmentEdit: true,
		dealer: true,
		supplier: true,
		tradeRoute: true,
		outOfWholesaleParts: true
	},
	firstRoutes: {
		africa: false, 
		asia: false,
		europe: false
	},
	level: 0,
	allCompleted: false,
	bank: 0,
	profit: 0,
	bonusPoints: 0,
	bonusesAchieved: {
		machine50: false,
		machine100: false,
		machine500: false,
		machine1000: false,
		machine5000: false,
		machine10000: false,
		machine50000: false
	},
	sectors: [
		// ne
		{},
		// se
		{},
		// mw
		{},
		// nw
		{},
		// sw
		{}
	],
	buildingCount: {
		plant: 0,
		dealer: 0,
		tradeRoute: 0,
		total: 0
	},
	modelCount: {
		tractor: 0,
		skidsteer: 0,
		total: 0
	},
	machinesBuilt: {
		tractor: 0,
		skidsteer: 0,
		total: 0
	},
	suppliers: {}
};

var Machine = function() {
	
	var module = {};
	var defaults = {
		id: '',
		name: '',
		type: '',
		size: '',
		cost: 0,
		plantId: '',
		dealerId: '',
		tradeRouteId: '',
		active: true,
		parts: {},
		wholesaleParts: {},
		optionalParts: {}
	};
	
	function Machine(config) {
		this.config = PWG.Utils.extend(PWG.Utils.clone(defaults), config);

		// 
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
		
		if(wholesale) {
			this.config.wholesaleParts[part] = val;
		} else {
			this.config.parts[part] = val;
		}

		if(!this.isComplete) {
			// 
			if(this.requiredParts.hasOwnProperty(part) && !this.requiredParts[part]) {
				this.requiredParts[part] = true;
				this.requiredPartsCount++;
				PWG.EventCenter.trigger({ type: Events.REQUIRED_PART_ADDED });
				
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
		
		PWG.Utils.each(
			this.config.parts,
			function(val, key) {
				
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
		// 
	};
	
	Machine.prototype.reset = function(part) {
		this.config.parts[part] = -1;
	};
	
	return Machine;
}();

var ASPECT_RATIO = [9, 16];
var OFFSET_X = 0;
var OFFSET_Y = 15;
var GAME_NAME = 'global_trader_3_0';
var FACEBOOK_URL = 'https://www.facebook.com/cnhitrade';
var TIME_PER_TURN = 52;
var TURN_TIME_INTERVAL = 3000;
var US_DETAIL_GRID_CELLS = 6;
var MACHINE_LIST_COLUMNS = 2; 
var MACHINE_LIST_ICONS = 6;
var MIN_WHOLESALE_LEVEL = 2;
var MIN_TRADE_ROUTE_LEVEL = 4;
var NUM_PART_QUALITIES = 3;

function startGame() {
	PhaserGame.init(ASPECT_RATIO, document.documentElement.clientHeight, OFFSET_X, OFFSET_Y);
}

var gameLogic = {
	global: {
		// global event listeners/handlers
		listeners: 
		[
		// change state
		{
			event: Events.CHANGE_SCREEN,
			handler: function(event) {
				PWG.ViewManager.switchGroup(event.value);
				PWG.ScreenManager.changeScreen(event.value);

				if(PhaserGame.config.turnScreens.indexOf(event.value) > -1) {
					// 
					if(!PhaserGame.turnActive) {
						PhaserGame.startTurn();
					}
				} else {
					if(PhaserGame.turnActive) {
						// 
						PhaserGame.stopTurn();
					}
				}
			}
		},
		// add notification
		{
			event: Events.OPEN_NOTIFICATION,
			handler: function(event) 
			{
				// 
				var notification = this.views['notification'];
				var notificationView = notification.children['notification-text'].view;

				if(notificationView.text !== event.value) {
					notificationView.setText(event.value);
				}
				notification.show();
			}
		},
		// remove notification
		{
			event: Events.CLOSE_NOTIFICATION,
			handler: function(event) 
			{
				this.views['notification'].hide();
			}
		},
		// game time updated
		{
			event: Events.GAME_TIME_UPDATED,
			handler: function(event) {
				PhaserGame.turnTime = event.value;
				var text = (event.value >= 10) ? event.value : '0' + event.value;
				// 
				PWG.ViewManager.callMethod('global:turnGroup:timerText', 'setText', [text], this);
			}
		},
		// update bank
		{
			event: Events.UPDATE_BANK,
			handler: function(event) {
				TurnManager.updateBank(event.value);
			}
		},
		// bank updated
		{
			event: Events.BANK_UPDATED,
			handler: function(event) {
				var text = PWG.Utils.formatMoney(TurnManager.get('bank'), 0);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);
			}
		},
		// bonuses updated
		{
			event: Events.BONUSES_UPDATED,
			handler: function(event) {
				// 
				PWG.ViewManager.callMethod('global:turnGroup:bonusText', 'setText', [TurnManager.get('bonusPoints')], this);
			}
		},
		// turn completed
		{
			event: Events.TURN_COMPLETED,
			handler: function(event) {
				PhaserGame.stopTurn();
				
				PWG.ViewManager.callMethod('global:turnGroup:timerText', 'setText', [''], this);

				PhaserGame.buildYearEndReport();
			}
		},
		// building state updated
		{
			event: Events.BUILDING_STATE_UPDATED,
			handler: function(event) {
				var config = event.building.config;
				// 
				if(TurnManager.playerData.firstPlay[TutorialTypes.PLANT]) {
					PhaserGame.activeTutorial = TutorialTypes.PLANT;
					PhaserGame.addTutorialGuy();
				}
				GridManager.updateBuildingState(config.sector, config.cell, config.type, config.state);
			}
		},
		// add dealer notification
		{
			event: Events.ADD_DEALER_OPPORTUNITY,
			handler: function(event) {
				// 
				PhaserGame.createDealerOpportunity(event);
			}
		},
		// add supplier notification
		{
			event: Events.ADD_SUPPLIER_OPPORTUNITY,
			handler: function(event) {
				PhaserGame.createSupplierOpportunity(event);
			}
		},
		// add trade route notification
		{
			event: Events.ADD_TRADE_ROUTE_OPPORTUNITY,
			handler: function(event) {
				// 
				PhaserGame.createTradeRouteOpportunity(event);
			}
		},
		// machine sold
		{
			event: Events.MACHINE_SOLD,
			handler: function(event) {
				// if(event.building.type === BuildingTypes.DEALER) {
					// PhaserGame.machineSold(event.building, 'usDetail:usDetailGrid');
					PhaserGame.machineSold(event.building);
				// }
			}
		}
		],
		// global methods attached to PhaserGame
		methods: {
			// INITIAIZATION
			init: function() {
				PhaserGame.getSavedData();
				TurnManager.init();
			},
			preload: function() {
				PWG.PhaserLoader.load(PhaserGame.config.assets);
				// HACK: temporarily adding sound directly; need to implement via pwg.
				var tractorStartup = PhaserGame.config.assets.audio.tractorStartup;
				
				PhaserGame.phaser.load.audio('tractorStartup', tractorStartup);
				// PWG.ScreenManager.preload();
			},
			create: function() {
				PWG.ViewManager.hideView('global:notificationIcon');
				PWG.ViewManager.hideView('global:supplierAvailableIcon');
				PWG.ViewManager.hideView('global:tradeRouteAlertIcon');
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: PhaserGame.config.defaultScreen });
			},
			render: function() {
				PWG.ScreenManager.render();
			},
			getSavedData: function() {
				var savedData = PWG.Storage.get(GAME_NAME);
				if(!savedData) {
					// 
					savedData = playerData;
				}
				PhaserGame.playerData = savedData;
				// 
			},
			setSavedData: function() {
				var params = {};
				params[GAME_NAME] = PhaserGame.playerData;
				PWG.Storage.set(params);
			},
			ignitionAnimationCompleted: function() {
				// 
				var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
				ignitionKey.view.events.onAnimationComplete.remove(PhaserGame.ignitionAnimationCompleted, this);
				// if(PhaserGame.isFirstPlay) {
				// 	PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
				// 	PhaserGame.isFirstPlay = false;
				// } else {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
				// }
			},
			// GLOBAL / NOTIFICATIONS
			addTutorialGuy: function() {
				// 
				if(!PhaserGame.tutorialOpen) {
					PhaserGame.tutorialOpen = true;
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var tutorialGuy = PWG.Utils.clone(PhaserGame.config.dynamicViews.tutorialGuy);
					var notificationText = PhaserGame.config.notificationText;
					// 

					tutorialGuy.views.bg.img = PhaserGame.config.notificationPeopleImages['tutorial'];
					tutorialGuy.views.content.text = notificationText.tutorial[PhaserGame.activeTutorial].content;
					PWG.ViewManager.addView(tutorialGuy, notifications, true);
				}
			},
			removeTutorialGuy: function() {
				// 
				PWG.ViewManager.removeView('tutorialGuy', 'global:notifications');
				TurnManager.playerData.firstPlay[PhaserGame.activeTutorial] = false;
				PhaserGame.tutorialOpen = false;
				PhaserGame.activeTutorial = false;
			},
			// TUTORIAL / MANUAL
			addManualPage: function(idx) {
				// 
				if(PhaserGame.currentManualPage !== '') {
					PWG.ViewManager.removeView(PhaserGame.currentManualPage, 'manual:manualPages');
				}
				var manualPages = PWG.ViewManager.getControllerFromPath('manual:manualPages');
				var manualPage = PWG.Utils.clone(PhaserGame.config.dynamicViews.manualPage);
				var manualPageNumber = PWG.Utils.clone(PhaserGame.config.dynamicViews.manualPageNumber);
				var manualPageText = PhaserGame.config.dynamicViews.manualPageText;
				var manualPageImage = PhaserGame.config.dynamicViews.manualPageImage;
				var pageConfig = PhaserGame.config.tutorial.pages[idx];
				// 
				manualPage.name += idx;
				manualPage.views.title.text = PhaserGame.config.tutorial.title;
				// manualPage.views.subtitle.text = PhaserGame.config.tutorial.subtitle;
				
				manualPageNumber.text = (idx + 1) + '/' + PhaserGame.config.tutorial.pages.length;
				manualPage.views[manualPageNumber.name] = manualPageNumber;
				
				var pageText = PWG.Utils.clone(manualPageText);

				PWG.Utils.each(
					pageConfig.blurbs,
					function(blurb, idx) {
						// 
						var pageText = PWG.Utils.clone(manualPageText);
						pageText.name += idx;
						pageText.text = blurb.text;
						pageText.x = blurb.x;
						pageText.y = blurb.y;

						manualPage.views[pageText.name] = pageText;
					},
					this
				);

				PWG.Utils.each(
					pageConfig.images,
					function(image, idx) {
						var pageImage = PWG.Utils.clone(manualPageImage);
						pageImage.name += idx;
						pageImage.img = image.img;
						pageImage.x += image.x;
						pageImage.y += image.y;
						pageImage.attrs.width = image.width;
						pageImage.attrs.height = image.height;
				
						manualPage.views[pageImage.name] = pageImage;
					},
					this
				);

				if(idx > 0) {
					manualPage.views['backPage'].attrs.visible = true;
				}
				PhaserGame.currentManualPage = manualPage.name;
				// 
				PWG.ViewManager.addView(manualPage, manualPages, true);
			},
			nextManualPage: function() {
				
				if(PhaserGame.manualPage < PhaserGame.config.tutorial.pages.length -1) {
					PhaserGame.manualPage++;
				} else {
					PhaserGame.manualPage = 0;
				}
				PhaserGame.addManualPage(PhaserGame.manualPage);
			},
			prevManualPage: function() {
				// 
				if(PhaserGame.manualPage > 0) {
					PhaserGame.manualPage--;
					PhaserGame.addManualPage(PhaserGame.manualPage);
				}
			},
			// TURN
			startTurn: function() {
				// 
				TurnManager.startTurn();
				BuildingManager.init();
				WholesaleManager.init();
				PhaserGame.dealerNotifications = [[], [], [], [], []];
				PhaserGame.bonusNotifications = [];
				PhaserGame.supplierNotifications = [];
				PhaserGame.tradeRouteNotifications = {};
				PhaserGame.availableTradeRoutes = {};
				PhaserGame.zoomedIn = false;
				PhaserGame.userPromptActive = false
				
				GridManager.init(USSectors, US_DETAIL_GRID_CELLS, US_DETAIL_GRID_CELLS, PWG.Stage.gameW/6);

				PhaserGame.turnActive = true;
				PhaserGame.timePerTurn = TIME_PER_TURN;
				PhaserGame.turnTimer = new PWG.PhaserTime.Controller('turnTime');
				PhaserGame.turnTimer.loop(TURN_TIME_INTERVAL, function() {
						// 
						PhaserGame.incrementTurnTime();
					},
					this
				);
				PhaserGame.turnTimer.start();
				var text = PWG.Utils.formatMoney(TurnManager.get('bank'), 0);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);
				PWG.ViewManager.callMethod('global:turnGroup:bonusText', 'setText', [TurnManager.get('bonusPoints')], this);
				PWG.ViewManager.setFrame('global:turnGroup:turnIndicator', TurnManager.playerData.level);
				
				if(TurnManager.playerData.level === 2 && TurnManager.playerData.firstPlay[TutorialTypes.SUPPLIER]) {
					PhaserGame.activeTutorial = TutorialTypes.SUPPLIER;
					PhaserGame.addTutorialGuy();
				}
				if(TurnManager.playerData.level === 4 && TurnManager.playerData.firstPlay[TutorialTypes.TRADE_ROUTE]) {
					PhaserGame.activeTutorial = TutorialTypes.TRADE_ROUTE;
					PhaserGame.addTutorialGuy();
				}
			},
			incrementTurnTime: function() {
				PhaserGame.timePerTurn--;
				if(PhaserGame.timePerTurn <= 0) {
					PWG.EventCenter.trigger({ type: Events.TURN_COMPLETED });
				} else {
					BuildingManager.update();

					if(TurnManager.playerData.level >= MIN_WHOLESALE_LEVEL) {
						WholesaleManager.update();
					}
					PWG.EventCenter.trigger({ type: Events.GAME_TIME_UPDATED, value: PhaserGame.timePerTurn });
				}
			},
			showEndTurnPrompt: function() {
				var endTurnPrompt = PhaserGame.config.dynamicViews.endTurnPrompt;
				var world = PWG.ViewManager.getControllerFromPath('world');
				PWG.ViewManager.addView(endTurnPrompt, world, true);

				PhaserGame.confirmAction = {
					method: function() {
						PWG.EventCenter.trigger({ type: Events.TURN_COMPLETED });
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });

						PWG.ViewManager.removeView('endTurnPrompt', 'world');
					},
					params: null
				};
				PhaserGame.cancelAction = {
					method: function() {
						PhaserGame.userPromptActive = false;
						PWG.ViewManager.showView('global:backButton');
						PWG.ViewManager.hideView('global:confirmButton');
						PWG.ViewManager.hideView('global:cancelButton');

						PWG.ViewManager.removeView('endTurnPrompt', 'world');
					},
					params: null
				};
				
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.showView('global:confirmButton');
				PWG.ViewManager.showView('global:cancelButton');
				
			},
			stopTurn: function() {
				PWG.PhaserTime.removeTimer('turnTime');
				PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
				PWG.EventCenter.trigger({ type: Events.CLOSE_WHOLESALE_PARTS_MENU });
				PWG.EventCenter.trigger({ type: Events.CLOSE_OPTIONAL_PARTS_MENU });
				
				PhaserGame.hideSupplierAvailableIcon();
				PhaserGame.removeDealerPrompt();
				PhaserGame.hideDealerAvailableIcon();
				PhaserGame.removeTradeRoutePrompt();
				PhaserGame.hideTradeRouteAvailableIcon();
				PhaserGame.dealerNotifications = null;
				PhaserGame.supplierNotifications = null;
				PhaserGame.availableTradeRoutes = null;
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
				
				AnimationManager.reset();
				
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');

				PhaserGame.turnActive = false;
			},
			// WORLD
			formatBuildingPin: function(type, idx, count) {
				var buildingPin = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingPin);
				var pinLocations = PhaserGame.config.pinPositions.usSectors[idx];
				var pinOffsets = PhaserGame.config.pinOffsets;
				var pinFills = PhaserGame.config.pinFills[type];

				buildingPin.name = 'sector'+idx+type;
				buildingPin.views.pin.img = PhaserGame.config.pinImages[type];
				buildingPin.views.pin.x += pinLocations.x + pinOffsets[type].x;
				buildingPin.views.pin.y += pinLocations.y + pinOffsets[type].y;
				buildingPin.views.locationCount.x += pinLocations.x + pinOffsets[type].x;
				buildingPin.views.locationCount.y += pinLocations.y + pinOffsets[type].y;
				buildingPin.views.locationCount.text = 'x' + count;
				buildingPin.views.locationCount.style.fill = pinFills[idx];
				return buildingPin;
			},
			initWorldZoom: function(worldMap, buildingPins) {
				PhaserGame.worldZoom = {
					max: {
						width: worldMap.width,
						height: worldMap.height,
						x: worldMap.position.x,
						y: worldMap.position.y
					},
					min: {
						width: PWG.Stage.gameW,
						height: PWG.Stage.gameH,
						x: 0,
						y: 0
					},
					zoomIncrements: {
						width: (worldMap.width - PWG.Stage.gameW) * 0.25,
						height: (worldMap.height - PWG.Stage.gameH) * 0.25
					},
					positionIncrements: {
						x: (-worldMap.x) * 0.25,
						y: (-worldMap.y) * 0.25
					}
				};
				/*
					1 = scale 1.5/1.5, position = 50/220
					2 = scale 0.33/0.33, position = 40/170
					3 = scale 0.5/0.5, position = 20/130
					4 = scale 0.75/0.75 position = 10/65
					5 = scale 0.95/0.95 position = 0/10
					
				*/
				PhaserGame.pinZoom = {
					scaleIncrements: {
						x: [],
						y: []
					},
					zoomIncrements: {
						width: (buildingPins.width - PWG.Stage.gameW) * 0.25,
						height: (buildingPins.height - PWG.Stage.gameH) * 0.25
					},
					positionIncrements: {
						x: (-buildingPins.x) * 0.25,
						y: (-buildingPins.y) * 0.25
					}
				};
				// 
				PhaserGame.worldZoomInitialized = true;
			},
			worldZoomOutFull: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// 
					PhaserGame.removeTradeRouteViews();

					var max = PhaserGame.worldZoom.max;
					PhaserGame.worldView.width = max.width;
					PhaserGame.worldView.height = max.height;
					PhaserGame.worldView.x = max.x;
					PhaserGame.worldView.y = max.y;
					PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_OUT });
					PhaserGame.zoomedIn = false;
					PhaserGame.zoomedInTriggered = false;
				}
			},
			worldZoomOut: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// 
					if(PhaserGame.zoomedIn) {
						// 
						PhaserGame.removeTradeRouteViews();

						var max = PhaserGame.worldZoom.max;
						PhaserGame.worldView.x = max.x;
						PhaserGame.worldView.y = max.y;
						PhaserGame.worldView.width = max.width;
						PhaserGame.worldView.height = max.height;
						
						PWG.ViewManager.showView('world:usMap');
						PWG.ViewManager.showView('world:buildingPins');
						PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_OUT });

// removed tween due to reports of game freezing:
/*
						var tween = PhaserGame.phaser.add.tween(PhaserGame.worldView);
						tween.onComplete.add(function() {
							// 
								PWG.ViewManager.showView('world:usMap');
								PWG.ViewManager.showView('world:buildingPins');
								PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_OUT });
  						});
						tween.to({
								x: max.x,
								y: max.y,
								width: max.width,
								height: max.height
							}, 
							500, 
							Phaser.Easing.Sinusoidal.InOut, 
							true, 
							Math.random() * 500
						);
						tween.start();
*/
						PhaserGame.zoomedIn = false;
						PhaserGame.zoomedInTriggered = false;
					}
				}
			},
			worldZoomIn: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// 
					if(!PhaserGame.zoomedIn) {
						PhaserGame.zoomedIn = true;
						PWG.ViewManager.hideView('world:usMap');
						PWG.ViewManager.hideView('world:buildingPins');

						var min = PhaserGame.worldZoom.min;
						PhaserGame.worldView.x = min.x;
						PhaserGame.worldView.y = min.y;
						PhaserGame.worldView.width = min.width;
						PhaserGame.worldView.height = min.height;

// removed tween due to reports of game freezing:
/*
						var tween = PhaserGame.phaser.add.tween(PhaserGame.worldView);
						tween.onComplete.add(function() {
							// 
							if(!PhaserGame.zoomedInTriggered) {
								PhaserGame.zoomedInTriggered = true;
								PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_IN });
							}
						});
						tween.to({
								x: min.x,
								y: min.y,
								width: min.width,
								height: min.height
							}, 
							500, 
							Phaser.Easing.Sinusoidal.InOut, 
							true, 
							Math.random() * 500
						);
						tween.start();
*/
						PhaserGame.addTradeRouteViews();

					}
				}
			},
			addTradeRouteViews: function() {
				var world = PWG.ViewManager.getControllerFromPath('world');
				var tradeRouteArrows = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRouteArrows);
				var tradeRouteArrow = PhaserGame.config.dynamicViews.tradeRouteArrow;
				var tradeRouteArrowConfig = PhaserGame.config.tradeRouteArrowConfig;

				var tradeRoutePins = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRoutePins);
				var tradeRoutePin = PhaserGame.config.dynamicViews.tradeRoutePin;
				var tradeRoutePinConfig = PhaserGame.config.tradeRoutePinConfig;

				var tradeRouteAlertIcons = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRouteAlertIcons);
				var tradeRouteAvailableIcon = PhaserGame.config.dynamicViews.tradeRouteAvailableIcon;
				var tradeRouteAlertIconConfig = PhaserGame.config.tradeRouteAlertIconConfig;
				
				var availableTradeRoutes = PhaserGame.availableTradeRoutes;
				var existingTradeRoutes = BuildingManager.getExistingTradeRoutes();
				// 
				var arrowsAdded = {
					africa: false,
					asia: false,
					europe: false,
					middleEast: false,
					northPacific: false,
					southPacific: false,
					southAmerica: false
				};
				
				PWG.Utils.each(
					existingTradeRoutes,
					// tradeRouteArrowConfig,
					function(tradeRoute, tr) {
						// 
						var area = TradeRouteLocations[tradeRoute.worldLocation];
						
						var arrow = PWG.Utils.clone(tradeRouteArrow);
						arrow.name += tr;
						
						if(!arrowsAdded[area]) {
							PWG.Utils.each(
								// tradeRoute,
								tradeRouteArrowConfig[area],
								function(arrowProp, ap) {
									// 
									arrow[ap] = arrowProp;
								},
								this
							);
							// 
							tradeRouteArrows.views[arrow.name] = arrow;
							arrowsAdded[area] = true;
						}
										
						var pin = PWG.Utils.clone(tradeRoutePin);
						pin.name += tr;
						pin.views.pin.x += tradeRoutePinConfig[area].x;
						pin.views.pin.y += tradeRoutePinConfig[area].y;
						pin.views.locationCount.text += TurnManager.tempTradeRouteCount[area];
						pin.views.locationCount.x += tradeRoutePinConfig[area].x;
						pin.views.locationCount.y += tradeRoutePinConfig[area].y;
						
						// PWG.Utils.each(
						// 	tradeRoutePinConfig[area],
						// 	function(pinProp, pp) {
						// 		pin[pp] = pinProp
						// 	},
						// 	this
						// );
						
						tradeRoutePins.views[pin.name] = pin;
					},
					this
				);

				// 
				PWG.Utils.each(
					availableTradeRoutes,
					function(tradeRoute, tr) {
						// 
						var area = TradeRouteLocations[tradeRoute.config.worldLocation];
				
						if(!arrowsAdded[area]) {
							// 
							var arrow = PWG.Utils.clone(tradeRouteArrow);
							var config = tradeRouteArrowConfig[area];
							arrow.name += tr;
				
							PWG.Utils.each(
								config,
								function(prop, p) {
									arrow[p] = prop;
								},
								this
							);
							tradeRouteArrows.views[arrow.name] = arrow;
						}
				
						var icon = PWG.Utils.clone(tradeRouteAvailableIcon);
						icon.name = tr;
						icon.tradeRouteId = tr;
						
						PWG.Utils.each(
							tradeRouteAlertIconConfig[area],
							function(iconProp, ip) {
								icon[ip] = iconProp;
							},
							this
						);
				
						tradeRouteAlertIcons.views[icon.name] = icon;
					},
					this
				);

				// 
				PWG.ViewManager.addView(tradeRouteArrows, world, true);
				PWG.ViewManager.addView(tradeRoutePins, world, true);
				PWG.ViewManager.addView(tradeRouteAlertIcons, world, true);
			},
			removeTradeRouteViews: function() {
				// 
				PWG.ViewManager.removeView('tradeRouteArrows', 'world');
				PWG.ViewManager.removeView('tradeRoutePins', 'world');
				PWG.ViewManager.removeView('tradeRouteAlertIcons', 'world');
			},
			// US DETAIL
			tileClicked: function(tile) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				if(PhaserGame.turnActive && !PhaserGame.userPromptActive) {
					var view = PWG.ViewManager.getControllerFromPath('usDetail:usDetailGrid:'+tile.name);
					// 
					var frame = tile.attrs.frame;
					PhaserGame.activeTile = tile;
					switch(frame) {
						case TileCellFrames.EMPTY:
							// 
							PWG.EventCenter.trigger({ type: Events.OPEN_BUILDINGS_MENU });
						break;

						case TileCellFrames.ACTIVE:
						tile.attrs.frame = 0;
						PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, TileCellFrames.EMPTY);
						PhaserGame.activeTile = null;
						break; 

						case TileCellFrames.PLANT_CONSTRUCTION:
						//  
						break;

						case TileCellFrames.PLANT_ACTIVE:
						//  
						// show plant detail
						PhaserGame.activeBuilding = BuildingManager.getBuilding(PhaserGame.activeSector, PhaserGame.activeTile.cell);
						// 
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
						break;

						case TileCellFrames.DEALER_CONSTRUCTION: 
						//  
						break;
						
						case TileCellFrames.DEALER_ACTIVE: 
						//  
						PhaserGame.activeBuilding = BuildingManager.getBuilding(PhaserGame.activeSector, PhaserGame.activeTile.cell);
						// 
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
						break;

						default:
						break;
					}
				}
			},
			addBuildingCreatePrompt: function() {
				// PhaserGame.addBuildingItemsOverlay.call(this, event.value, this.views);
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				var global = PWG.ViewManager.getControllerFromPath('global');
				var buildingCreatePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingCreatePrompt);
				var notificationText = PhaserGame.config.notificationText;
				// 
				// 

				if(TurnManager.playerData.bank > gameData.buildings.plant.cost) {
					buildingCreatePrompt.views.title.text = notificationText.buildingCreate.content.toUpperCase();
					PhaserGame.confirmAction = {
						method: function() {
							PWG.EventCenter.trigger({ type: Events.ADD_BUILDING });
						},
						params: {}
					};
					PWG.ViewManager.showView('global:confirmButton');
					buildingCreatePrompt.views.cost.text = '$' + PWG.Utils.formatMoney(gameData.buildings.plant.cost, 0);
				} else {
					buildingCreatePrompt.views.title.text = notificationText.notEnoughMoney.content.toUpperCase();
					PhaserGame.notEnoughMoneyPromptActive = true;
				}

				PhaserGame.cancelAction = {
					method: function() {
						PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
					},
					params: {}
				};
				PWG.ViewManager.showView('global:cancelButton');
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.addView(buildingCreatePrompt, global, true);
			},
			addBuilding: function(buildingType) {
				PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });

				var tile = PhaserGame.activeTile;
				var added = BuildingManager.createPlant({ sector: PhaserGame.activeSector, cell: tile.cell });
				if(added) {
					var frame;
					if(buildingType === BuildingTypes.PLANT) {
						frame = TileCellFrames.PLANT_CONSTRUCTION;
					} else {
						frame = TileCellFrames.DEALER_ACTIVE;
					}
					tile.attrs.frame = frame;
					PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, frame);
				}
			},
			// DEALERS
			createDealerOpportunity: function(event) {
				if(PhaserGame.turnActive) {
					var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
					var dealerPrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.dealerPrompt);

					var notificationText = PhaserGame.config.notificationText['dealer'];

					var modelName = event.plant.equipment[event.dealer.config.modelId].name;
					var resell = PWG.Utils.formatMoney(event.dealer.config.resell, 0);
					// 
					var statementText = PWG.Utils.parseMarkup(notificationText.content, {
						plant: event.plant.name,
						quantity: event.dealer.config.maxPerYear,
						model: modelName,
						resell: resell
					});

					notification.views.person.img = PhaserGame.config.notificationPeopleImages['dealer'];
					// notification.views.title.text = config.title;
					notification.views.content.text = statementText.toUpperCase();
					// 

					notification.views[dealerPrompt.name] = dealerPrompt;

					notification.confirmAction = {
						method: PhaserGame.addDealer,
						params: event.dealer
					};

					notification.cancelAction = {
						method: PhaserGame.resetDealer,
						params: event.dealer
					};
					// PWG.ViewManager.hideView('global:backButton');
					PhaserGame.dealerNotifications[event.plant.sector].push(notification);
					if(PWG.ScreenManager.currentId === 'usDetail' && PhaserGame.activeSector === event.plant.sector) {
						PhaserGame.showDealerAvailableIcon();
					}
				}
			},
			showDealerAvailableIcon: function() {
				PWG.ViewManager.showView('global:notificationIcon');
			},
			hideDealerAvailableIcon: function() {
				PWG.ViewManager.hideView('global:notificationIcon');
			},
			addDealerPrompt: function() {
				var sector = PhaserGame.activeSector;
				// 
				if(PhaserGame.dealerNotifications[sector].length > 0) {
					PhaserGame.userPromptActive = true;
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var notification = PhaserGame.dealerNotifications[sector].pop();

					if(notification.confirmAction) {
						PhaserGame.confirmAction = notification.confirmAction;
						PWG.ViewManager.showView('global:confirmButton');
					}
					if(notification.cancelAction) {
						PhaserGame.cancelAction = notification.cancelAction;
					} else {
						PhaserGame.cancelAction = PhaserGame.removeDealerPrompt;
					}
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.addView(notification, notifications, true);

					if(PhaserGame.dealerNotifications[sector].length === 0) {
						PhaserGame.hideDealerAvailableIcon();
					}
				}
			},
			removeDealerPrompt: function() {
				// 
				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('notification', 'global:notifications');
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
				PhaserGame.userPromptActive = false;
			},
			addDealer: function(dealer) {
				// 
				PhaserGame.userPromptActive = false;
				var config = dealer.config;
				PhaserGame.removeDealerPrompt();
				config.cell = GridManager.getRandomEmptyCellIndex(config.sector);
				GridManager.addBuilding(config, config.sector);
				BuildingManager.addDealer(dealer);

				var viewPath = 'usDetail:usDetailGrid:usDetailGridItem'+config.cell;
				var view = PWG.ViewManager.getControllerFromPath(viewPath);
				var frameKey = config.type.toUpperCase() + '_' + config.state.toUpperCase();
				var frame = TileCellFrames[frameKey];
				// 

				PWG.ViewManager.setFrame(viewPath, frame);
				view.config.attrs.frame = frame;
			},
			resetDealer: function(dealer) {
				PhaserGame.removeDealerPrompt();
				// 
				PhaserGame.userPromptActive = false;
				var plant = BuildingManager.findBuilding(dealer.config.plantId);
				plant.dealerNotifications[dealer.config.modelId] = false;
			},
			// SUPPLIERS
			createSupplierOpportunity: function(event) {
				// 
				var supplier = event.supplier;
				var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
				var supplierNotification = PWG.Utils.clone(PhaserGame.config.dynamicViews.supplierNotification);

				var notificationText = PhaserGame.config.notificationText['supplierNotification'];

				// 
				var partType = supplier.config.partType;
				var typeText;
				
				if(partType === PartTypes.HEADLIGHTS || partType === PartTypes.TIRES || partType === PartTypes.TRACKS) {
					typeText = PartDescriptions[partType];
				} else if(partType === PartTypes.THREE_POINT_HITCH) {
					typeText = PartDescriptions[partType] + 'es';
				} else {
					typeText = PartDescriptions[partType] + 's';
				}
				var statementText = PWG.Utils.parseMarkup(
					notificationText.content, 
					{
						quantity: supplier.config.quantity,
						quality: supplier.config.part.description.toUpperCase(),
						type: typeText,
						size: (supplier.config.partSize[0]).toUpperCase(),
						cost: ('$' + PWG.Utils.formatMoney(supplier.config.cost, 0))
					});

				notification.views.person.img = PhaserGame.config.notificationPeopleImages['supplier'];
				// notification.views.title.text = config.title;
				notification.views.content.text = statementText.toUpperCase();
				supplierNotification.views.menuTitle.text = 'PARTS SUPPLIER\n' + supplier.config.location.toUpperCase();
				// 
				PhaserGame.activeSupplier = supplier;
				notification.views[supplierNotification.name] = supplierNotification;
				PhaserGame.supplierNotifications.push(notification);
				PhaserGame.showSupplierAvailableIcon();
			},
			showSupplierAvailableIcon: function() {
				PWG.ViewManager.showView('global:supplierAvailableIcon');
			},
			hideSupplierAvailableIcon: function() {
				PWG.ViewManager.hideView('global:supplierAvailableIcon');
			},
			addSupplierPrompt: function() {
				
				if(PhaserGame.turnActive) {
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var supplierNotification = PhaserGame.supplierNotifications.pop();
					PWG.ViewManager.addView(supplierNotification, notifications, true);
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.showView('global:confirmButton');

					if(PWG.ScreenManager.currentId === 'buildingEdit') {
						PWG.ViewManager.hideView('global:plantDetailGroup:equipmentButton');
					}
					PhaserGame.confirmAction = {
						method: function() {
							PhaserGame.addSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};

					PhaserGame.cancelAction = {
						method: function() {
							PhaserGame.resetSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};

					if(PhaserGame.supplierNotifications.length === 0) {
						PhaserGame.hideSupplierAvailableIcon();
					}
				}
			},
			removeSupplierPrompt: function() {
				PhaserGame.activeSupplier = null;
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
				PhaserGame.userPromptActive = false;
				WholesaleManager.supplierPending = false;
				
				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.removeView('notification', 'global:notifications');
				if(PWG.ScreenManager.currentId === 'buildingEdit') {
					PWG.ViewManager.showView('global:plantDetailGroup:equipmentButton');
				}
				
				if(PWG.ScreenManager.currentId === 'equipmentEdit' && PhaserGame.machinePartsComplete) {
					PWG.ViewManager.showView('global:confirmButton');
				} else {
					PWG.ViewManager.hideView('global:confirmButton');
				}
			},
			addSupplier: function(supplier) {
				// 
				PhaserGame.removeSupplierPrompt();
				PhaserGame.hideSupplierAvailableIcon();
				WholesaleManager.addSupplier(supplier);
			},
			resetSupplier: function(supplier) {
				PhaserGame.removeSupplierPrompt();
				PhaserGame.hideSupplierAvailableIcon();
				// 
			},
			// TRADE_ROUTES
			createTradeRouteOpportunity: function(event) {
				
				var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
				var tradeRoutePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRoutePrompt);

				var notificationText = PhaserGame.config.notificationText;
				var location = TradeRouteLocations[event.tradeRoute.config.worldLocation];

				var modelName = event.plant.equipment[event.tradeRoute.config.modelId].name;
				var resell = PWG.Utils.formatMoney(event.tradeRoute.config.resell, 0);

				var statementText;

				
				if(location === 'africa' && !TurnManager.playerData.firstAfricanRoute) {
					statementText = notificationText['impExpBank'].content;
					TurnManager.playerData.firstAfricanRoute = true;
				} else if(location === 'asia' && !TurnManager.playerData.firstAsianRoute) {
					statementText = notificationText['transPacific'].content;
					TurnManager.playerData.firstAsianRoute = true;
				} else if(location === 'europe' && !TurnManager.playerData.firstEuropeanRoute) {
					statementText = notificationText['transAtlantic'].content;
					TurnManager.playerData.firstEuropeanRoute = true;
				} else {
					statementText = PWG.Utils.parseMarkup(notificationText['tradeRoute'].content, {
						plant: event.plant.name,
						quantity: event.tradeRoute.quantityPerYear,
						model: modelName,
						resell: resell
					});
				}

				notification.name = event.tradeRoute.config.id;
				// notification.views.person.img = 'tradeRouteGirl';
				notification.views.person.img = PhaserGame.config.notificationPeopleImages.tradeRoutes[location];
				
				notification.views.content.text = statementText.toUpperCase();
				// 

				tradeRoutePrompt.views.title.text = event.tradeRoute.config.name;
				notification.views[tradeRoutePrompt.name] = tradeRoutePrompt;
				
				notification.confirmAction = {
					method: PhaserGame.addTradeRoute,
					params: event.tradeRoute
				};

				notification.cancelAction = {
					method: PhaserGame.resetTradeRoute,
					params: event.tradeRoute
				};
				PhaserGame.availableTradeRoutes[event.tradeRoute.config.id] = event.tradeRoute;
				PhaserGame.tradeRouteNotifications[notification.name] = notification;
				PhaserGame.showTradeRouteAvailableIcon();

			},
			showTradeRouteAvailableIcon: function() {
				PWG.ViewManager.showView('global:tradeRouteAlertIcon');
			},
			hideTradeRouteAvailableIcon: function() {
				PWG.ViewManager.hideView('global:tradeRouteAlertIcon');
			},
			showAvailableTradeRouteArrowsAndIcons: function() {
				PhaserGame.hideTradeRouteAvailableIcon();
				// reset user prompt active from game-level trade route alert icon
				PhaserGame.userPromptActive = false; 
				if(PWG.ScreenManager.currentId !== 'world') {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
					PhaserGame.worldZoomIn();
				} else if(!PhaserGame.zoomedIn) {
					PhaserGame.worldZoomIn();
				} else {
					PhaserGame.removeTradeRouteViews();
					PhaserGame.addTradeRouteViews();
				}
			},
			addTradeRoutePrompt: function(id) {
				// 
				if(PhaserGame.turnActive) {
					if(PhaserGame.tradeRouteNotifications.hasOwnProperty(id)) {
						var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
						var notification = PhaserGame.tradeRouteNotifications[id];
						delete PhaserGame.tradeRouteNotifications[id];

						if(notification.confirmAction) {
							PhaserGame.confirmAction = notification.confirmAction;
							PWG.ViewManager.showView('global:confirmButton');
						}
						if(notification.cancelAction) {
							PhaserGame.cancelAction = notification.cancelAction;
						} else {
							PhaserGame.cancelAction = PhaserGame.removeTradeRoutePrompt;
						}
						PhaserGame.activeTradeRouteNotification = id; 

						PWG.ViewManager.hideView('global:backButton');
						PWG.ViewManager.showView('global:cancelButton');
						PWG.ViewManager.addView(notification, notifications, true);
						PhaserGame.tradeRouteNotificationOpen = true;
					}
				}
				
			},
			removeTradeRoutePrompt: function(tradeRoute) {
				// 
				if(PhaserGame.tradeRouteNotificationOpen) {
					// PWG.ViewManager.removeView(tradeRoute.config.id, 'world:tradeRouteAlertIcons');
					PWG.ViewManager.removeView(PhaserGame.activeTradeRouteNotification, 'global:notifications');
					delete PhaserGame.availableTradeRoutes[PhaserGame.activeTradeRouteNotification];
					PhaserGame.activeTradeRouteNotification = '';
					PWG.ViewManager.hideView('global:confirmButton');
					PWG.ViewManager.hideView('global:cancelButton');
					PWG.ViewManager.showView('global:backButton');
					PhaserGame.removeTradeRouteViews();
					PhaserGame.addTradeRouteViews();
					
					PhaserGame.userPromptActive = false;
					PhaserGame.tradeRouteNotificationOpen = false;
				}
			},
			// intermediate step for trade routes between available icon click and user prompt
			addTradeRoute: function(tradeRoute) {
				// 
				var config = tradeRoute.config;
				BuildingManager.addTradeRoute(tradeRoute);
				PhaserGame.removeTradeRoutePrompt(tradeRoute);
			},
			resetTradeRoute: function(tradeRoute) {
				PhaserGame.removeTradeRoutePrompt(tradeRoute);
				// 
				var plant = BuildingManager.findBuilding(tradeRoute.config.plantId);
				plant.tradeRouteNotifications[tradeRoute.config.modelId] = false;
			},
			// INVENTORY
			inventoryAdded: function(plant, parentPath) {
				// 
				if(plant.sector === PhaserGame.activeSector) {
					PhaserGame.addUsDetailIconAnimation(IconAnimations.PLUS_SIGN, plant, parentPath);
				}
			},
			machineSold: function(building) {
				// 
				if(building.type === BuildingTypes.DEALER) {
					if(PWG.ScreenManager.currentId === 'usDetail' && building.sector === PhaserGame.activeSector) {
						PhaserGame.addUsDetailIconAnimation(IconAnimations.DOLLAR_SIGN, building, 'usDetail:usDetailGrid');
					}
				} else if(building.type === BuildingTypes.TRADE_ROUTE) {
					if(PWG.ScreenManager.currentId === 'world' && PhaserGame.zoomedIn) {
						PhaserGame.addWorldIconAnimation(IconAnimations.DOLLAR_SIGN, building, 'world:tradeRoutePins:tradeRoutePin_');
					}
				}
			},
			addUsDetailIconAnimation: function(icon, building, parentPath) {
				// 
				// var cell = GridManager.grids[building.sector][building.cell];
				var position = PWG.ViewManager.getControllerFromPath(parentPath+':usDetailGridItem'+building.cell).view.position;
				var key = icon + '_' + building.sector + '_' + building.cell;
				var name = icon + AnimationManager.getNextIndex(key);
				var config = {
					type: icon,
					key: key,
					name: name,
					x: position.x,
					y: position.y,
					animationName: 'expand',
					parentPath: parentPath
				};
				AnimationManager.add(config);
			},
			addWorldIconAnimation: function(icon, building, parentPath) {
				
				var path = parentPath+building.id;
				
				if(PWG.ViewManager.collection.world.children.tradeRoutePins) {
					var parent = PWG.ViewManager.getControllerFromPath(path);
					// 
					if(typeof(parent) !== 'undefined') {
						var position = parent.children.pin.view.position;
						// 
						var key = icon + '_' + building.worldLocation;
						var name = icon + AnimationManager.getNextIndex(key);
						var config = {
							type: icon,
							key: key,
							name: name,
							x: position.x,
							y: position.y,
							animationName: 'expand',
							parentPath: parentPath
						};
						AnimationManager.add(config);
					}
				}
			},
			// EQUIPMENT EDIT
			getCurrentMachinePiecePath: function() {
				return 'equipmentEdit:machineEdit:machinePieceName:' + PhaserGame.machinePieces[PhaserGame.currentMachinePiece];
			},
			getMachinePieceIndex: function(name) {
				var idx = -1;
				PWG.Utils.each(
					PhaserGame.machinePieces,
					function(piece, p) {
						if(piece === name) {
							idx = p;
						}
					},
					this
				);
				return idx;
			},
			hideAllMachinePieceSprites: function() {
				var machinePieceSprites = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:machinePieceSprites');
				PWG.Utils.each(
					machinePieceSprites.children,
					function(sprite) {
						sprite.hide();
					},
					this
				);
/*
				PWG.Utils.each(
					PhaserGame.machinePieces,
					function(piece) {
						PhaserGame.hideMachinePieceSprite(piece);
					},
					this
				);
*/
			},
			hideMachinePieceSprite: function(piece) {
				var path = 'equipmentEdit:machineEdit:machinePieceSprites:'+piece;
				PWG.ViewManager.hideView(path);
			},
			setSelectedMachinePieceSprite: function() {
				PhaserGame.resetAllMachinePieceSpriteFrames();
				var piece = PhaserGame.spriteTranslations[PhaserGame.machinePieces[PhaserGame.currentMachinePiece]];
				// 
				PhaserGame.setMachinePieceSpriteFrame(piece, 1);
			},
			resetAllMachinePieceSpriteFrames: function() {
				var machinePieceSprites = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:machinePieceSprites');
				PWG.Utils.each(
					machinePieceSprites.children,
					function(piece, name) {
						piece.view.frame = 0;
						// PhaserGame.setMachinePieceSpriteFrame(name, 0);
					},
					this
				);
			},
			setMachinePieceSpriteFrame: function(piece, frame) {
				var path = 'equipmentEdit:machineEdit:machinePieceSprites:'+piece;
				var controller = PWG.ViewManager.getControllerFromPath(path);
				controller.view.frame = frame;
			},
			populatePartsMenu: function(type, collection) {
				PhaserGame.activePartType = type;
				var size = PhaserGame.activeMachineSize;
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var partsData = gameData.parts[type][size];
				// 
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partIcons);
				var itemConfig = PhaserGame.config.dynamicViews.partIcon;
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var count = 0;
				var itemY = 0;

				PWG.Utils.each(
					partsData,
					function(part, idx) {
						// 
						var item = PWG.Utils.clone(itemConfig);
						item.name = type + idx;
						item.views.icon.img = part.img;
						item.views.description.text = part.description.toUpperCase();
						item.views.cost.text = '$' + PWG.Utils.formatMoney(part.cost, 0);
						item.views.invisButton.partIdx = idx;
						item.views.invisButton.input = gameLogic.input.partIcon;
						
						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[idx] = item;
						count++;
					},
					this
				);
				// 
				partIconsConfig.name = 'partIconsConfig';

				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);

				if(WholesaleManager.getTotalPartTypeCount(PhaserGame.activePartType, PhaserGame.activeMachineSize) > 0) {
					PhaserGame.addWholesalePartPrompt();
				}
				// 
			},
			addWholesalePartsMenu: function() {
				// 
				PWG.ViewManager.removeView('partIconsConfig', 'equipmentEdit:machineEdit:partsMenu', true);


				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partIcons);
				var type = PhaserGame.activePartType;
				var size = PhaserGame.activeMachineSize;
				var itemConfig = PhaserGame.config.dynamicViews.wholesalePartIcon;
				var suppliers = WholesaleManager.parts[type][size];
				var partsData = gameData.parts[type][size];
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var count = 0;
				var itemY = 0;
				var count = 0;

				PWG.Utils.each(
					suppliers,
					function(supplier, id) {
						// 
						var item = PWG.Utils.clone(itemConfig);
						item.name = id + '_' + type;
						item.views.icon.img = supplier.part.img;
						item.views.description.text = supplier.part.description.toUpperCase();
						item.views.available.text = supplier.quantity + ' available';
						item.views.invisButton.supplierId = id;
						item.views.invisButton.input = gameLogic.input.wholesalePartIcon;
						
						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[id] = item;
						count++;
					},
					this
				);

				partIconsConfig.name = 'wholesalePartsMenu';
				// partIconsConfig.attrs.visible = true;
				// 
				PhaserGame.cancelAction = {
					method: function() {
						PhaserGame.removeWholesalePartsMenu();
					},
					params: {}
				};
				PWG.ViewManager.showView('global:cancelButton');
				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);
				PhaserGame.showPartsMenu();
			},
			removeWholesalePartsMenu: function() {
				PWG.ViewManager.removeView('wholesalePartsMenu', 'equipmentEdit:machineEdit:partsMenu');
				PhaserGame.cancelAction = null;
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.showView('global:backButton');
				PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
				// if(!PhaserGame.wholesalePartChosen) {
				// 	PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PhaserGame.activePartType });
				// }
			},
			populateOptionalPartsMenu: function(collection) {
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var optionalParts = gameData.machines[PhaserGame.activeMachineType][PhaserGame.activeMachineSize].optionalParts;
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partsMenu);
				var itemConfig = PhaserGame.config.dynamicViews.partIcon;
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var size = PhaserGame.activeMachineSize;
				var count = 0;
				var itemY = 0;

				PWG.Utils.each(
					optionalParts,
					function(optionalPart, idx) {
						var part = gameData.optionalParts[optionalPart];
						// 
						var item = PWG.Utils.clone(itemConfig);
						item.name = part.id + idx;
						item.views.icon.img = part.img;
						item.views.description.text = part.description.toUpperCase();
						item.views.cost.text = '$' + part.cost;
						item.views.invisButton.part = optionalPart;
						item.views.invisButton.input = gameLogic.input.optionalPartIcon;

						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[idx] = item;
						count++;
					},
					this
				);
				partIconsConfig.views.title.text = 'OPTIONAL PARTS';
				partIconsConfig.name = 'optionalPartsMenu';

				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);
			},
			addWholesalePartPrompt: function() {
				var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
				var wholesalePartPrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.wholesalePartPrompt);
				wholesalePartPrompt.views.title.text = PhaserGame.config.notificationText.wholesaleParts.content.toUpperCase();

				PWG.ViewManager.addView(wholesalePartPrompt, equipmentEdit, true);
				PhaserGame.wholesalePromptAdded = true;
			},
			removeWholesalePartPrompt: function() {
				PWG.ViewManager.removeView('wholesalePartPrompt', 'equipmentEdit');
				PhaserGame.cancelAction = null;
				if(PhaserGame.wholesaleCancelled) {
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PhaserGame.activePartType });
					PhaserGame.wholesaleCancelled;
				}
				PhaserGame.wholesalePromptAdded = false;
			},
			showPartsMenu: function() {
				PWG.ViewManager.showView('equipmentEdit:machineEdit:partsMenu');
/*
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				
				var tween = PhaserGame.phaser.add.tween(partsMenu.view);
				tween.onComplete.add(function() {
					// 
				})
				tween.to({y: 0}, 500, Phaser.Easing.Linear.None, true, Math.random() * 500);
				tween.start();
*/
			},
			hidePartsMenu: function() {
				PWG.ViewManager.hideView('equipmentEdit:machineEdit:partsMenu');
				// var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				// partsMenu.view.y = -(PWG.Stage.gameH);
			},
			addMachineDiscardPrompt: function() {
				
				// PhaserGame.cancelAction = null;

				// if(PhaserGame.newMachine) {

					var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
					var discardMachinePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.discardMachinePrompt);
					PhaserGame.promptToCancelMachineEdit = true;
					PhaserGame.confirmAction = {
						method: function() {
							PhaserGame.removeMachineDiscardPrompt();
							PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
						},
						params: {}
					};

					PWG.ViewManager.showView('global:confirmButton');
					PWG.ViewManager.addView(discardMachinePrompt, equipmentEdit, true);
				// } else {
				// 	PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
				// }
			},
			removeMachineDiscardPrompt: function() {
				
				PWG.ViewManager.removeView('discardMachinePrompt', 'equipmentEdit');
				PhaserGame.confirmAction = null;
				PhaserGame.userPromptActive = false;
				if(!PhaserGame.activeMachine.isComplete) {
					PWG.ViewManager.hideView('global:confirmButton');
				}
			},
			// BONUSES
			showBonusPrompt: function() {
				PWG.ViewManager.show('global:bonusNotificationIcon');
			},
			hideBonusPrompt: function() {
				PWG.ViewManager.hideView('global:bonusNotificationIcon');
			},
			showBonusNofitication: function() {
				
				if(PhaserGame.turnActive && !PhaserGame.userPromptActive) {
					PhaserGame.userPromptActive = true;

					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var bonusNotification = PhaserGame.bonusNotifications.pop();

					PWG.ViewManager.addView(supplierNotification, notifications, true);
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.showView('global:confirmButton');

					if(PWG.ScreenManager.currentId === 'buildingEdit') {
						PWG.ViewManager.hideView('global:plantDetailGroup:equipmentButton');
					}
					PhaserGame.confirmAction = {
						method: function() {
							PhaserGame.addSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};

					PhaserGame.cancelAction = {
						method: function() {
							PhaserGame.resetSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};
				}
			},
 			addBonusNotification: function() {
				var sector = PhaserGame.activeSector;
				// 
				if(PhaserGame.bonusNotifications.length > 0) {
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var notification = PhaserGame.bonusNotifications.pop();

					if(notification.confirmAction) {
						PhaserGame.confirmAction = notification.confirmAction;
						PWG.ViewManager.showView('global:confirmButton');
					}
					if(notification.cancelAction) {
						PhaserGame.cancelAction = notification.cancelAction;
					} else {
						PhaserGame.cancelAction = PhaserGame.removeDealerPrompt;
					}
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.addView(notification, notifications, true);

					if(PhaserGame.bonusNotifications.length === 0) {
						PhaserGame.hideDealerPrompt();
					}
				}
			},
			removeBonusNofitication: function() {
				// 
				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('notification', 'global:notifications');
				PhaserGame.cancelAction = null;
				PhaserGame.userPromptActive = false;
			},
			// YEAR END
			buildYearEndReport: function() {
				var levelGoals = gameData.levels[TurnManager.playerData.level].goals;
				var currentData = TurnManager.currentData;
				PhaserGame.levelPassed = true;
				// 
				
				var yearSummary = PWG.Utils.clone(PhaserGame.config.dynamicViews.yearSummary);
				var summaryGoalText = PhaserGame.config.dynamicViews.summaryGoalText;
				var summaryText = PhaserGame.config.dynamicViews.summaryText;
				var goalsText = PhaserGame.config.goalsText;
				var item;

				PWG.Utils.each(
					levelGoals,
					function(goal, idx) {
						var textValue;
						var goalPassed = true;
						// 
						switch(goal.calculation) {
							case 'money':
							textValue = '$' + PWG.Utils.formatMoney(currentData[goal.type], 0) + ' / ' + '$' + PWG.Utils.formatMoney(goal.value, 0);
							if(currentData[goal.type] < goal.value) {
								// 
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							case 'number':
							textValue = currentData[goal.type] + ' / ' + goal.value;
							if(currentData[goal.type] < goal.value) {
								// 
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							case 'length':
							textValue = currentData[goal.type].length + ' / ' + goal.value;
							if(currentData[goal.type].length < goal.value) {
								// 
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							default:
							break;
						}
						
						item = PWG.Utils.clone(summaryGoalText);
						var fill;
						if(goalPassed) {
							fill = PhaserGame.config.palette.black;
						} else {
							fill = PhaserGame.config.palette.darkRed;
						}
						item.name += 'summary-' + goal.type;
						item.text = goalsText.types[goal.type] + textValue;
						item.y += (idx * item.offsetY);
						item.style.fill = fill;
						yearSummary.views['goal'+goal.type] = item;
					},
					this
				);
			
				// there are bonuses for job creation
				if(currentData.newBuildings.length > 0) {
					PWG.ViewManager.showView('turnEnd:smallSuitcaseIcon');
					// PhaserGame.buildBonusReport(currentData);
				} else {
					PWG.ViewManager.hideView('turnEnd:smallSuitcaseIcon');
				}
				
				item = PWG.Utils.clone(summaryText);

				if(PhaserGame.levelPassed) {
					item.text = goalsText.passed;
					item.style.fill = PhaserGame.config.palette.black;
				} else {
					item.text = goalsText.failed;
					item.style.fill = PhaserGame.config.palette.darkRed;
				}
				item.name += 'levelPassed';
				item.y += (levelGoals.length * item.offsetY);

				yearSummary.views[item.name] = item;

				PhaserGame.yearSummary = yearSummary;
				// 
				if(PhaserGame.levelPassed) {
					// only save the player data if the user passed the level. 
					PhaserGame.playerData = TurnManager.playerData;
					if(PhaserGame.playerData.level < (gameData.levels.length - 1)) {
						PhaserGame.playerData.level++;
						PhaserGame.setSavedData();
					} else {
						PhaserGame.playerData = playerData;
						
						PhaserGame.gameCompleted();
					}
				} else {
					// if failed, reset turn manager to pre-level playerData
					
					BuildingManager.sectors = [ {}, {}, {}, {}, {} ];
					TurnManager.playerData = PhaserGame.playerData;
					// var sectors = TurnManager.playerData.sectors;
					// PWG.Utils.each(
					// 	sectors,
					// 	function(sector, idx) {
					// 		PWG.Utils.each(
					// 			sector,
					// 			function(building) {
					// 				BuildingManager.removeBuilding(idx, building.id);
					// 			},
					// 			this
					// 		);
					// 	},
					// 	this
					// );
					// TurnManager.playerData = PhaserGame.playerData;
				}
				
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'turnEnd' });
			},
			addYearEndReport: function() {
				var turnEnd = PWG.ViewManager.getControllerFromPath('turnEnd');
				PWG.ViewManager.addView(PhaserGame.yearSummary, turnEnd, true);
				PhaserGame.yearSummary = {};
			},
			addBonusReport: function() {
				var currentData = TurnManager.currentData;
				var bonusTextViews = [];
				var bonusesText = PhaserGame.config.bonusesText;
				var bonusesNotification = PWG.Utils.clone(PhaserGame.config.dynamicViews.bonusesNotification);
				var summaryBonusesText = PWG.Utils.clone(PhaserGame.config.dynamicViews.summaryBonusesText);
				var summaryBonusText = PhaserGame.config.dynamicViews.summaryBonusText;
				var typeCount = 0;
				
				var buildingTypes = {};
				PWG.Utils.each(
					BuildingTypes,
					function(type) {
						
						if(type !== BuildingTypes.SUPPLIER) {
							buildingTypes[type] = {
								count: 0,
								name: BuildingNames[type]
							};
						}
					},
					this
				);

				PWG.Utils.each(
					currentData.newBuildings,
					function(newBuilding) {
						buildingTypes[newBuilding.type].count++;
					},
					this
				);

				
				
				PWG.Utils.each(
					buildingTypes,
					function(building, type) {
						if(building.count > 0) {
							if(building.count > 1) {
								building.name += 's'
							}
							var text = bonusesText.buildings;
							
							var bonusText = PWG.Utils.parseMarkup(text, 
							{
								count: building.count,
								name: building.name,
								bonus: (gameData.bonuses.jobs[type] * building.count)
							});

							var item = PWG.Utils.clone(summaryBonusText);
							item.text = bonusText;

							item.y += (typeCount * item.offsetY);
							
							item.name += '_' + type; 
							
							summaryBonusesText.views[type] = item;
							summaryBonusesText.attrs.visible = false;
							typeCount++;
						}
					},
					this
				);
				
				var turnEnd = PWG.ViewManager.getControllerFromPath('turnEnd');
				PWG.ViewManager.addView(bonusesNotification, turnEnd, true);
				PWG.ViewManager.addView(summaryBonusesText, turnEnd, true);
			},
			removeBonuses: function() {
				PWG.ViewManager.removeView('bonusesNotification', 'turnEnd');
				PWG.ViewManager.removeView('summaryBonusesText', 'turnEnd');
			},
			gameCompleted: function() {
				// all levels completed. when user clicks confirm, display
				// tutorial guy with all completed notification, then reset 
				// data to start again at level one.
				PhaserGame.confirmAction = {
					method: function() {
						PhaserGame.confirmAction = null; 
						// reset player data to original, starting values
						PhaserGame.playerData = playerData;
						// remove need for tutorial though
						PWG.Utils.each(
							PhaserGame.playerData.firstPlay,
							function(tutorialType, key) {
								PhaserGame.playerData.firstPlay[key] = false;
							},
							this
						);
						PhaserGame.setSavedData();
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					},
					params: {}
				};
				PhaserGame.activeTutorial = TutorialTypes.ALL_COMPLETED;
				PhaserGame.addTutorialGuy();
			}
		}
	},
	// sprite click handlers
	input: {
		dismissTutorial: {
			inputDown: function() {
				// 
				PhaserGame.removeTutorialGuy();
			}
		},
		manualBg: {
			inputDown: function() {
				// 
				if(!PhaserGame.manualOpen) {
					PhaserGame.manualPage = 0;
					PhaserGame.addManualPage(0);
					PhaserGame.manualOpen = true;
				}
			}
		},
		manualPageForward: {
			inputDown: function() {
				
				PhaserGame.nextManualPage();
			}
		},
		manualPageBackward: {
			inputDown: function() {
				PhaserGame.prevManualPage();
			}
		},
		notificationIcon: {
			inputDown: function() {
				if(!PhaserGame.userPromptActive) {
					PhaserGame.userPromptActive = true;
					PhaserGame.addDealerPrompt();
				}
			}
		},
		bonusNotificationIcon: {
			inputDown: function(event) {
				PhaserGame.addBonusNotification();
			}
		},
		supplierAvailableIcon: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				
				if(!PhaserGame.userPromptActive) {
					PhaserGame.userPromptActive = true;
					PhaserGame.addSupplierPrompt();
				}
			}
		},
		tradeRouteAlertIcon: {
			inputDown: function() {
				if(!PhaserGame.userPromptActive) {
					PhaserGame.userPromptActive = true;
					PhaserGame.showAvailableTradeRouteArrowsAndIcons();
				}
			}
		},
		tradeRouteAvailableIcon: {
			inputDown: function() {
				if(!PhaserGame.userPromptActive) {
					PhaserGame.userPromptActive = true;
					PhaserGame.addTradeRoutePrompt(this.controller.config.tradeRouteId);
				}
			}
		},
		newPlant: {
			inputDown: function() {
				// 
				if(this.selected) {
					PhaserGame.selectedIcon = '';
					this.selected = false;
				} else {
					PhaserGame.selectedIcon = this.controller.id;
					this.selected = true;
					var input = this.controller.view.input;
					var attrs = this.controller.config.attrs;
					input.enableDrag();
					input.enableSnap(attrs.width, attrs.height, false, true);
					// input.enableSnap(32, 32, false, true);
				}
			},
			onDragStop: function() {
				var view = this.controller.view;
				// 
				if(view.y < (PWG.Stage.unit * 3.5)) {
					view.y = PWG.Stage.unit * 3.5;
				} else if(view.y > (PWG.Stage.unit * 10.5)) {
					view.y = PWG.Stage.unit * 9.4;
				}
				
				var maxX = (PWG.Stage.gameW + view.width);
				if(view.x > maxX) {
					view.x = maxX;
				} else if(view.x < 0) {
					view.x = 0;
				}
				// 
			}
		},
		editMachine: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.EDIT_MACHINE, value: this.controller.config.machineIdx });
			}
		},
		machinePieceForwardIcon: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
			}
		},
		machinePieceBackwardIcon: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.PREV_MACHINE_PIECE_ICON });
			}
		},
		openPartsMenu: {
			inputDown: function() {
				
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				if(!PhaserGame.userPromptActive) {
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: this.controller.config.partValue });
				}
			}
		},
		openOptionalPartsMenu: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				if(!PhaserGame.userPromptActive) {
					PWG.EventCenter.trigger({ type: Events.OPEN_OPTIONAL_PARTS_MENU });
				}
			}
		},
		partIcon: {
			inputDown: function(event) {
				
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_PART, value: this.controller.config.partIdx });
			}
		},
		wholesalePartIcon: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_WHOLESALE_PART, value: this.controller.config.supplierId });
			}
		},
		optionalPartIcon: {
			inputDown: function(event) {
				// 
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_OPTIONAL_PART, value: this.controller.config.part });
			}
		},
		wholesalePartPrompt: {
			inputDown: function(event) {
				// 
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.OPEN_WHOLESALE_PARTS_MENU, value: this.controller.config.part });
			}
		},
		closedEnvelope: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.ViewManager.hideView('turnEnd:closedEnvelope');
				PWG.ViewManager.showView('global:confirmButton');
				PhaserGame.addYearEndReport();
			}
		},
		openedEnvelope: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
			}
		},
		smallSuitcaseIcon: {
			inputDown: function(event) {
				PhaserGame.addBonusReport();
			}
		},
		closedSuitcase: {
			inputDown: function(event) {
				PWG.ViewManager.hideView('turnEnd:bonusesNotification:closedSuitcase');
				PWG.ViewManager.showView('turnEnd:summaryBonusesText');
			}
		},
		openedSuitcase: {
			inputDown: function(event) {
				PhaserGame.removeBonuses();
			}
		}
	},
	// button click handlers
	buttonCallbacks: {
		openManual: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
		},
		share: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			// note: inappbrowser plugin does not work. had to use hack from here: 
			// http://www.excellentwebworld.com/phonegap-open-a-link-in-safari-or-external-browser/
			window.open(FACEBOOK_URL, '_system');
		},
		manualStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
		},
		gameStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
			ignitionKey.view.events.onAnimationComplete.add(PhaserGame.ignitionAnimationCompleted, this);
			PWG.PhaserAnimation.play(ignitionKey.name, 'turnOn');
			// HACK: temporarily adding sound directly; should be implemented via pwg library.
			var sfx = PhaserGame.phaser.add.audio('tractorStartup');
			// sfx.play();
		},
		worldReturnButton: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				if(PWG.ScreenManager.currentId !== 'world') {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
				} else if(PhaserGame.zoomedIn) {
					PhaserGame.worldZoomOut();
				}
			}
		},
		plusButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PhaserGame.worldZoomOut();
			}
		},
		minusButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PhaserGame.worldZoomIn();
			}
		},
		// us detail
		usDetailStart: function(param) {
			// 
		}, 
		northeastDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn && !PhaserGame.userPromptActive) {
				PhaserGame.activeSector = USSectors.NORTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		southeastDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn && !PhaserGame.userPromptActive) {
				PhaserGame.activeSector = USSectors.SOUTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		midwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn && !PhaserGame.userPromptActive) {
				PhaserGame.activeSector = USSectors.MID_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		northwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn && !PhaserGame.userPromptActive) {
				PhaserGame.activeSector = USSectors.NORTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		southwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn && !PhaserGame.userPromptActive) {
				PhaserGame.activeSector = USSectors.SOUTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		buildingAddConfirm: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.ADD_BUILDING });
		},
		buildingAddCancel: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
		},
		// equipment list
		equipmentListStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
			}
		},
		// add equipment
		addEquipment: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentCreate' });
			}
		},
		newBasicTractor: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.BASIC });
			}
		},
		newBasicSkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.BASIC });
			}
		},
		newMediumTractor: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}

			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.MEDIUM });
			}
		},
		newMediumSkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.MEDIUM });
			}
		},
		newHeavyTractor: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.HEAVY });
			}
		},
		newHeavySkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.userPromptActive) {
				PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.HEAVY });
			}
		},
		confirmButton: function() {
			// 
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.confirmAction) {
				PhaserGame.confirmAction.method.call(this, PhaserGame.confirmAction.params);
				PhaserGame.confirmAction = null;
			} else {
				switch(PWG.ScreenManager.currentId) {
					case 'brief':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
					break;

					case 'equipmentEdit':
					PWG.EventCenter.trigger({ type: Events.SAVE_MACHINE });
					break;

					case 'turnEnd':
					if(PhaserGame.bonusesNotification) {
						PhaserGame.removeBonuses();
					}
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
					break;

					default:
					break;
				}
			}
		},
		cancelButton: function() {
			
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.promptToCancelMachineEdit) {
				PhaserGame.promptToCancelMachineEdit = false;
				
				PhaserGame.removeMachineDiscardPrompt();
				
			} else if(PhaserGame.cancelAction) {
				PhaserGame.cancelAction.method.call(this, PhaserGame.cancelAction.params);
				PhaserGame.cancelAction = null;
			} else {
				switch(PWG.ScreenManager.currentId) {
					case 'manual':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					break;
					
					case 'equipmentEdit':
					if(!PhaserGame.userPromptActive) {
						PhaserGame.userPromptActive = true;
						PhaserGame.addMachineDiscardPrompt();
					}
					break; 
					
					default:
					break;
				}
			}
		},
		backButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.backAction) {
				PhaserGame.backAction.call(this);
			} else {
				switch(PWG.ScreenManager.currentId) {
					case 'brief': 
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					break;

					case 'world':
					if(!PhaserGame.userPromptActive) {
						PhaserGame.userPromptActive = true;
						PhaserGame.showEndTurnPrompt();
					}
					break; 

					case 'manual':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					break;

					case 'usDetail':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
					break;

					case 'buildingEdit':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
					break;

					case 'equipmentList':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
					break;

					case 'equipmentCreate':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
					break;

					case 'equipmentEdit':
					if(PhaserGame.machineDirty) {
						// notify of unsaved changes
					}
					PWG.ViewManager.hideView('global:equipmentEditGroup');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
					break;

					default:
					break;
				}
			}
		}
	},
	// screen-specific listeners and methods
	screens: {
		home: {
			create: function() {
				PWG.ViewManager.showView('global:homeGroup');
				PWG.ViewManager.hideView('global:turnGroup');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:backButton');

				if(TurnManager.playerData.firstPlay[TutorialTypes.INIT]) {
					PhaserGame.activeTutorial = TutorialTypes.INIT;
					PhaserGame.addTutorialGuy();
				}
			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:homeGroup');
				var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
				PWG.PhaserAnimation.play(ignitionKey.name, 'idle');
			}
		},
		manual: {
			create: function() {
				PhaserGame.currentManualPage = '';
				PhaserGame.manualOpen = false;
				PWG.ViewManager.hideView('global:homeGroup');
				PWG.ViewManager.showView('global:cancelButton');
			},
			shutdown: function() {
				if(PhaserGame.currentManualPage !== '') {
					PWG.ViewManager.removeView(PhaserGame.currentManualPage, 'manual:manualPages');
				}
			}
		},
		brief: {
			create: function() {
				var brief = PWG.ViewManager.getControllerFromPath('brief');
				var levelBrief = gameData.levels[PhaserGame.playerData.level].brief;
				var missionBrief = PWG.Utils.clone(PhaserGame.config.dynamicViews.missionBrief);
				var goalText = PhaserGame.config.dynamicViews.goalText;
				var wiper = PWG.Utils.clone(PhaserGame.config.dynamicViews.wiper);
				// 
				// 
				missionBrief.views.briefBg.img = levelBrief.background;

				PWG.Utils.each(
					levelBrief.text,
					function(text, idx) {
						// 
						var item = PWG.Utils.clone(goalText);
						// 
						item.name += idx;
						// item.views.goal.text = text;
						// item.views.goal.y += (idx * item.offsetY);
						item.text = text;
						item.y += (idx * item.offsetY);
						missionBrief.views['goal'+idx] = item;
					},
					this
				);
				// 
				PWG.ViewManager.addView(missionBrief, brief, true);
				PWG.ViewManager.addView(wiper, brief, true);

				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:turnGroup');

				// wiper
				var wiper = PWG.ViewManager.getControllerFromPath('brief:wiper:windshieldWiper');
				// var wiperMask = PWG.ViewManager.getControllerFromPath('brief:wiper:windshieldWiperMask');
				wiper.view.anchor.setTo(0.5, 0.04);

				var tween = PhaserGame.phaser.add.tween(wiper.view);
				tween.onComplete.add(function() {
					// 
					wiper.view.events.onTweenComplete = null;
					// PWG.ViewManager.showView('global:confirmButton');
				});
				tween.to({angle: -65}, 1000, Phaser.Easing.Linear.None, true, Math.random() * 500);
				tween.start();

				PWG.ViewManager.showView('global:confirmButton');

			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('missionBrief', 'brief');
			}
		},
		world: {
			listeners: [
			{
				event: Events.WORLD_ZOOMED_IN,
				handler: function(event) {
					// 
					PhaserGame.addTradeRouteViews();
					PhaserGame.worldZoomedIn = false;
				}
			},
			{
				event: Events.WORLD_ZOOMED_OUT,
				handler: function(event) {
					
				}
			}
			],
			create: function() {

				if(TurnManager.playerData.firstPlay[TutorialTypes.WORLD]) {
					PhaserGame.activeTutorial = TutorialTypes.WORLD;
					PhaserGame.addTutorialGuy();
				}
				var worldMap = PWG.ViewManager.getControllerFromPath('world:worldMap');
				// 
				// worldMap.view.scale.setTo(PhaserGame.config.maxWorldZoom.width, PhaserGame.config.maxWorldZoom.height);
				// worldMap.view.y = -(gameUnit * 31.2);
				// worldMap.view.x = -(gameUnit * 8.2);
				PhaserGame.worldView = worldMap.view;

				var world = PWG.ViewManager.getControllerFromPath('world');
				var buildingPins = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingPins);
				var worldPositions = PhaserGame.config.worldPositions;

				PWG.Utils.each(
					TurnManager.playerData.sectors,
					function(sector, idx) {
						var count = PWG.Utils.objLength(sector);
						if(count > 0) {
							// 
							var palette = PhaserGame.config.palette;
							
							var typeCounts = {
								plant: 0,
								dealer: 0,
								tradeRoute: 0
							};
							
							PWG.Utils.each(
								sector,
								function(building, key) {
									typeCounts[building.type]++;
								},
								this
							);
							// 
							if(typeCounts.plant > 0) {
								var buildingPin = PhaserGame.formatBuildingPin(BuildingTypes.PLANT, idx, typeCounts[BuildingTypes.PLANT]);
								buildingPins.views[buildingPin.name] = buildingPin;
							}
							if(typeCounts.dealer > 0) {
								var buildingPin = PhaserGame.formatBuildingPin(BuildingTypes.DEALER, idx, typeCounts[BuildingTypes.DEALER]);
								buildingPins.views[buildingPin.name] = buildingPin;
							}
						}
					},
					this
				);
				
				PWG.ViewManager.addView(buildingPins, world, true);

				PhaserGame.buildingPins = PWG.ViewManager.getControllerFromPath('world:buildingPins').view;

				if(!PhaserGame.worldZoomInitialized) {
					PhaserGame.initWorldZoom(worldMap.view, PhaserGame.buildingPins);
				}
				PhaserGame.worldZoomOutFull();

				PhaserGame.currentZoom = 4;
				PhaserGame.activeSector = -1;

				PWG.ViewManager.showView('global:turnGroup');
				PWG.ViewManager.showView('global:plusMinusGroup');
			},
			shutdown: function() {
				PhaserGame.removeTradeRouteViews();
				PWG.ViewManager.removeView('buildingPins', 'world');
				PWG.ViewManager.hideView('global:plusMinusGroup');
				PhaserGame.worldView = null;
				PhaserGame.buildingPins = null;
				PhaserGame.zoomedInTriggered = false;
			}
		},
		usDetail: {
			listeners: [
			// open building menu
			{
				event: Events.OPEN_BUILDINGS_MENU,
				handler: function(event) {
					// 
					if(!PhaserGame.userPromptActive) {
						PhaserGame.addBuildingCreatePrompt();
						PhaserGame.userPromptActive = true;
					}
				}
			},
			// add building
			{
				event: Events.ADD_BUILDING,
				handler: function(event) {
					PhaserGame.addBuilding(BuildingTypes.PLANT);
				}
			},
			// building state updated
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					var config = event.building.config;
					if(config.type === BuildingTypes.TRADE_ROUTE) {
						
					} else {
						if(config.sector === PhaserGame.activeSector) {
							var viewPath = 'usDetail:usDetailGrid:usDetailGridItem'+config.cell;
							var view = PWG.ViewManager.getControllerFromPath(viewPath);
							var frameKey = config.type.toUpperCase() + '_' + config.state.toUpperCase();
							var frame = TileCellFrames[frameKey];
							// 

							PWG.ViewManager.setFrame(viewPath, frame);
							view.config.attrs.frame = frame;
						}
					}
				}
			},
			// inventory added
			{
				event: Events.INVENTORY_ADDED,
				handler: function(event) {
					PhaserGame.inventoryAdded(event.plant, 'usDetail:usDetailGrid');
				}
			},
			// close building menu
			{
				event: Events.CLOSE_BUILDINGS_MENU,
				handler: function(event) {
					// 
					PWG.ViewManager.removeView('buildingCreatePrompt', 'global');
					PhaserGame.confirmAction = null;
					PhaserGame.cancelAction = null;
					PWG.ViewManager.hideView('global:confirmButton');
					PWG.ViewManager.hideView('global:cancelButton');
					PWG.ViewManager.showView('global:backButton');
					PhaserGame.userPromptActive = false;
				}
			}
			],
			create: function() {
				// 
				if(TurnManager.playerData.firstPlay[TutorialTypes.US_DETAIL]) {
					PhaserGame.activeTutorial = TutorialTypes.US_DETAIL;
					PhaserGame.addTutorialGuy();
				}
				// 
				var usDetail = PWG.ViewManager.getControllerFromPath('usDetail');
				var sectorBg = PWG.Utils.clone(PhaserGame.config.dynamicViews.sectorBg);
				var gridCoordinates = GridManager.grids[PhaserGame.activeSector];
				var usDetailGrid = PWG.Utils.clone(PhaserGame.config.dynamicViews.usDetailGrid);
				var gridItem = PhaserGame.config.dynamicViews.usDetailGridItem;
				var gridConfig = {};
				PWG.Utils.each(
					gridCoordinates,
					function(coordinate, idx) {
						// 
						var item = PWG.Utils.clone(gridItem);
						item.name += idx;
						item.x += coordinate.x;
						item.y += coordinate.y;
						item.attrs.frame = coordinate.frame;
						item.cell = idx;
						item.sector = PhaserGame.activeSector;
						item.input = {
							inputDown: function() {
								return function(item) {
									PhaserGame.tileClicked(item);
								}(item);
							}
						};
						usDetailGrid.views[idx] = item;
					},
					this
				);

				sectorBg.img = SectorGrids[PhaserGame.activeSector];
				PWG.ViewManager.addView(sectorBg, usDetail, true);
				PWG.ViewManager.addView(usDetailGrid, usDetail, true);
				
				if(PhaserGame.dealerNotifications[PhaserGame.activeSector].length > 0) {
					PhaserGame.showDealerAvailableIcon();
				}
			},
			shutdown: function() {
				// hide add building button
				if(PhaserGame.notEnoughMoneyPromptActive) {
					PWG.ViewManager.removeView('buildingCreatePrompt', 'global');
					PhaserGame.confirmAction = null;
					PhaserGame.cancelAction = null;
					PWG.ViewManager.hideView('global:confirmButton');
					PWG.ViewManager.hideView('global:cancelButton');
					PWG.ViewManager.showView('global:backButton');
					PhaserGame.userPromptActive = false;
				}
				PWG.ViewManager.removeGroupChildren('usDetail:usDetailGrid');
				PhaserGame.hideDealerAvailableIcon();
			}
		},
		buildingEdit: {
			listeners: [
			// building state updated
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					// 
					var config = event.building.config;
					if(config.id === PhaserGame.activeBuilding.id) {
	 					var buildingEditDetails = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails[config.type]);
						switch(config.type) {
							case BuildingTypes.PLANT:
							var equipmentUpdate = buildingEditDetails.equipment.text + PWG.Utils.objLength(config.equipment) + ' / ' + BuildingManager.PLANT_MAX_MODELS;
							var inventoryUpdate = buildingEditDetails.inventory.text + config.totalInventory + ' / ' + BuildingManager.PLANT_MAX_INVENTORY;

							PWG.ViewManager.callMethod('buildingEdit:editDetails:equipment', 'setText', [equipmentUpdate], this);
							PWG.ViewManager.callMethod('buildingEdit:editDetails:inventory', 'setText', [inventoryUpdate], this);
							break;

							case BuildingTypes.DEALER:
							var salesUpdate = buildingEditDetails.sales.text = '$' + PWG.Utils.formatMoney(config.totalSales, 0);
							PWG.ViewManager.callMethod('buildingEdit:editDetails:sales', 'setText', [salesUpdate], this);
							break;

							default:
							break;
						}
					}
				}
			}
			],
			create: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.PLANT_DETAILS]) {
					PhaserGame.activeTutorial = TutorialTypes.PLANT_DETAILS;
					PhaserGame.addTutorialGuy();
				}
				var buildingEdit = PWG.ViewManager.getControllerFromPath('buildingEdit');
				var building = PhaserGame.activeBuilding;
				// 
				var buildingEditScreen = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditScreen);
				var buildingEditDetails = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails[building.type]);

				buildingEditScreen.views.bg.img = buildingEditDetails.bg.img;
				buildingEditScreen.views.name.text += building.name;
				buildingEditScreen.views.status.text += building.state.toUpperCase();
				// 
				switch(building.type) {
					case BuildingTypes.PLANT:
					// 
					buildingEditDetails.equipment.text += PWG.Utils.objLength(building.equipment) + ' / ' + BuildingManager.PLANT_MAX_MODELS;
					buildingEditDetails.inventory.text += building.totalInventory + ' / ' + BuildingManager.PLANT_MAX_INVENTORY;
					buildingEditDetails.dealers.text += PWG.Utils.objLength(building.dealers) + ' / ' + BuildingManager.PLANT_MAX_DEALERS;
					break;

					case BuildingTypes.DEALER:
					var plant = BuildingManager.sectors[PhaserGame.activeSector][building.plantId].config;
					// 
					buildingEditDetails.plantMachine.text += plant.name + ' / ' + plant.equipment[building.modelId].name;
					buildingEditDetails.resell.text += '$' + PWG.Utils.formatMoney(building.resell, 0);
					buildingEditDetails.sales.text += '$' + PWG.Utils.formatMoney(building.totalSales, 0);;
					break;

					default:
					break;
				}

				PWG.Utils.each(
					buildingEditDetails,
					function(detail, key) {
						if(key !== 'bg') {
							buildingEditScreen.views[detail.name] = detail;
						}
					},
					this
				);
				// 

				PWG.ViewManager.addView(buildingEditScreen, buildingEdit, true);

				if(building.type === BuildingTypes.PLANT) {
					PWG.ViewManager.showView('global:plantDetailGroup');
				}
			},
			shutdown: function() {
				PWG.ViewManager.removeView('editDetails', 'buildingEdit');
				PWG.ViewManager.hideView('global:plantDetailGroup');
			}
		},
		equipmentList: {
			listeners: [
			{
				event: Events.EDIT_MACHINE,
				handler: function(event) {
					var config = TurnManager.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[event.value];
					// 
					PhaserGame.activeMachineType = config.type;
					PhaserGame.activeMachineSize = config.size;
					PhaserGame.activeMachine = new Machine(config);
					PhaserGame.newMachine = false;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			},
			// building state updated
			{
				event: Events.INVENTORY_ADDED,
				handler: function(event) {
					// 
					var config = event.plant;
					if(config.id === PhaserGame.activeBuilding.id) {
						var available = 'x' + BuildingManager.getMachineModelInventory(config.id, event.machine);;
						PWG.ViewManager.callMethod('equipmentList:machineList:machine'+event.machine+':available', 'setText', [available], this);
					}
				}
			}
			],
			create: function() {
				// show add equipment button

				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_LIST]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_LIST;
					PhaserGame.addTutorialGuy();
				}

				var equipment = PhaserGame.activeBuilding.equipment;
				// 
				var machineList = PWG.Utils.clone(PhaserGame.config.dynamicViews.machineList);
				var machineIcon = PhaserGame.config.dynamicViews.machineIcon;
				var emptyIcon = PhaserGame.config.dynamicViews.emptyIcon; 
				
				var offsetX = machineIcon.offsetX;
				var offsetY = machineIcon.offsetY;
				var iconW = machineIcon.iconW;
				var iconH = machineIcon.iconH;
				var columnW = PWG.Stage.gameW/MACHINE_LIST_COLUMNS;
				
				var column = 0;
				var count = 0;
				var itemY = 0;
				var emptyTotal = MACHINE_LIST_ICONS - PWG.Utils.objLength(equipment); 
				// 
				
				PWG.Utils.each(
					equipment,
					function(machine, idx) {
						// 
						var item = PWG.Utils.clone(machineIcon);
						var available = BuildingManager.getMachineModelInventory(machine.plantId, machine.id);
						// 
						item.name = 'machine' + idx;
						// 
						item.views.bg.img = PhaserGame.config.machineIcons[machine.type][machine.size];
						item.views.name.text = machine.name;
						item.views.cost.text = '$' + machine.cost;
						// item.views.size.text = machine.size;

						item.views.available.text = 'x' + available;

						// if(!machine.active) {
						// 	item.views.alert.attrs.visible = true;
						// }

						item.views.invisButton.machineIdx = machine.id;
						// increment y to next row:
						if(count % MACHINE_LIST_COLUMNS === 0) {
							itemY = (iconH * (count/MACHINE_LIST_COLUMNS)) + offsetY;
						}
						
						var columnX = offsetX + ((PWG.Stage.gameW/2) * (count % MACHINE_LIST_COLUMNS));

						PWG.Utils.each(
							item.views,
							function(view) {
								view.x += columnX;
								view.y += itemY;
							},
							this
						);
				
						machineList.views[item.name] = item;
						count++;
					},
					this
				);

				for(var i = 0; i < emptyTotal; i++) {
					var empty = PWG.Utils.clone(emptyIcon);

					if(count % MACHINE_LIST_COLUMNS === 0) {
						itemY = (iconH * (count/MACHINE_LIST_COLUMNS)) + offsetY;
					}
					
					var columnX = offsetX + ((PWG.Stage.gameW/2) * (count % MACHINE_LIST_COLUMNS));
					empty.name = 'empty' + i;

					PWG.Utils.each(
						empty.views,
						function(view) {
							view.x += columnX;
							view.y += itemY;
						},
						this
					);
					
					machineList.views[empty.name] = empty;
					// 
					count++;
				}
				
				// 
				var equipmentListView = PWG.ViewManager.getControllerFromPath('equipmentList');
				PWG.ViewManager.addView(machineList, equipmentListView, true);
				PWG.ViewManager.showView('global:equipmentListGroup');
			},
			shutdown: function() {
				PWG.ViewManager.removeView('machineList', 'equipmentList');
				PWG.ViewManager.hideView('global:equipmentListGroup');
			}
		},
		equipmentCreate: {
			listeners: [
			// machine type selection
			{
				event: Events.MACHINE_TYPE_SELECTION,
				handler: function(event) {
					// activate size category buttons
					// 
					PhaserGame.activeMachineType = event.value;
					var count = TurnManager.playerData.modelCount[event.value];
					var letter = BuildingManager.getMachineName(count);
					var id = event.value + letter;
					var name = event.value.toUpperCase() + ' ' + letter;
					PhaserGame.activeMachineSize = event.size;
					PhaserGame.activeMachine = new Machine({ id: id, type: PhaserGame.activeMachineType, size: event.size, name: name, plantId: PhaserGame.activeBuilding.id });
					PhaserGame.newMachine = true;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			}
			],
			create: function() {
				// 
				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_CREATE]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_CREATE;
					PhaserGame.addTutorialGuy();
				}

			}
		},
		equipmentEdit: {
			listeners: [
			// next machine piece icon
			{
				event: Events.NEXT_MACHINE_PIECE_ICON,
				handler: function(event) {
					PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());

					if(PhaserGame.currentMachinePiece < PhaserGame.machinePieces.length - 1) {
						PhaserGame.currentMachinePiece++;
					} else {
						PhaserGame.currentMachinePiece = 0;
					}

					PhaserGame.setSelectedMachinePieceSprite();

					// show piece name text/button
					PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());
				}
			},
			// prev machine piece icon
			{
				event: Events.PREV_MACHINE_PIECE_ICON,
				handler: function(event) {
					PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());

					if(PhaserGame.currentMachinePiece > 1) {
						PhaserGame.currentMachinePiece--;
					} else {
						PhaserGame.currentMachinePiece = PhaserGame.machinePieces.length - 1;
					}

					PhaserGame.setSelectedMachinePieceSprite();

					// show piece name text/button
					PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());
				}
			},
			// add part
			{
				event: Events.ADD_PART,
				handler: function(event) {
					PhaserGame.activeMachine.setPart(PhaserGame.activePartType, event.value, false);

					PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
					PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
				}
			},
			// add wholesale part
			{
				event: Events.ADD_WHOLESALE_PART, 
				handler: function(event) {
					// 
					var type = PhaserGame.activePartType;
					PhaserGame.activeMachine.setPart(type, event.value, true);
					// WholesaleManager.usePart(type, PhaserGame.activeMachineSize, event.supplierId);

					PWG.EventCenter.trigger({ type: Events.CLOSE_WHOLESALE_PARTS_MENU });
					PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
				}
			},
			// required part added
			{
				event: Events.REQUIRED_PART_ADDED,
				handler: function(event) {
					// 
					var stars = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:stars');
					stars.view.frame++;
				}
			},
			// add optional part
			{
				event: Events.ADD_OPTIONAL_PART,
				handler: function(event) {
					// 
					PhaserGame.activeMachine.setPart(event.value, 0);
					PWG.EventCenter.trigger({ type: Events.CLOSE_OPTIONAL_PARTS_MENU });
				}
			},
			// show build group
			{
				event: Events.SHOW_BUILD_GROUP,
				handler: function(event) {
					// 
					PhaserGame.activeMachine.set('size', event.size);
					this.views['state-group'].children[event.previousGroup].hide();
					this.views['state-group'].children['editor-group'].show();
				}
			},
			// open parts menu
			{
				event: Events.OPEN_PARTS_MENU,
				handler: function(event) {
					
					if(!PhaserGame.partsMenuOpen && !PhaserGame.optionalPartsMenuOpen && !PhaserGame.userPromptActive) {
						PhaserGame.userPromptActive = true;
						if(this.partsMenuType !== event.value) {
							// update piece navigator
							
							PhaserGame.resetAllMachinePieceSpriteFrames();

							PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());
							PhaserGame.currentMachinePiece = PhaserGame.getMachinePieceIndex(event.value);

							// PhaserGame.setMachinePieceSpriteFrame(event.value, 1);
							PhaserGame.setSelectedMachinePieceSprite();
							PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());

							// populate menu with new piece type
							PhaserGame.populatePartsMenu.call(this, event.value, this.views);

						}
						// PWG.ViewManager.showView('partsMenu');
						PhaserGame.showPartsMenu();
						this.partsMenuType = event.value;
						PhaserGame.partsMenuOpen = true;
					}
				}
			},
			// close parts menu
			{
				event: Events.CLOSE_PARTS_MENU,
				handler: function(event) {
					// 
					PhaserGame.userPromptActive = false;
					if(PhaserGame.partsMenuOpen) {
						// 
						// PWG.ViewManager.hideView('partsMenu');
						PhaserGame.hidePartsMenu();
						PhaserGame.partsMenuOpen = false;
						PhaserGame.activePartType = '';
					}
					if(PhaserGame.wholesalePromptAdded) {
						PhaserGame.removeWholesalePartPrompt();
					}
				}
			},
			// open wholesale parts menu
			{
				event: Events.OPEN_WHOLESALE_PARTS_MENU,
				handler: function(event) {
					// 
					PhaserGame.removeWholesalePartPrompt();
					PhaserGame.addWholesalePartsMenu();
				}
			},
			// close wholesale parts menu
			{
				event: Events.CLOSE_WHOLESALE_PARTS_MENU,
				handler: function(event) {
					PhaserGame.userPromptActive = false;
					PhaserGame.removeWholesalePartsMenu();
					if(PhaserGame.wholesalePromptAdded) {
						PhaserGame.removeWholesalePartPrompt();
					}
				}
			},
			// open optional parts menu
			{
				event: Events.OPEN_OPTIONAL_PARTS_MENU,
				handler: function(event) {
					if(!PhaserGame.partsMenuOpen && !PhaserGame.optionalPartsMenuOpen && !PhaserGame.userPromptActive) {
						if(!PhaserGame.optionalPartsMenuPopulated) {
							PhaserGame.populateOptionalPartsMenu.call(this, this.views);
							PhaserGame.optionalPartsMenuPopulated = true;
						}
						PWG.ViewManager.showView('optionalPartsMenu');
						PhaserGame.optionalPartsMenuOpen = true;
					}
				}
			},
			// close optional parts menu
			{
				event: Events.CLOSE_OPTIONAL_PARTS_MENU,
				handler: function(event) {
					// 
					if(PhaserGame.optionalPartsMenuOpen) {
						PhaserGame.userPromptActive = false;
						PWG.ViewManager.hideView('optionalPartsMenu');
						PhaserGame.optionalPartsMenuOpen = false;
					}
				}
			},
			// machine complete
			{
				event: Events.MACHINE_PARTS_COMPLETE,
				handler: function(event) {
					// 
					PhaserGame.hideAllMachinePieceSprites();
					PhaserGame.confirmAction = null;
					PhaserGame.machinePartsComplete = true;
					PWG.ViewManager.showView('global:confirmButton');
				}
			},
			// save machine
			{
				event: Events.SAVE_MACHINE, 
				handler: function(event) {
					// 
					PhaserGame.activeMachine.save();
					if(PhaserGame.newMachine) {
						// 
						TurnManager.addMachineModel(PhaserGame.activeMachine.config);
						PhaserGame.newMachine = false;
					}
					PhaserGame.activeMachine = null;
					PhaserGame.machineDirty = false;
					PWG.ViewManager.hideView('global:equipmentEditGroup');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
				}
			}

			],
			create: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_EDIT]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_EDIT;
					PhaserGame.addTutorialGuy();
				}
				PhaserGame.machinePieces = [];
				PhaserGame.currentMachinePiece = 0;
				
				var type = PhaserGame.activeMachineType;
				var size = PhaserGame.activeMachineSize;
				var requiredParts = gameData.machines[type][size].requiredParts;
				var count = 0;
				
				var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
				var stars = PWG.Utils.clone(PhaserGame.config.dynamicViews.stars);
				var machineEdit = PWG.Utils.clone(PhaserGame.config.dynamicViews.machineEdit);
				var machinePieceMenuItem = PhaserGame.config.dynamicViews.machinePieceMenuItem;
				var machinePieceSprites = PWG.Utils.clone(PhaserGame.config.dynamicViews.machinePieceSprites);
				var machinePieceSpriteConfig = PhaserGame.config.machinePieceSpriteConfig;

				machineEdit.views.bg.img = PhaserGame.config.machineEditBackgrounds[type][size];
				
				var starsConfig = PhaserGame.config.starsConfig[type][size];
				stars.img = starsConfig.img;
				stars.x = starsConfig.x;
				stars.y = starsConfig.y;
				stars.attrs.width = starsConfig.width;
				stars.attrs.height = starsConfig.height;
				
				if(PhaserGame.newMachine) {
					stars.attrs.frame = 0;
				} else {
					stars.attrs.frame = starsConfig.frames;
				}

				machineEdit.views['stars'] = stars;
				
				PWG.Utils.each(
					requiredParts,
					function(part, idx) {
						var item = PWG.Utils.clone(machinePieceMenuItem);
						item.name = part.name;
						item.views.name.text = gameData.partNames[part.name];
						if(count > 0) {
							item.attrs.visible = false;
						} else {
							item.x += 100;
						}
						item.views.button.partValue = part.name;
						
						PhaserGame.machinePieces.push(item.name);
						count++;
						machineEdit.views.machinePieceName.views[part.name] = item;
						
						if(part.sprite) {
							var partSprite = PWG.Utils.clone(machinePieceSpriteConfig[type][size][part.name]);
							// 
							if(idx === 0) {
								partSprite.attrs.frame = 1;
							}
							machineEdit.views.machinePieceSprites.views[partSprite.name] = partSprite;
						}
					},
					this
				);

				// 

				PWG.ViewManager.addView(machineEdit, equipmentEdit, true);

				PWG.ViewManager.showView('global:equipmentEditGroup');
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.showView('global:cancelButton');

				PhaserGame.spriteTranslations = gameData.machines[type][size].spriteTranslations;
				PhaserGame.machinePartsComplete = false;
				PhaserGame.machineDirty = true;
			},
			shutdown: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.DEALER]) {
					PhaserGame.activeTutorial = TutorialTypes.DEALER;
					PhaserGame.addTutorialGuy();
				}
				PhaserGame.machinePieces = null;
				PWG.ViewManager.removeView('machineEdit', 'equipmentEdit');
				PWG.ViewManager.hideView('global:equipmentEditGroup');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.showView('global:backButton');
				PhaserGame.cancelAction = null;
				this.partsMenuType = '';
				PhaserGame.machinePartsComplete = false;
				PhaserGame.partsMenuOpen = false;
				PhaserGame.machineDirty = false;
			}
		},
		turnEnd: {
			create: function() {
				PWG.ViewManager.hideView('global:turnGroup:homeButton');
				PWG.ViewManager.hideView('global:backButton');
			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('yearSummary', 'turnEnd');
			}
		}
	}
};



var GridManager = function() {
	var module = {};

	module.grids = {};
	
	module.init = function(sectors, xCells, yCells, gridSize) {
		module.initGrid(sectors, xCells, yCells, gridSize);
		module.initBuildings(TurnManager.playerData.sectors);
	}
	
	module.initGrid = function(sectors, xCells, yCells, gridSize) {
		PWG.Utils.each(
			sectors,
			function(sector) {
				var gridCoordinates = PWG.GridGenerator.createRectangle(xCells, yCells, gridSize, gridSize);
				var grid = [];
				PWG.Utils.each(
					gridCoordinates,
					function(coordinate) {
						grid.push({
							frame: 0,
							x: coordinate.start.x,
							y: coordinate.start.y
						});
					},
					this
				);
				module.grids[sector] = grid;
			},
			this
		);
		// 
	};
	
	module.initBuildings = function(sectors) {
		// 
		PWG.Utils.each(
			sectors,
			function(sector, s) {
//				// 
				PWG.Utils.each(
					sector,
					function(building, b) {
						// 
						module.addBuilding(building, s);
					},
					this
				);
			},
			this
		);
	};

	module.addBuilding = function(building, sector) {
		// 
		if(building.type !== BuildingTypes.TRADE_ROUTE) {
			var frameKey = building.type.toUpperCase() + '_' + building.state.toUpperCase();
			module.grids[sector][building.cell].frame = TileCellFrames[frameKey];
		}
		// 
	};

	module.getRandomEmptyCellIndex = function(sector) {
		var cells = module.grids[sector];
		var emptyCells = [];
		var randomCellIdx;
		var randomCell;
		
		PWG.Utils.each(
			cells,
			function(cell, idx) {
				if(cell.frame === 0) {
					emptyCells.push(idx);
				}
			},
			this
		);
		randomCellIdx = Math.floor(Math.random() * (emptyCells.length - 1) + 1);
		// 
		return emptyCells[randomCellIdx];
	};
	
	module.updateBuildingState = function(sector, cell, type, state) {
		// 
		if(type !== BuildingTypes.TRADE_ROUTE) {
			var frameKey = type.toUpperCase() + '_' + state.toUpperCase();
			module.grids[sector][cell].frame = TileCellFrames[frameKey];
		}
	};
	
	module.update = function(sector, cell, value) {
		
	};
	
	return module;
}();

var TurnManager = function() {
	var turnData = {
		bankAdjustments: 0,
		profit: 0,
		bonuses: 0,
		newPlants: 0,
		newDealers: 0,
		newTradeRoutes: 0,
		newTractorModels: 0,
		newSkidsteerModels: 0,
		newTractors: 0,
		newSkidsteers: 0,
		wholesalePartsUsed: 0,
		emptiedWholesaleInventories: 0,
		newBuildings: [],
		newMachineModels: [],
		newMachines: [],
		machinesSold: [],
		newSuppliers: []
	};
	
	var module = {};

	module.turns;
	module.currentData = {};
	module.playerData = {};

	module.init = function() {
		// 
		module.playerData = PWG.Utils.clone(PhaserGame.playerData);
		
	};
	
	module.startTurn = function() {
		// 
		module.currentData = PWG.Utils.clone(turnData);
		
		module.playerData.bank += gameData.levels[module.playerData.level].startingBank;
		
		module.tempDealerCount = (module.playerData.buildingCount.dealer);
		// TurnManager.tempTradeRouteCount = (module.playerData.buildingCount.tradeRoute);
		module.tempSupplierCount = (module.playerData.suppliers.length) || 0;

		module.tempTradeRouteCount = {
			africa: 0,
			asia: 0,
			europe: 0,
			middleEast: 0,
			northPacific: 0,
			southPacific: 0,
			southAmerica: 0
		};

		PWG.Utils.each(
			module.playerData.sectors,
			function(sectorBuildings) {
				PWG.Utils.each(
					sectorBuildings,
					function(building) {
						if(building.type === BuildingTypes.TRADE_ROUTE) {
							module.tempTradeRouteCount[TradeRouteLocations[building.worldLocation]]++;
						}
					},
					this
				);
			},
			this
		);
	};
	
	module.updateBank = function(value) {
		// 
		module.playerData.bank += value;
		module.currentData.bankAdjustments += value;
		if(value > 0) {
			module.currentData.profit += value;
			module.playerData.profit += value;
		}
		PWG.EventCenter.trigger({ type: Events.BANK_UPDATED });
	};

	module.addBuilding = function(building) {
		// 
		module.playerData.sectors[building.sector][building.id] = building;
		module.currentData.newBuildings.push(building);
		module.playerData.buildingCount[building.type]++;
		
		switch(building.type) {
			case BuildingTypes.PLANT: 
			module.currentData.newPlants++;
			break;
			
			case BuildingTypes.DEALER: 
			module.currentData.newDealers++;
			break;
			
			case BuildingTypes.TRADE_ROUTE:
			module.currentData.newTradeRoutes++;
			break;
			
			default: 
			// 
			break;
		}
		// 
		module.playerData.bonusPoints += gameData.bonuses.buildings[building.type];

		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};
	
	module.updateBuilding = function(building) {
		// 
		module.playerData.sectors[building.sector][building.id] = building;
	};
	
	module.addMachineModel = function(model) {
		// 
		// module.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[PhaserGame.activeMachine.config.id] = model;
		BuildingManager.addMachineModelToPlant(PhaserGame.activeSector, PhaserGame.activeBuilding.id, model);
		module.playerData.modelCount[PhaserGame.activeMachineType]++;
		module.currentData.newMachineModels.push(model);
		if(model.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractorModels++;
		} else if(model.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteerModels++;
		}
	};

	module.addPlantInventory = function(machine) {
		// 
		module.currentData.newMachines.push(machine);
		if(machine.type === EquipmentTypes.TRACTOR) {
			module.currentData.newTractors++;
		} else if(machine.type === EquipmentTypes.SKID_STEER) {
			module.currentData.newSkidsteers++;
		}

		module.playerData.machinesBuilt[machine.type]++;
		module.playerData.machinesBuilt.total++;

		// test bonus points
		var total = module.playerData.machinesBuilt.total;

		PWG.Utils.each(
			gameData.bonuses.manufacturing,
			function(machineBonus, key) {
				// 
				if(total >= machineBonus && !module.playerData.bonusesAchieved[key]) {
					// 
					module.playerData.bonusesAchieved[key] = true;
					module.playerData.bonusPoints += gameData.bonuses.manufacturing[key];
					PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
				}
			},
			this
		);
	};
	
	module.removePlantInventory = function(machine) {
		
	};
	
	module.sellMachine = function(machine, amount) {
		// 
		module.currentData.machinesSold.push(machine);
		module.updateBank(amount);
	};
	
	module.addSupplier = function(supplier) {
		module.playerData.suppliers[supplier.id] = supplier;
		module.currentData.newSuppliers.push(supplier);
		module.playerData.bonusPoints += gameData.bonuses.suppliers.added;
		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};
	
	module.wholesalePartUsed = function() {
		module.currentData.wholesalePartsUsed++;
	};
	
	module.wholesaleInventoryEmptied = function(supplier) {
		
		module.currentData.emptiedWholesaleInventories++;
		module.playerData.bonusPoints += gameData.bonuses.suppliers.allPartsUsed;
		PWG.EventCenter.trigger({ type: Events.BONUSES_UPDATED });
	};

	module.get = function(prop) {
		// 
		if(module.playerData.hasOwnProperty(prop)) {
			return module.playerData[prop];
		} else if(module.currentData.hasOwnProperty(prop)) {
			return module.currentData[prop];
		} else {
			return;
		}
	};
	
	return module;
}();


var BuildingManager = function() {
	var module = {};
	
	module.PLANT_MAX_MODELS = 6;
	module.PLANT_MIN_SELL_INVENTORY = 3;
	module.PLANT_MIN_EXPORT_INVENTORY = 5;
	module.PLANT_MAX_INVENTORY = 100;
	module.PLANT_MAX_DEALERS = 6;

	module.DEALER_MAX_INVENTORY = 50;
	module.DEALER_MAX_SALE_QUANTITY = 5;
	module.DEALER_MAX_SALES_PER_YEAR = 25;
	module.DEALER_MIN_SALES_PER_YEAR = 10;
	
	module.TRADE_ROUTE_MAX_SALE_QUANTITY = 10;
	module.TRADE_ROUTE_MAX_SALES_PER_YEAR = 25;
	module.TRADE_ROUTE_MIN_SALES_PER_YEAR = 10;
	
	module.TIME_TO_BUILD_MACHINE = 2;
	module.TIME_TO_SELL_MACHINES = 3;
	module.MACHINE_PRODUCTION_COST = 1000;
	
	// BUILDING BASE CLASS
	function Building(config) {
		// 
		this.config = config;
		this.config.state = config.state || BuildingStates.CONSTRUCTION;
		this.config.age = config.age || 0;
	};
	
	Building.prototype.capacity = 0;
	Building.prototype.equipment = {};
	Building.prototype.inventory = {};
	Building.prototype.update = function() {
		// 
		if(this.config.state === BuildingStates.CONSTRUCTION && this.config.age >= this.constructionTime) {
			this.config.state = BuildingStates.ACTIVE;
			// 
			PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
		}
		this.config.age++;
		module.updateBuildingData.call(this, this.config);
	};

	// PLANT
	function Plant(config) {
		config.type = BuildingTypes.PLANT;
		Building.call(this, config);
		this.config.equipment = config.equipment || {};
		this.config.inventory = config.inventory || {};
		this.config.dealers = config.dealers || {};
		this.config.tradeRoutes = config.tradeRoutes || {};
		
		this.dealerNotifications = {};
		this.tradeRouteNotifications = {};
		
		if(PWG.Utils.objLength(this.config.equipment) > 0) {
			PWG.Utils.each(
				this.config.equipment,
				function(model) {
					this.dealerNotifications[model.id] = false;
					this.tradeRouteNotifications[model.id] = false;
				},
				this
			);
		}
		
		this.config.totalInventory = 0;
		if(PWG.Utils.objLength(this.config.inventory) > 0) {
			PWG.Utils.each(
				this.config.inventory,
				function(machineTypeInventory) {
					this.config.totalInventory += machineTypeInventory.length;
				},
				this
			);
		}
		
	}

	PWG.Utils.inherit(Plant, Building);
	
	Plant.prototype.constructionTime = 3;
	Plant.prototype.buildTime = 0;
	Plant.prototype.modelCapacity = 6;
 	Plant.prototype.addMachineModel = function(machine) {
		this.config.equipment[machine.id] = machine; 
		this.config.inventory[machine.id] = [];
		this.dealerNotifications[machine.id] = false;
		this.tradeRouteNotifications[machine.id] = false;
	};
	Plant.prototype.associateBuilding = function(building, property) {
		this.config[property][building.config.modelId] = building.config.id;
		TurnManager.updateBuilding(this.config);
	};
	Plant.prototype.update = function() {
		if(this.config.state !== BuildingStates.PAUSED) {
			Plant._super.update.apply(this, arguments);
			if(PWG.Utils.objLength(this.config.equipment) > 0) { 
				if(this.buildTime >= module.TIME_TO_BUILD_MACHINE) {
					PWG.Utils.each(
						this.config.equipment,
						function(machine) {
							// 
							if(machine.active) {
								var productionCost = machine.cost + module.MACHINE_PRODUCTION_COST;
								if(TurnManager.playerData.bank > productionCost) {
									if(this.config.totalInventory < module.PLANT_MAX_INVENTORY) {

										var allPartsAdded = true;
										if(PWG.Utils.objLength(machine.wholesaleParts) > 0) {
											// 
											PWG.Utils.each(
												machine.wholesaleParts,
												function(supplierId, part) {
													// 
													var supplier = WholesaleManager.suppliers[supplierId];
													if(supplier.config.quantity > 0) {
														var partUsed = WholesaleManager.usePart(part, machine.size, supplierId);
														if(!partUsed) {
															// 
															this.config.equipment[machine.id].active = false;
														}
													} else {
														// 
														this.config.equipment[machine.id].active = false;
														wholesalePartsAdded = false;
													}
												},
												this
											);
										}

										if(allPartsAdded) {
											// 
											PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-productionCost) });
											PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
											PWG.EventCenter.trigger({ type: Events.INVENTORY_ADDED, plant: this.config, machine: machine.id });

											this.config.totalInventory++;
											this.config.inventory[machine.id].push(machine);

											TurnManager.addPlantInventory(machine);

											// TRADE ROUTES
											if(this.config.inventory[machine.id].length > module.PLANT_MIN_EXPORT_INVENTORY && TurnManager.get('level') >= MIN_TRADE_ROUTE_LEVEL) {
												
												if(!this.config.tradeRoutes.hasOwnProperty(machine.id)) {
													
													if(!this.tradeRouteNotifications[machine.id]) {
														module.createTradeRoute(this, machine.id);
														this.tradeRouteNotifications[machine.id] = true;
													}
												} else {
													var tradeRouteId = this.config.tradeRoutes[machine.id];
													
													var tradeRoute = module.findBuilding(tradeRouteId);
													if(tradeRoute.config.state === BuildingStates.ACTIVE) {
														var inventory = this.config.inventory[machine.id];
														tradeRoute.addInventory(this.config);
													}
												}
											}

											// DEALERS
											// if there is enough inventory of this machine to sell and it doesn't already have a dealer...
											if(this.config.inventory[machine.id].length > module.PLANT_MIN_SELL_INVENTORY) {
												if(!this.config.dealers.hasOwnProperty(machine.id)) {
													// 
													if(!this.dealerNotifications[machine.id]) {
														module.createDealer(this, machine.id);
														this.dealerNotifications[machine.id] = true;
													}
												} else {
													var dealerId = this.config.dealers[machine.id];
													var dealer = module.findBuilding(dealerId);
													if(dealer.config.state === BuildingStates.ACTIVE) {
														var inventory = this.config.inventory[machine.id];
														dealer.addInventory(this.config);
													}
												}
											} 

											TurnManager.updateBuilding(this.config);
										} else {
											// notify issue with wholesale part supply
											// alert(this.config.id + ' could not manufacture ' + machine.id + ': no more wholesale parts');
										}

									} else {
										// notify output capacity reached
										// alert(this.config.id + ' created max inventory');
									}
								} else {
									// notify out of bank
									// alert('not enough money to create inventory');
								}
							} else {
								// notify machine needs attention
								// alert('machine needs attention');
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
	
	// DEALER
	function Dealer(config) {
		config.type = BuildingTypes.DEALER;
		var plant = module.findBuilding(config.plantId);
		var model = plant.config.equipment[config.modelId];
		var resellMultiplier = Math.floor(Math.random() * (this.resellMaxMultiplier - 1) + 2);
		// 
		Building.call(this, config);
		this.config.resell = config.resell || (resellMultiplier * model.cost) + module.MACHINE_PRODUCTION_COST;
		this.config.maxPerYear = config.maxPerYear || Math.floor(Math.random() * (module.DEALER_MAX_SALES_PER_YEAR - module.DEALER_MIN_SALES_PER_YEAR) + module.DEALER_MIN_SALES_PER_YEAR);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
		this.numberSold = 0;
	}
	PWG.Utils.inherit(Dealer, Building);

	Dealer.prototype.constructionTime = 1;
	Dealer.prototype.sellTime = 0;
	Dealer.prototype.capacity = 50;
	Dealer.prototype.resellMaxMultiplier = 6;
	Dealer.prototype.quantityPerYear = 25;
	Dealer.prototype.addInventory = function(plant) {
		// 
		// if(this.config.inventory.length < this.capacity) {
		if(this.numberSold < this.config.maxPerYear) {	
			var modelId = this.config.modelId;
			if(typeof(plant.inventory[modelId] !== 'undefined')) {
				try {
					while(plant.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
						// 
						this.config.inventory.push(plant.inventory[modelId].pop());
						plant.totalInventory--;
						this.numberSold++;
					}
					TurnManager.updateBuilding(this.config);
				} catch(e) {}
			}
		}
	};
	Dealer.prototype.update = function() {
		// 
		Dealer._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.DEALER_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// 
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// 
						PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, building: this.config });
						this.config.totalSales += this.config.resell;
						
						numToSell--;
					}
					// PWG.Utils.each(
					// 	this.config.inventory,
					// 	function(machine) {
					// 		TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
					// 	},
					// 	this
					// );
					TurnManager.updateBuilding(this.config);
					this.sellTime = 0;
				} else {
					this.sellTime++;
				}
			}
		}
	};

	// TRADE_ROUTE
	function TradeRoute(config) {
		config.type = BuildingTypes.TRADE_ROUTE;
		var plant = module.findBuilding(config.plantId);
		var model = plant.config.equipment[config.modelId];
		var resellMultiplier = Math.floor(Math.random() * (this.resellMaxMultiplier - 1) + 3);
		Building.call(this, config);
		this.config.resell = config.resell || (resellMultiplier * model.cost) + module.MACHINE_PRODUCTION_COST;
		this.config.maxPerYear = config.maxPerYear || Math.floor(Math.random() * (module.TRADE_ROUTE_MAX_SALES_PER_YEAR - module.TRADE_ROUTE_MIN_SALES_PER_YEAR) + module.DEALER_MIN_SALES_PER_YEAR);
		this.config.inventory = config.inventory || [];
		this.config.totalSales = config.totalSales || 0;
		// 
	}
	PWG.Utils.inherit(TradeRoute, Building);

	TradeRoute.prototype.constructionTime = 1;
	TradeRoute.prototype.sellTime = 0;
	TradeRoute.prototype.capacity = 50;
	TradeRoute.prototype.resellMaxMultiplier = 10;
	TradeRoute.prototype.quantityPerYear = 25;
	TradeRoute.prototype.addInventory = function(plant) {
		// 
		if(this.config.inventory.length < this.capacity) {
			var modelId = this.config.modelId;
			if(typeof(plant.inventory[modelId] !== 'undefined')) {
				try {
					while(plant.inventory[modelId].length > 0 && this.config.inventory.length < this.capacity) {
						// 
						this.config.inventory.push(plant.inventory[modelId].pop());
						plant.totalInventory--;
					}
					TurnManager.updateBuilding(this.config);
				} catch(e) {}
			}
		}
	};
	TradeRoute.prototype.update = function() {
		// 
		TradeRoute._super.update.apply(this, arguments);
		if(this.config.state === BuildingStates.ACTIVE) {
			if(this.config.inventory.length > 0) {
				if(this.sellTime >= module.TIME_TO_SELL_MACHINES) {
					var numToSell = Math.floor(Math.random() * (module.DEALER_MAX_SALE_QUANTITY - 1) + 1);
					if(numToSell > this.config.inventory.length) {
						numToSell = this.config.inventory.length;
					}
					// 
					while(numToSell > 0) {
						TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
						// 
						PWG.EventCenter.trigger({ type: Events.BUILDING_STATE_UPDATED, building: this });
						PWG.EventCenter.trigger({ type: Events.MACHINE_SOLD, building: this.config });
						this.config.totalSales += this.config.resell;

						numToSell--;
					}
					// PWG.Utils.each(
					// 	this.config.inventory,
					// 	function(machine) {
					// 		TurnManager.sellMachine(this.config.inventory.pop(), this.config.resell);
					// 	},
					// 	this
					// );
					TurnManager.updateBuilding(this.config);
					this.sellTime = 0;
				} else {
					this.sellTime++;
				}
			}
		}
	};

	module.sectors = [ {}, {}, {}, {}, {} ];
	module.dealers = [];
	module.tradeRoutes = [];
	
	module.init = function() {
		// 
		PWG.Utils.each(
			TurnManager.playerData.sectors,
			function(sector, s) {
				// trace('\tsectors['+s+'] = ', sector)
				PWG.Utils.each(
					sector,
					function(building, id) {
						// 
						if(building.type === BuildingTypes.PLANT) {
							module.sectors[s][building.id] = new Plant(building);
						} else if(building.type === BuildingTypes.DEALER) {
							module.sectors[s][building.id] = new Dealer(building);
						} else if(building.type === BuildingTypes.TRADE_ROUTE) {
							module.sectors[s][building.id] = new TradeRoute(building);
						}
					},
					this
				);
			},
			this
		);
		// PWG.Utils.each(
		// 	TurnManager.playerData.dealers,
		// 	function(dealer) {
		// 		module.dealers.push(new Dealer(dealer));
		// 	},
		// 	this
		// );
		// PWG.Utils.each(
		// 	TurnManager.playerData.tradeRoutes,
		// 	function(tradeRoute) {
		// 		// 
		// 		module.tradeRoutes.push(new TradeRoute(tradeRoute));
		// 	},
		// 	this
		// );
		// 
	};
	
	module.createPlant = function(config) {
		// 
		var type = BuildingTypes.PLANT;
		var count = TurnManager.playerData.buildingCount[type];
		// 
		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		
		if(TurnManager.playerData.bank >= gameData.buildings[type].cost) {
			var plant = new Plant(config);
			// 
			PWG.EventCenter.trigger({ type: Events.UPDATE_BANK, value: (-gameData.buildings[type].cost) });
			// 
			module.updateBuildings(plant);
			return true;
		} else {
			// 
			return false;
		}
	};
	
	module.addMachineModelToPlant = function(sector, plantId, machine) {
		module.sectors[sector][plantId].addMachineModel(machine);
	};
	
	// create dealer instance to store for later use if user chooses to add
	module.createDealer = function(plant, modelId) {
		var model;
		var count = PWG.Utils.objLength(plant.config.equipment);
		var index = 0;

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.DEALER];
		var type = BuildingTypes.DEALER;
		var dealerId = type + ((TurnManager.tempDealerCount) + 1);
		var dealerName = type.toUpperCase() + ' ' + TurnManager.tempDealerCount;
		TurnManager.tempDealerCount++;
		
		// 
		model = plant.config.equipment[modelId];

		// 
		if(!plant.config.dealers.hasOwnProperty(model.id)) {
			var dealer = new Dealer({
				id: dealerId,
				name: dealerName,
				modelId: model.id,
				plantId: plant.config.id,
				// plant: plant.config,
				sector: plant.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_DEALER_OPPORTUNITY, plant: plant.config, dealer: dealer });
		}
	};
	
	module.addDealer = function(dealer) {
		var plant = module.findBuilding(dealer.config.plantId);
		plant.associateBuilding(dealer, 'dealers');
		module.dealers.push(dealer);
		module.updateBuildings(dealer);
	};
	
	module.addInventoryToDealer = function(plantId, dealerIdx) {
		var equipment = module.sectors.factories[plantId].equipment;
		var dealer = module.sectors.dealers[dealerIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					dealer.inventory.push(machine);
				},
				this
			);
		} else {
			// notify plant has no equipment
		}
	};
	
	module.createTradeRoute = function(plant, modelId) {
		// for testing, to trigger in console: 
		// var plant1 = BuildingManager.findBuilding('plant1')
		// BuildingManager.createTradeRoute(plant1, [ a model id from plant1.config.equipement ])
		var model;
		var count = PWG.Utils.objLength(plant.config.equipment);
		var index = 0;

		// var buildingCount = TurnManager.playerData.buildingCount[BuildingTypes.TRADE_ROUTE];
		var type = BuildingTypes.TRADE_ROUTE;
		var worldLocation = Math.floor(Math.random() * (TradeRouteLocations.length));
		var area = TradeRouteLocations[worldLocation];

		var tradeRouteId = type + '_' + area + ((TurnManager.tempTradeRouteCount[area]) + 1);
		var tradeRouteName = TradeRouteNames[area].toUpperCase() + '\n' + TradeRouteNames.global.toUpperCase() + ' ' + ((TurnManager.tempTradeRouteCount[area]) + 1);
		
		TurnManager.tempTradeRouteCount[area]++;

		// 
		model = plant.config.equipment[modelId];

		// 
		if(!plant.config.tradeRoutes.hasOwnProperty(model.id)) {
			var tradeRoute = new TradeRoute({
				id: tradeRouteId,
				name: tradeRouteName,
				worldLocation: worldLocation,
				modelId: model.id,
				plantId: plant.config.id,
				// plant: plant.config,
				sector: plant.config.sector
			});

			PWG.EventCenter.trigger({ type: Events.ADD_TRADE_ROUTE_OPPORTUNITY, plant: plant.config, tradeRoute: tradeRoute });
		}
	};

	module.addTradeRoute = function(tradeRoute) {
		var plant = module.findBuilding(tradeRoute.config.plantId);
		plant.associateBuilding(tradeRoute, 'tradeRoutes');
		module.tradeRoutes.push(tradeRoute);
		module.updateBuildings(tradeRoute);
	};

	module.addInventoryToTradeRoute = function(plantId, tradeRouteIdx) {
		var equipment = module.sectors.factories[plantId].equipment;
		var tradeRoute = module.sectors.tradeRoutes[tradeRouteIdx];

		if(equipment.length > 0) {
			PWG.Utils.each(
				equipment,
				function(machine) {
					tradeRoute.inventory.push(machine);
				},
				this
			);
		} else {
			// notify plant has no equipment
		}
	};

	module.updateBuildings = function(building) {
		module.sectors[building.config.sector][building.config.id] = building;
		module.addBuildingToTurnManager(building.config);
	};
	
	module.update = function() {
		// update factories
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				PWG.Utils.each(
					sector,
					function(plant) {
						plant.update();
					},
					this
				);
			},
			module
		);
		// update dealers
		PWG.Utils.each(
			module.dealers,
			function(dealer) {
				dealer.update();
			},
			this
		);

		PWG.Utils.each(
			module.tradeRoutes,
			function(tradeRoute) {
				tradeRoute.update();
			},
			this
		);
	};

	module.getBuilding = function(sector, cell) {
		var config = {};
		// 
		
		PWG.Utils.each(
			module.sectors[sector],
			function(building) {
				if(building.config.cell === cell) {
					// 
					config = building.config;
				}
			},
			this
		);
		return config;
	};
	
	module.findBuilding = function(buildingId) {
		var building = null;
		
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				if(sector.hasOwnProperty(buildingId)) {
					building = sector[buildingId];
				}
			},
			this
		);
		return building;
	};
	
	module.getMachineModelInventory = function(plantId, machineId) {
		var count = 0;
		var plant = module.findBuilding(plantId);
		// 
		if(plant.config.inventory[machineId]) {
			count = plant.config.inventory[machineId].length;
		}
		return count;
	};
	
	module.addBuildingToTurnManager = function(config) {
		// 
		TurnManager.addBuilding(config);
	};
	
	module.updateBuildingData = function(config) {
		// 
		TurnManager.updateBuilding(config);
	};

	module.getPlantModelCapacity = function() {
		return Plant.modelCapacity;
	};
	
	module.getExistingTradeRoutes = function() {
		var existingTradeRoutes = {};
		PWG.Utils.each(
			module.sectors,
			function(sector) {
				PWG.Utils.each(
					sector,
					function(building) {
						if(building.config.type === BuildingTypes.TRADE_ROUTE) {
							existingTradeRoutes[building.config.id] = building.config;
						}
					},
					this
		 		);
			},
			this
		);
		
		return existingTradeRoutes;
	};
	
	module.removeBuilding = function(sector, buildingId) {
		// 
		if(module.sectors[sector].hasOwnProperty(buildingId)) {
			delete module.sectors[sector][buildingId];
		}
	};
	
	module.getMachineName = function(count) {
		if(count > 701) {
			var first = (Math.floor(count/702)) - 1;
			var second = Math.floor(((count/26) - 1) % 26);
			var third = (count % 26);
			return String(alphabet.UPPER[first] + alphabet.UPPER[second] + alphabet.UPPER[third]);
		} else if(count > 25) {
			var first = (Math.floor(count/26)) - 1;
			var second = (count % 26);
			return String(alphabet.UPPER[first] + alphabet.UPPER[second]);
		} else {
			return alphabet.UPPER[count];
		}
	};
	
	return module;
	
}();

var TradeRouteManager = function() {
	var module = {};
	
	
	return module;
}();

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
		// 
		this.config = config;

		this.config.quantity = config.quantity || module.calculateQuantity();
		this.config.cost = config.cost || module.calculateCostModifier(this.config);
	}
	module.suppliers = {};
	// module.parts = [{}, {}, {}, {}, {}];
	module.parts = {};
	
	module.init = function() {
		// 
		module.suppliersAdded = 0;
		module.supplierPending = false;
		// establish 
		module.turnMax = (Math.floor(Math.random() * (module.SUPPLIERS_PER_TURN_MULTIPLIER - 1) + 1)) + TurnManager.playerData.level;
		// 
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
				// 
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
		if(!module.supplierPending) {
			// 
			// haven't made max number of suppliers for this turn
			if(module.suppliersAdded < module.turnMax) { 
				module.weekLag++;
				// waited long enough since last new supplier
				if(module.weekLag > module.WEEK_LAG_AMOUNT) {
					// 
					module.weekLag = 0;

					var diceRoll = PWG.Utils.diceRoll(); 
					// 
					// beat add probability test
					if(diceRoll >= module.POSSIBILE_SUPPLIER_CHANCE) {

						var config = {};
						var parts = gameData.parts;
						var type = PWG.Utils.randomProperty(PartTypes);
						// var size = PWG.Utils.randomProperty(EquipmentSizes);
						// 
						var size = PWG.Utils.randomKey(gameData.parts[type]);
						// 
						var quality = (Math.floor(Math.random() * (gameData.parts[type][size].length - 1)));
						// 
						// don't already have max suppliers for this part type
						if(PWG.Utils.objLength(module.parts[type][size]) < module.SUPPLIERS_PER_PART_MAX) {
							config.part = gameData.parts[type][size][quality];
							config.partType = type;
							config.partSize = size;
							config.partDescription = PartDescriptions[type];
							module.supplierPending = true;
							module.createSupplier(config);
						}
					}
				}
			}
		}
	};
	
	module.createSupplier = function(config) {
		// 
		var type = BuildingTypes.SUPPLIER;
		var count = TurnManager.tempSupplierCount;

		config.id = type + count;
		config.name = type.toUpperCase() + ' ' + (count + 1);
		config.location = SupplierLocations[(Math.floor(Math.random() * SupplierLocations.length))];
		TurnManager.tempSupplierCount++;

		var supplier = new Supplier(config);
		PWG.EventCenter.trigger({ type: Events.ADD_SUPPLIER_OPPORTUNITY, supplier: supplier });
	};

	module.addSupplier = function(supplier) {
		// 
		module.supplierPending = false;
		module.suppliersAdded++;
		module.suppliers[supplier.config.id] = supplier;
		// 
		module.parts[supplier.config.partType][supplier.config.partSize][supplier.config.id] = supplier.config;
		// 
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
		// 
		return partCount;
	};
	
	module.usePart = function(type, size, supplierId) {
		// 
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
		// 
		delete module.parts[supplier.partType][supplier.partSize][supplier.id];
		TurnManager.wholesaleInventoryEmptied(supplier);
	};
	
	module.calculateQuantity = function() {
		return (Math.floor(Math.random() * (module.PARTS_QUANTITY_MAX - module.PARTS_QUANTITY_MIN) + module.PARTS_QUANTITY_MIN) * module.PARTS_QUANTITY_MULTIPLIER);
	};
	
	module.calculateCostModifier = function(config) {
		// 
		var baseCost = config.part.cost;
		// 
		var rand = (Math.floor(Math.random() * (module.PARTS_COST_MODIFIER_MAX - module.PARTS_COST_MODIFIER_MIN) + module.PARTS_COST_MODIFIER_MIN));
		// trace('\trand = ' + rand)
		var costModifier = rand / 100;
		// 
		return (baseCost * costModifier) * config.quantity;
	};

	return module;
}();

var AnimationManager = function() {
	var module = {};
	
	module.animations = {};
	module.active = {};
	module.parents = {};
	module.childKeys = {};
	
	module.add = function(config) {
		// 
		if(!module.animations[config.key]) {
			module.animations[config.key] = [];
			module.parents[config.key] = PWG.ViewManager.getControllerFromPath(config.parentPath);
		}
		
		var viewConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews[config.type]);
		viewConfig.name = config.name;
		viewConfig.x += config.x;
		viewConfig.y += config.y;
		
		config.controller = PWG.ViewManager.addView(viewConfig, module.parents[config.key]);
		config.controller.view.events.onAnimationComplete.add(module.onAnimationComplete, this);
		
		module.animations[config.key].push(config);
		// 
		if(!module.active[config.key]) {
			module.active[config.key] = true;
			module.start(config.key);
		}
	};
	
	module.getNextIndex = function(key) {
		var index;
		if(!module.childKeys.hasOwnProperty(key)) {
			module.childKeys[key] = 0;
		} else {
			module.childKeys[key]++;
		}
		index = module.childKeys[key];
		
		return index;
	};
	
	module.start = function(key, name) {
		// 
		if(module.animations[key].length > 0) {
			var config = module.animations[key][0];
			// 
			var animation = name || config.animationName;

			if(!module.active[key]) {
				module.active[key] = true;
			}
			var path = config.parentPath + ':' + config.name;
			// 
			// PWG.ViewManager.showView(path);
			PWG.PhaserAnimation.play(config.name, animation, true);
		} else {
		}
	};
	
	module.onAnimationComplete = function(view) {
		var config = module.findConfig(view.name);
		// 
		module.active[config.key] = false;
		module.removeView(config);
		
		if(module.animations[config.key] && module.animations[config.key].length > 0) {
			// trace('\tarray length = ' + module.animations[config.key].length)
			module.animations[config.key].splice(0, 1);
			module.start(config.key);
		}
		// 
	};

	module.findConfig = function(name) {
		var config = {};
		PWG.Utils.each(
			module.animations,
			function(animationArray) {
				PWG.Utils.each(
					animationArray,
					function(animation) {
						if(animation.name === name) {
							config = animation;
						}
					},
					this
				);
			},
			this
		);
		return config;
	};
	
	module.removeView = function(config) {
		var path = config.parentPath + ':' + config.name;
		// PWG.ViewManager.hideView(path);
		// PWG.ViewManager.removeView(config.controller.name, config.parentPath);
	};
	
	module.reset = function() {
		PWG.Utils.each(
			module.animations,
			function(animation, key) {
				if(this.active[key]) {
					this.removeView(this.animations[key][0]);
				}
				
				while(animation.length > 0) {
					animation.pop();
				}
				delete this.animations[key];
				delete this.parents[key];
				delete this.active[key];
			},
			module
		);
	};
	
	return module;
}();

var GameConfig = function() {
	
	var module = {};

	module.loadingAnimation = true;
	
	module.init = function(callback, context) {
		// stage sizes cached
		var winW = PWG.Stage.winW;
		var winH = PWG.Stage.winH;
		var gameW = PWG.Stage.gameW;
		var gameH = PWG.Stage.gameH;
		var gameUnit = PWG.Stage.unit;

		var defaultWorld = {
			x: 0,
			y: 0,
			width: gameW,
			height: gameH
		};
		var controlButtons = {
			left: {
				x: 0,
			},
			right: {
				x: (gameW - ((gameUnit * 7)/3))
			},
			bottom: {
				y: gameH - (gameUnit * 2.2)
			},
			width: (gameUnit * 7)/3,
			height: (gameUnit * 6)/3
		};
		var fontSizes = {
			xxs: (gameUnit * 0.25),
			xs: (gameUnit * 0.3),
			sm: (gameUnit * 0.4),
			md: (gameUnit * 0.6),
			lg: (gameUnit * 1.0),
			xl: (gameUnit * 1.5)
		};
		var palette = {
			darkRed: '#ba1d3a',
			lightRed: '#e21a49',
			orange1: '#fca600',
			orange2: '#e9a547',
			orange3: '#e58f25',
			green: '#009b1d',
			black: '#000000',
			white: '#ffffff'
		};

		var worldPositions = {
			us: {
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 9.5),
				height: (gameUnit * 4.5)
			},
			usSectors: [
			// northeast
			{
				x: gameUnit * 5.7,
				y: (gameUnit * 6),
				width: (gameUnit * 4),
				height: (gameUnit * 2.5)
			},
			// southeast
			{
				x: gameUnit * 5.7,
				y: (gameUnit * 8.5),
				width: (gameUnit * 1.25),
				height: (gameUnit * 1.25)
			},
			// midwest
			{
				x: gameUnit * 3.7,
				y: (gameUnit * 6),
				width: (gameUnit * 2),
				height: (gameUnit * 4.5)
			},
			// northwest
			{
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 3.5),
				height: (gameUnit * 2)
			},
			// southeast
			{
				x: gameUnit * 0.2,
				y: (gameUnit * 8),
				width: (gameUnit * 3.5),
				height: (gameUnit * 2)
			}
			]		
		};
		var pinPositions = {
			us: {
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 9.5),
				height: (gameUnit * 4.5)
			},
			usSectors: [
			// northeast
			{
				x: gameUnit * 5.5,
				y: gameUnit * 7.2
			},
			// southeast
			{
				x: gameUnit * 5.5,
				y: gameUnit * 9.4
			},
			// midwest
			{
				x: gameUnit * 3.4,
				y: gameUnit * 7
			},
			// northwest
			{
				x: gameUnit * 1.3,
				y: gameUnit * 6.4
			},
			// southwest
			{
				x: gameUnit * 1.3,
				y: gameUnit * 9
			}
			]		
		};
		var pinOffsets = {
			plant: {
				x: gameUnit * 0,
				y: gameUnit * 0
			},
			dealer: {
				x: gameUnit * 0.76,
				y: gameUnit * 0
			}
		};
		var pinImages = {
			plant: 'pinPlant',
			dealer: 'pinDealer',
			tradeRoute: 'pinTradeRoute'
		};
		var pinFills = {
			plant: [
				palette.white,
				palette.white,
				palette.white,
				palette.black,
				palette.white
			],
			dealer: [
				palette.black,
				palette.white,
				palette.white,
				palette.black,
				palette.white
			]
		};

		var notificationText = {
			tutorial: {
				init: {
					content: 'Hello! Let\'s get started.\nClick the gear below to\ncheck out the game manual.\nOtherwise, click the ignition\nto start the game.'
				},
				world: {
					content: '\nThis is the world map.\nClick on a US Sector icon\nto see a detailed\nview of the area.'
				},
				usDetail: {
					content: '\nThis is a grid of locations\nin this area.\nClick an empty cell\nto create a new Plant.'
				},
				plant: {
					content: '\nYour Plant has finished\nconstruction!\nClick on the Plant\nto see details.'
				},
				plantDetails: {
					content: '\nHere are the details\nof your new Plant.\nNot much going on yet.\nClick the wrench.'
				},
				equipmentList: {
					content: '\nThis is a list of your Plant\'s\nTractors and Skid Steers.\nClick an empty slot\nto add a new model.'
				},
				equipmentCreate: {
					content: '\nClick on a crate to choose\na new Tractor or Skid Steer\nmodel and its size.'
				},
				equipmentEdit: {
					content: '\nClick the part name to\nsee the parts you can buy.\nThe machine behind me will cycle\nthrough parts to be added.'
				},
				dealer: {
					content: 'Great! Your Plant will now\nbegin manufacturing. Once it has\nmade 3, Dealers will begin\noffering to sell your equipment.\nLook for the envelope in the top,\nleft corner of US Sector screen.'
				},
				supplier: {
					content: 'Suppliers will now begin\nto offer you parts at a\ndiscount for bulk orders.\nLook for the tire icon in\nthe bottom, left corner.'
				},
				tradeRoute: {
					content: 'Now you\'ll want to start establishing\nInternational Trade Routes.\nBe sure to create some new\nTractors and Skid Steers\nas you will need inventory to export.'
				},
				outOfWholesaleParts: {
					content: ''
				},
				allCompleted: {
					content: 'CONGRATULATIONS!\nYou\'ve become an expert\nGlobal Trader!\n\nWant to play more?\nTry to beat your previous score.'
				}
			},
			notEnoughMoney: {
				content: 'You need to earn\nmore money first'
			},
			buildingCreate: {
				content: 'Add new Plant?'
			},
			dealer: {
				content: 'We would like to sell ~{quantity}~\nper year of your\n~{plant}~ ~{model}~\ninventory at $~{resell}~ each.'
			},
			supplierAvailableIcon: {
				content: 'Build Supplier\nRelationship',
			},
			supplierNotification: {
				content: 'We would like to offer you\n~{quantity}~ ~{quality}~ ~{size}~\n~{type}~\nfor the cost of ~{cost}~.'
			},
			wholesaleParts: {
				content: 'Click here to view\nwholesale parts'
			},
			tradeRoute: {
				content: 'We would like to import ~{quantity}~\nper year of your ~{plant}~\n~{model}~ inventory\nat $~{resell}~ each.'
			},
			transAtlantic: { 
				content: 'Transatlantic Trade and\nInvestment Partnership (TTIP)\nopens new trade opportunities\nwith the European Union',
			},
			transPacific: {
				content: 'Trans-Pacific Partnership (TPP)\nopens trade to several countries\non both sides of the Pacific.'
			},
			impExpBank: {
				content: 'Reauthorization of the\nExport-Import Bank of the US\nprovides funding to facilitate\ntrading around the world.'
			}
		};
		var notificationPeopleImages = {
			tutorial: 'tutorialGuy',
			dealer: 'dealerGirl',
			supplier: 'supplierGuy',
			tradeRoutes: {
				africa: 'tradeRouteAfricaNotification',
				asia: 'tradeRouteAsiaNotification',
				europe: 'tradeRouteEuropeNotification',
				middleEast: 'tradeRouteMiddleEastNotification',
				southPacific: 'tradeRouteSouthPacificNotification',
				southAmerica: 'tradeRouteSouthAmericaNotification'
			}
		};
		var tradeRouteArrowConfig = {
			africa: {
				img: 'tradeRouteAfrica',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.45),
				attrs: {
					width: (gameUnit * 3.5),
					height: (gameUnit * 3.5) * 0.43
				}
			},
			asia: {
				img: 'tradeRouteAsia',
				x: (gameUnit * 1.8),
				y: (gameUnit * 5.5),
				attrs: {
					width: (gameUnit * 5.25),
					height: (gameUnit * 5.25) * 0.19
				}
			},
			europe: {
				img: 'tradeRouteEurope',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6),
				attrs: {
					width: (gameUnit * 2.5),
					height: (gameUnit * 2.75) * 0.2
				}
			},
			middleEast: {
				img: 'tradeRouteMiddleEast',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 4.25),
					height: (gameUnit * 4.25) * 0.22
				}
			},
			// northPacific: {
			// 	img: 'tradeRoutePacificNorth',
			// 	x: (gameUnit * 1.8),
			// 	y: (gameUnit * 6.75),
			// 	attrs: {
			// 		width: (gameUnit * 6.25),
			// 		height: (gameUnit * 6.25) * 0.22
			// 	}
			// },
			southPacific: {
				img: 'tradeRoutePacificSouth',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 6),
					height: (gameUnit * 6) * 0.4
				}
			}, 
			southAmerica: {
				img: 'tradeRouteSouthAmerica',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 1),
					height: (gameUnit * 1) * 2.03
				}
			}
		};
		var tradeRoutePinConfig = {
			africa: {
				x: (gameUnit * 4.6),
				y: (gameUnit * 7.75)
			},
			asia: {
				x: (gameUnit * 6.75),
				y: (gameUnit * 5.75)
			},
			europe: {
				x: (gameUnit * 4.25),
				y: (gameUnit * 5.9)
			},
			middleEast: {
				x: (gameUnit * 5.75),
				y: (gameUnit * 6.25)
			},
			// northPacific: {
			// 	x: (gameUnit * 7.5),
			// 	y: (gameUnit * 6.2)
			// },
			southPacific: {
				x: (gameUnit * 7.5),
				y: (gameUnit * 8.5)
			},
			southAmerica: {
				x: (gameUnit * 2.5),
				y: (gameUnit * 8.25)
			}
		};
		var tradeRouteAlertIconConfig = {
			africa: {
				x: (gameUnit * 4.75),
				y: (gameUnit * 8.25)
			},
			asia: {
				x: (gameUnit * 7.25),
				y: (gameUnit * 6)
			},
			europe: {
				x: (gameUnit * 4.75),
				y: (gameUnit * 6.25)
			},
			middleEast: {
				x: (gameUnit * 6),
				y: (gameUnit * 6.5)
			},
			// northPacific: {
			// 	x: (gameUnit * 8),
			// 	y: (gameUnit * 6.5)
			// },
			southPacific: {
				x: (gameUnit * 7.75),
				y: (gameUnit * 8.5)
			},
			southAmerica: {
				x: (gameUnit * 2.75),
				y: (gameUnit * 8.5)
			}
		};

		var starsConfig = {
			tractor: {
				basic: {
					img: 'starsThree',
					frames: 3,
					x: (gameW/2) - (((gameUnit * 0.55) * 3)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.55) * 3),
					height: ((gameUnit * 0.55) * 3) * 0.2 
				},
				medium: {
					img: 'starsFour',
					frames: 4,
					x: (gameW/2) - (((gameUnit * 0.55) * 4)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.555) * 4),
					height: ((gameUnit * 0.555) * 4) * 0.147
				},
				heavy: {
					img: 'starsFive',
					frames: 5,
					x: (gameW/2) - (((gameUnit * 0.56) * 5)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.56) * 5),
					height: ((gameUnit * 0.56) * 5) * 0.116
				}
			},
			skidsteer: {
				basic: {
					img: 'starsFour',
					frames: 4,
					x: (gameW/2) - (((gameUnit * 0.55) * 4)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.555) * 4),
					height: ((gameUnit * 0.555) * 4) * 0.147
				},
				medium: {
					img: 'starsFive',
					frames: 5,
					x: (gameW/2) - (((gameUnit * 0.56) * 5)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.56) * 5),
					height: ((gameUnit * 0.56) * 5) * 0.116
				},
				heavy: {
					img: 'starsSix',
					frames: 6,
					x: (gameW/2) - (((gameUnit * 0.565) * 6)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.565) * 6),
					height: ((gameUnit * 0.565) * 6) * 0.094
					// img: 'starsSeven',
					// x: (gameW/2) - (((gameUnit * 0.57) * 7)/2),
					// y: (gameUnit * 13.25),
					// width: ((gameUnit * 0.57) * 7),
					// height: ((gameUnit * 0.57) * 7) * 0.08
				}
			}
		};
		var machineEditBackgrounds = {
			tractor: {
				basic: 'tractorBasicBg',
				medium: 'tractorMediumBg',
				heavy: 'tractorHeavyBg'
			},
			skidsteer: {
				basic: 'skidsteerBasicBg',
				medium: 'skidsteerMediumBg',
				heavy: 'skidsteerHeavyBg'
			}
		};
		var machinePieceSpriteConfig = {
			tractor: {
				basic: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorBasicEngine',
						x: (gameUnit * 0.6),
						y: (gameUnit * 5.75),
						attrs: {
							width: gameUnit * 4.9,
							height: (gameUnit * 4.8) * 1.1,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editTractorBasicTires',
						x: (gameUnit * 0.14),
						y: (gameUnit * 6.35),
						attrs: {
							width: gameUnit * 8.9,
							height: (gameUnit * 8.7) * 0.64,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorBasicCab',
						x: (gameUnit * 3.9),
						y: (gameUnit * 4.85),
						attrs: {
							width: gameUnit * 3.2,
							height: (gameUnit * 3.05) * 1.47,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				medium: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorMediumEngine',
						x: (gameUnit * 0.97),
						y: (gameUnit * 6.5),
						attrs: {
							width: gameUnit * 4.2,
							height: (gameUnit * 4.2) * 1.04,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editTractorMediumTires',
						x: (gameUnit * 0.3),
						y: (gameUnit * 4.85),
						attrs: {
							width: gameUnit * 8.36,
							height: (gameUnit * 8.36) * 0.89,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorMediumCab',
						x: (gameUnit * 3.77),
						y: (gameUnit * 3.4),
						attrs: {
							width: gameUnit * 2.4,
							height: (gameUnit * 2.4) * 2.13,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				heavy: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorHeavyEngine',
						x: (gameUnit * 0.5),
						y: (gameUnit * 5.5),
						attrs: {
							width: gameUnit * 4.7,
							height: (gameUnit * 4.7) * 1.04,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tracks: {
						type: 'sprite',
						name: 'tracks',
						img: 'editTractorHeavyTracks',
						x: (gameUnit * 0.37),
						y: (gameUnit * 7.4),
						attrs: {
							width: gameUnit * 8.6,
							height: (gameUnit * 8.6) * 0.57,
							frame: 0
						},
						// input: gameLogic.input.tracksSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorHeavyCab',
						x: (gameUnit * 2.8),
						y: (gameUnit * 3.05),
						attrs: {
							width: gameUnit * 4.9,
							height: (gameUnit * 4.9) * 1.31,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				}
			},
			skidsteer: {
				basic: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerBasicBucket',
						x: (gameUnit * 1.8),
						y: (gameUnit * 8),
						attrs: {
							width: gameUnit * 6.3,
							height: (gameUnit * 6.3) * 0.7,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editSkidsteerBasicTires',
						x: (gameUnit * 1.6),
						y: (gameUnit * 8.4),
						attrs: {
							width: gameUnit * 4.5,
							height: (gameUnit * 4.5) * 0.64,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerBasicCab',
						x: (gameUnit * 2.37),
						y: (gameUnit * 5.62),
						attrs: {
							width: gameUnit * 3.24,
							height: (gameUnit * 3.24) * 1.09,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				medium: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerMediumBucket',
						x: (gameUnit * 2.975),
						y: (gameUnit * 8.35),
						attrs: {
							width: gameUnit * 5.2,
							height: (gameUnit * 5.2) * 0.93,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editSkidsteerMediumTires',
						x: (gameUnit * 1.73),
						y: (gameUnit * 8.55),
						attrs: {
							width: gameUnit * 2.25,
							height: (gameUnit * 2.25) * 1.1,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerMediumCab',
						x: (gameUnit * 2.15),
						y: (gameUnit * 5.60),
						attrs: {
							width: gameUnit * 4.15,
							height: (gameUnit * 4.15) * 0.91,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				heavy: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerHeavyBucket',
						x: (gameUnit * 1.61),
						y: (gameUnit * 4.0),
						attrs: {
							width: gameUnit * 7.28,
							height: (gameUnit * 7.28) * 0.97,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tracks: {
						type: 'sprite',
						name: 'tracks',
						img: 'editSkidsteerHeavyTracks',
						x: (gameUnit * 0.55),
						y: (gameUnit * 8.25),
						attrs: {
							width: gameUnit * 6.9,
							height: (gameUnit * 6.9) * 0.53,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerHeavyCab',
						x: (gameUnit * 1.68),
						y: (gameUnit * 6.73),
						attrs: {
							width: gameUnit * 4.6,
							height: (gameUnit * 4.6) * 0.69,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					},
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editSkidsteerHeavyEngine',
						x: (gameUnit * 4.05),
						y: (gameUnit * 9.2),
						attrs: {
							width: gameUnit * 2.5,
							height: (gameUnit * 2.5) * 0.69,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					}
				}
			}
		};

		var dynamicViews = {
			// tutorial guy
			tutorialGuy: {
				type: 'group',
				name: 'tutorialGuy',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: (gameUnit * 1.66),
						y: (gameUnit * 2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white,
							'text-align': 'center'
						},
						position: {
							centerX: true
						}
					},
					submenuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					submenuText: {
						type: 'text',
						name: 'submenuText',
						text: 'DISMISS',
						x: 0,
						y: gameUnit * 13.25,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					dismissButton: {
						type: 'sprite',
						name: 'dismissButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34,
							alpha: 0
						},
						input: gameLogic.input.dismissTutorial
					}
				}
			},
			// manual
			manualPage: {
				type: 'group',
				name: 'manualPage',
				offsetY: (gameUnit * 2),
				views: {
					bg: {
						type: 'sprite',
						name: 'pageBg',
						img: 'manualPage',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					title: {
						type: 'text',
						name: 'title',
						text: '',
						x: (gameUnit * 2),
						y: (gameUnit * 0.5),
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.black,
							'text-align': 'center'
						},
						position: {
							// centerX: true
						}
					},
					subtitle: {
						type: 'text',
						name: 'subtitle',
						text: '',
						x: (gameUnit * 2),
						y: (gameUnit * 2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black,
							'text-align': 'center'
						},
						position: {
							// centerX: true
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'invisButton',
						img: 'blockWhite',
						x: gameW - (gameUnit * 2),
						y: gameH - (gameUnit * 4.5),
						attrs: {
							width: gameUnit * 2,
							height: gameUnit * 2,
							alpha: 0
						},
						input: gameLogic.input.manualPageForward
					},
					backPage: {
						type: 'sprite',
						name: 'backPage',
						img: 'buttonBack',
						x: gameW - (gameUnit * 5),
						y: gameH - (gameUnit * 4.5),
						attrs: {
							width: controlButtons.width,
							height: controlButtons.height,
							visible: false
						},
						input: gameLogic.input.manualPageBackward
					}
				}
			},
			manualPageText: {
				type: 'text',
				name: 'pageText',
				text: '',
				x: gameUnit * 2,
				y: 0,
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: palette.black
				}
			},
			manualPageImage: {
				type: 'sprite',
				name: 'pageImage',
				img: '',
				x: 0,
				y: 0,
				attrs: {
				    width: 0,
			        height: 0
				}
			},
			manualPageNumber: {
				type: 'text',
				name: 'pageNumber',
				text: '',
				x: gameUnit * 2,
				y: gameH - (gameUnit * 3.5),
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: palette.black
				}
			},
			// global
			notification: {
				type: 'group',
				name: 'notification',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: 'blockWhite',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH,
							alpha: 0.3
						}
					},
					person: {
						type: 'sprite',
						name: 'person',
						img: '',
						x: 0,
						y: -(gameUnit * 1),
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					title: {
						type: 'text',
						name: 'title',
						text: '',
						x: gameUnit * 0,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						}
					}
				}
			},
			// brief
			missionBrief: {
				type: 'group',
				name: 'missionBrief',
				views: {
					briefBg: {
						type: 'sprite',
						name: 'briefBg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					goalsText: {
						type: 'sprite',
						name: 'goalsTextImg',
						img: 'goalsText',
						x: 0,
						y: gameUnit * 2,
						attrs: {
							width: gameW,
							height: gameW * 0.25
						}
					}
				}
			},
			wiper: {
				type: 'group',
				name: 'wiper',
				views: {
					// windshieldWiperMask: {
					// 	type: 'sprite',
					// 	name: 'windshieldWiperMask',
					// 	img: 'windshieldWiperMask',
					// 	x: (gameW/2),
					// 	y: gameUnit * 0.4,
					// 	attrs: {
					// 		width: gameW,
					// 		height: (gameUnit * 1.15) * 11,
					// 		angle: 75
					// 	}
					// },
					windshieldWiper: {
						type: 'sprite',
						name: 'windshieldWiper',
						img: 'windshieldWiper',
						x: (gameW/2),
						y: gameUnit * 0.4,
						attrs: {
							width: gameUnit * 1.15,
							height: (gameUnit * 1.15) * 11,
							angle: 65
						}
					},
					windowFrame: {
						type: 'sprite',
						name: 'windowFrame',
						img: 'windowFrame',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					}
				}
			},
			goalText: {
				type: 'text',
				name: 'goal',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 1.5),
				x: (gameUnit * 0.5),
				y: gameUnit * 5,
				style: {
				    font: (fontSizes.md + 'px Trebuchet MS'),
			        fill: palette.white,
					'text-align': 'center'
				},
				position: {
					centerX: true
				}
			},
			// world
			endTurnPrompt: {
				type: 'group',
				name: 'endTurnPrompt',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: 'endTurnPrompt',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					}
				}
			},
			buildingPins: {
				type: 'group',
				name: 'buildingPins',
				views: {
				}
			},
			buildingPin: {
				type: 'group',
				name: 'buildingPin',
				views: {
					pin: {
						type: 'sprite',
						name: 'buildingPin',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameUnit * 0.75,
							height: (gameUnit * 0.75) * 0.75
						}
					},
					locationCount: {
						type: 'text',
						name: 'locationCount',
						text: 'x',
						x: gameUnit * 0.4,
						y: -(gameUnit * 0.2),
						style: {
						    font: (fontSizes.xs + 'px Trebuchet MS'),
					        fill: palette.white
						}
					}
				}
			},
			tradeRouteArrows: {
				type: 'group',
				name: 'tradeRouteArrows',
				views: {}
			},
			tradeRouteArrow: {
				type: 'sprite',
				name: 'tradeRouteArrow'
			},
			tradeRoutePins: {
				type: 'group',
				name: 'tradeRoutePins',
				views: {}
			},
			tradeRoutePin: {
				type: 'group',
				name: 'tradeRoutePin_',
				views: {
					pin: {
						type: 'sprite',
						name: 'pin',
						img: 'pinTradeRoute',
						x: 0,
						y: 0,
						attrs: {
							width: (gameUnit * 0.9),
							height: (gameUnit * 0.9) * 0.93
						},
						
					},
					locationCount: {
						type: 'text',
						name: 'locationCount',
						text: 'x',
						x: gameUnit * 0.6,
						y: (gameUnit * 0.25),
						style: {
						    font: (fontSizes.xs + 'px Trebuchet MS'),
					        fill: palette.black
						}
					}
					
				}
			},			// us detail
			tradeRouteAlertIcons: {
				type: 'group',
				name: 'tradeRouteAlertIcons',
				views: {}
			},
			tradeRouteAvailableIcon: {
				type: 'sprite',
				name: 'tradeRouteAvailbleIcon',
				img: 'tradeRouteIcon',
				x: 0,
				y: 0,
				attrs: {
					width: (gameUnit * 1),
					height: (gameUnit * 1) * 0.93
				},
				input: gameLogic.input.tradeRouteAvailableIcon
			},			// us detail
			tradeRoutePrompt: { 
				type: 'group',
				name: 'tradeRoutePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// us detail
			sectorBg: {
				type: 'sprite',
				name: 'sectorBg',
				img: '',
				x: 0,
				y: 0,
				attrs: {
					width: gameW,
					height: gameH
				}
			},
			usDetailGrid: {
				type: 'group',
				name: 'usDetailGrid',
				views: {}
			},
			usDetailGridItem: {
				type: 'sprite',
				name: 'usDetailGridItem',
				img: 'usDetailTiles',
				x: 0,
				y: (gameUnit * 3.5),
				attrs: {
					width: gameW/6,
					height: gameW/6,
					// width: gameUnit,
					// height: gameUnit,
					frame: 0
				}
			},
			plusSign: {
				type: 'sprite',
				name: 'plusSign',
				img: 'animatedPlusIcon',
				x: gameUnit * 0.75,
				y: 0,
				attrs: {
					width: gameUnit * 0.65,
					height: gameUnit
				},
				animation: {
					defaultAnimation: 'idle',
					animations: Animations.plusIcon
				}
			},
			dollarSign: {
				type: 'sprite',
				name: 'dollarSign',
				img: 'animatedDollarIcon',
				x: gameUnit * 0.75,
				y: 0,
				attrs: {
					width: gameUnit * 0.65,
					height: gameUnit
				},
				animation: {
					defaultAnimation: 'idle',
					animations: Animations.dollarIcon
				}
			},
			buildingCreatePrompt: {
				type: 'group',
				name: 'buildingCreatePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: 0,
						y: gameUnit * 13.5,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3
						},
						position: {
							centerX: true
						}
					}
				}
			},
			dealerPrompt: { 
				type: 'group',
				name: 'dealerPrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: 'DEALER\nREPRESENTATIVE',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// building edit
			buildingEditScreen: {
				type: 'group',
				name: 'editDetails',
				views: {
					// bg
					bg: {
						type: 'sprite',
						name: 'background',
						img: 'plantDetailBg',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH,
							fixedToCamera: true
						}
					},
					name: {
						type: 'text',
						name: 'buildingName',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 3.5,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					status: {
						type: 'text',
						name: 'buildingStatus',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 6,
						style: {
							font: (fontSizes.md + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					}
				}
			},
			buildingEditDetails: {
				plant: {
					bg: {
						img: 'plantDetailBg'
					},
					equipment: {
						type: 'text',
						name: 'equipment',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 7.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					inventory: {
						type: 'text',
						name: 'inventory',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 9.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					dealers: {
						type: 'text',
						name: 'dealers',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 11.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					}
				},
				dealer: {
					bg: {
						img: 'dealerDetailBg'
					},
					plantMachine: {
						type: 'text',
						name: 'plantMachine',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 8,
						style: {
							font: (fontSizes.md + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					resell: {
						type: 'text',
						name: 'resell',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 9.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					sales: {
						type: 'text',
						name: 'sales',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 11.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// machine list
			machineList: {
				type: 'group',
				name: 'machineList',
				views: {}
			},	
			machineIcon: {
				type: 'group',
				name: 'machineIcon',
				offsetY: (gameUnit * 1.5),
				offsetX: (gameUnit * 0.25),
				iconW: (gameUnit * 4),
				iconH: (gameUnit * 4),
				width: (gameW/2),
				views: {
					bg: {
						type: 'sprite',
						name: 'machineIconBg',
						img: '',
						x: 0,
						y: (gameUnit * 0.25),
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 3.5)
						}
					},
					name: {
						type: 'text',
						name: 'name',
						text: '',
						x: (gameUnit * 0.66),
						y: gameUnit * 3.25,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.lightRed,
							'text-align': 'center'
						}
					},
					cost: {
						type: 'text',
						name: 'machineCost',
						text: '',
						x: gameUnit * 0,
						y: gameUnit * 0.85,
						style: {
						    font: (fontSizes.xxs + 'px Trebuchet MS'),
					        fill: palette.black
						},
						attrs: {
							angle: -45
						}
					},
					available: {
						type: 'text',
						name: 'available',
						text: '',
						x: gameUnit * 3.5,
						y: (gameUnit * 0.2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						},
						attrs: {
							angle: 45
						}
					},
					alert: {
						type: 'sprite',
						name: 'alert',
						img: 'exclamationAlert',
						x: (gameUnit * 3.25),
						y: 0,
						attrs: {
							width: gameUnit * 0.75,
							height: gameUnit * 0.75,
							visible: false
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'machineIconInvisButton',
						img: 'blockClear',
						machineIdx: '',
						x: 0,
						y: 0,
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 4)
						},
						input: gameLogic.input.editMachine
					}
				}
			},
			emptyIcon: {
				type: 'group',
				name: 'emptyIcon',
				offsetY: (gameUnit * 1.5),
				offsetX: (gameUnit * 0.5),
				iconW: (gameUnit * 4),
				iconH: (gameUnit * 4),
				views: {
					bg: {
						type: 'button',
						name: 'emptyIcon',
						img: 'emptyIcon',
						x: 0,
						y: (gameUnit * 0.25),
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 3.5)
						},
						callback: gameLogic.buttonCallbacks.addEquipment,
						context: this,
						frames: [0]
					}
				}
			},
			// machine edit
			machineEdit: {
				type: 'group',
				name: 'machineEdit',
				views: {
					bg: {
						type: 'sprite',
						name: 'editorBg',
						img: '',
						x: 0,
						y: gameUnit * 0.15,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					// optionalPartsPlus: {
					// 	type: 'sprite',
					// 	name: 'optionalPartsPlus',
					// 	img: 'optionalPartsPlus',
					// 	x: gameUnit * 0.1,
					// 	y: gameUnit * 5,
					// 	attrs: {
					// 		width: gameUnit * 1.5,
					// 		height: gameUnit * 1.5
					// 	},
					// 	input: gameLogic.input.openOptionalPartsMenu
					// },
					machinePieceSprites: {
						type: 'group',
						name: 'machinePieceSprites',
						views: {
							
						}
					},
					stars: {
						type: 'sprite',
						name: 'stars',
						img: '',
						x: -1,
						y: -1,
						attrs: {
							width: -1,
							height: -1
						}
					},
					machinePieceMenuNavigator: {
						type: 'group',
						name: 'machinePieceMenuNavigator',
						views: {
							partsNavigator: {
								type: 'sprite',
								name: 'partsNavigator',
								img: 'partsNavigator',
								x: (gameW/2) - ((gameUnit * 8)/2),
								y: (gameUnit * 1.6),
								attrs: {
									width: (gameUnit * 8),
									height: (gameUnit * 8) * 0.3
								}
							},
							title: {
								type: 'text',
								name: 'partName',
								text: 'Choose Part Type',
								x: gameUnit * 3,
								y: gameUnit * 1.75,
								style: {
								    font: (fontSizes.sm + 'px Trebuchet MS'),
							        fill: palette.orange3
								},
								position: {
									centerX: true
								}
							},
							forward: {
								type: 'sprite',
								name: 'forward',
								img: 'blockWhite',
								x: (gameW/2) + gameUnit * 2,
								y: gameUnit * 1.5,
								attrs: {
									width: gameUnit * 1,
									height: gameUnit * 1,
									alpha: 0
								},
								input: gameLogic.input.machinePieceForwardIcon
							},
							backward: {
								type: 'sprite',
								name: 'backward',
								img: 'blockWhite',
								x: (gameW/2) - gameUnit * 3,
								y: gameUnit * 1.5,
								attrs: {
									width: gameUnit * 1,
									height: gameUnit * 1,
									alpha: 0
								},
								input: gameLogic.input.machinePieceBackwardIcon
							}
						}
					},
					machinePieceName: {
						type: 'group',
						name: 'machinePieceName',
						views: {
						}
					},
					// parts group
					partsMenu: {
						type: 'group',
						name: 'partsMenu',
						attrs: {
							visible: false
						},
						views: {
							menuBg: {
								type: 'sprite',
								name: 'menuBg',
								img: 'partsFrame',
								x: 0,
								y: 0,
								attrs: {
									width: gameW,
									height: gameH
								}
							}
						}
						
					}
				}
			},
			stars: {
				type: 'sprite',
				name: 'stars',
				img: '',
				x: -1,
				y: -1,
				attrs: {
					width: -1,
					height: -1
				}
			},
			machinePieceMenuItem: {
				type: 'group',
				name: 'machinePieceMenuItem',
				x: (gameW/2) - (gameUnit * 2.5),
				y: gameUnit * 2.5,
				attrs: {
					width: gameUnit * 5,
					height: gameUnit * 1.5
				},
				views: {
					name: {
						type: 'text',
						name: 'partName',
						text: '',
						x: gameUnit * 3,
						y: gameUnit * 2.75,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3
						},
						position: {
							centerX: true
						}
					},
					button: {
						type: 'sprite',
						name: 'partButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: gameUnit * 2.5,
						attrs: {
							width: gameUnit * 6,
							height: gameUnit * 1,
							alpha: 0
						},
						input: gameLogic.input.openPartsMenu
					}
				}
			},
			partIcons: {
				type: 'group',
				name: '',
				attrs: {
					visible: false
				},
				views: {
					items: {
						type: 'group',
						name: 'itemsGroup',
						views: {}
					}
				}
			},
			partIcon: {
				type: 'group',
				name: 'partIcon',
				offset: (gameUnit * 3.7),
				iconH: (gameUnit * 3.4),
				views: {
					bg: {
						type: 'sprite',
						name: 'menuItemBg',
						img: 'blockWhite',
						x: gameUnit * 0.85,
						y: 0.25,
						attrs: {
							width: (gameUnit * 3),
							height: (gameUnit * 2.5),
							alpha: 0.1
						}
					},
					icon: {
						type: 'sprite',
						name: 'menuItemIcon',
						img: '',
						x: -(gameUnit * 1.25),
						y: -(gameUnit * 2.5),
						attrs: {
							width: gameUnit * 7,
							height: gameUnit * 7
						}
					},
					description: {
						type: 'text',
						name: 'menuItemDescription',
						text: '',
						x: gameUnit * 5.5,
						y: gameUnit * 0.75,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: gameUnit * 5.5,
						y: gameUnit * 1.25,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'menuItemInvisBtn',
						img: 'blockClear',
						partId: -1,
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameW - gameUnit,
							height: (gameUnit * 3)
						}
					}
					
				}
			},
			wholesalePartIcon: {
				type: 'group',
				name: 'partIcon',
				offset: (gameUnit * 3.7),
				iconH: (gameUnit * 3.4),
				views: {
					bg: {
						type: 'sprite',
						name: 'menuItemBg',
						img: 'blockWhite',
						x: gameUnit * 0.85,
						y: 0.25,
						attrs: {
							width: (gameUnit * 3),
							height: (gameUnit * 2.5),
							alpha: 0.1
						}
					},
					icon: {
						type: 'sprite',
						name: 'menuItemIcon',
						img: '',
						x: -(gameUnit * 1.25),
						y: -(gameUnit * 2.5),
						attrs: {
							width: gameUnit * 7,
							height: gameUnit * 7
						}
					},
					description: {
						type: 'text',
						name: 'menuItemDescription',
						text: '',
						x: gameUnit * 5.33,
						y: gameUnit * 0.75,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					available: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: gameUnit * 5.33,
						y: gameUnit * 1.25,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'menuItemInvisBtn',
						img: 'blockClear',
						partId: -1,
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameW - gameUnit,
							height: (gameUnit * 3)
						}
					}
					
				}
			},
			optionalPartsMenu: {
			},
			supplierNotification: {
				type: 'group',
				name: 'supplierNotification',
				views: {
					bg: {
						type: 'sprite',
						name: 'supplierBg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						}
					},
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					menuTitle: {
						type: 'text',
						name: 'menuTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			discardMachinePrompt: { 
				type: 'group',
				name: 'discardMachinePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: 'DISCARD\nCHANGES?',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			wholesalePartPrompt: {
				type: 'group',
				name: 'wholesalePartPrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'invisButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34,
							alpha: 0
						},
						input: gameLogic.input.wholesalePartPrompt
					}
				}
			},
			// year end
			yearSummary: {
				type: 'group',
				name: 'yearSummary',
				views: {
				}
			},
			summaryGoalText: {
				type: 'text',
				name: 'summaryGoalText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: ''
				}
			},
			summaryText: {
				type: 'text',
				name: 'summaryText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.sm + 'px Trebuchet MS'),
			        fill: ''
				}
			},
			// bonuses
			bonusesNotification: {
				type: 'group',
				name: 'bonusesNotification',
				attrs: {
					// visible: false
				},
				views: {
					openedSuitcase: {
						type: 'sprite',
						name: 'openedSuitcase',
						img: 'openedSuitcase',
						x: 0,
						y: (gameUnit * 1.5),
						attrs: {
							width: gameW,
							height: gameH
						},
						input: gameLogic.input.openedSuitcase
					},
					closedSuitcase: {
						type: 'sprite',
						name: 'closedSuitcase',
						img: 'closedSuitcase',
						x: 0,
						y: (gameUnit * 1.5),
						attrs: {
							width: gameW,
							height: gameH
						},
						input: gameLogic.input.closedSuitcase
					}
				}
			},
			summaryBonusesText: {
				type: 'group',
				name: 'summaryBonusesText',
				attrs: {
					visisble: false
				},
				views: {
					title: {
						type: 'text',
						name: 'summaryBonusText',
						text: 'Bonuses',
						x: 0,
						y: gameUnit * 3,
						style: {
						    font: (fontSizes.lg + 'px Trebuchet MS'),
					        fill: palette.black
						},
						position: {
							centerX: true
						}
					}
				}
			},
			summaryBonusText: {
				type: 'text',
				name: 'summaryBonusText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 1.5),
				x: gameUnit * 2.25,
				// x: 0,
				y: gameUnit * 4.5,
				style: {
				    font: (fontSizes.sm + 'px Trebuchet MS'),
			        fill: palette.black//,
					// 'text-align': 'center'
				// },
				// position: {
				// 	centerX: true
				}
			}
		};

		var config = {
			gameEl: 'game_container',
			gameType: 'phaser',
			// assets
			assets: {
				audio: {
					tractorStartup: 'audio/tractor_startup.mp3'
				},
				images: {
					// generic
					blockWhite: 'img/block_white.png',
					blockClear: 'img/block_clear.png',
					// global
					gameBg: 'img/screens/metal_background.gif',
					dashboardBottom: 'img/dashboard_bottom.png',
					dashboardTop: 'img/dashboard_top.png',
					submenuBg: 'img/submenu_bg.png',
					smallEnvelopeIcon: 'img/icons/small_envelope_icon.png',
					smallTireIcon: 'img/icons/small_tire_icon.png',
					smallSuitcaseIcon: 'img/icons/small_suitcase_icon.png',
					// home
					homeBg: 'img/screens/start/start.png',
					// manual
					manualBg: 'img/screens/manual/manual_background.png',
					manualPage: 'img/screens/manual/manual_page.png',
					ssIgnition: 'img/screens/manual/ss_ignition.png',
					ssGoals: 'img/screens/manual/ss_goals.png',
					ssYearIndicators: 'img/screens/manual/ss_year_indicators.png',
					ssUsSector: 'img/screens/manual/ss_us_sector.png',
					ssGrid: 'img/screens/manual/ss_grid.png',
					ssPlant: 'img/screens/manual/ss_plant.png',
					ssPlantDetails: 'img/screens/manual/ss_plant_details.png',
					ssEmptySlot: 'img/screens/manual/ss_empty_slot.png',
					ssTractorMedium: 'img/screens/manual/ss_tractor_medium.png',
					ssPartsNavigator: 'img/screens/manual/ss_parts_navigator.png',
					ssPartsMenu: 'img/screens/manual/ss_parts_menu.png',
					ssStars: 'img/screens/manual/ss_stars.png',
					ssDealerGirl: 'img/screens/manual/ss_dealer_girl.png',
					ssDashboardTop: 'img/screens/manual/ss_dashboard_top.png',
					ssYearEnd: 'img/screens/manual/ss_year_end.png',
					ssDealerEnvelope: 'img/screens/manual/ss_dealer_envelope.png',
					ssFactoryProduction: 'img/screens/manual/ss_plant_production.png',
					ssTradeRoutes: 'img/screens/manual/ss_trade_routes.png',
					// mission brief
					briefBg01: 'img/screens/brief/mission_brief01.png',
					briefBg02: 'img/screens/brief/mission_brief02.png',
					briefBg03: 'img/screens/brief/mission_brief03.png',
					briefBg04: 'img/screens/brief/mission_brief04.png',
					briefBg05: 'img/screens/brief/mission_brief05.png',
					goalsText: 'img/screens/brief/goals_text_img.png',
					windshieldWiper: 'img/screens/brief/windshield_wiper.png',
					windshieldWiperMask: 'img/screens/brief/windshield_wiper_mask.png',
					windowFrame: 'img/screens/brief/window_frame.png',
					// world
					mapOcean: 'img/screens/world/map_ocean2.png',
					mapWorld: 'img/screens/world/map_world4.png',
					mapUS: 'img/screens/world/map_us.png',
					endTurnPrompt: 'img/screens/world/end_turn_prompt.png',
					pinPlant: 'img/screens/world/pin_plant.png',
					pinDealer: 'img/screens/world/pin_dealer.png',
					pinTradeRoute: 'img/screens/world/pin_trade_route.png',
					exclamationAlert: 'img/icons/exclamation5.png',
					tradeRouteAlertIcon: 'img/icons/little_trade_route_alert.png',
					tradeRouteIcon: 'img/screens/world/trade_route_icon.png',
					tradeRouteAfrica: 'img/screens/world/trade_route_africa.png',
					tradeRouteAsia: 'img/screens/world/trade_route_asia.png',
					tradeRouteEurope: 'img/screens/world/trade_route_europe.png',
					tradeRouteMiddleEast: 'img/screens/world/trade_route_middle_east.png',
					tradeRoutePacificSouth: 'img/screens/world/trade_route_south_pacific.png',
					tradeRouteSouthAmerica: 'img/screens/world/trade_route_south_america.png',
					// us detail
					sectorGridNE: 'img/screens/us_detail/sector_grid_ne.png',
					sectorGridSE: 'img/screens/us_detail/sector_grid_se.png',
					sectorGridMW: 'img/screens/us_detail/sector_grid_mw.png',
					sectorGridNW: 'img/screens/us_detail/sector_grid_nw.png',
					sectorGridSW: 'img/screens/us_detail/sector_grid_sw.png',
					addNewPlantPrompt: 'img/screens/us_detail/add_new_plant_prompt.png',
					dealerRepresentativePrompt: 'img/screens/us_detail/dealer_representative_prompt.png',
					// building detail
					plantDetailBg: 'img/screens/building_edit/plant_detail.png',
					dealerDetailBg: 'img/screens/building_edit/dealer_detail.png',
					// equipment list
					machineListIcon: 'img/screens/equipment_list/machine_list_icon.png',
					skidsteerBasicIcon: 'img/screens/equipment_list/skidsteer_basic_icon.png',
					skidsteerMediumIcon: 'img/screens/equipment_list/skidsteer_medium_icon.png',
					skidsteerHeavyIcon: 'img/screens/equipment_list/skidsteer_heavy_icon.png',
					tractorBasicIcon: 'img/screens/equipment_list/tractor_basic_icon.png',
					tractorMediumIcon: 'img/screens/equipment_list/tractor_medium_icon.png',
					tractorHeavyIcon: 'img/screens/equipment_list/tractor_heavy_icon.png',
					emptyIcon: 'img/screens/equipment_list/empty_icon2.png',
					// equipment create
					equipmentCreateBg: 'img/screens/equipment_add/equipment_add_bg.png',
					// equipment edit
					tractorBasicBg: 'img/screens/equipment_edit/tractor_basic.png',
					tractorMediumBg: 'img/screens/equipment_edit/tractor_medium.png',
					tractorHeavyBg: 'img/screens/equipment_edit/tractor_heavy.png',
					skidsteerBasicBg: 'img/screens/equipment_edit/skid_steer_basic.png',
					skidsteerMediumBg: 'img/screens/equipment_edit/skid_steer_medium.png',
					skidsteerHeavyBg: 'img/screens/equipment_edit/skid_steer_heavy.png',
					optionalPartsPlus: 'img/screens/equipment_edit/optional_parts_plus.png',
					partsNavigator: 'img/screens/equipment_edit/what_to_buy_menu.png',
					// parts icons
					// frame
					partsFrame: 'img/screens/equipment_edit/parts_frame.png',
					// engine
					engineBasicStandard: 'img/screens/equipment_edit/parts_icons/engine/basic_standard.png',
					engineBasicPremium: 'img/screens/equipment_edit/parts_icons/engine/basic_premium.png',
					engineBasicDeluxe: 'img/screens/equipment_edit/parts_icons/engine/basic_deluxe.png',
					engineMediumStandard: 'img/screens/equipment_edit/parts_icons/engine/medium_standard.png',
					engineMediumPremium: 'img/screens/equipment_edit/parts_icons/engine/medium_premium.png',
					engineMediumDeluxe: 'img/screens/equipment_edit/parts_icons/engine/medium_deluxe.png',
					engineHeavyStandard: 'img/screens/equipment_edit/parts_icons/engine/heavy_standard.png',
					engineHeavyPremium: 'img/screens/equipment_edit/parts_icons/engine/heavy_premium.png',
					engineHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/engine/heavy_deluxe.png',
					// transmission
					transmissionBasicStandard: 'img/screens/equipment_edit/parts_icons/transmission/basic_standard.png',
					transmissionBasicPremium: 'img/screens/equipment_edit/parts_icons/transmission/basic_premium.png',
					transmissionBasicDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/basic_deluxe.png',
					transmissionMediumStandard: 'img/screens/equipment_edit/parts_icons/transmission/medium_standard.png',
					transmissionMediumPremium: 'img/screens/equipment_edit/parts_icons/transmission/medium_premium.png',
					transmissionMediumDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/medium_deluxe.png',
					transmissionHeavyStandard: 'img/screens/equipment_edit/parts_icons/transmission/heavy_standard.png',
					transmissionHeavyPremium: 'img/screens/equipment_edit/parts_icons/transmission/heavy_premium.png',
					transmissionHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/heavy_deluxe.png',
					// tires
					tiresBasicStandard: 'img/screens/equipment_edit/parts_icons/tires/basic_standard.png',
					tiresBasicPremium: 'img/screens/equipment_edit/parts_icons/tires/basic_premium.png',
					tiresBasicDeluxe: 'img/screens/equipment_edit/parts_icons/tires/basic_deluxe.png',
					tiresMediumStandard: 'img/screens/equipment_edit/parts_icons/tires/medium_standard.png',
					tiresMediumPremium: 'img/screens/equipment_edit/parts_icons/tires/medium_premium.png',
					tiresMediumDeluxe: 'img/screens/equipment_edit/parts_icons/tires/medium_deluxe.png',
					// tracks
					tracksHeavyStandard: 'img/screens/equipment_edit/parts_icons/tracks/heavy_standard.png',
					tracksHeavyPremium: 'img/screens/equipment_edit/parts_icons/tracks/heavy_premium.png',
					tracksHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/tracks/heavy_deluxe.png',
					// bucket
					bucketBasicStandard: 'img/screens/equipment_edit/parts_icons/bucket/basic_standard.png',
					bucketBasicPremium: 'img/screens/equipment_edit/parts_icons/bucket/basic_premium.png',
					bucketBasicDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/basic_deluxe.png',
					bucketMediumStandard: 'img/screens/equipment_edit/parts_icons/bucket/medium_standard.png',
					bucketMediumPremium: 'img/screens/equipment_edit/parts_icons/bucket/medium_premium.png',
					bucketMediumDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/medium_deluxe.png',
					bucketHeavyStandard: 'img/screens/equipment_edit/parts_icons/bucket/heavy_standard.png',
					bucketHeavyPremium: 'img/screens/equipment_edit/parts_icons/bucket/heavy_premium.png',
					bucketHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/heavy_deluxe.png',
					// headlights
					headlightsMediumStandard: 'img/screens/equipment_edit/parts_icons/headlights/medium_standard.png',
					headlightsMediumPremium: 'img/screens/equipment_edit/parts_icons/headlights/medium_premium.png',
					headlightsMediumDeluxe: 'img/screens/equipment_edit/parts_icons/headlights/medium_deluxe.png',
					headlightsHeavyStandard: 'img/screens/equipment_edit/parts_icons/headlights/heavy_standard.png',
					headlightsHeavyPremium: 'img/screens/equipment_edit/parts_icons/headlights/heavy_premium.png',
					headlightsHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/headlights/heavy_deluxe.png',
					// threePointHitch
					threePointHitchHeavyStandard: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_standard.png',
					threePointHitchHeavyPremium: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_premium.png',
					threePointHitchHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_deluxe.png',
					// powerTakeoff
					powerTakeoffHeavyStandard: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_standard.png',
					powerTakeoffHeavyPremium: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_premium.png',
					powerTakeoffHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_deluxe.png',
					// quickCoupler
					quickCouplerMediumStandard: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_standard.png',
					quickCouplerMediumPremium: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_premium.png',
					quickCouplerMediumDeluxe: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_deluxe.png',
					quickCouplerHeavyStandard: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_standard.png',
					quickCouplerHeavyPremium: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_premium.png',
					quickCouplerHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_deluxe.png',
					// heater
					heaterStandard: 'img/screens/equipment_edit/parts_icons/heater/standard.png',
					heaterPremium: 'img/screens/equipment_edit/parts_icons/heater/premium.png',
					heaterDeluxe: 'img/screens/equipment_edit/parts_icons/heater/deluxe.png',
					// extras
					flameDecal: 'img/screens/equipment_edit/parts_icons/extras/flame_decal.png',
					autoPilot: 'img/screens/equipment_edit/parts_icons/extras/auto_pilot.png',
					stainlessExhaust: 'img/screens/equipment_edit/parts_icons/extras/stainless_exhaust.png',
					gps: 'img/screens/equipment_edit/parts_icons/extras/gps.png',

					// NOTIFICATIONS
					tutorialGuy: 'img/notifications/tutorial_guy.png',
					dealerGirl: 'img/notifications/dealer_girl.png',
					supplierGuy: 'img/notifications/supplier_guy.png',
					tradeRouteAfricaNotification: 'img/notifications/trade_route_africa.png',
					tradeRouteAsiaNotification: 'img/notifications/trade_route_asia.png',
					tradeRouteEuropeNotification: 'img/notifications/trade_route_europe.png',
					tradeRouteMiddleEastNotification: 'img/notifications/trade_route_middle_east.png',
					tradeRouteSouthPacificNotification: 'img/notifications/trade_route_south_pacific.png',
					tradeRouteSouthAmericaNotification: 'img/notifications/trade_route_south_america.png',

					// BONUSES
					closedSuitcase: 'img/closed_suitcase.png',
					openedSuitcase: 'img/opened_suitcase2.png',
					bonusPoof: 'img/bonus_poof.png',
					
					// TURN END
					turnEnd01: 'img/screens/turn_end/turn_end01.png',
					turnEnd02: 'img/screens/turn_end/turn_end02.png'
				},
				sprites: {
					buttonManual: {
						url: 'img/icons/settings.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonShare: {
						url: 'img/icons/share.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonCancel: {
						url: 'img/icons/cancel.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonConfirm: {
						url: 'img/icons/confirm.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonBack: {
						url: 'img/icons/back.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonUndo: {
						url: 'img/icons/undo.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonEquipment: {
						url: 'img/icons/equipment.png',
						width: 175,
						height: 150,
						frames: 2
					},
					// buttonEquipmentAdd: {
					// 	url: 'img/icons/equipment_add.png',
					// 	width: 175,
					// 	height: 150,
					// 	frames: 2
					// },
					buttonInventory: {
						url: 'img/icons/inventory.png',
						width: 175,
						height: 150,
						frames: 2
					},
					ignitionKey: {
						url: 'img/screens/start/key_spritesheet.png',
						width: 320,
						height: 573,
						frames: 3
					},
					buttonHome: {
						url: 'img/icons/home.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonPlus: {
						url: 'img/icons/plus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonMinus: {
						url: 'img/icons/minus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					turnIndicators: {
						url: 'img/turn_spritesheet.png',
						width: 300,
						height: 100,
						frames: 10
					},
					usDetailTiles: {
						url: 'img/screens/us_detail/us_detail_grid_icon.png',
						width: 110,
						height: 110,
						frames: 5
					},
					animatedDollarIcon: {
						url: 'img/screens/us_detail/animated_dollar_sign_white.png',
						width: 65,
						height: 100,
						frames: 6
					},
					animatedPlusIcon: {
						url: 'img/screens/us_detail/animated_plus_sign.png',
						width: 65,
						height: 100,
						frames: 6
					},
					// equipment create 
					createTractorBasic: {
						url: 'img/screens/equipment_add/tractor_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerBasic: {
						url: 'img/screens/equipment_add/skid_steer_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorMedium: {
						url: 'img/screens/equipment_add/tractor_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerMedium: {
						url: 'img/screens/equipment_add/skid_steer_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorHeavy: {
						url: 'img/screens/equipment_add/tractor_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerHeavy: {
						url: 'img/screens/equipment_add/skid_steer_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
 					// equipment edit
					starsThree: {
						url: 'img/screens/equipment_edit/stars/stars_three_spritesheet.png', 
						width: 126,
						height: 26,
						frames: 4
					},
					starsFour: {
						url: 'img/screens/equipment_edit/stars/stars_four_spritesheet.png', 
						width: 176,
						height: 26,
						frames: 5
					},
					starsFive: {
						url: 'img/screens/equipment_edit/stars/stars_five_spritesheet.png', 
						width: 224,
						height: 26,
						frames: 6
					},
					starsSix: {
						url: 'img/screens/equipment_edit/stars/stars_six_spritesheet.png', 
						width: 274,
						height: 26,
						frames: 7
					},
					starsSeven: {
						url: 'img/screens/equipment_edit/stars/stars_seven_spritesheet.png', 
						width: 323,
						height: 26,
						frames: 8
					},
					// tractor basic
					editTractorBasicCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_cab_spritesheet.png',
						width: 105,
						height: 154,
						frames: 2
					},
					editTractorBasicEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_engine_spritesheet.png',
						width: 167,
						height: 189,
						frames: 2
					},
					editTractorBasicTires: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_tires_spritesheet.png',
						width: 308,
						height: 196,
						frames: 2
					},
					// tractor medium
					editTractorMediumCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_cab_spritesheet.png',
						width: 83,
						height: 177,
						frames: 2
					},
					editTractorMediumEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_engine_spritesheet.png',
						width: 143,
						height: 149,
						frames: 2
					},
					editTractorMediumTransmission: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_transmission_spritesheet.png',
						width: 26,
						height: 83,
						frames: 2
					},
					editTractorMediumTires: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_tires_spritesheet.png',
						width: 288,
						height: 255,
						frames: 2
					},
					// tractor heavy
					editTractorHeavyCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_cab_spritesheet.png',
						width: 166,
						height: 222,
						frames: 2
					},
					editTractorHeavyEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_engine_spritesheet.png',
						width: 165,
						height: 172,
						frames: 2
					},
					editTractorHeavyTransmission: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_transmission_spritesheet.png',
						width: 43,
						height: 155,
						frames: 2
					},
					editTractorHeavyTracks: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_tracks_spritesheet.png',
						width: 300,
						height: 170,
						frames: 2
					},
					// skidsteer basic
					editSkidsteerBasicCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_cab_spritesheet.png',
						width: 115,
						height: 126,
						frames: 2
					},
					editSkidsteerBasicBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_bucket_spritesheet.png',
						width: 207,
						height: 145,
						frames: 2
					},
					editSkidsteerBasicTires: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_tires_spritesheet.png',
						width: 159,
						height: 101,
						frames: 2
					},
					// // skidsteer medium
					editSkidsteerMediumCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_cab_spritesheet.png',
						width: 142,
						height: 129,
						frames: 2
					},
					editSkidsteerMediumBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_bucket_spritesheet.png',
						width: 179,
						height: 167,
						frames: 2
					},
					editSkidsteerMediumTires: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_tires_spritesheet.png',
						width: 78,
						height: 86,
						frames: 2
					},
					// skidsteer heavy
					editSkidsteerHeavyCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_cab_spritesheet.png',
						width: 156,
						height: 108,
						frames: 2
					},
					editSkidsteerHeavyEngine: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_engine_spritesheet.png',
						width: 83,
						height: 57,
						frames: 2
					},
					editSkidsteerHeavyBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_bucket_spritesheet.png',
						width: 249,
						height: 244,
						frames: 2
					},
					editSkidsteerHeavyTracks: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_tracks_spritesheet.png',
						width: 239,
						height: 127,
						frames: 2
					}
				}
			},
			stage: {
				fullScreen: true,
				scaleMode: Phaser.ScaleManager.SHOW_ALL
			},
			attrs: {
				firstPlay: false,
				turnActive: false,
				turnTime: TIME_PER_TURN,
				turnCompleted: false,
				levelPassed: false,
				activeSector: -1,
				activeTile: null,
				activeFactor: null,
				activeMachine: null,
				activeMachineId: -1,
				activePartType: '',
				newMachine: false,
				bank: 1000000
			},
			palette: palette,
			defaultScreen: 'home',
			notificationText: notificationText,
			goalsText: {
				passed: 'All goals met.\nCongratulations.',
				failed: 'Goals not met.\nPlease try again.',
				types: {
					profit: 'Profits: ',
					newPlants: 'Plants built: ',
					newDealers: 'Dealers established: ',
					newSuppliers: 'Partnered Suppliers: ',
					newTradeRoutes: 'Trade Routes established: ',
					newMachineModels: 'Machine models created: ',
					newMachines: 'Machines built: ',
					machinesSold: 'Machines sold: '
				}
			},
			bonusesText: {
				buildings: '~{count}~ new ~{name}~:\n~{bonus}~ jobs created',
				manufacturing: ''
			},
			machineIcons: {
				tractor: {
					basic: 'tractorBasicIcon',
					medium: 'tractorMediumIcon',
					heavy: 'tractorHeavyIcon'
				},
				skidsteer: {
					basic: 'skidsteerBasicIcon',
					medium: 'skidsteerMediumIcon',
					heavy: 'skidsteerHeavyIcon'
				}
			},
			dynamicViews: dynamicViews,
			worldPositions: worldPositions,
			pinPositions: pinPositions,
			pinOffsets: pinOffsets,
			pinImages: pinImages,
			pinFills: pinFills,
			tradeRouteArrowConfig: tradeRouteArrowConfig,
			tradeRoutePinConfig: tradeRoutePinConfig,
			tradeRouteAlertIconConfig: tradeRouteAlertIconConfig,
			notificationPeopleImages: notificationPeopleImages,
			starsConfig: starsConfig,
			machineEditBackgrounds: machineEditBackgrounds,
			machinePieceSpriteConfig: machinePieceSpriteConfig,
			views: {
				// background
				background: {
					name: 'background',
					type: 'group',
					views: {
						gameBg: {
							name: 'gameBg',
							type: 'sprite',
							img: 'gameBg',
							x: 0,
							y: 0,
							attrs: {
								width: winW,
								height: winH,
								fixedToCamera: true
							}
						}
					}
				},
				// home
				homeScreen: {
					name: 'home',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// bg
						stateBg: {
							type: 'sprite',
							name: 'homeBg',
							img: 'homeBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							}
						},
						// ignitionKey
						ignitionKey: {
							type: 'sprite',
							name: 'ignitionKey',
							img: 'ignitionKey',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							animation: {
								defaultAnimation: 'idle',
								animations: Animations.ignitionKey
							}
						},
						// game start button
						startButton: {
							type: 'button',
							name: 'gameStartButton',
							img: 'blockWhite',
							x: (gameW/2 - (gameUnit * 2.5)),
							y: (gameUnit * 2.5),
							attrs: {
								width: (gameUnit * 5),
								height: (gameUnit * 5),
								alpha: 0
							},
							callback: gameLogic.buttonCallbacks.gameStart,
							context: this,
							frames: [0, 1, 1, 0]
						},
						// manual button
						manualButton: {
							type: 'button',
							name: 'manualbutton',
							img: 'blockClear',
							x: 0,
							y: (gameH - gameUnit * 2.5),
							attrs: {
								width: gameUnit * 2.5,
								height: gameUnit * 2.5,
								alpha: 0.75
							},
							callback: gameLogic.buttonCallbacks.manualStart,
							context: this,
							frames: [0, 1, 1, 0]
						}
					}
				},
				// manual
				manualScreen: {
					name: 'manual',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						manualBg: {
							type: 'sprite',
							name: 'manualBg',
							img: 'manualBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.manualBg
						},
						manualPages: {
							type: 'group',
							name: 'manualPages',
							views: {}
						}
					}
				},
				// brief
				briefScreen: {
					name: 'brief',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						
					}
				},
				// world
				worldScreen: {
					name: 'world',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// ocean map
						oceanMap: {
							type: 'sprite',
							name: 'oceanMap',
							img: 'mapOcean',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH,
								alpha: 0.75
							}
						},
						// world map
						worldMap: {
							type: 'sprite',
							name: 'worldMap',
							img: 'mapWorld',
							x: -(gameW * 0.805),
							y: -(gameH * 1.947),
							attrs: {
								width: gameW * 5.9,
								height: gameH * 5.85
							}
						},
						// us map
						usMap: {
							type: 'sprite',
							name: 'usMap',
							img: 'mapUS',
							x: 0,
							y: gameUnit * 6,
							attrs: {
								width: gameW,
								height: gameUnit * 5,
								fixedToCamera: true
							}
						},
						// buttons group
						buttons: {
							type: 'group',
							name: 'startStateButtons',
							attrs: {
								fixedToCamera: true
							},
							views: {
								northwestDetail: {
									type: 'button',
									name: 'northwestDetail',
									img: 'blockWhite',
									x: gameUnit * 0.2,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 3.5),
										height: (gameUnit * 2),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.northwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								southwestDetail: {
									type: 'button',
									name: 'southwestDetail',
									img: 'blockWhite',
									x: gameUnit * 0.2,
									y: (gameUnit * 8),
									attrs: {
										width: (gameUnit * 3.5),
										height: (gameUnit * 2),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.southwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								midwestDetail: {
									type: 'button',
									name: 'midwestDetail',
									img: 'blockWhite',
									x: gameUnit * 3.7,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 2),
										height: (gameUnit * 4.5),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.midwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								northeastDetail: {
									type: 'button',
									name: 'northeastDetail',
									img: 'blockWhite',
									x: gameUnit * 5.7,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 4),
										height: (gameUnit * 2.5),
										alpha: 0
									},
									sector: USSectors.NORTH_EAST,
									callback: gameLogic.buttonCallbacks.northeastDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								southeastDetail: {
									type: 'button',
									name: 'southeastDetail',
									img: 'blockWhite',
									x: gameUnit * 5.7,
									y: (gameUnit * 8.5),
									attrs: {
										width: (gameUnit * 2.5),
										height: (gameUnit * 2.5),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.southeastDetail,
									context: this,
									frames: [0, 0, 0, 0]
								}
							}
						}
					}
				},
				// usDetail
				usDetailScreen: {
					name: 'usDetail',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// title
						// sectorTitle: {
						// 	type: 'text',
						// 	name: 'sectorTitle',
						// 	text: '',
						// 	x: 0,
						// 	y: gameUnit * 2,
						// 	style: {
						// 	    font: (fontSizes.lg + 'px Trebuchet MS'),
						//         fill: palette.white
						// 	},
						// 	position: {
						// 		centerX: true
						// 	}
						// }
					}
				},
				// building edit 
				buildingEditScreen: {
					name: 'buildingEdit',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
					}
				},
				// equipment list
				equipmentListScreen: {
					name: 'equipmentList',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// buttons group
						buttons: {
							type: 'group',
							name: 'equipmentListScreenButtonGroup',
							attrs: {
								fixedToCamera: true
							},
							views: 
							// close button
							{
								closeButton: {
									type: 'button',
									name: 'closeButton',
									img: 'buttonClose',
									x: (gameW - gameUnit * 1.25),
									y: (gameUnit * 0.25),
									attrs: {
										width: gameUnit * 1,
										height: gameUnit * 1
									},
									callback: gameLogic.buttonCallbacks.equipmentListClose,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						// icons group
						// icons: {
						// 	type: 'group',
						// 	name: 'equipmentListScreenIconGroup',
						// 	attrs: {
						// 		fixedToCamera: true
						// 	},
						// 	views: 
						// 	{
						// 		tractorIcon: {
						// 			type: 'sprite',
						// 			name: 'tractor',
						// 			img: 'iconTractor',
						// 			x: gameUnit * 3,
						// 			y: gameUnit * 7,
						// 			attrs: {
						// 				width: gameUnit * 4,
						// 				height: gameUnit * 2
						// 			},
						// 			input: gameLogic.input.tractor
						// 		},
						// 		skidsteerIcon: {
						// 			type: 'sprite',
						// 			name: 'skidsteer',
						// 			img: 'iconSkidsteer',
						// 			x: gameUnit * 3,
						// 			y: gameUnit * 11,
						// 			attrs: {
						// 				width: gameUnit * 4,
						// 				height: gameUnit * 2
						// 			},
						// 			input: gameLogic.input.skidsteer
						// 		}
						// 	}
						// }
					}
				},
				// equipment create
				equipmentCreateScreen: {
					name: 'equipmentCreate',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						bg: {
							type: 'sprite',
							name: 'createBg',
							img: 'equipmentCreateBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH - (gameUnit * 1.5)
							}
						},
						icons: {
							type: 'group',
							name: 'createIcons',
							views: {
								machineType: {
									type: 'group',
									name: 'machineType',
									views: {
										tractorBasic: {
											type: 'button',
											name: 'createTractorBasic',
											img: 'createTractorBasic',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 1.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newBasicTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										tractorMedium: {
											type: 'button',
											name: 'createTractorMedium',
											img: 'createTractorMedium',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 6,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newMediumTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										tractorHeavy: {
											type: 'button',
											name: 'createTractorHeavy',
											img: 'createTractorHeavy',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 10.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newHeavyTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerBasic: {
											type: 'button',
											name: 'createSkidsteerBasic',
											img: 'createSkidsteerBasic',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 1.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newBasicSkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerMedium: {
											type: 'button',
											name: 'createSkidsteerMedium',
											img: 'createSkidsteerMedium',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 6,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newMediumSkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerHeavy: {
											type: 'button',
											name: 'createSkidsteerHeavy',
											img: 'createSkidsteerHeavy',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 10.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newHeavySkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										}
									}
								}
							}
						}
					}
				},
				// equipment edit
				equipmentEditScreen: {
					type: 'group',
					name: 'equipmentEdit',
					attrs: {
						visible: false
					},
					views: {
					}
				},
				// turn end
				turnEndScreen: {
					type: 'group',
					name: 'turnEnd',
					attrs: {
						visible: false
					},
					views: {
						openedEnvelope: {
							type: 'sprite',
							name: 'openedEnvelope',
							img: 'turnEnd02',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.openedEnvelope
						},
						closedEnvelope: {
							type: 'sprite',
							name: 'closedEnvelope',
							img: 'turnEnd01',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.closedEnvelope
						},
						smallSuitcaseIcon: {
							type: 'sprite',
							name: 'smallSuitcaseIcon',
							img: 'smallSuitcaseIcon',
							x: gameW - (gameUnit * 1.6),
							y: gameUnit * 2,
							attrs: {
								width: gameUnit * 1.5,
								height: (gameUnit * 1.5) * 0.73,
								visible: false
							},
							input: gameLogic.input.smallSuitcaseIcon
						}
					}
				},
				// global
				global: {
					type: 'group',
					name: 'global',
					attrs: {
						visible: true
					},
					views: {
						notificationIcon: {
							type: 'sprite',
							name: 'notificationIcon',
							img: 'smallEnvelopeIcon',
							x: gameUnit * 0.1,
							y: gameUnit * 1.6,
							attrs: {
								width: gameUnit * 1.5,
								height: (gameUnit * 1.5) * 0.6
							},
							input: gameLogic.input.notificationIcon
						},
						supplierAvailableIcon: {
							type: 'sprite',
							name: 'supplierAvailableIcon',
							img: 'smallTireIcon',
							x: gameUnit * 0.1,
							y: gameUnit * 12,
							attrs: {
								width: (gameUnit * 1.5),
								height: (gameUnit * 1.5)
							},
							input: gameLogic.input.supplierAvailableIcon
							
						},
						tradeRouteAlertIcon: {
							type: 'sprite',
							name: 'tradeRouteAlertIcon',
							img: 'tradeRouteAlertIcon',
							x: gameW - (gameUnit * 1.35),
							y: gameUnit * 1.6,
							attrs: {
								width: gameUnit * 1.25,
								height: (gameUnit * 1.25) * 0.89
							},
							input: gameLogic.input.tradeRouteAlertIcon
						},
						notifications: {
							name: 'notifications',
							type: 'group',
							views: {}
						},
						dashboardBottom: {
							name: 'dashboardBottom',
							type: 'sprite',
							img: 'dashboardBottom',
							x: 0,
							y: gameUnit * 13.5,
							attrs: {
								width: gameW * 1,
								height: gameUnit * 2.5,
								fixedToCamera: true
							}
						},
						homeGroup: {
							type: 'group',
							name: 'homeGroup',
							views: {
								buttonManual: {
									type: 'button',
									name: 'buttonManual',
									img: 'buttonManual',
									x: controlButtons.left.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.openManual,
									context: this,
									frames: [0, 1, 1, 0]
								},
								buttonShare: {
									type: 'button',
									name: 'buttonShare',
									img: 'buttonShare',
									x: controlButtons.right.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.share,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						turnGroup: {
							type: 'group',
							name: 'turnGroup',
							attrs: {
								visible: false
							},
							views: {
								dashboardTop: {
									name: 'dashboardTop',
									type: 'sprite',
									img: 'dashboardTop',
									x: 0,
									y: 0,
									attrs: {
										width: gameW,
										height: gameUnit * 1.5,
										fixedToCamera: true
									}
								},
								timerText: {
									type: 'text',
									name: 'timerText',
									text: TIME_PER_TURN,
									style: {
									    font: (fontSizes.lg + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: 0,
									y: (gameUnit * 0.2),
									position: {
										centerX: true
									}
								},
								bankText: {
									type: 'text',
									name: 'bankText',
									text: '',
									style: {
									    font: (fontSizes.sm + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: (gameUnit * 0.8),
									y: (gameUnit * 0.5)
								},
								bonusText: {
									type: 'text',
									name: 'bonusText',
									text: '',
									style: {
									    font: (fontSizes.md + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: (gameUnit * 6.5),
									y: (gameUnit * 0.4)
								},
								turnIndicator: {
									type: 'sprite',
									name: 'turnIndicator',
									img: 'turnIndicators',
									x: (gameW/2) - (gameUnit * 1.2),
									y: gameUnit * 0.33,
									attrs: {
										width: gameUnit * 2.4,
										height: (gameUnit * 2.5)/3
									}
								},
								homeButton: {
									type: 'button',
									name: 'homeButton',
									img: 'buttonHome',
									x: (gameW/2) - (gameUnit * 1),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.worldReturnButton,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						plusMinusGroup: {
							type: 'group',
							name: 'plusMinusGroup',
							attrs: {
								visible: false
							},
							views: {
								plusButton: {
									type: 'button',
									name: 'plusButton',
									img: 'buttonPlus',
									x: (gameW/2) - (gameUnit * 2.5),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.plusButton,
									context: this,
									frames: [0, 1, 1, 0]
								},
								minusButton: {
									type: 'button',
									name: 'minusButton',
									img: 'buttonMinus',
									x: (gameW/2) + (gameUnit * 0.5),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.minusButton,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						plantDetailGroup: {
							type: 'group',
							name: 'plantDetailGroup',
							attrs: {
								visible: false
							},
							views: {
								equipmentButton: {
									type: 'button',
									name: 'equipmentButton',
									img: 'buttonEquipment',
									x: controlButtons.right.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.equipmentListStart,
									context: this,
									frames: [0, 0, 0, 0]
								}
							}
						},
						equipmentListGroup: {
							type: 'group',
							name: 'equipmentListGroup',
							attrs: {
								visible: false
							},
							views: {
								// addEquipmentButton: {
								// 	type: 'button',
								// 	name: 'buttonEquipmentAdd',
								// 	img: 'buttonEquipmentAdd',
								// 	x: (gameW/2) - (controlButtons.width/2),
								// 	y: gameH - (gameUnit * 1.66),
								// 	attrs: {
								// 		width: controlButtons.width,
								// 		height: controlButtons.height
								// 	},
								// 	callback: gameLogic.buttonCallbacks.addEquipment,
								// 	context: this,
								// 	frames: [0, 1, 1, 0]
								// }
							}
						},
						equipmentEditGroup: {
							type: 'group',
							name: 'equipmentEditGroup',
							attrs: {
								visible: false
							},
							views: {}
						},
						backButton: {
							type: 'button',
							name: 'backButton',
							img: 'buttonBack',
							x: controlButtons.left.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.backButton,
							context: this,
							frames: [0, 1, 1, 0]
						},
						confirmButton: {
							type: 'button',
							name: 'confirmButton',
							img: 'buttonConfirm',
							x: controlButtons.right.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.confirmButton,
							context: this,
							frames: [0, 1, 1, 0]
						},
						cancelButton: {
							type: 'button',
							name: 'cancelButton',
							img: 'buttonCancel',
							x: controlButtons.left.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.cancelButton,
							context: this,
							frames: [0, 1, 1, 0]
						}
					}
				}
			},
			turnScreens: [
				'world',
				'usDetail',
				'buildingEdit',
				'equipmentList',
				'equipmentCreate',
				'equipmentEdit'
			],
			tutorial: {
				title: 'Global Trader 3.0\nCNH INDUSTRIAL',
				subtitle: 'Instructions and Strategy\nDIGITAL TRADE TOOLBOX',
				pages: [
				// 1
				{
					blurbs: [
					{
						text: 'Click on the ignition\nto start the game.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Look over the Mission Brief.\nThese are the goals you will\nneed to accomplish\nfor the year.\n\nPress the check button\nto begin the turn.',
						x: (gameUnit * 4.5),
						y: (gameUnit * 7.5)
					}
					],
					images: [
					{
						img: 'ssIgnition',
						x: (gameUnit * 6),
						y: (gameUnit * 3),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.78
					},
					{
						img: 'ssGoals',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.76
					}
					]
				},
				// 2
				{
					blurbs: [
					{
						text: 'Each level is one year.\nThe 52 weeks of the\nyear countdown the turn.\nThe yellow dots reflect\nthe current year.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Choose a sector of the US to view.',
						x: (gameUnit * 2),
						y: (gameUnit * 5)
					},
					{
						text: 'Click on the grid to build a plant.',
						x: (gameUnit * 2),
						y: (gameUnit * 7)
					},
					{
						text: 'The plant completes\nconstruction in 3 weeks.\nIt is then active.\nYou can start making\nequipment.',
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssYearIndicators',
						x: (gameUnit * 6),
						y: (gameUnit * 3),
						width: (gameUnit * 1.5),
						height: (gameUnit * 1.5) * 0.54
					},
					{
						img: 'ssUsSector',
						x: (gameUnit * 2),
						y: (gameUnit * 5.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.65
					},
					{
						img: 'ssGrid',
						x: (gameUnit * 2),
						y: (gameUnit * 7.8),
						width: (gameUnit * 2),
						height: (gameUnit * 2)
					},
					{
						img: 'ssPlant',
						x: (gameUnit * 6),
						y: (gameUnit * 10),
						width: (gameUnit * 1),
						height: (gameUnit * 1) * 0.96
					}
					]
				},
				// 3
				{
					blurbs: [
					{
						text: 'Click on the active plant\nto see its details.\nThe wrench takes\nyou to a list of the\nplant\'s\nTractor and\nSkid Steer models.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Click an empty slot\nto add a new model.',
						x: (gameUnit * 4.5),
						y: (gameUnit * 7.5)
					},
					{
						text: 'Choose the type and\nthe size to build.', 
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssPlantDetails',
						x: (gameUnit * 5.5),
						y: (gameUnit * 3),
						width: (gameUnit * 2.5),
						height: (gameUnit * 2.5) * 1.58
					},
					{
						img: 'ssEmptySlot',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.85
					},
					{
						img: 'ssTractorMedium',
						x: (gameUnit * 5.5),
						y: (gameUnit * 10),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.79
					}
					]
				},
				// 4
				{
					blurbs: [
					{
						text: 'Required parts are displayed above.\nClick to open the parts menu.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'The choice of parts will affect\nthe manufacturing cost of a machine.',
						x: (gameUnit * 2),
						y: (gameUnit * 6)
					},
					{
						text: 'There may be Parts Supplier opportunities.\nBuy in bulk to save on manufacturing\ncosts later.',
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssPartsNavigator',
						x: (gameUnit * 2),
						y: (gameUnit * 4),
						width: gameUnit * 4,
						height: (gameUnit * 4) * 0.29
					},
					{
						img: 'ssPartsMenu',
						x: (gameUnit * 2),
						y: (gameUnit * 7),
						width: gameUnit * 2,
						height: (gameUnit * 2) * 1.33
					}
					]
				},
				// 5
				{
					blurbs: [
					{
						text: 'The stars turn from grey to yellow as you\nselect each required machine type part.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'After a Plant has manufactured 3 or more\nmachines, envelopes will begin appearing\non the US Sector Grids. You will be prompted to\nsell through a Dealer.',
						x: (gameUnit * 2),
						y: (gameUnit * 5.5)
					},
					{
						text: 'Not all Dealers offer the same resale.\nThe first offer is not always the best.',
						x: (gameUnit * 2),
						y: (gameUnit * 11)
					}
					],
					images: [
					{
						img: 'ssDealerGirl',
						x: (gameUnit * 2),
						y: (gameUnit * 7.25),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.67
					},
					{
						img: 'ssStars',
						x: (gameUnit * 2),
						y: (gameUnit * 4),
						width: (gameUnit * 4),
						height: (gameUnit * 4) * 0.2
					}
					]
				},
				// 6
				{
					blurbs: [
					{
						text: 'After you sell domestically, you\nmay receive trade opportunities\nleading to increased revenue\nand bonus points.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Clicking the prompt returns you to\nthe world map and displays\nthe potential trade route.',
						x: (gameUnit * 2),
						y: (gameUnit * 5)
					},
					{
						text: 'Click the trade route to see\nthe Trade Representative\'s offer.',
						x: (gameUnit * 2),
						y: (gameUnit * 9.5)
					},
					{
						text: 'Accepting is optional.\nSome trade routes are better than others!',
						x: (gameUnit * 2),
						y: (gameUnit * 10.5)
					}
					],
					images: [
					{
						img: 'tradeRouteAlertIcon',
						x: (gameUnit * 7),
						y: (gameUnit * 3),
						width: (gameUnit * 1.5),
						height: (gameUnit * 1.5) * 0.89
					},
					{
						img: 'ssTradeRoutes',
						x: (gameUnit * 2),
						y: (gameUnit * 6.5),
						width: (gameUnit * 4),
						height: (gameUnit * 4) * 0.68
					}
					]
				},
				// 7
				{
					blurbs:
					[ 
					{
						text: 'Keep track of your bank,\nthe turn time,\nand the Bonus Points\nin the top dashboard.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'At the end of the year, an envelope\nwill contain the Year End summary.\nWhen all goals are met,\nyou can advance to the next level.',
						x: (gameUnit * 2),
						y: (gameUnit * 6)
					}
					],
					images: [
					{
						img: 'ssDashboardTop',
						x: (gameUnit * 2),
						y: (gameUnit * 4.5),
						width: (gameUnit * 4.5),
						height: (gameUnit * 4.5) * 0.17
					},
					{
						img: 'ssYearEnd',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 3),
						height: (gameUnit * 3) * 1.3
					}
					]
				}
				]
			}

		};
		callback.call(context, config);
	};
	return module;
}();