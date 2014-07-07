var playerData = {
	level: 0,
	bank: 0,
	profit: 0,
	bonusPoints: 0,
	bonusesAchieved: {
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
		factory: 0,
		retailer: 0
	},
	modelCount: {
		tractor: 0,
		skidsteer: 0
	},
	machinesBuilt: {
		tractor: 0,
		skidsteer: 0
	}
	// TESTING LEVEL 1:
	// level: 1,
	// bank: 879350,
	// profit: 0,
	// buildingCount: {
	// 	factory: 1,
	// 	retailer: 0
	// },
	// modelCount: {
	// 	skidsteer: 0,
	// 	tractor: 1
	// },
	// sectors: [
	// {},
	// {
	// 	factory0: {
	// 		age: 50,
	// 		cell: 35,
	// 		equipment: {
	// 			tractorA: {
	// 				cost: 2950,
	// 				factoryId: "factory0",
	// 				id: "tractorA",
	// 				name: "TRACTOR A",
	// 				parts: {
	// 					engine: 0,
	// 					headlights: 0,
	// 					tires: 0,
	// 					transmission: 0
	// 				},
	// 				retailerId: "",
	// 				sell: 13000,
	// 				size: "basic",
	// 				traderouteId: "",
	// 				type: "tractor"
	// 			}
	// 		},
	// 		id: "factory0",
	// 		inventory: {
	// 			tractorA: []
	// 		},
	// 		name: "FACTORY 1",
	// 		sector: 1,
	// 		state: "active",
	// 		totalInventory: 0,
	// 		type: "factory"	
	// 	}
	// },
	// {},
	// {},
	// {}
	// ]
}