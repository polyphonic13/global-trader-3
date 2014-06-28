var GAME_NAME = 'global_trader_3_0';
var TIME_PER_TURN = 52;
var TURN_TIME_INTERVAL = 1000;
var US_DETAIL_GRID_CELLS = 6;
var TIME_TO_MANUFACTOR = 5;
var MACHINE_LIST_COLUMNS = 2; 
var aspectRatio = [10, 16];

function startGame() {
	PhaserGame.init(aspectRatio);
}

var buildingTypes = {
	FACTORY: 'factory',
	SHOWROOM: 'showroom'
};
var tileCellFrames = {
	EMPTY: 0,
	ACTIVE: 1,
	FACTORY_CONSTRUCTION: 2,
	FACTORY_ACTIVE: 3,
	SHOWROOM_CONSTRUCTION: 5,
	SHOWROOM_ACTIVE: 6
};

var turnGroups = [
	'play',
	'usDetail',
	'buildingEdit',
	'equipmentList',
	'equipmentCreate',
	'equipmentEdit'
];

var gameLogic = {
	global: {
		listeners: 
		[
		// change state
		{
			event: Events.CHANGE_SCREEN,
			handler: function(event) {
				PWG.ViewManager.switchGroup(event.value);
				PWG.ScreenManager.changeScreen(event.value);

				if(turnGroups.indexOf(event.value) > -1) {
					// trace('this is a turn group!');
					if(!PhaserGame.turnActive) {
						PhaserGame.startTurn();
					}
				} else {
					if(PhaserGame.turnActive) {
						// trace('deactivating turn');
						PhaserGame.stopTurn();
					}
				}
			}
		},
		// add notification
		{
			event: Events.OPEN_NOTIFICATION,
			handler: function(event) 
			{
				// trace('add notification event handlers, notification = ', (this.views['notification']));
				var notification = this.views['notification'];
				var notificationView = notification.children['notification-text'].view;

				if(notificationView.text !== event.value) {
					notificationView.setText(event.value);
				}
				notification.show();
			}
		},
		// remove notification
		{
			event: Events.CLOSE_NOTIFICATION,
			handler: function(event) 
			{
				this.views['notification'].hide();
			}
		},
		// game time updated
		{
			event: Events.GAME_TIME_UPDATED,
			handler: function(event) {
				PhaserGame.turnTime = event.value;
				var text = (event.value >= 10) ? event.value : '0' + event.value;
				// trace('turn time = ' + event.value);
				PWG.ViewManager.callMethod('global:turnGroup:timerText', 'setText', [text], this);
			}
		},
		// bank updated
		{
			event: Events.UPDATE_BANK,
			handler: function(event) {
				PhaserGame.playerData.bank += event.value;
				PhaserGame.setSavedData();
				var text = '$' + PWG.Utils.formatMoney(PhaserGame.playerData.bank, 0);
				// trace('bank updated to = ' + event.value);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);
			}
		},
		// turn ended
		{
			event: Events.TURN_ENDED,
			handler: function(event) {
				PWG.PhaserTime.removeTimer('turnTime');
				// trace('turn ended');
				PWG.ViewManager.callMethod('global:turnGroup:timerText', 'setText', [TIME_PER_TURN], this);
			}
		},
		// building state updated
		{
			event: Events.BUILDING_STATE_UPDATED,
			handler: function(event) {
				var config = event.building.config;
				// trace('BUILDING_STATE_UPDATED, config = ', config);
				GridManager.updateBuildingState(config.sector, config.cell, config.type, config.state);
			}
		}
		],
		methods: {
			// INITIAIZATION
			init: function() {
				PhaserGame.getSavedData();
				BuildingManager.init();
			},
			preload: function() {
				PWG.PhaserLoader.load(PhaserGame.config.assets);
				// PWG.ScreenManager.preload();
			},
			create: function() {
				GridManager.init(usSectors, US_DETAIL_GRID_CELLS, US_DETAIL_GRID_CELLS, PWG.Stage.gameW/6);
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: PhaserGame.config.defaultScreen });
			},
			render: function() {
				PWG.ScreenManager.render();
			},
			getSavedData: function() {
				var savedData = PWG.Storage.get(GAME_NAME);
				if(!savedData) {
					// trace('there was not saved data, using: ', playerData);
					savedData = playerData;
				}
				PhaserGame.playerData = savedData;
				// trace('============ post get saved data, playerData = ', PhaserGame.playerData);
			},
			setSavedData: function() {
				var params = {};
				params[GAME_NAME] = PhaserGame.playerData;
				PWG.Storage.set(params);
			},
			turnOnComplete: function() {
				trace('PhaserGame/turnOnComplete');
				var ignitionKey = PWG.ViewManager.getControllerFromPath('start:ignitionKey');
				ignitionKey.view.events.onAnimationComplete.remove(PhaserGame.turnOnComplete, this);
				if(PhaserGame.isFirstPlay) {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
					PhaserGame.isFirstPlay = false;
				} else {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'play' });
				}
			},
			startTurn: function() {
				// trace('START TURN');
				PhaserGame.turnActive = true;
				PhaserGame.timePerTurn = TIME_PER_TURN;
				PhaserGame.turnTimer = new PWG.PhaserTime.Controller('turnTime');
				PhaserGame.turnTimer.loop(TURN_TIME_INTERVAL, function() {
						// trace('\ttimePerTurn = ' + PhaserGame.timePerTurn + ', views = ', this.views);
						PhaserGame.timePerTurn--;
						if(PhaserGame.timePerTurn <= 0) {
							PWG.EventCenter.trigger({ type: Events.TURN_ENDED });
						} else {
							BuildingManager.update();
							PWG.EventCenter.trigger({ type: Events.GAME_TIME_UPDATED, value: PhaserGame.timePerTurn });
						}
					},
					this
				);
				PhaserGame.turnTimer.start();
				var text = '$' + PWG.Utils.formatMoney(PhaserGame.playerData.bank, 0);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);

				PWG.ViewManager.showView('global');
				PWG.ViewManager.hideView('global:turnGroup:saveMachineButton');
				PWG.ViewManager.hideView('global:turnGroup:equipmentButton');
				PWG.ViewManager.hideView('global:turnGroup:addEquipment');
			},
			stopTurn: function() {
				PWG.PhaserTime.removeTimer('turnTime');
				PhaserGame.turnActive = false;
				PWG.ViewManager.hideView('global:turnGroup:closeButton');
				PWG.ViewManager.hideView('global:turnGroup:equipmentButton');
			},
			buildUSDetailGrid: function() {
				// trace('BUILD DETAIL GRID, this = ', this);
				var usDetail = PWG.ViewManager.getControllerFromPath('usDetail');
				var gridCoordinates = GridManager.grids[PhaserGame.activeSector];
				var usDetailGrid = PWG.Utils.clone(PhaserGame.config.dynamicViews.usDetailGrid);
				var gridItem = PhaserGame.config.dynamicViews.usDetailGridItem;
				var gridConfig = {};
				PWG.Utils.each(
					gridCoordinates,
					function(coordinate, idx) {
						// trace('\tcoordinate = ', coordinate);
						var item = PWG.Utils.clone(gridItem);
						item.name += idx;
						item.x += coordinate.x;
						item.y += coordinate.y;
						item.attrs.frame = coordinate.frame;
						item.cell = idx;
						item.sector = PhaserGame.activeSector;
						item.input = {
							inputDown: function() {
								return function(item) {
									PhaserGame.tileClicked(item);
								}(item);
							}
						};
						usDetailGrid.views[idx] = item;
					},
					this
				);

				PWG.ViewManager.addView(usDetailGrid, usDetail, true);
				// trace('CURRENT US SECTOR = ' + PhaserGame.activeSector);
				PWG.ViewManager.callMethod('usDetail:sectorTitle', 'setText', [sectorTitles[PhaserGame.activeSector]], this);
			},
			tileClicked: function(tile) {
				if(PhaserGame.turnActive) {
					var view = PWG.ViewManager.getControllerFromPath('usDetail:usDetailGrid:'+tile.name);
					// trace('tile click: ' + tile.cell + ' in ' + tile.sector, tile, '\tview = ', view);
					var frame = tile.attrs.frame;
					PhaserGame.activeTile = tile;
					switch(frame) {
						case tileCellFrames.EMPTY:
							// trace('\topen buildings menu');
							PWG.EventCenter.trigger({ type: Events.OPEN_BUILDINGS_MENU });
						break;

						case tileCellFrames.ACTIVE:
						tile.attrs.frame = 0;
						PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, tileCellFrames.EMPTY);
						PhaserGame.activeTile = null;
						break; 

						case tileCellFrames.FACTORY_CONSTRUCTION:
						// trace('factory construction'); 
						break;

						case tileCellFrames.FACTORY_ACTIVE:
						// trace('factory active'); 
						// show factory detail
						PhaserGame.activeFactory = BuildingManager.getBuilding(PhaserGame.activeSector, PhaserGame.activeTile.cell);
						// trace('active factory = ', PhaserGame.activeFactory);
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
						break;

						// case tileCellFrames.SHOWROOM_CONSTRUCTION: 
						// trace('showroom construction'); 
						// break;
						// 
						// case tileCellFrames.SHOWROOM_ACTIVE: 
						// trace('showroom active'); 
						// break;

						default:
						break;
					}
				}
			},
			addBuildingMenu: function() {
				// PhaserGame.addBuildingItemsOverlay.call(this, event.value, this.views);
				var buildingMenuConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingMenu);
				// trace('addBuildingMenu, buildingMenuConfig = ', buildingMenuConfig);
				PWG.ViewManager.addView(buildingMenuConfig);
				this.buildingMenuOpen = true;
			},
			addBuilding: function() {
				PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
				var tile = PhaserGame.activeTile;
				var added = BuildingManager.create('factory', { sector: PhaserGame.activeSector, cell: tile.cell });
				if(added) {
					tile.attrs.frame = 1;
					PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, tileCellFrames.FACTORY_CONSTRUCTION);
				}
			},
			cancelAddBuilding: function() {
				PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
				// trace('cancel add building');
				PhaserGame.activeTile = null;
			},
			addPartItemsMenu: function(type, collection) {
				PhaserGame.activePartType = type;
				var partsData = gameData.parts[type];
				// trace('addPartItemsMenu, type = ' + type + '\tparts data = ', partsData);
				var partsMenuConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partsMenu);
				var itemConfig = PhaserGame.config.dynamicViews.partSelectionIcon;
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var size = PhaserGame.activeMachineSize;
				var count = 0;
				var itemY = 0;

				PWG.Utils.each(
					partsData,
					function(part, idx) {
						// trace('\tadding part[' + p + '] info to views');
						var item = PWG.Utils.clone(itemConfig);
						item.name = part.id;
						item.views.icon.img = part.icon;
						item.views.description.text = part.description;
						item.views.cost.text = '$' + part[size].cost;
						item.views.invisButton.partIdx = idx;

						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partsMenuConfig.views['items'].views[idx] = item;
						count++;
					},
					this
				);
				// trace('partsMenuConfig = ', partsMenuConfig);
				PWG.ViewManager.addView(partsMenuConfig);
				// trace('\tcreated partsMenu from: ', partsMenuConfig, '\tcollection now = ', collection);
			}
		},
		input: {
			plusButton: {
				inputUp: function() {
					// trace('plus pressed');
					PWG.EventCenter.trigger({ type: Events.ZOOM_IN });
				}
			},
			minusButton: {
				inputUp: function() {
					// trace('plus pressed');
					PWG.EventCenter.trigger({ type: Events.ZOOM_OUT });
				}
			},
			newFactory: {
				inputDown: function() {
					// trace('factoryIcon/inputDown, this = ', this);
					if(this.selected) {
						PhaserGame.selectedIcon = '';
						this.selected = false;
					} else {
						PhaserGame.selectedIcon = this.controller.id;
						this.selected = true;
						var input = this.controller.view.input;
						var attrs = this.controller.config.attrs;
						input.enableDrag();
						input.enableSnap(attrs.width, attrs.height, false, true);
						// input.enableSnap(32, 32, false, true);
					}
				},
				onDragStop: function() {
					var view = this.controller.view;
					// trace('config on drag stop, view x/y = ' + view.x + '/' + view.y + ', max = ' + (PWG.Stage.unit * 10.5) + ', min = ' + (PWG.Stage.unit * 3.5));
					if(view.y < (PWG.Stage.unit * 3.5)) {
						view.y = PWG.Stage.unit * 3.5;
					} else if(view.y > (PWG.Stage.unit * 10.5)) {
						view.y = PWG.Stage.unit * 9.4;
					}
					
					var maxX = (PWG.Stage.gameW + view.width);
					if(view.x > maxX) {
						view.x = maxX;
					} else if(view.x < 0) {
						view.x = 0;
					}
					// trace('view x/y is now: ' + view.x + '/' + view.y);
				}
			},
			newShowroom: {
				inputDown: function() {
					// trace('showroomIcon/inputDown, this = ', this);
					if(this.selected) {
						PhaserGame.selectedIcon = '';
						this.selected = false;
					} else {
						PhaserGame.selectedIcon = this.controller.id;
						this.selected = true;
						var input = this.controller.view.input;
						var attrs = this.controller.config.attrs;
						input.enableDrag();
						input.enableSnap(attrs.width, attrs.height, false, true);
						// input.enableSnap(32, 32, false, true);
					}
				},
				onDragStop: function() {
					var view = this.controller.view;
					// trace('config on drag stop, view x/y = ' + view.x + '/' + view.y + ', max = ' + (PWG.Stage.unit * 10.5) + ', min = ' + (PWG.Stage.unit * 3.5));
					if(view.y < (PWG.Stage.unit * 3.5)) {
						view.y = PWG.Stage.unit * 3.5;
					} else if(view.y > (PWG.Stage.unit * 10.5)) {
						view.y = PWG.Stage.unit * 9.4;
					}
					
					var maxX = (PWG.Stage.gameW + view.width);
					if(view.x > maxX) {
						view.x = maxX;
					} else if(view.x < 0) {
						view.x = 0;
					}
					// trace('view x/y is now: ' + view.x + '/' + view.y);
				}
			},
			newTractor: {
				inputDown: function() {
					// trace('new tractor callback');
					PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR });
				}
			},
			newSkidsteer: {
				inputDown: function() {
					PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER });
				}
			},
			editMachine: {
				inputDown: function() {
					PWG.EventCenter.trigger({ type: Events.EDIT_MACHINE, value: this.controller.config.machineIdx });
				}
			},
			basicSize: {
				inputDown: function() {
					PWG.EventCenter.trigger({ type: Events.MACHINE_SIZE_SELECTION, value: EquipmentSizes.BASIC });
				}
			},
			mediumSize: {
				inputDown: function() {
					PWG.EventCenter.trigger({ type: Events.MACHINE_SIZE_SELECTION, value: EquipmentSizes.MEDIUM });
				}
			},
			heavySize: {
				inputDown: function() {
					PWG.EventCenter.trigger({ type: Events.MACHINE_SIZE_SELECTION, value: EquipmentSizes.HEAVY });
				}
			},
			wheelIcon: {
				inputDown: function() {
					// trace('wheel icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.WHEELS });
				}
			},
			engineIcon: {
				inputDown: function() {
					// trace('engine icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.ENGINE });
				}
			},
			transmissionIcon: {
				inputDown: function() {
					// trace('transmission icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.TRANSMISSION });
				}
			},
			cabIcon: {
				inputDown: function() {
					// trace('cab icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.CAB });
				}
			},
			headlightsIcon: {
				inputDown: function() {
					// trace('headlights icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.HEADLIGHTS });
				}
			},
			bucketIcon: {
				inputDown: function() {
					// trace('bucket icon input down');
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PartTypes.BUCKET });
				}
			},
			partsMenu: {
				closeButton: {
					callback: function() {
						PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
					}
				}
			},
			partSelectionIcon: {
				inputDown: function(event) {
					PWG.EventCenter.trigger({ type: Events.ADD_PART, value: this.controller.config.partIdx });
				}
			}
		},
		buttonCallbacks: {
			manualStart: function() {
				// PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
			},
			manualClose: function() {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'start' });
			},
			playStart: function() {
				trace('play start');
				var ignitionKey = PWG.ViewManager.getControllerFromPath('start:ignitionKey');
				ignitionKey.view.events.onAnimationComplete.add(PhaserGame.turnOnComplete, this);
				PWG.PhaserAnimation.play(ignitionKey.name, 'turnOn');
			},
			usDetailClose: function() {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'play' });
			},
			notificationClose: function() {
				PWG.EventCenter.trigger({ type: Events.CLOSE_NOTIFICATION });
			},
			// us detail
			usDetailStart: function(param) {
				// trace('usDetailStart callback, this = ', this, '\tparam = ', param);
			}, 
			northeastDetail: function() {
				PhaserGame.activeSector = usSectors.NORTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			},
			southeastDetail: function() {
				PhaserGame.activeSector = usSectors.SOUTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			},
			midwestDetail: function() {
				PhaserGame.activeSector = usSectors.MID_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			},
			northwestDetail: function() {
				PhaserGame.activeSector = usSectors.NORTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			},
			southwestDetail: function() {
				PhaserGame.activeSector = usSectors.SOUTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			},
			buildingAddConfirm: function() {
				PWG.EventCenter.trigger({ type: Events.ADD_BUILDING });
			},
			buildingAddCancel: function() {
				PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
			},
			// equipment list
			equipmentListStart: function() {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
			},
			equipmentListClose: function() {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'play' });
			},
			// add equipment
			addEquipment: function() {
				// trace('add equipment button clicked');
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentCreate' });
			},
			// equipment edit
			partsMenuClose: function() {
				PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
			},
			equipmentCreateClose: function() {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
			},
			saveMachine: function() {
				PWG.EventCenter.trigger({ type: Events.SAVE_MACHINE });
			},
			closeButton: function() {
				switch(PWG.ScreenManager.currentId) {
					case 'play':
					var endTurn = confirm('Are you sure you want to end the turn?');
					if(endTurn) {
						PWG.EventCenter.trigger({ type: Events.TURN_ENDED });
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'start' });
					}
					break; 
					
					case 'usDetail':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'play' });
					break;
					
					case 'buildingEdit':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
					break;
					
					case 'equipmentList':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
					break;
					
					case 'equipmentCreate':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
					break;
					
					case 'equipmentEdit':
					if(PhaserGame.machineDirty) {
						// notify of unsaved changes
					}
					PWG.ViewManager.hideView('global:turnGroup:saveMachineButton');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
					break;
					
					default:
					break;
				}
				// PWG.ViewManager.hideView('global:turnGroup:closeButton');
			}
		}
	},
	screens: {
		start: {
			create: function() {
				PWG.ViewManager.hideView('global:turnGroup');
			},
			shutdown: function() {
				var ignitionKey = PWG.ViewManager.getControllerFromPath('start:ignitionKey');
				PWG.PhaserAnimation.play(ignitionKey.name, 'idle');
			}
		},
		manual: {
			create: function() {
				
			}
		},
		play: {
			create: function() {
				PWG.ViewManager.showView('global');
				PWG.ViewManager.hideView('global:turnGroup:equipmentButton');
				PWG.ViewManager.showView('global:turnGroup:closeButton');

				var gameUnit = PWG.Stage.unit;
				var worldMap = PWG.ViewManager.getControllerFromPath('play:worldMap');
				// worldMap.view.scale.setTo(PhaserGame.config.maxWorldZoom, PhaserGame.config.maxWorldZoom);
				// worldMap.view.y = -(gameUnit * 31.2);
				// worldMap.view.x = -(gameUnit * 8.2);
				
				PhaserGame.activeSector = -1;
			}
		},
		usDetail: {
			listeners: [
			// open building menu
			{
				event: Events.OPEN_BUILDINGS_MENU,
				handler: function(event) {
					// trace('open overlay menu handler, value = ' + event.value + ', overlay open = ' + this.partsMenuOpen + ', partsMenuType = ' + this.partsMenuType);
					if(!this.buildingMenuOpen) {
						PhaserGame.addBuildingMenu();
						this.buildingMenuOpen = true;
					}
				}
			},
			// building state updated
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					var config = event.building.config;
					if(config.sector === PhaserGame.activeSector) {
						var viewPath = 'usDetail:usDetailGrid:usDetailGridItem'+config.cell;
						var view = PWG.ViewManager.getControllerFromPath(viewPath);
						var frameKey = config.type.toUpperCase() + '_' + config.state.toUpperCase();
						var frame = tileCellFrames[frameKey];
						// trace('\tviewPath = ' + viewPath + ', view = ', view);

						PWG.ViewManager.setFrame(viewPath, frame);
						view.config.attrs.frame = frame;
					}
				}
			},
			// add building
			{
				event: Events.ADD_BUILDING,
				handler: function(event) {
					PhaserGame.addBuilding();
				}
			},
			// close building menu
			{
				event: Events.CLOSE_BUILDINGS_MENU,
				handler: function(event) {
					// trace('close overlay handler, overlay open = ' + this.buildingMenuOpen);
					if(this.buildingMenuOpen) {
						// trace('\toverlay-menu = ', (this.views['overlay-menu']));
						PWG.ViewManager.hideView('buildingMenu');
						this.buildingMenuOpen = false;
					}
				}
			}
			],
			create: function() {
				// show add building button
				// trace('show add building button');
				PWG.ViewManager.showView('global:turnGroup:closeButton');
				
				PhaserGame.buildUSDetailGrid.call(this);
			},
			shutdown: function() {
				// hide add building button
				PWG.ViewManager.removeGroupChildren('usDetail:usDetailGrid');
			}
		},
		buildingEdit: {
			listeners: [
			// open building menu
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					trace('BUILDING_STATE_UPDATED event = ', event);
					var config = event.building.config;
 					var buildingEditConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails);
					var equipmentUpdate = buildingEditConfig.views.equipment.text + PWG.Utils.objLength(config.equipment) + ' / ' + BuildingManager.FACTORY_MAX_MODELS;
					var inventoryUpdate = buildingEditConfig.views.inventory.text + config.inventory.length + ' / ' + BuildingManager.FACTORY_MAX_INVENTORY;

					PWG.ViewManager.callMethod('buildingEdit:editDetails:equipment', 'setText', [equipmentUpdate], this);
					PWG.ViewManager.callMethod('buildingEdit:editDetails:inventory', 'setText', [inventoryUpdate], this);
				}
			}
			],
			create: function() {
				var buildingEdit = PWG.ViewManager.getControllerFromPath('buildingEdit');
				var building = PhaserGame.activeFactory;
				trace('building = ', building);
				var buildingEditConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails);
				// trace('buildingEditConfig = ', buildingEditConfig);
				// trace('screen view = ', screenView, '\tactive factory = ', building);
				buildingEditConfig.views.name.text += building.name;
				buildingEditConfig.views.status.text += building.state.toUpperCase();
				buildingEditConfig.views.equipment.text += PWG.Utils.objLength(building.equipment) + ' / ' + BuildingManager.FACTORY_MAX_MODELS;
				buildingEditConfig.views.inventory.text += building.inventory.length + ' / ' + BuildingManager.FACTORY_MAX_INVENTORY;

				PWG.ViewManager.addView(buildingEditConfig, buildingEdit, true);
				PWG.ViewManager.showView('global:turnGroup:equipmentButton');
			},
			shutdown: function() {
				PWG.ViewManager.removeView('editDetails', 'buildingEdit');
				PWG.ViewManager.hideView('global:turnGroup:equipmentButton');
				PWG.ViewManager.hideView('global:turnGroup:addEquipment');
			}
		},
		equipmentList: {
			listeners: [
			{
				event: Events.EDIT_MACHINE,
				handler: function(event) {
					var config = PhaserGame.playerData.buildings[PhaserGame.activeSector][PhaserGame.activeFactory.id].equipment[event.value];
					// trace('edit machine: event = ', event, 'config = ', config);
					PhaserGame.activeMachineType = config.type;
					PhaserGame.activeMachineSize = config.size;
					PhaserGame.activeMachine = new Machine(config);
					PhaserGame.newMachine = false;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			}
			],
			create: function() {
				// show add equipment button
				PWG.ViewManager.showView('global:turnGroup:closeButton');
				
				var equipment = PhaserGame.activeFactory.equipment;
				trace('build equipment list = ', equipment);
				var machineList = PWG.Utils.clone(PhaserGame.config.dynamicViews.machineList);
				var machineIcon = PhaserGame.config.dynamicViews.machineIcon;

				var offsetX = machineIcon.offsetX;
				var offsetY = machineIcon.offsetY;
				var iconW = machineIcon.iconW;
				var iconH = machineIcon.iconH;
				var columnW = PWG.Stage.gameW/MACHINE_LIST_COLUMNS;
				
				var column = 0;
				var count = 0;
				var itemY = 0;
			
				PWG.Utils.each(
					equipment,
					function(machine, idx) {
						// trace('\tadding machine['+idx+']: ', machine);
						var item = PWG.Utils.clone(machineIcon);
						// trace('\titem = ', item);
						item.name = 'machine' + idx;
						item.views.name.text = machine.name;
						item.views.cost.text = '$' + machine.cost;
						item.views.sell.text = machine.sell;
						item.views.invisButton.machineIdx = machine.id;
						// increment y to next row:
						if(count % MACHINE_LIST_COLUMNS === 0) {
							itemY = (iconH * (count/MACHINE_LIST_COLUMNS)) + offsetY;
						}
						
						var columnX = offsetX + ((PWG.Stage.gameW/2) * (count % MACHINE_LIST_COLUMNS));

						PWG.Utils.each(
							item.views,
							function(view) {
								view.x += columnX;
								view.y += itemY;
							},
							this
						);
				
						machineList.views[item.name] = item;
						count++;
					},
					this
				);
				// trace('machineList = ', machineList);
				var equipmentListView = PWG.ViewManager.getControllerFromPath('equipmentList');
				PWG.ViewManager.addView(machineList, equipmentListView, true);
				PWG.ViewManager.showView('global:turnGroup:addEquipment');
			},
			shutdown: function() {
				PWG.ViewManager.removeView('machineList', 'equipmentList');
				PWG.ViewManager.hideView('global:turnGroup:addEquipment');
			}
		},
		equipmentCreate: {
			listeners: [
			// machine type selection
			{
				event: Events.MACHINE_TYPE_SELECTION,
				handler: function(event) {
					// activate size category buttons
					// trace('machine type selection, event = ', event);
					PhaserGame.activeMachineType = event.value;
					PWG.ViewManager.hideView('equipmentCreate:createIcons:machineType');
					if(event.value === EquipmentTypes.TRACTOR) {
						PWG.ViewManager.showView('equipmentCreate:createIcons:tractorSize');
						PWG.ViewManager.hideView('equipmentCreate:createIcons:skidsteerSize');
					} else {
						PWG.ViewManager.showView('equipmentCreate:createIcons:skidsteerSize');
						PWG.ViewManager.hideView('equipmentCreate:createIcons:tractorSize');
					}
				}
			},
			// machine size selection
			{
				event: Events.MACHINE_SIZE_SELECTION,
				handler: function(event) {
					// 
					var type = PhaserGame.activeMachineType;
					var letter = alphabet.UPPER[PhaserGame.playerData.machineCount[type]];
					var id = type + letter;
					var name = type.toUpperCase() + ' ' + letter;
					PhaserGame.activeMachineSize = event.value;
					PhaserGame.activeMachine = new Machine({ id: id, type: PhaserGame.activeMachineType, size: event.value, name: name, factoryId: PhaserGame.activeFactory.id });
					PhaserGame.newMachine = true;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			}
			],
			create: function() {
				// trace('EQUIPMENT CREATE CREATE METHOD');
				PWG.ViewManager.hideView('equipmentCreate:createIcons:tractorSize');
				PWG.ViewManager.hideView('equipmentCreate:createIcons:skidsteerSize');
				PWG.ViewManager.showView('global:turnGroup:closeButton');
			}
		},
		equipmentEdit: {
			listeners: [
			// add part
			{
				event: Events.ADD_PART,
				handler: function(event) {
					PhaserGame.activeMachine.setPart(PhaserGame.activePartType, event.value);
					// trace('show part, type = ' + event.value + ', part type = ' + this.partsMenuType + ', view collection = ', this.views);
					var frame = gameData.parts[this.partsMenuType][event.value].frame;
					// trace('frame = ' + frame + ', type = ' + this.partsMenuType + ', collection = ', this.views);
					var partView = this.partsMenuType + 'Part';
					PWG.ViewManager.setFrame('equipmentEdit:editorParts:'+partView, frame);
					PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
				}
			},
			// show build group
			{
				event: Events.SHOW_BUILD_GROUP,
				handler: function(event) {
					// trace('showBuildGroup, size = ' + event.size);
					PhaserGame.activeMachine.set('size', event.size);
					this.views['state-group'].children[event.previousGroup].hide();
					this.views['state-group'].children['editor-group'].show();
				}
			},
			// open parts menu
			{
				event: Events.OPEN_PARTS_MENU,
				handler: function(event) {
					// trace('open overlay menu handler, value = ' + event.value + ', overlay open = ' + this.partsMenuOpen + ', partsMenuType = ' + this.partsMenuType);
					if(!this.partsMenuOpen) 
					{
						if(this.partsMenuType !== event.value) 
						{
							PhaserGame.addPartItemsMenu.call(this, event.value, this.views);
						}
						PWG.ViewManager.showView('partsMenu');
						this.partsMenuType = event.value;
						this.partsMenuOpen = true;
					}
				}
			},
			// close parts menu
			{
				event: Events.CLOSE_PARTS_MENU,
				handler: function(event) {
					// trace('close overlay handler, overlay open = ' + this.partsMenuOpen);
					if(this.partsMenuOpen) {
						// trace('\toverlay-menu = ', (this.views['overlay-menu']));
						PWG.ViewManager.hideView('partsMenu');
						this.partsMenuOpen = false;
					}
				}
			},
			// save machine
			{
				event: Events.SAVE_MACHINE, 
				handler: function(event) {
					// trace('time to save activeMachine: ', PhaserGame.activeMachine);
					PhaserGame.activeMachine.save();
					if(PhaserGame.newMachine) {
						// trace('active factory = ', PhaserGame.activeFactory);
						PhaserGame.playerData.buildings[PhaserGame.activeSector][PhaserGame.activeFactory.id].equipment[PhaserGame.activeMachine.config.id] = PhaserGame.activeMachine.config;
						PhaserGame.playerData.machineCount[PhaserGame.activeMachineType]++;
						PhaserGame.newMachine = false;
					}
					trace('about to save playerData: ', PhaserGame.playerData);
					PhaserGame.setSavedData();
					PhaserGame.activeMachine = null;
					PhaserGame.machineDirty = false;
					PWG.ViewManager.hideView('global:turnGroup:saveMachineButton');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
				}
			}
			],
			create: function() {
				PWG.ViewManager.showView('global:turnGroup:saveMachineButton');
				PWG.ViewManager.showView('global:turnGroup:closeButton');
				
				PWG.ViewManager.setChildFrames('equipmentEdit:editorParts', 0);
				var activeMachineParts = PhaserGame.activeMachine.config.parts;
				if(activeMachineParts) {
					// TODO: show the views/frames of the machine as it currently exists
					// trace('--------- activeMachineParts = ', activeMachineParts);
					PWG.Utils.each(
						activeMachineParts,
						function(value, key) {
							var partView = key + 'Part';
							var frame = gameData.parts[key][value].frame;
							PWG.ViewManager.setFrame('equipmentEdit:editorParts:'+partView, frame);
						},
						this
					);
				}
				PhaserGame.machineDirty = true;
			},
			shutdown: function() {
				this.partsMenuType = '';
				this.partsMenuOpen = false;
				PhaserGame.machineDirty = false;
			}
		}
	}
};