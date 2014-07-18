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
		dealership: true,
		supplier: true,
		tradeRoute: true,
		outOfWholesaleParts: true
	},
	level: 0,
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
		dealership: 0,
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