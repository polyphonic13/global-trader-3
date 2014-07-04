var gameData = {
	buildings: {
		factory: {
			id: 'factory',
			icon: 'iconFactory',
			description: 'Build your machines',
			cost: 100000
		},
		showroom: {
			id: 'showroom',
			icon: 'iconShowroom',
			description: 'Sell your machines',
			cost: 50000
		}
	},
	machines: {
		tractor: {
			basic: {
				requiredParts: [
					'tires',
					'cab',
					'engine',
					'headlights'
				],
				optionalParts: [
				]
			},
			medium: {
				requiredParts: [
					'tires',
					'cab',
					'engine',
					'headlights'
				],
				optionalParts: [
				]
			},
			heavy: {
				requiredParts: [
					'track',
					'cab',
					'engine',
					'headlights'
				],
				optionalParts: [
				]
			}
		},
		skidsteer: {
			basic: {
				requiredParts: [
					'tires',
					'cab',
					'engine',
					'headlights',
					'bucket'
				],
				optionalParts: [
				]
			},
			medium: {
				requiredParts: [
					'tires',
					'cab',
					'engine',
					'headlights',
					'bucket'
				],
				optionalParts: [
				]
			},
			heavy: {
				requiredParts: [
					'track',
					'cab',
					'engine',
					'headlights',
					'bucket'
				],
				optionalParts: [
				]
			}
		}
	},
	parts: {
		tires: [
		{
			id: 'w3',
			icon: 'tires2',
			frame: 1,
			description: 'basic tires',
			basic: {
				cost: 350,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 700,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 1000,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'w1',
			icon: 'tires1',
			frame: 2,
			description: 'standard tires',
			basic: {
				cost: 500,
				build: 100,
				sell: 2000
			},
			medium: {
				cost: 1000,
				build: 200,
				sell: 4000
			},
			heavy: {
				cost: 1500,
				build: 250,
				sell: 5000
			}
		},
		{
			id: 'w4',
			icon: 'tires3',
			frame: 3,
			description: 'deluxe tires',
			basic: {
				cost: 1000,
				build: 250,
				sell: 5000
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 10000
			},
			heavy: {
				cost: 4000,
				build: 1000,
				sell: 20000
			}
		}
		],
		track: [
		{
			id: 'w3',
			icon: 'tires2',
			frame: 1,
			description: 'basic track',
			heavy: {
				cost: 1000,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'w1',
			icon: 'tires1',
			frame: 2,
			description: 'standard track',
			heavy: {
				cost: 1500,
				build: 250,
				sell: 5000
			}
		},
		{
			id: 'w4',
			icon: 'tires3',
			frame: 3,
			description: 'deluxe track',
			heavy: {
				cost: 4000,
				build: 1000,
				sell: 20000
			}
		}
		],
		engine: [
		{
			id: 'e1',
			icon: 'engine1',
			frame: 1,
			description: 'basic engine',
			basic: {
				cost: 2000,
				build: 500,
				sell: 10000
			},
			medium: {
				cost: 4000,
				build: 1000,
				sell: 20000
			},
			heavy: {
				cost: 6000,
				build: 1500,
				sell: 30000
			}
		},
		{
			id: 'e2',
			icon: 'engine2',
			frame: 2,
			description: 'standard engine',
			basic: {
				cost: 3000,
				build: 750,
				sell: 15000
			},
			medium: {
				cost: 6000,
				build: 1500,
				sell: 30000
			},
			heavy: {
				cost: 9000,
				build: 2000,
				sell: 40000
			}
		},
		{
			id: 'e3',
			icon: 'engine3',
			frame: 3,
			description: 'deluxe engine',
			basic: {
				cost: 5000,
				build: 500,
				sell: 10000
			},
			medium: {
				cost: 10000,
				build: 1000,
				sell: 20000
			},
			heavy: {
				cost: 15000,
				build: 1500,
				sell: 30000
			}
		}
		],
		transmission: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		cab: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		headlights: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		quickCoupler: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		threePointHitch: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		powerTakeoff: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
			}
		}
		],
		bucket: [
		{
			id: 'c1',
			icon: 'cab1',
			frame: 1,
			description: 'basic cab',
			basic: {
				cost: 300,
				build: 50,
				sell: 1000
			},
			medium: {
				cost: 600,
				build: 100,
				sell: 2000
			},
			heavy: {
				cost: 900,
				build: 150,
				sell: 3000
			}
		},
		{
			id: 'c2',
			icon: 'cab2',
			frame: 2,
			description: 'standard cab',
			basic: {
				cost: 400,
				build: 75,
				sell: 1500
			},
			medium: {
				cost: 800,
				build: 150,
				sell: 3000
			},
			heavy: {
				cost: 1200,
				build: 225,
				sell: 4500
			}
		},
		{
			id: 'c3',
			icon: 'cab3',
			frame: 3,
			description: 'deluxe cab',
			basic: {
				cost: 1000,
				build: 250,
				sell: 500
			},
			medium: {
				cost: 2000,
				build: 500,
				sell: 1000
			},
			heavy: {
				cost: 3000,
				build: 1000,
				sell: 2000
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

