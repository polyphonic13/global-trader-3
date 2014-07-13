var BuildingTypes = {
	PLANT: 'plant',
	DEALERSHIP: 'dealership',
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
	PLANT_CONSTRUCTION: 1,
	PLANT_ACTIVE: 2,
	PLANT_PAUSED: 1,
	DEALERSHIP_CONSTRUCTION: 3,
	DEALERSHIP_ACTIVE: 4,
	DEALERSHIP_PAUSED: 3
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
	CAB: 'cab',
	HEADLIGHTS: 'headlights',
	BUCKET: 'bucket',
	TRACKS: 'tracks',
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
