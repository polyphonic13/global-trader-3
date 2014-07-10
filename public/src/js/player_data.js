var playerData = {
	level: 0,
	bank: 0,
	profit: 0,
	bonusPoints: 0,
	bonusesAchieved: {
		machine10: false,
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
		dealership: 0,
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
	}
	// TESTING LEVEL 1:
	// level: 1,
	// bank: 879350,
	// profit: 0,
	// buildingCount: {
	// 	plant: 1,
	// 	dealership: 0
	// },
	// modelCount: {
	// 	skidsteer: 0,
	// 	tractor: 1
	// },
	// sectors: [
	// {},
	// {
	// 	plant0: {
	// 		age: 50,
	// 		cell: 35,
	// 		equipment: {
	// 			tractorA: {
	// 				cost: 2950,
	// 				plantId: "plant0",
	// 				id: "tractorA",
	// 				name: "TRACTOR A",
	// 				parts: {
	// 					engine: 0,
	// 					headlights: 0,
	// 					tires: 0,
	// 					transmission: 0
	// 				},
	// 				dealershipId: "",
	// 				sell: 13000,
	// 				size: "basic",
	// 				traderouteId: "",
	// 				type: "tractor"
	// 			}
	// 		},
	// 		id: "plant0",
	// 		inventory: {
	// 			tractorA: []
	// 		},
	// 		name: "PLANT 1",
	// 		sector: 1,
	// 		state: "active",
	// 		totalInventory: 0,
	// 		type: "plant"	
	// 	}
	// },
	// {},
	// {},
	// {}
	// ]
}