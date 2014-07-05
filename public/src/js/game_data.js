var gameData = {
	buildings: {
		factory: {
			id: 'factory',
			img: 'iconFactory',
			description: 'Build your machines',
			cost: 100000
		},
		showroom: {
			id: 'showroom',
			img: 'iconShowroom',
			description: 'Sell your machines',
			cost: 50000
		}
	},
	machines: {
		tractor: {
			basic: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights'
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				]
			},
			medium: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights'
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				]
			},
			heavy: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights',
					'threePointHitch'
				],
				optionalParts: [
					'autoPilot',
					'gps',
					'heater'
				]
			}
		},
		skidsteer: {
			basic: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights',
					'bucket'
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				]
			},
			medium: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights',
					'bucket'
				],
				optionalParts: [
					'flameDecal',
					'autoPilot',
					'gps'
				]
			},
			heavy: {
				requiredParts: [
					'tires',
					'transmission',
					'engine',
					'headlights',
					'bucket',
					'powerTakeoff',
					'quickCoupler'
				],
				optionalParts: [
					'autoPilot',
					'gps',
					'heater'
				]
			}
		}
	},
	parts: {
		tires: [
		{
			id: 'w3',
			frame: 1,
			description: 'discount',
			basic: {
				img: 'tiresDiscount',
				cost: 350,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'tiresDiscount',
				cost: 700,
				build: 100,
				sell: 2000
			},
			heavy: {
				img: 'tiresDiscount',
				cost: 1000,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'w1',
			frame: 2,
			description: 'standard',
			basic: {
				img: 'tiresStandard',
				cost: 500,
				build: 100,
				sell: 2000
			},
			medium: {
				img: 'tiresStandard',
				cost: 1000,
				build: 200,
				sell: 4000
			},
			heavy: {
				img: 'tiresStandard',
				cost: 1500,
				build: 250,
				sell: 5000
			}
		},
		{
			id: 'w4',
			img: 'tires3',
			frame: 3,
			description: 'deluxe',
			basic: {
				img: 'tiresDeluxe',
				cost: 1000,
				build: 250,
				sell: 5000
			},
			medium: {
				img: 'tiresDeluxe',
				cost: 2000,
				build: 500,
				sell: 10000
			},
			heavy: {
				img: 'tiresDeluxe',
				cost: 4000,
				build: 1000,
				sell: 20000
			}
		}
		],
		track: [
		{
			id: 'w3',
			img: 'tires2',
			frame: 1,
			description: 'discount track',
			heavy: {
				img: 'track',
				cost: 1000,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'w1',
			img: 'tires1',
			frame: 2,
			description: 'standard track',
			heavy: {
				img: 'track',
				cost: 1500,
				build: 250,
				sell: 5000
			}
		},
		{
			id: 'w4',
			img: 'tires3',
			frame: 3,
			description: 'deluxe track',
			heavy: {
				img: 'track',
				cost: 4000,
				build: 1000,
				sell: 20000
			}
		}
		],
		engine: [
		{
			id: 'e1',
			frame: 1,
			description: 'discount',
			basic: {
				img: 'engineBasicDiscount',
				cost: 2000,
				build: 500,
				sell: 10000
			},
			medium: {
				img: 'engineMediumDiscount',
				cost: 4000,
				build: 1000,
				sell: 20000
			},
			heavy: {
				img: 'engineHeavyDiscount',
				cost: 6000,
				build: 1500,
				sell: 30000
			}
		},
		{
			id: 'e2',
			frame: 2,
			description: 'standard',
			basic: {
				img: 'engineBasicStandard',
				cost: 3000,
				build: 750,
				sell: 15000
			},
			medium: {
				img: 'engineMediumStandard',
				cost: 6000,
				build: 1500,
				sell: 30000
			},
			heavy: {
				img: 'engineHeavyStandard',
				cost: 9000,
				build: 2000,
				sell: 40000
			}
		},
		{
			id: 'e3',
			frame: 3,
			description: 'deluxe',
			basic: {
				img: 'engineBasicDeluxe',
				cost: 5000,
				build: 500,
				sell: 10000
			},
			medium: {
				img: 'engineMediumDeluxe',
				cost: 10000,
				build: 1000,
				sell: 20000
			},
			heavy: {
				img: 'engineHeavyDeluxe',
				cost: 15000,
				build: 1500,
				sell: 30000
			}
		}
		],
		transmission: [
		{
			id: 'c1',
			frame: 1,
			description: 'discount',
			basic: {
				img: 'transmissionBasicDiscount',
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'transmissionMediumDiscount',
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				img: 'transmissionHeavyDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			frame: 2,
			description: 'standard',
			basic: {
				img: 'transmissionBasicStandard',
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				img: 'transmissionMediumStandard',
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				img: 'transmissionHeavyStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe',
			basic: {
				img: 'transmissionBasicDeluxe',
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				img: 'transmissionMediumDeluxe',
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				img: 'transmissionHeavyDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		headlights: [
		{
			id: 'c1',
			frame: 1,
			description: 'discount',
			basic: {
				img: 'headlightsDiscount',
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'headlightsDiscount',
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				img: 'headlightsDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			frame: 2,
			description: 'standard',
			basic: {
				img: 'headlightsStandard',
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				img: 'headlightsStandard',
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				img: 'headlightsStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe',
			basic: {
				img: 'headlightsDeluxe',
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				img: 'headlightsDeluxe',
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				img: 'headlightsDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		quickCoupler: [
		{
			id: 'c1',
			frame: 1,
			description: 'discount',
			heavy: {
				img: 'quickCouplerDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			frame: 2,
			description: 'standard',
			heavy: {
				img: 'quickCouplerStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe',
			heavy: {
				img: 'quickCouplerDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		threePointHitch: [
		{
			id: 'c1',
			img: 'transmission1',
			frame: 1,
			description: 'discount',
			heavy: {
				img: 'threePointHitchDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			img: 'transmission2',
			frame: 2,
			description: 'standard',
			heavy: {
				img: 'threePointHitchStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe',
			heavy: {
				img: 'threePointHitchDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		powerTakeoff: [
		{
			id: 'c1',
			frame: 1,
			description: 'discount',
			heavy: {
				img: 'powerTakeoffDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			frame: 2,
			description: 'standard',
			heavy: {
				img: 'powerTakeoffStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe',
			heavy: {
				img: 'powerTakeoffDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		heater: [
		{
			id: 'c1',
			frame: 1,
			description: 'discount heater',
			heavy: {
				img: 'heaterDiscount',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			frame: 2,
			description: 'standard heater',
			heavy: {
				img: 'heaterStandard',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			frame: 3,
			description: 'deluxe heater',
			heavy: {
				img: 'heaterDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		bucket: [
		{
			id: 'c1',
			img: 'transmission1',
			frame: 1,
			description: 'discount',
			basic: {
				img: 'bucketDiscount',
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'bucketStandard',
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				img: 'bucketDeluxe',
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			img: 'transmission2',
			frame: 2,
			description: 'standard',
			basic: {
				img: 'bucketDiscount',
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				img: 'bucketStandard',
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				img: 'bucketDeluxe',
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			img: 'transmission3',
			frame: 3,
			description: 'deluxe',
			basic: {
				img: 'bucketDiscount',
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				img: 'bucketStandard',
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				img: 'bucketDeluxe',
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		flameDecal: [
		{
			id: 'c1',
			frame: 1,
			description: 'flame decal',
			basic: {
				img: 'flameDecal',
				cost: 30,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'flameDecal',
				cost: 30,
				build: 50,
				sell: 1000
			},
			heavy: {
				img: 'flameDecal',
				cost: 30,
				build: 50,
				sell: 1000
			}
		}
		],
		gps: [
		{
			id: 'c1',
			frame: 1,
			description: 'GPS',
			basic: {
				img: 'gps',
				cost: 50,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'gps',
				cost: 50,
				build: 50,
				sell: 1000
			},
			heavy: {
				img: 'gps',
				cost: 50,
				build: 50,
				sell: 1000
			}
		}
		],
		stainlessExhaust: [
		{
			id: 'c1',
			frame: 1,
			description: 'stainless exhaust',
			basic: {
				img: 'stainlessExhause',
				cost: 100,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'stainlessExhause',
				cost: 100,
				build: 50,
				sell: 1000
			},
			heavy: {
				img: 'stainlessExhause',
				cost: 100,
				build: 50,
				sell: 1000
			}
		}
		],
		autoPilot: [
		{
			id: 'c1',
			frame: 1,
			description: 'auto pilot',
			basic: {
				img: 'autoPilot',
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				img: 'autoPilot',
				cost: 300,
				build: 50,
				sell: 1000
			},
			heavy: {
				img: 'autoPilot',
				cost: 300,
				build: 50,
				sell: 1000
			}
		}
		]
	},
	levels: [
	// level 1
	{
		brief: {
			background: 'briefBg01',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
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
		brief: {
			background: 'briefBg02',
			text: [
				'Build 2 Factories'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 2,
			calculation: 'length'
		}
		]
	},
	// level 3
	{
		brief: {
			background: 'briefBg03',
			text: [
				'Build 2 Factories',
				'Create 1 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 4
	{
		brief: {
			background: 'briefBg04',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 5
	{
		brief: {
			background: 'briefBg05',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 6
	{
		brief: {
			background: 'briefBg01',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 7
	{
		brief: {
			background: 'briefBg02',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 8
	{
		brief: {
			background: 'briefBg03',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 9
	{
		brief: {
			background: 'briefBg04',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	},
	// level 10
	{
		brief: {
			background: 'briefBg05',
			text: [
				'Build 1 Factory',
				'Create 2 Machine Models',
				'Produce 10 Machines'
			]
		},
		goals: [
		{
			type: 'profit',
			value: 0,
			calculation: 'number'
		},
		{
			type: 'newBuildings',
			value: 1,
			calculation: 'length'
		},
		{
			type: 'newMachineModels',
			value: 2,
			calculation: 'length'
		},
		{
			type: 'newMachines',
			value: 5,
			calculation: 'length'
		}
		]
	}
	]
};

