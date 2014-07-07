var BuildingTypes = {
	FACTORY: 'factory',
	RETAILER: 'retailer',
	TRADEROUTE: 'traderoute'
};

var BuildingStates = {
	CONSTRUCTION: 'construction',
	ACTIVE: 'active',
	PAUSED: 'paused',
	INACTIVE: 'inactive'
};

var TileCellFrames = {
	EMPTY: 0,
	FACTORY_CONSTRUCTION: 1,
	FACTORY_ACTIVE: 2,
	FACTORY_PAUSED: 1,
	RETAILER_CONSTRUCTION: 3,
	RETAILER_ACTIVE: 4,
	RETAILER_PAUSED: 3
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
	WHEELS: 'tires',
	ENGINE: 'engine',
	TRANSMISSION: 'transmission',
	CAB: 'cab',
	HEADLIGHTS: 'headlights',
	BUCKET: 'bucket',
	TRACK: 'track',
	THREE_POINT_HITCH: 'threePointHitch',
	POWER_TAKE_OFF: 'powerTakeoff',
	QUICK_COUPLER: 'quickCoupler',
	CAB_HEATER: 'cabHeater',
	AUTO_PILOT: 'autoPilot',
	STAINLESS_EXHAUST: 'stainlessExhaust',
	GPS: 'gps',
	DECAL: 'decal'
};

var PartDescriptions = {
	tires: 'Tires',
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

var USSectors = {
	NORTH_EAST: 0,
	SOUTH_EAST: 1,
	MID_WEST: 2,
	NORTH_WEST: 3,
	SOUTH_WEST: 4
};

var SectorTitles = [
	'sectorTitleNE',
	'sectorTitleSE',
	'sectorTitleMW',
	'sectorTitleNW',
	'sectorTitleSW'
];

var IconAnimations = {
	DOLLAR_SIGN: 'dollarSign',
	PLUS_SIGN: 'plusSign'
}
