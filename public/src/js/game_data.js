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
				img: 'bucketMediumStandard',
				cost: 400,
				build: 75,
				sell: 1500
			},
			{
				description: 'Deluxe',
				img: 'bucketHeavyStandard',
				cost: 1000,
				build: 250,
				sell: 500
			}
			],
			medium: [
			{
				description: 'Standard',
				img: 'bucketBasicPremium',
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
				img: 'bucketBasicDeluxe',
				cost: 900,
				build: 150,
				sell: 3000
			},
			{
				description: 'Premium',
				img: 'bucketMediumPremium',
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
				'Manufacture 25 machines'
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
			value: 5,
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
			value: 10,
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
			type: 'profit',
			value: 1000000,
			calculation: 'money'
		},
		{
			type: 'newDealers',
			value: 3,
			calculation: 'number'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 50,
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
				'Establish 3 Trade Routes',
				'Make $5,000,000 in profits'
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
			type: 'profit',
			value: 10000000,
			calculation: 'money'
		},
		{
			type: 'newTradeRoutes',
			value: 5,
			calculation: 'number'
		}
		]
	}
	],
	bonuses: {
		buildings: {
			plant: 500,
			dealer: 1000,
			tradeRoute: 10000
		},
		suppliers: {
			added: 5000,
			partsPurchased: 1000,
			allPartsUsed: 10000
		},
		manufacturing: {
			machine10: 10,
			machine50: 50,
			machine100: 100,
			machine500: 500,
			machine1000: 1000,
			machine5000: 5000,
			machine10000: 10000,
			machine50000: 50000
		}
	}
};
