var playerData = {
	bank: 1000000,
	buildings: [
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
		showroom: 0
	},
	machineCount: {
		tractor: 0,
		skidsteer: 0
	},
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