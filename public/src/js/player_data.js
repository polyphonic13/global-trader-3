var playerData = {
	bank: 1000000,
	profit: 0,
	level: 0,
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
	machineCount: {
		tractor: 0,
		skidsteer: 0
	},
	retailers: [],
	tradeRoutes: [
	{
		name: 'asia',
		lifeTime: 2,
		consumption: {
			tractors: {
				basic: [5],
				medium: [0],
				heavy: [1]
			},
			skidsteers: {
				basic: [0],
				medium: [3],
				heavy: [1]
				
			}
		}
	}
	]
}