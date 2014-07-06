

var GridManager = function() {
	var module = {};

	module.grids = {};
	
	module.init = function(sectors, xCells, yCells, gridSize) {
		module.initGrid(sectors, xCells, yCells, gridSize);
		module.initBuildings(TurnManager.playerData.buildings);
	}
	
	module.initGrid = function(sectors, xCells, yCells, gridSize) {
		PWG.Utils.each(
			sectors,
			function(sector) {
				var gridCoordinates = PWG.GridGenerator.createRectangle(xCells, yCells, gridSize, gridSize);
				var grid = [];
				PWG.Utils.each(
					gridCoordinates,
					function(coordinate) {
						grid.push({
							frame: 0,
							x: coordinate.start.x,
							y: coordinate.start.y
						});
					},
					this
				);
				module.grids[sector] = grid;
			},
			this
		);
		// trace('---- grid manager init complete, grids = ', module.grids);
	};
	
	module.initBuildings = function(buildings) {
		// trace('BuildingManager/initBuildings, buildings = ' + buildings);
		PWG.Utils.each(
			buildings,
			function(sectorBuildings, s) {
				// trace('\tsectorBuildings['+s+'] = ', sectorBuildings);
				PWG.Utils.each(
					sectorBuildings,
					function(building, b) {
						// trace('\t\tbuilding['+b+'] = ', building);
						module.addBuilding(building, s);
					},
					this
				);
			},
			this
		);
	};

	module.addBuilding = function(building, sector) {
		trace('GridManager/addBuilding, sector = ' + sector + ', building = ', building, module.grids);
		var frameKey = building.type.toUpperCase() + '_' + building.state.toUpperCase();
		module.grids[sector][building.cell].frame = TileCellFrames[frameKey];
		// trace('\tsetting grid['+config.sector+']['+config.cell+'].frame to ' + TileCellFrames[frameKey]);
	};

	module.getRandomEmptyCellIndex = function(sector) {
		var cells = module.grids[sector];
		var emptyCells = [];
		var randomCellIdx;
		var randomCell;
		
		PWG.Utils.each(
			cells,
			function(cell, idx) {
				if(cell.frame === 0) {
					emptyCells.push(idx);
				}
			},
			this
		);
		randomCellIdx = Math.floor(Math.random() * (emptyCells.length - 1) + 1);
		trace('------- returning emptyCells['+randomCellIdx+'] = ' + emptyCells[randomCellIdx] + ', emptyCells = ', emptyCells);
		return emptyCells[randomCellIdx];
	};
	
	module.updateBuildingState = function(sector, cell, type, state) {
		// trace('GridManager/updateBuildingState, sector: ' + sector + ', cell = ' + cell + ', type = ' + type + ', state = ' + state);
		var frameKey = type.toUpperCase() + '_' + state.toUpperCase();
		module.grids[sector][cell].frame = TileCellFrames[frameKey];
	};
	
	module.update = function(sector, cell, value) {
		
	};
	
	return module;
}();