var ASPECT_RATIO = [9, 16];
var GAME_NAME = 'global_trader_3_0';
var FACEBOOK_URL = 'https://www.facebook.com/cnhitrade';
var TIME_PER_TURN = 52;
var TURN_TIME_INTERVAL = 3000;
var US_DETAIL_GRID_CELLS = 6;
var MACHINE_LIST_COLUMNS = 2; 
var MACHINE_LIST_ICONS = 6;
var MIN_WHOLESALE_LEVEL = 2;
var MIN_TRADE_ROUTE_LEVEL = 4;
var NUM_PART_QUALITIES = 3;

function startGame() {
	PhaserGame.init(ASPECT_RATIO, document.documentElement.clientHeight);
}

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

				if(PhaserGame.config.turnScreens.indexOf(event.value) > -1) {
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
		// update bank
		{
			event: Events.UPDATE_BANK,
			handler: function(event) {
				TurnManager.updateBank(event.value);
			}
		},
		// bank updated
		{
			event: Events.BANK_UPDATED,
			handler: function(event) {
				var text = PWG.Utils.formatMoney(TurnManager.get('bank'), 0);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);
			}
		},
		// bonuses updated
		{
			event: Events.BONUSES_UPDATED,
			handler: function(event) {
				// trace('bonuses updated handler, bonuses now = ' + TurnManager.get('bonusPoints'));
				PWG.ViewManager.callMethod('global:turnGroup:bonusText', 'setText', [TurnManager.get('bonusPoints')], this);
			}
		},
		// turn completed
		{
			event: Events.TURN_COMPLETED,
			handler: function(event) {
				PhaserGame.stopTurn();
				trace('turn ended');
				PWG.ViewManager.callMethod('global:turnGroup:timerText', 'setText', [''], this);

				PhaserGame.buildYearEndReport();
			}
		},
		// building state updated
		{
			event: Events.BUILDING_STATE_UPDATED,
			handler: function(event) {
				var config = event.building.config;
				// trace('BUILDING_STATE_UPDATED, config = ', config);
				if(TurnManager.playerData.firstPlay[TutorialTypes.PLANT]) {
					PhaserGame.activeTutorial = TutorialTypes.PLANT;
					PhaserGame.addTutorialGuy();
				}
				GridManager.updateBuildingState(config.sector, config.cell, config.type, config.state);
			}
		},
		// add dealer notification
		{
			event: Events.ADD_DEALER_NOTIFICATION,
			handler: function(event) {
				// trace('dealer add notification handler, event = ', event);
				PhaserGame.addDealerOpportunityNotification(event);
			}
		},
		// add supplier notification
		{
			event: Events.ADD_SUPPLIER_NOTIFICATION,
			handler: function(event) {
				PhaserGame.addSupplierOpportunityNotification(event);
			}
		},
		// add trade route notification
		{
			event: Events.ADD_TRADE_ROUTE_NOTIFICATION,
			handler: function(event) {
				// trace('dealer add notification handler, event = ', event);
				PhaserGame.addTradeRouteOpportunityNotification(event);
			}
		},
		// machine sold
		{
			event: Events.MACHINE_SOLD,
			handler: function(event) {
				// if(event.building.type === BuildingTypes.DEALER) {
					// PhaserGame.machineSold(event.building, 'usDetail:usDetailGrid');
					PhaserGame.machineSold(event.building);
				// }
			}
		}
		],
		methods: {
			// INITIAIZATION
			init: function() {
				PhaserGame.getSavedData();
				TurnManager.init();
			},
			preload: function() {
				PWG.PhaserLoader.load(PhaserGame.config.assets);
				// PWG.ScreenManager.preload();
			},
			create: function() {
				PWG.ViewManager.hideView('global:notificationEnvelope');
				PWG.ViewManager.hideView('global:supplierPrompt');
				PWG.ViewManager.hideView('global:tradeRouteAlertIcon');
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
			ignitionAnimationCompleted: function() {
				// trace('PhaserGame/ignitionAnimationCompleted');
				var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
				ignitionKey.view.events.onAnimationComplete.remove(PhaserGame.ignitionAnimationCompleted, this);
				// if(PhaserGame.isFirstPlay) {
				// 	PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
				// 	PhaserGame.isFirstPlay = false;
				// } else {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
				// }
			},
			// GLOBAL / NOTIFICATIONS
			addTutorialGuy: function() {
				// trace('PhaserGame/addTutorialGuy, tutorialOpen = ' + PhaserGame.tutorialOpen + ', activeTutorial = ' + PhaserGame.activeTutorial);
				if(!PhaserGame.tutorialOpen) {
					PhaserGame.tutorialOpen = true;
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var tutorialGuy = PWG.Utils.clone(PhaserGame.config.dynamicViews.tutorialGuy);
					var notificationText = PhaserGame.config.notificationText;
					// trace('\ttext = ' + notificationText.tutorial[PhaserGame.activeTutorial].content);
					tutorialGuy.views.content.text = notificationText.tutorial[PhaserGame.activeTutorial].content;
					PWG.ViewManager.addView(tutorialGuy, notifications, true);
				}
			},
			removeTutorialGuy: function() {
				// trace('remove tutorial guy');
				PWG.ViewManager.removeView('tutorialGuy', 'global:notifications');
				TurnManager.playerData.firstPlay[PhaserGame.activeTutorial] = false;
				PhaserGame.tutorialOpen = false;
				PhaserGame.activeTutorial = false;
			},
			showNotification: function() {
				var sector = PhaserGame.activeSector;
				// trace('showNotification, notifications = ', PhaserGame.notifications[sector]);
				if(PhaserGame.notifications[sector].length > 0) {
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var notification = PhaserGame.notifications[sector].pop();

					if(notification.confirmAction) {
						PhaserGame.confirmAction = notification.confirmAction;
						PWG.ViewManager.showView('global:confirmButton');
					}
					if(notification.cancelAction) {
						PhaserGame.cancelAction = notification.cancelAction;
					} else {
						PhaserGame.cancelAction = PhaserGame.removeNotification;
					}
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.addView(notification, notifications, true);

					if(PhaserGame.notifications[sector].length === 0) {
						PhaserGame.hideNotificationEnvelope();
					}
				}
			},
			removeNotification: function() {
				// trace('removeNotification');
				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('notification', 'global:notifications');
				PhaserGame.cancelAction = null;
			},
			showNotificationEnvelope: function() {
				PWG.ViewManager.showView('global:notificationEnvelope');
			},
			hideNotificationEnvelope: function() {
				PWG.ViewManager.hideView('global:notificationEnvelope');
			},
			showTradeRouteAlert: function() {
				PWG.ViewManager.showView('global:tradeRouteAlertIcon');
			},
			hideTradeRouteAlert: function() {
				PWG.ViewManager.hideView('global:tradeRouteAlertIcon');
			},
			// TUTORIAL / MANUAL
			addManualPage: function(idx) {
				var manualPages = PWG.ViewManager.getControllerFromPath('manual:manualPages');
				var manualPage = PWG.Utils.clone(PhaserGame.config.dynamicViews.manualPage);
				var manualPageNumber = PWG.Utils.clone(PhaserGame.config.dynamicViews.manualPageNumber);
				var manualPageText = PhaserGame.config.dynamicViews.manualPageText;
				var manualPageImage = PhaserGame.config.dynamicViews.manualPageImage;
				var pageConfig = PhaserGame.config.tutorial.pages[idx];
				// trace('making manual page: '+ idx + ', with: ', pageConfig, '\tpages = ', manualPages);
				manualPage.name += idx;
				manualPage.views.title.text = PhaserGame.config.tutorial.title;
				// manualPage.views.subtitle.text = PhaserGame.config.tutorial.subtitle;
				
				manualPageNumber.text = (idx + 1) + '/' + PhaserGame.config.tutorial.pages.length;
				manualPage.views[manualPageNumber.name] = manualPageNumber;
				
				var pageText = PWG.Utils.clone(manualPageText);

				PWG.Utils.each(
					pageConfig.blurbs,
					function(blurb, idx) {
						// trace('blurb['+idx+'] = ', blurb);
						var pageText = PWG.Utils.clone(manualPageText);
						pageText.name += idx;
						pageText.text = blurb.text;
						pageText.x = blurb.x;
						pageText.y = blurb.y;

						manualPage.views[pageText.name] = pageText;
					},
					this
				);

				PWG.Utils.each(
					pageConfig.images,
					function(image, idx) {
						var pageImage = PWG.Utils.clone(manualPageImage);
						pageImage.name += idx;
						pageImage.img = image.img;
						pageImage.x += image.x;
						pageImage.y += image.y;
						pageImage.attrs.width = image.width;
						pageImage.attrs.height = image.height;
				
						manualPage.views[pageImage.name] = pageImage;
					},
					this
				);

				
				PWG.ViewManager.addView(manualPage, manualPages, true);
			},
			nextManualPage: function() {
				// trace('PhaserGame/nextManualPage, idx = ' + PhaserGame.manualPage);
				if(PhaserGame.manualPage < PhaserGame.config.tutorial.pages.length -1) {
					PhaserGame.manualPage++;
				} else {
					PhaserGame.manualPage = 0;
				}
				PhaserGame.addManualPage(PhaserGame.manualPage);
			},
			// TURN
			startTurn: function() {
				// trace('START TURN');
				TurnManager.startTurn();
				BuildingManager.init();
				WholesaleManager.init();
				PhaserGame.notifications = [[], [], [], [], []];
				PhaserGame.supplierNotifications = [];
				PhaserGame.tradeRouteNotifications = {};
				PhaserGame.availableTradeRoutes = {};
				PhaserGame.zoomedIn = false;

				GridManager.init(USSectors, US_DETAIL_GRID_CELLS, US_DETAIL_GRID_CELLS, PWG.Stage.gameW/6);

				PhaserGame.turnActive = true;
				PhaserGame.timePerTurn = TIME_PER_TURN;
				PhaserGame.turnTimer = new PWG.PhaserTime.Controller('turnTime');
				PhaserGame.turnTimer.loop(TURN_TIME_INTERVAL, function() {
						// trace('\ttimePerTurn = ' + PhaserGame.timePerTurn + ', views = ', this.views);
						PhaserGame.incrementTurnTime();
					},
					this
				);
				PhaserGame.turnTimer.start();
				var text = PWG.Utils.formatMoney(TurnManager.get('bank'), 0);
				PWG.ViewManager.callMethod('global:turnGroup:bankText', 'setText', [text], this);
				PWG.ViewManager.callMethod('global:turnGroup:bonusText', 'setText', [TurnManager.get('bonusPoints')], this);
				PWG.ViewManager.setFrame('global:turnGroup:turnIndicator', TurnManager.playerData.level);
				
				if(TurnManager.playerData.level === 2 && TurnManager.playerData.firstPlay[TutorialTypes.SUPPLIER]) {
					PhaserGame.activeTutorial = TutorialTypes.SUPPLIER;
					PhaserGame.addTutorialGuy();
				}
				if(TurnManager.playerData.level === 4 && TurnManager.playerData.firstPlay[TutorialTypes.TRADE_ROUTE]) {
					PhaserGame.activeTutorial = TutorialTypes.TRADE_ROUTE;
					PhaserGame.addTutorialGuy();
				}
			},
			incrementTurnTime: function() {
				PhaserGame.timePerTurn--;
				if(PhaserGame.timePerTurn <= 0) {
					PWG.EventCenter.trigger({ type: Events.TURN_COMPLETED });
				} else {
					BuildingManager.update();

					if(TurnManager.playerData.level >= MIN_WHOLESALE_LEVEL) {
						WholesaleManager.update();
					}
					PWG.EventCenter.trigger({ type: Events.GAME_TIME_UPDATED, value: PhaserGame.timePerTurn });
				}
			},
			showEndTurnPrompt: function() {
				var endTurnPrompt = PhaserGame.config.dynamicViews.endTurnPrompt;
				var world = PWG.ViewManager.getControllerFromPath('world');
				PWG.ViewManager.addView(endTurnPrompt, world, true);

				PhaserGame.confirmAction = {
					method: function() {
						PWG.EventCenter.trigger({ type: Events.TURN_COMPLETED });
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });

						PWG.ViewManager.removeView('endTurnPrompt', 'world');
					},
					params: null
				};
				PhaserGame.cancelAction = {
					method: function() {
						PWG.ViewManager.showView('global:backButton');
						PWG.ViewManager.hideView('global:confirmButton');
						PWG.ViewManager.hideView('global:cancelButton');

						PWG.ViewManager.removeView('endTurnPrompt', 'world');
					},
					params: null
				};
				
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.showView('global:confirmButton');
				PWG.ViewManager.showView('global:cancelButton');
				
			},
			stopTurn: function() {
				PWG.PhaserTime.removeTimer('turnTime');
				PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
				PWG.EventCenter.trigger({ type: Events.CLOSE_WHOLESALE_PARTS_MENU });
				PWG.EventCenter.trigger({ type: Events.CLOSE_OPTIONAL_PARTS_MENU });
				
				PhaserGame.hideSupplierPrompt();
				PhaserGame.removeNotification();
				PhaserGame.hideNotificationEnvelope();
				PhaserGame.removeTradeRouteNotification();
				PhaserGame.hideTradeRouteAlert();
				PhaserGame.notifications = null;
				PhaserGame.supplierNotifications = null;
				PhaserGame.availableTradeRoutes = null;
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
				
				AnimationManager.reset();
				
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');

				PhaserGame.turnActive = false;
			},
			// WORLD
			formatBuildingPin: function(type, idx, count) {
				var buildingPin = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingPin);
				var pinLocations = PhaserGame.config.pinPositions.usSectors[idx];
				var pinOffsets = PhaserGame.config.pinOffsets;
				var pinFills = PhaserGame.config.pinFills[type];

				buildingPin.name = 'sector'+idx+type;
				buildingPin.views.pin.img = PhaserGame.config.pinImages[type];
				buildingPin.views.pin.x += pinLocations.x + pinOffsets[type].x;
				buildingPin.views.pin.y += pinLocations.y + pinOffsets[type].y;
				buildingPin.views.locationCount.x += pinLocations.x + pinOffsets[type].x;
				buildingPin.views.locationCount.y += pinLocations.y + pinOffsets[type].y;
				buildingPin.views.locationCount.text = 'x' + count;
				buildingPin.views.locationCount.style.fill = pinFills[idx];
				return buildingPin;
			},
			initWorldZoom: function(worldMap, buildingPins) {
				PhaserGame.worldZoom = {
					max: {
						width: worldMap.width,
						height: worldMap.height,
						x: worldMap.position.x,
						y: worldMap.position.y
					},
					min: {
						width: PWG.Stage.gameW,
						height: PWG.Stage.gameH,
						x: 0,
						y: 0
					},
					zoomIncrements: {
						width: (worldMap.width - PWG.Stage.gameW) * 0.25,
						height: (worldMap.height - PWG.Stage.gameH) * 0.25
					},
					positionIncrements: {
						x: (-worldMap.x) * 0.25,
						y: (-worldMap.y) * 0.25
					}
				};
				/*
					1 = scale 1.5/1.5, position = 50/220
					2 = scale 0.33/0.33, position = 40/170
					3 = scale 0.5/0.5, position = 20/130
					4 = scale 0.75/0.75 position = 10/65
					5 = scale 0.95/0.95 position = 0/10
					
				*/
				PhaserGame.pinZoom = {
					scaleIncrements: {
						x: [],
						y: []
					},
					zoomIncrements: {
						width: (buildingPins.width - PWG.Stage.gameW) * 0.25,
						height: (buildingPins.height - PWG.Stage.gameH) * 0.25
					},
					positionIncrements: {
						x: (-buildingPins.x) * 0.25,
						y: (-buildingPins.y) * 0.25
					}
				};
				// trace('world zoom initialized as: ', PhaserGame.worldZoom, '\npin zooom: ', PhaserGame.pinZoom);
				PhaserGame.worldZoomInitialized = true;
			},
			worldZoomOutFull: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// trace('set w/h: ' + newWidth + '/' + newHeight + ', x/y: ' + newX + '/' + newY);
					PhaserGame.removeTradeRouteViews();

					var max = PhaserGame.worldZoom.max;
					PhaserGame.worldView.width = max.width;
					PhaserGame.worldView.height = max.height;
					PhaserGame.worldView.x = max.x;
					PhaserGame.worldView.y = max.y;
					PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_OUT });
					PhaserGame.zoomedIn = false;
					PhaserGame.zoomedInTriggered = false;
				}
			},
			worldZoomOut: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// trace('plusButton callback: PhaserGame.worldView.width = ' + PhaserGame.worldView.width);
					if(PhaserGame.zoomedIn) {
						// trace('worldZoomOut: PhaserGame.zoomed = ' + PhaserGame.zoomedIn);
						PhaserGame.removeTradeRouteViews();

						var max = PhaserGame.worldZoom.max;
						var tween = PhaserGame.phaser.add.tween(PhaserGame.worldView);
						tween.onComplete.add(function() {
							// trace('zoom tween complete');
								PWG.ViewManager.showView('world:usMap');
								PWG.ViewManager.showView('world:buildingPins');
								PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_OUT });
  						});
						tween.to({
								x: max.x,
								y: max.y,
								width: max.width,
								height: max.height
							}, 
							500, 
							Phaser.Easing.Sinusoidal.InOut, 
							true, 
							Math.random() * 500
						);
						tween.start();

						PhaserGame.zoomedIn = false;
						PhaserGame.zoomedInTriggered = false;
					}
				}
			},
			worldZoomIn: function() {
				if(PWG.ScreenManager.currentId === 'world') {
					// trace('worldZoomIn: PhaserGame.zoomedIn = ' + PhaserGame.zoomedIn);
					if(!PhaserGame.zoomedIn) {
						PhaserGame.zoomedIn = true;
						PWG.ViewManager.hideView('world:usMap');
						PWG.ViewManager.hideView('world:buildingPins');

						var min = PhaserGame.worldZoom.min;
						var tween = PhaserGame.phaser.add.tween(PhaserGame.worldView);
						tween.onComplete.add(function() {
							// trace('zoom tween complete, zoom in triggered = ' + PhaserGame.zoomedInTriggered);
							if(!PhaserGame.zoomedInTriggered) {
								PhaserGame.zoomedInTriggered = true;
								PWG.EventCenter.trigger({ type: Events.WORLD_ZOOMED_IN });
							}
						});
						tween.to({
								x: min.x,
								y: min.y,
								width: min.width,
								height: min.height
							}, 
							500, 
							Phaser.Easing.Sinusoidal.InOut, 
							true, 
							Math.random() * 500
						);
						tween.start();

					}
				}
			},
			addTradeRouteViews: function() {
				var world = PWG.ViewManager.getControllerFromPath('world');
				var tradeRouteArrows = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRouteArrows);
				var tradeRouteArrow = PhaserGame.config.dynamicViews.tradeRouteArrow;
				var tradeRouteArrowConfig = PhaserGame.config.tradeRouteArrowConfig;

				var tradeRoutePins = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRoutePins);
				var tradeRoutePin = PhaserGame.config.dynamicViews.tradeRoutePin;
				var tradeRoutePinConfig = PhaserGame.config.tradeRoutePinConfig;

				var tradeRouteAlertIcons = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRouteAlertIcons);
				var tradeRouteAvailableIcon = PhaserGame.config.dynamicViews.tradeRouteAvailableIcon;
				var tradeRouteAlertIconConfig = PhaserGame.config.tradeRouteAlertIconConfig;
				
				var availableTradeRoutes = PhaserGame.availableTradeRoutes;
				var existingTradeRoutes = BuildingManager.getExistingTradeRoutes();
				// trace('EXISTING TRADE ROUTES = ', existingTradeRoutes);
				var arrowsAdded = {
					africa: false,
					asia: false,
					europe: false,
					middleEast: false,
					northPacific: false,
					southPacific: false,
					southAmerica: false
				};
				
				PWG.Utils.each(
					existingTradeRoutes,
					// tradeRouteArrowConfig,
					function(tradeRoute, tr) {
						// trace('tradeRoute['+tr+'] = ', tradeRoute);
						var area = TradeRouteLocations[tradeRoute.worldLocation];
						
						var arrow = PWG.Utils.clone(tradeRouteArrow);
						arrow.name += tr;
						
						if(!arrowsAdded[area]) {
							PWG.Utils.each(
								// tradeRoute,
								tradeRouteArrowConfig[area],
								function(arrowProp, ap) {
									// trace('\tadding arrowProp['+ap+']: ' + arrowProp);
									arrow[ap] = arrowProp;
								},
								this
							);
							// trace('\tadding existing arrow: ' + arrow.name);
							tradeRouteArrows.views[arrow.name] = arrow;
							arrowsAdded[area] = true;
						}
										
						var pin = PWG.Utils.clone(tradeRoutePin);
						pin.name += tr;
						pin.views.pin.x += tradeRoutePinConfig[area].x;
						pin.views.pin.y += tradeRoutePinConfig[area].y;
						pin.views.locationCount.text += TurnManager.tempTradeRouteCount[area];
						pin.views.locationCount.x += tradeRoutePinConfig[area].x;
						pin.views.locationCount.y += tradeRoutePinConfig[area].y;
						
						// PWG.Utils.each(
						// 	tradeRoutePinConfig[area],
						// 	function(pinProp, pp) {
						// 		pin[pp] = pinProp
						// 	},
						// 	this
						// );
						
						tradeRoutePins.views[pin.name] = pin;
					},
					this
				);

				// trace('available trade routes opportunities = ', availableTradeRoutes);
				PWG.Utils.each(
					availableTradeRoutes,
					function(tradeRoute, tr) {
						// trace('\ttradeRoute['+tr+'] = ', tradeRoute);
						var area = TradeRouteLocations[tradeRoute.config.worldLocation];
				
						if(!arrowsAdded[area]) {
							// trace('ADDING OPPORTUNITY ARROW FOR: ' + area);
							var arrow = PWG.Utils.clone(tradeRouteArrow);
							var config = tradeRouteArrowConfig[area];
							arrow.name += tr;
				
							PWG.Utils.each(
								config,
								function(prop, p) {
									arrow[p] = prop;
								},
								this
							);
							tradeRouteArrows.views[arrow.name] = arrow;
						}
				
						var icon = PWG.Utils.clone(tradeRouteAvailableIcon);
						icon.name = tr;
						icon.tradeRouteId = tr;
						
						PWG.Utils.each(
							tradeRouteAlertIconConfig[area],
							function(iconProp, ip) {
								icon[ip] = iconProp;
							},
							this
						);
				
						tradeRouteAlertIcons.views[icon.name] = icon;
					},
					this
				);

				// trace('tradeRouteArrows now = ', tradeRouteArrows, ', tradeRoutePins = ', tradeRoutePins);
				PWG.ViewManager.addView(tradeRouteArrows, world, true);
				PWG.ViewManager.addView(tradeRoutePins, world, true);
				PWG.ViewManager.addView(tradeRouteAlertIcons, world, true);
			},
			removeTradeRouteViews: function() {
				// trace('removeTradeRouteViews');
				PWG.ViewManager.removeView('tradeRouteArrows', 'world');
				PWG.ViewManager.removeView('tradeRoutePins', 'world');
				PWG.ViewManager.removeView('tradeRouteAlertIcons', 'world');
			},
			removeTradeRouteArrows: function() {
				// trace('removeTradeRouteArrows');
				PWG.ViewManager.removeView('tradeRoutePins', 'world');
				PWG.ViewManager.removeView('tradeRouteArrows', 'world');
			},
			// US DETAIL
			tileClicked: function(tile) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				if(PhaserGame.turnActive) {
					var view = PWG.ViewManager.getControllerFromPath('usDetail:usDetailGrid:'+tile.name);
					// trace('tile click: ' + tile.cell + ' in ' + tile.sector, tile, '\tview = ', view);
					var frame = tile.attrs.frame;
					PhaserGame.activeTile = tile;
					switch(frame) {
						case TileCellFrames.EMPTY:
							// trace('\topen buildings menu');
							PWG.EventCenter.trigger({ type: Events.OPEN_BUILDINGS_MENU });
						break;

						case TileCellFrames.ACTIVE:
						tile.attrs.frame = 0;
						PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, TileCellFrames.EMPTY);
						PhaserGame.activeTile = null;
						break; 

						case TileCellFrames.PLANT_CONSTRUCTION:
						// trace('plant construction'); 
						break;

						case TileCellFrames.PLANT_ACTIVE:
						// trace('plant active'); 
						// show plant detail
						PhaserGame.activeBuilding = BuildingManager.getBuilding(PhaserGame.activeSector, PhaserGame.activeTile.cell);
						// trace('active plant = ', PhaserGame.activeBuilding);
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
						break;

						case TileCellFrames.DEALER_CONSTRUCTION: 
						// trace('dealer construction'); 
						break;
						
						case TileCellFrames.DEALER_ACTIVE: 
						// trace('dealer active'); 
						PhaserGame.activeBuilding = BuildingManager.getBuilding(PhaserGame.activeSector, PhaserGame.activeTile.cell);
						// trace('active plant = ', PhaserGame.activeBuilding);
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'buildingEdit' });
						break;

						default:
						break;
					}
				}
			},
			addBuildingCreatePrompt: function() {
				// PhaserGame.addBuildingItemsOverlay.call(this, event.value, this.views);
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				var global = PWG.ViewManager.getControllerFromPath('global');
				var buildingCreatePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingCreatePrompt);
				var notificationText = PhaserGame.config.notificationText;
				// trace('addBuildingCreatePrompt, buildingCreatePrompt = ', buildingCreatePrompt);
				// trace('plant = ' + gameData.buildings.plant.cost);

				if(TurnManager.playerData.bank > gameData.buildings.plant.cost) {
					buildingCreatePrompt.views.title.text = notificationText.buildingCreate.content.toUpperCase();
					PhaserGame.confirmAction = {
						method: function() {
							PWG.EventCenter.trigger({ type: Events.ADD_BUILDING });
						},
						params: {}
					};
					PWG.ViewManager.showView('global:confirmButton');
					buildingCreatePrompt.views.cost.text = '$' + PWG.Utils.formatMoney(gameData.buildings.plant.cost, 0);
				} else {
					buildingCreatePrompt.views.title.text = notificationText.notEnoughMoney.content.toUpperCase();
					PhaserGame.notEnoughMoneyPromptActive = true;
				}

				PhaserGame.cancelAction = {
					method: function() {
						PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
					},
					params: {}
				};
				PWG.ViewManager.showView('global:cancelButton');
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.addView(buildingCreatePrompt, global, true);
				this.buildingCreatePromptOpen = true;
			},
			addBuilding: function(buildingType) {
				PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });

				var tile = PhaserGame.activeTile;
				var added = BuildingManager.createPlant({ sector: PhaserGame.activeSector, cell: tile.cell });
				if(added) {
					var frame;
					if(buildingType === BuildingTypes.PLANT) {
						frame = TileCellFrames.PLANT_CONSTRUCTION;
					} else {
						frame = TileCellFrames.DEALER_ACTIVE;
					}
					tile.attrs.frame = frame;
					PWG.ViewManager.setFrame('usDetail:usDetailGrid:'+tile.name, frame);
				}
			},
			// DEALERS
			addDealerOpportunityNotification: function(event) {
				var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
				var dealerPrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.dealerPrompt);
				
				var notificationText = PhaserGame.config.notificationText['dealer'];
				
				var modelName = event.plant.equipment[event.dealer.config.modelId].name;
				var resell = PWG.Utils.formatMoney(event.dealer.config.resell, 0);
				// trace('addDealerOppurtunity, dealer = ', event.dealer);
				var statementText = PWG.Utils.parseMarkup(notificationText.content, {
					plant: event.plant.name,
					quantity: event.dealer.config.maxPerYear,
					model: modelName,
					resell: resell
				});

				notification.views.person.img = PhaserGame.config.notificationPeopleImages['dealer'];
				// notification.views.title.text = config.title;
				notification.views.content.text = statementText.toUpperCase();
				// trace('notification = ', notification);
				
				notification.views[dealerPrompt.name] = dealerPrompt;
				
				notification.confirmAction = {
					method: PhaserGame.addDealer,
					params: event.dealer
				};
				
				notification.cancelAction = {
					method: PhaserGame.resetDealer,
					params: event.dealer
				};
				// PWG.ViewManager.hideView('global:backButton');
				PhaserGame.notifications[event.plant.sector].push(notification);
				if(PWG.ScreenManager.currentId === 'usDetail' && PhaserGame.activeSector === event.plant.sector) {
					PhaserGame.showNotificationEnvelope();
				}
			},
			addDealer: function(dealer) {
				// trace('addDealer, dealer = ', dealer);
				var config = dealer.config;
				PhaserGame.removeNotification();
				config.cell = GridManager.getRandomEmptyCellIndex(config.sector);
				GridManager.addBuilding(config, config.sector);
				BuildingManager.addDealer(dealer);

				var viewPath = 'usDetail:usDetailGrid:usDetailGridItem'+config.cell;
				var view = PWG.ViewManager.getControllerFromPath(viewPath);
				var frameKey = config.type.toUpperCase() + '_' + config.state.toUpperCase();
				var frame = TileCellFrames[frameKey];
				// trace('\tviewPath = ' + viewPath + ', view = ', view);

				PWG.ViewManager.setFrame(viewPath, frame);
				view.config.attrs.frame = frame;
			},
			resetDealer: function(dealer) {
				PhaserGame.removeNotification();
				// trace('resetDealer, dealer = ', dealer);
				var plant = BuildingManager.findBuilding(dealer.config.plantId);
				plant.dealerNotifications[dealer.config.modelId] = false;
			},
			// SUPPLIERS
			addSupplierOpportunityNotification: function(event) {
				// trace('addSupplierOpportunityNotification, event = ', event);
				var supplier = event.supplier;
				var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
				var supplierNotification = PWG.Utils.clone(PhaserGame.config.dynamicViews.supplierNotification);

				var notificationText = PhaserGame.config.notificationText['supplierNotification'];

				// trace('addSupplierOppurtunity, supplier = ', event.supplier);
				var partType = supplier.config.partType;
				var typeText;
				
				if(partType === PartTypes.HEADLIGHTS || partType === PartTypes.TIRES || partType === PartTypes.TRACKS) {
					typeText = PartDescriptions[partType];
				} else if(partType === PartTypes.THREE_POINT_HITCH) {
					typeText = PartDescriptions[partType] + 'es';
				} else {
					typeText = PartDescriptions[partType] + 's';
				}
				var statementText = PWG.Utils.parseMarkup(
					notificationText.content, 
					{
						quantity: supplier.config.quantity,
						quality: supplier.config.part.description.toUpperCase(),
						type: typeText,
						size: (supplier.config.partSize[0]).toUpperCase(),
						cost: ('$' + PWG.Utils.formatMoney(supplier.config.cost, 0))
					});

				notification.views.person.img = PhaserGame.config.notificationPeopleImages['supplier'];
				// notification.views.title.text = config.title;
				notification.views.content.text = statementText.toUpperCase();
				supplierNotification.views.menuTitle.text = 'PARTS SUPPLIER\n' + supplier.config.location.toUpperCase();
				// trace('notification = ', notification);
				PhaserGame.activeSupplier = supplier;
				notification.views[supplierNotification.name] = supplierNotification;
				PhaserGame.supplierNotifications.push(notification);
				PhaserGame.showSupplierPrompt();
			},
			showSupplierPrompt: function() {
				PWG.ViewManager.showView('global:supplierPrompt');
				// var supplierPrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.supplierPrompt);
				// var notificationText = PhaserGame.config.notificationText;
				// supplierPrompt.views.title.text = notificationText.supplierPrompt.content.toUpperCase();
				// var global = PWG.ViewManager.getControllerFromPath('global');
				// PWG.ViewManager.addView(supplierPrompt, global, true);
				// PhaserGame.supplierPromptOpen = true;
			},
			hideSupplierPrompt: function() {
				PWG.ViewManager.hideView('global:supplierPrompt');
				// if(PhaserGame.supplierPromptOpen) {
				// 	PWG.ViewManager.removeView('supplierPrompt', 'global');
				// 	PhaserGame.supplierPromptOpen = false;
				// }
			},
			showSupplierNotification: function() {
				if(PhaserGame.turnActive) {
					PhaserGame.supplierPromptClicked = false;
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var supplierNotification = PhaserGame.supplierNotifications.pop();
					PWG.ViewManager.addView(supplierNotification, notifications, true);
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.showView('global:confirmButton');

					if(PWG.ScreenManager.currentId === 'buildingEdit') {
						PWG.ViewManager.hideView('global:plantDetailGroup:equipmentButton');
					}
					PhaserGame.confirmAction = {
						method: function() {
							PhaserGame.addSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};

					PhaserGame.cancelAction = {
						method: function() {
							PhaserGame.resetSupplier(PhaserGame.activeSupplier);
						},
						params: {}
					};
				}
			},
			hideSupplierNotification: function() {
				PhaserGame.activeSupplier = null;
				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('notification', 'global:notifications');
				if(PWG.ScreenManager.currentId === 'buildingEdit') {
					PWG.ViewManager.showView('global:plantDetailGroup:equipmentButton');
				}
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
				PhaserGame.supplierPromptClicked = false;
			},
			addSupplier: function(supplier) {
				// trace('addSupplier, supplier = ', supplier);
				PhaserGame.hideSupplierNotification();
				PhaserGame.hideSupplierPrompt();
				WholesaleManager.addSupplier(supplier);
			},
			resetSupplier: function(supplier) {
				PhaserGame.hideSupplierNotification();
				PhaserGame.hideSupplierPrompt();
				// trace('resetDealer, dealer = ', dealer);
			},
			// TRADE_ROUTES
			showTradeRouteNotification: function(id) {
				// trace('showTradeRouteNotification: ', id, ', tradeRouteNotifications = ', PhaserGame.tradeRouteNofication);
				if(PhaserGame.tradeRouteNotifications.hasOwnProperty(id)) {
					var notifications = PWG.ViewManager.getControllerFromPath('global:notifications');
					var notification = PhaserGame.tradeRouteNotifications[id];
					delete PhaserGame.tradeRouteNotifications[id];
					
					if(notification.confirmAction) {
						PhaserGame.confirmAction = notification.confirmAction;
						PWG.ViewManager.showView('global:confirmButton');
					}
					if(notification.cancelAction) {
						PhaserGame.cancelAction = notification.cancelAction;
					} else {
						PhaserGame.cancelAction = PhaserGame.removeTradeRouteNotification;
					}
					PhaserGame.activeTradeRouteNotification = id; 
					
					PWG.ViewManager.hideView('global:backButton');
					PWG.ViewManager.showView('global:cancelButton');
					PWG.ViewManager.addView(notification, notifications, true);
					PhaserGame.tradeRouteNotificationOpen = true;
				}
			},
			removeTradeRouteNotification: function(tradeRoute) {
				// trace('removeTradeRouteNotification, id = ' + PhaserGame.activeTradeRouteNotification);
				if(PhaserGame.tradeRouteNotificationOpen) {
					PWG.ViewManager.removeView(tradeRoute.config.id, 'world:tradeRouteAlertIcons');
					PWG.ViewManager.removeView(PhaserGame.activeTradeRouteNotification, 'global:notifications');
					delete PhaserGame.availableTradeRoutes[PhaserGame.activeTradeRouteNotification];
					PhaserGame.activeTradeRouteNotification = '';
					PWG.ViewManager.hideView('global:confirmButton');
					PWG.ViewManager.hideView('global:cancelButton');
					PWG.ViewManager.showView('global:backButton');
					PhaserGame.removeTradeRouteViews();
					PhaserGame.addTradeRouteViews();
					
					PhaserGame.tradeRouteNotificationOpen = false;
				}
			},
			showAvailableTradeRouteArrowsAndIcons: function() {
				PhaserGame.hideTradeRouteAlert();
				if(PWG.ScreenManager.currentId !== 'world') {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
					PhaserGame.worldZoomIn();
				} else if(!PhaserGame.zoomedIn) {
					PhaserGame.worldZoomIn();
				} else {
					PhaserGame.removeTradeRouteViews();
					PhaserGame.addTradeRouteViews();
				}
			},
			addTradeRouteOpportunityNotification: function(event) {
				var notification = PWG.Utils.clone(PhaserGame.config.dynamicViews.notification);
				var tradeRoutePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.tradeRoutePrompt);

				var notificationText = PhaserGame.config.notificationText['tradeRoute'];

				var modelName = event.plant.equipment[event.tradeRoute.config.modelId].name;
				var resell = PWG.Utils.formatMoney(event.tradeRoute.config.resell, 0);

				var statementText = PWG.Utils.parseMarkup(notificationText.content, {
					plant: event.plant.name,
					quantity: event.tradeRoute.quantityPerYear,
					model: modelName,
					resell: resell
				});

				notification.name = event.tradeRoute.config.id;
				// notification.views.person.img = 'tradeRouteGirl';
				notification.views.person.img = PhaserGame.config.notificationPeopleImages.tradeRoutes[TradeRouteLocations[event.tradeRoute.config.worldLocation]];
				
				notification.views.content.text = statementText.toUpperCase();
				// trace('------ notification = ', notification);

				tradeRoutePrompt.views.title.text = event.tradeRoute.config.name;
				notification.views[tradeRoutePrompt.name] = tradeRoutePrompt;
				
				notification.confirmAction = {
					method: PhaserGame.addTradeRoute,
					params: event.tradeRoute
				};

				notification.cancelAction = {
					method: PhaserGame.resetTradeRoute,
					params: event.tradeRoute
				};
				PhaserGame.availableTradeRoutes[event.tradeRoute.config.id] = event.tradeRoute;
				PhaserGame.tradeRouteNotifications[notification.name] = notification;
				PhaserGame.showTradeRouteAlert();

			},
			addTradeRoute: function(tradeRoute) {
				// trace('addTradeRoute, tradeRoute = ', tradeRoute);
				var config = tradeRoute.config;
				BuildingManager.addTradeRoute(tradeRoute);
				PhaserGame.removeTradeRouteNotification(tradeRoute);
			},
			resetTradeRoute: function(tradeRoute) {
				PhaserGame.removeTradeRouteNotification(tradeRoute);
				// trace('resetTradeRoute, tradeRoute = ', tradeRoute);
				var plant = BuildingManager.findBuilding(tradeRoute.config.plantId);
				plant.tradeRouteNotifications[tradeRoute.config.modelId] = false;
			},
			// INVENTORY
			inventoryAdded: function(plant, parentPath) {
				// trace('PhaserGame/inventoryAdded, plant = ', plant);
				if(plant.sector === PhaserGame.activeSector) {
					PhaserGame.addUsDetailIconAnimation(IconAnimations.PLUS_SIGN, plant, parentPath);
				}
			},
			machineSold: function(building) {
				// trace('PhaserGame/machineSold, dealer = ', dealer);
				if(building.type === BuildingTypes.DEALER) {
					if(PWG.ScreenManager.currentId === 'usDetail' && building.sector === PhaserGame.activeSector) {
						PhaserGame.addUsDetailIconAnimation(IconAnimations.DOLLAR_SIGN, building, 'usDetail:usDetailGrid');
					}
				} else if(building.type === BuildingTypes.TRADE_ROUTE) {
					if(PWG.ScreenManager.currentId === 'world' && PhaserGame.zoomedIn) {
						PhaserGame.addWorldIconAnimation(IconAnimations.DOLLAR_SIGN, building, 'world:tradeRoutePins:tradeRoutePin_');
					}
				}
			},
			addUsDetailIconAnimation: function(icon, building, parentPath) {
				// trace('PhaserGame/addIconAnimation, building = ', building);
				// var cell = GridManager.grids[building.sector][building.cell];
				var position = PWG.ViewManager.getControllerFromPath(parentPath+':usDetailGridItem'+building.cell).view.position;
				var key = icon + '_' + building.sector + '_' + building.cell;
				var name = icon + AnimationManager.getNextIndex(key);
				var config = {
					type: icon,
					key: key,
					name: name,
					x: position.x,
					y: position.y,
					animationName: 'expand',
					parentPath: parentPath
				};
				AnimationManager.add(config);
			},
			addWorldIconAnimation: function(icon, building, parentPath) {
				trace('PhaserGame/addWorldIconAnimation: parentPath = ' + parentPath + ' building = ', building);
				var path = parentPath+building.id;
				trace('\tpath = ' + path);
				if(PWG.ViewManager.collection.world.children.tradeRoutePins) {
					var parent = PWG.ViewManager.getControllerFromPath(path);
					// trace('\tparent = ', parent);
					if(typeof(parent) !== 'undefined') {
						var position = parent.children.pin.view.position;
						// trace('\tposition = ', position);
						var key = icon + '_' + building.worldLocation;
						var name = icon + AnimationManager.getNextIndex(key);
						var config = {
							type: icon,
							key: key,
							name: name,
							x: position.x,
							y: position.y,
							animationName: 'expand',
							parentPath: parentPath
						};
						AnimationManager.add(config);
					}
				}
			},
			// EQUIPMENT EDIT
			getCurrentMachinePiecePath: function() {
				return 'equipmentEdit:machineEdit:machinePieceName:' + PhaserGame.machinePieces[PhaserGame.currentMachinePiece];
			},
			getMachinePieceIndex: function(name) {
				var idx = -1;
				PWG.Utils.each(
					PhaserGame.machinePieces,
					function(piece, p) {
						if(piece === name) {
							idx = p;
						}
					},
					this
				);
				return idx;
			},
			hideAllMachinePieceSprites: function() {
				var machinePieceSprites = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:machinePieceSprites');
				PWG.Utils.each(
					machinePieceSprites.children,
					function(sprite) {
						sprite.hide();
					},
					this
				);
/*
				PWG.Utils.each(
					PhaserGame.machinePieces,
					function(piece) {
						PhaserGame.hideMachinePieceSprite(piece);
					},
					this
				);
*/
			},
			hideMachinePieceSprite: function(piece) {
				var path = 'equipmentEdit:machineEdit:machinePieceSprites:'+piece;
				PWG.ViewManager.hideView(path);
			},
			setSelectedMachinePieceSprite: function() {
				PhaserGame.resetAllMachinePieceSpriteFrames();
				var piece = PhaserGame.spriteTranslations[PhaserGame.machinePieces[PhaserGame.currentMachinePiece]];
				// trace('setSelectedMachinePieceSprite, piece = ' + piece + ', currentMachinePiece = ' + PhaserGame.currentMachinePiece + ', machinePieces = ', PhaserGame.machinePieces);
				PhaserGame.setMachinePieceSpriteFrame(piece, 1);
			},
			resetAllMachinePieceSpriteFrames: function() {
				var machinePieceSprites = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:machinePieceSprites');
				PWG.Utils.each(
					machinePieceSprites.children,
					function(piece, name) {
						piece.view.frame = 0;
						// PhaserGame.setMachinePieceSpriteFrame(name, 0);
					},
					this
				);
			},
			setMachinePieceSpriteFrame: function(piece, frame) {
				var path = 'equipmentEdit:machineEdit:machinePieceSprites:'+piece;
				var controller = PWG.ViewManager.getControllerFromPath(path);
				controller.view.frame = frame;
			},
			populatePartsMenu: function(type, collection) {
				PhaserGame.activePartType = type;
				var size = PhaserGame.activeMachineSize;
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var partsData = gameData.parts[type][size];
				// trace('populatePartsMenu, type = ' + type + '\tparts data = ', partsData);
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partIcons);
				var itemConfig = PhaserGame.config.dynamicViews.partIcon;
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var count = 0;
				var itemY = 0;

				PWG.Utils.each(
					partsData,
					function(part, idx) {
						// trace('\tadding part[' + idx + '] info to views, part = ', part);
						var item = PWG.Utils.clone(itemConfig);
						item.name = type + idx;
						item.views.icon.img = part.img;
						item.views.description.text = part.description.toUpperCase();
						item.views.cost.text = '$' + PWG.Utils.formatMoney(part.cost, 0);
						item.views.invisButton.partIdx = idx;
						item.views.invisButton.input = gameLogic.input.partIcon;
						
						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[idx] = item;
						count++;
					},
					this
				);
				// trace('partIconsConfig = ', partIconsConfig);
				// partIconsConfig.views.title.text = PartDescriptions[type];
				// partIconsConfig.views.closeButton.callback = gameLogic.buttonCallbacks.partsMenuClose;
				partIconsConfig.name = 'partIconsConfig';

				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);

				if(WholesaleManager.getTotalPartTypeCount(PhaserGame.activePartType, PhaserGame.activeMachineSize) > 0) {
					PhaserGame.addWholesalePartPrompt();
				}
				// trace('\tcreated partsMenu from: ', partIconsConfig, '\tcollection now = ', collection);
			},
			addWholesalePartsMenu: function() {
				// trace('PhaserGame/addWholesalePartsMenu');
				PWG.ViewManager.removeView('partIconsConfig', 'equipmentEdit:machineEdit:partsMenu', true);


				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partIcons);
				var type = PhaserGame.activePartType;
				var size = PhaserGame.activeMachineSize;
				var itemConfig = PhaserGame.config.dynamicViews.wholesalePartIcon;
				var suppliers = WholesaleManager.parts[type][size];
				var partsData = gameData.parts[type][size];
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var count = 0;
				var itemY = 0;
				var count = 0;

				PWG.Utils.each(
					suppliers,
					function(supplier, id) {
						// trace('supplier['+id+'] = ', supplier);
						var item = PWG.Utils.clone(itemConfig);
						item.name = id + '_' + type;
						item.views.icon.img = supplier.part.img;
						item.views.description.text = supplier.part.description.toUpperCase();
						item.views.available.text = supplier.quantity + ' available';
						item.views.invisButton.supplierId = id;
						item.views.invisButton.input = gameLogic.input.wholesalePartIcon;
						
						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[id] = item;
						count++;
					},
					this
				);

				partIconsConfig.name = 'wholesalePartsMenu';
				// partIconsConfig.attrs.visible = true;
				// trace('\tpartsIconsConfig now = ', partIconsConfig);
				PhaserGame.cancelAction = {
					method: function() {
						PhaserGame.removeWholesalePartsMenu();
					},
					params: {}
				};
				PWG.ViewManager.showView('global:cancelButton');
				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);
				PhaserGame.showPartsMenu();
			},
			removeWholesalePartsMenu: function() {
				PWG.ViewManager.removeView('wholesalePartsMenu', 'equipmentEdit:machineEdit:partsMenu');
				PhaserGame.cancelAction = null;
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.showView('global:backButton');
				PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
				// if(!PhaserGame.wholesalePartChosen) {
				// 	PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PhaserGame.activePartType });
				// }
			},
			populateOptionalPartsMenu: function(collection) {
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				var optionalParts = gameData.machines[PhaserGame.activeMachineType][PhaserGame.activeMachineSize].optionalParts;
				var partIconsConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews.partsMenu);
				var itemConfig = PhaserGame.config.dynamicViews.partIcon;
				var offset = itemConfig.offset;
				var iconH = itemConfig.iconH;
				var size = PhaserGame.activeMachineSize;
				var count = 0;
				var itemY = 0;

				PWG.Utils.each(
					optionalParts,
					function(optionalPart, idx) {
						var part = gameData.optionalParts[optionalPart];
						// trace('\tadding optional part[' + idx + '] info to views: ', part);
						var item = PWG.Utils.clone(itemConfig);
						item.name = part.id + idx;
						item.views.icon.img = part.img;
						item.views.description.text = part.description.toUpperCase();
						item.views.cost.text = '$' + part.cost;
						item.views.invisButton.part = optionalPart;
						item.views.invisButton.input = gameLogic.input.optionalPartIcon;

						itemY = (iconH * count) + offset;
						PWG.Utils.each(
							item.views,
							function(view) {
								view.y += itemY;
							},
							this
						);

						partIconsConfig.views['items'].views[idx] = item;
						count++;
					},
					this
				);
				partIconsConfig.views.title.text = 'OPTIONAL PARTS';
				partIconsConfig.views.closeButton.callback = gameLogic.buttonCallbacks.optionalPartsMenuClose;
				partIconsConfig.name = 'optionalPartsMenu';

				PWG.ViewManager.addView(partIconsConfig, partsMenu, true);
			},
			addWholesalePartPrompt: function() {
				var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
				var wholesalePartPrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.wholesalePartPrompt);
				wholesalePartPrompt.views.title.text = PhaserGame.config.notificationText.wholesaleParts.content.toUpperCase();

				PWG.ViewManager.addView(wholesalePartPrompt, equipmentEdit, true);
				PhaserGame.wholesalePromptAdded = true;
			},
			removeWholesalePartPrompt: function() {
				PWG.ViewManager.removeView('wholesalePartPrompt', 'equipmentEdit');
				PhaserGame.cancelAction = null;
				if(PhaserGame.wholesaleCancelled) {
					PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: PhaserGame.activePartType });
					PhaserGame.wholesaleCancelled;
				}
				PhaserGame.wholesalePromptAdded = false;
			},
			showPartsMenu: function() {
				PWG.ViewManager.showView('equipmentEdit:machineEdit:partsMenu');
/*
				var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				
				var tween = PhaserGame.phaser.add.tween(partsMenu.view);
				tween.onComplete.add(function() {
					// trace('wiper tween complete');
				})
				tween.to({y: 0}, 500, Phaser.Easing.Linear.None, true, Math.random() * 500);
				tween.start();
*/
			},
			hidePartsMenu: function() {
				PWG.ViewManager.hideView('equipmentEdit:machineEdit:partsMenu');
				// var partsMenu = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:partsMenu');
				// partsMenu.view.y = -(PWG.Stage.gameH);
			},
			addMachineDiscardPrompt: function() {
				PhaserGame.cancelAction = null;

				if(PhaserGame.newMachine) {

					var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
					var discardMachinePrompt = PWG.Utils.clone(PhaserGame.config.dynamicViews.discardMachinePrompt);

					PhaserGame.cancelAction = {
						method: function() {
							PhaserGame.removeMachineDiscardPrompt();
						},
						params: {}
					};
					PhaserGame.confirmAction = {
						method: function() {
							PhaserGame.removeMachineDiscardPrompt();
							PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
						},
						params: {}
					};

					PWG.ViewManager.showView('global:confirmButton');
					PWG.ViewManager.addView(discardMachinePrompt, equipmentEdit, true);
				} else {
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
				}
			},
			removeMachineDiscardPrompt: function() {
				PWG.ViewManager.removeView('discardMachinePrompt', 'equipmentEdit');
				PhaserGame.confirmAction = null;
				PhaserGame.cancelAction = null;
				if(!PhaserGame.activeMachine.isComplete) {
					PWG.ViewManager.hideView('global:confirmButton');
				}
			},
			addSupplierNotification: function() {
				var supplierNotification = PWG.Utils.clone(PhaserGame.config.dynamicViews.supplierNotifcation);
				var global = PWG.ViewManager.getControllerFromPath('global');
				// trace('addSuplierNotification, supplierNotification = ', supplierNotification, '\tglobal = ', global);
				PWG.ViewManager.addView(supplierNotification, global, true);

				PhaserGame.confirmAction = {
					method: function() {
						PhaserGame.removeSupplierNotification();
						PhaserGame.addSupplier();
					},
					params: {}
				};

				PhaserGame.cancelAction = {
					method: function() {
						PhaserGame.removeSupplierNotification();
					},
					params: {}
				};

				PhaserGame.confirmAction = null;

				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
			},
			removeSupplierNotification: function() {
				PWG.ViewManager.removeView('supplierNotification', 'global');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PhaserGame.cancelAction = null;
				PhaserGame.confirmAction = null;
			},
			// YEAR END
			buildYearEndReport: function() {
				var levelGoals = gameData.levels[TurnManager.playerData.level].goals;
				var currentData = TurnManager.currentData;
				PhaserGame.levelPassed = true;
				// trace('PhaserGame/buildYearEndReport, levelGoals = ', levelGoals);
				
				var yearSummary = PWG.Utils.clone(PhaserGame.config.dynamicViews.yearSummary);
				var summaryGoalText = PhaserGame.config.dynamicViews.summaryGoalText;
				var summaryText = PhaserGame.config.dynamicViews.summaryText;
				var goalsText = PhaserGame.config.goalsText;
				var item;

				PWG.Utils.each(
					levelGoals,
					function(goal, idx) {
						var textValue;
						var goalPassed = true;
						// trace('\tgoal['+idx+'] = ', goal);
						switch(goal.calculation) {
							case 'money':
							textValue = '$' + PWG.Utils.formatMoney(currentData[goal.type], 0) + ' / ' + '$' + PWG.Utils.formatMoney(goal.value, 0);
							if(currentData[goal.type] < goal.value) {
								// trace('\tcurrentData['+goal.type+']: ' + currentData[goal.type] + ' is less than goal: ' + goal.value);
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							case 'number':
							textValue = currentData[goal.type] + ' / ' + goal.value;
							if(currentData[goal.type] < goal.value) {
								// trace('\tcurrentData['+goal.type+']: ' + currentData[goal.type] + ' is less than goal: ' + goal.value);
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							case 'length':
							textValue = currentData[goal.type].length + ' / ' + goal.value;
							if(currentData[goal.type].length < goal.value) {
								// trace('\tcurrentData['+goal.type+'].length: ' + currentData[goal.type].length + ' is less than goal: ' + goal.value);
								PhaserGame.levelPassed = false;
								goalPassed = false;
							}
							break;
							
							default:
							break;
						}
						
						item = PWG.Utils.clone(summaryGoalText);
						var fill;
						if(goalPassed) {
							fill = PhaserGame.config.palette.black;
						} else {
							fill = PhaserGame.config.palette.darkRed;
						}
						item.name += 'summary-' + goal.type;
						item.text = goalsText.types[goal.type] + textValue;
						item.y += (idx * item.offsetY);
						item.style.fill = fill;
						yearSummary.views['goal'+goal.type] = item;
					},
					this
				);
				
				item = PWG.Utils.clone(summaryText);

				if(PhaserGame.levelPassed) {
					item.text = goalsText.passed;
					item.style.fill = PhaserGame.config.palette.black;
				} else {
					item.text = goalsText.failed;
					item.style.fill = PhaserGame.config.palette.darkRed;
				}
				item.name += 'levelPassed';
				item.y += (levelGoals.length * item.offsetY);

				yearSummary.views[item.name] = item;

				PhaserGame.yearSummary = yearSummary;
				// trace('\tlevel PhaserGame.levelPassed = ' + PhaserGame.levelPassed + '\n\tyearSummary = ', yearSummary);
				if(PhaserGame.levelPassed) {
					// only save the player data if the user passed the level. 
					PhaserGame.playerData = TurnManager.playerData;
					if(PhaserGame.playerData.level < (gameData.levels.length - 1)) {
						PhaserGame.playerData.level++;
						PhaserGame.setSavedData();
					} else {
						PhaserGame.playerData = playerData;
						
						PhaserGame.gameCompleted();
					}
				} else {
					// if failed, reset turn manager to pre-level playerData
					// trace('\tfailed to pass level, playerData is: ', PhaserGame.playerData);
					var sectors = TurnManager.playerData.sectors;
					PWG.Utils.each(
						sectors,
						function(sector, idx) {
							PWG.Utils.each(
								sector,
								function(building) {
									BuildingManager.removeBuilding(idx, building.id);
								},
								this
							);
						},
						this
					);
					TurnManager.playerData = PhaserGame.playerData;
				}
				
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'turnEnd' });
			},
			addYearEndReport: function() {
				var turnEnd = PWG.ViewManager.getControllerFromPath('turnEnd');
				PWG.ViewManager.addView(PhaserGame.yearSummary, turnEnd, true);
				PhaserGame.yearSummary = {};
			},
			gameCompleted: function() {
				// all levels completed. when user clicks confirm, display
				// tutorial guy with all completed notification, then reset 
				// data to start again at level one.
				PhaserGame.confirmAction = {
					method: function() {
						PhaserGame.confirmAction = null; 
						// reset player data to original, starting values
						PhaserGame.playerData = playerData;
						// remove need for tutorial though
						PWG.Utils.each(
							PhaserGame.playerData.firstPlay,
							function(tutorialType, key) {
								PhaserGame.playerData.firstPlay[key] = false;
							},
							this
						);
						PhaserGame.setSavedData();
						PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					},
					params: {}
				};
				PhaserGame.activeTutorial = TutorialTypes.ALL_COMPLETED;
				PhaserGame.addTutorialGuy();
			}
		}
	},
	input: {
		dismissTutorial: {
			inputDown: function() {
				// trace('remove tutorial guy');
				PhaserGame.removeTutorialGuy();
			}
		},
		manualBg: {
			inputDown: function() {
				if(!this.manualOpen) {
					PhaserGame.manualPage = 0;
					PhaserGame.addManualPage(0);
					this.manualOpen = true;
				}
			}
		},
		manualPage: {
			inputDown: function() {
				PhaserGame.nextManualPage();
			}
		},
		notificationEnvelope: {
			inputDown: function() {
				PhaserGame.showNotification();
			}
		},
		tradeRouteAlertIcon: {
			inputDown: function() {
				PhaserGame.showAvailableTradeRouteArrowsAndIcons();
			}
		},
		tradeRouteAvailableIcon: {
			inputDown: function() {
				PhaserGame.showTradeRouteNotification(this.controller.config.tradeRouteId);
			}
		},
		newPlant: {
			inputDown: function() {
				// trace('plantIcon/inputDown, this = ', this);
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
		editMachine: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.EDIT_MACHINE, value: this.controller.config.machineIdx });
			}
		},
		machinePieceForwardIcon: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
			}
		},
		machinePieceBackwardIcon: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.PREV_MACHINE_PIECE_ICON });
			}
		},
		openPartsMenu: {
			inputDown: function() {
				trace('show part menu, partValue = ', this.controller.config.partValue);
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.OPEN_PARTS_MENU, value: this.controller.config.partValue });
			}
		},
		openOptionalPartsMenu: {
			inputDown: function() {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.OPEN_OPTIONAL_PARTS_MENU });
			}
		},
		partIcon: {
			inputDown: function(event) {
				trace('part icon inputDown, add part: ' + this.controller.config.partIdx);
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_PART, value: this.controller.config.partIdx });
			}
		},
		wholesalePartIcon: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_WHOLESALE_PART, value: this.controller.config.supplierId });
			}
		},
		optionalPartIcon: {
			inputDown: function(event) {
				// trace('optionalPartIcon inputDown, this = ', this);
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.ADD_OPTIONAL_PART, value: this.controller.config.part });
			}
		},
		supplierPrompt: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				// trace('supplier prompt input down, clicked = ' + PhaserGame.supplierPromptClicked);
				if(!PhaserGame.supplierPromptClicked) {
					PhaserGame.showSupplierNotification();
					PhaserGame.supplierPromptClicked = true;
				}
			}
		},
		wholesalePartPrompt: {
			inputDown: function(event) {
				// trace('wholesalePartPrompt/inputDown');
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.OPEN_WHOLESALE_PARTS_MENU, value: this.controller.config.part });
			}
		},
		closedEnvelope: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.ViewManager.hideView('turnEnd:closedEnvelope');
				PWG.ViewManager.showView('global:confirmButton');
				PhaserGame.addYearEndReport();
			}
		},
		openedEnvelope: {
			inputDown: function(event) {
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
			}
		}
	},
	buttonCallbacks: {
		openManual: function() {
			// trace('settings click');
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
		},
		share: function() {
			// trace('share click');
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			window.open(FACEBOOK_URL);
		},
		manualStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'manual' });
		},
		worldStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
			ignitionKey.view.events.onAnimationComplete.add(PhaserGame.ignitionAnimationCompleted, this);
			PWG.PhaserAnimation.play(ignitionKey.name, 'turnOn');
		},
		worldReturnButton: function() {
			// trace('worldReturnButton callback');
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PWG.ScreenManager.currentId !== 'world') {
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
			} else if(PhaserGame.zoomedIn) {
				PhaserGame.worldZoomOut();
			}
		},
		plusButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PhaserGame.worldZoomOut();
		},
		minusButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PhaserGame.worldZoomIn();
		},
		// us detail
		usDetailStart: function(param) {
			// trace('usDetailStart callback, this = ', this, '\tparam = ', param);
		}, 
		northeastDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn) {
				PhaserGame.activeSector = USSectors.NORTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		southeastDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn) {
				PhaserGame.activeSector = USSectors.SOUTH_EAST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		midwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn) {
				PhaserGame.activeSector = USSectors.MID_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		northwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn) {
				PhaserGame.activeSector = USSectors.NORTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		southwestDetail: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(!PhaserGame.zoomedIn) {
				PhaserGame.activeSector = USSectors.SOUTH_WEST;
				PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'usDetail' });
			}
		},
		buildingAddConfirm: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.ADD_BUILDING });
		},
		buildingAddCancel: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CLOSE_BUILDINGS_MENU });
		},
		// equipment list
		equipmentListStart: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
		},
		// add equipment
		addEquipment: function() {
			// trace('add equipment button clicked');
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentCreate' });
		},
		newBasicTractor: function() {
				// trace('new tractor callback');
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.BASIC });
		},
		newBasicSkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.BASIC });
		},
		newMediumTractor: function() {
				// trace('new tractor callback');
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.MEDIUM });
		},
		newMediumSkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.MEDIUM });
		},
		newHeavyTractor: function() {
				// trace('new tractor callback');
				if(PhaserGame.tutorialOpen) {
					PhaserGame.removeTutorialGuy();
				}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.TRACTOR, size: EquipmentSizes.HEAVY });
		},
		newHeavySkidsteer: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.MACHINE_TYPE_SELECTION, value: EquipmentTypes.SKIDSTEER, size: EquipmentSizes.HEAVY });
		},
		// equipment edit
		partsMenuClose: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
		},
		optionalPartsMenuClose: function() {
			// trace('optional parts menu close');
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CLOSE_OPTIONAL_PARTS_MENU });
		},
		equipmentCreateClose: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
		},
		confirmButton: function() {
			// trace('confirmAction = ', PhaserGame.confirmAction);
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.confirmAction) {
				PhaserGame.confirmAction.method.call(this, PhaserGame.confirmAction.params);
				PhaserGame.confirmAction = null;
			} else {
				switch(PWG.ScreenManager.currentId) {
					case 'brief':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
					break;

					case 'equipmentEdit':
					PWG.EventCenter.trigger({ type: Events.SAVE_MACHINE });
					break;

					case 'turnEnd':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
					break;

					default:
					break;
				}
			}
		},
		cancelButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.cancelAction) {
				PhaserGame.cancelAction.method.call(this, PhaserGame.cancelAction.params);
				PhaserGame.cancelAction = null;
			} else {
				// switch(PWG.ScreenManager.currentId) {
				// 	case 'brief':
				// 	PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
				// 	break;
				// 	
				// 	case 'equipmentEdit':
				// 	PWG.EventCenter.trigger({ type: Events.SAVE_MACHINE });
				// 	break;
				// 	
				// 	case 'turnEnd':
				// 	PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'brief' });
				// 	break;
				// 	
				// 	default:
				// 	break;
				// }
			}
		},
		backButton: function() {
			if(PhaserGame.tutorialOpen) {
				PhaserGame.removeTutorialGuy();
			}
			if(PhaserGame.backAction) {
				PhaserGame.backAction.call(this);
			} else {
				switch(PWG.ScreenManager.currentId) {
					case 'brief': 
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					break;

					case 'world':
					// var endTurn = confirm('Are you sure you want to end the turn?');
					// if(endTurn) {
						PhaserGame.showEndTurnPrompt();
					// }
					break; 

					case 'manual':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'home' });
					break;

					case 'usDetail':
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'world' });
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
					PWG.ViewManager.hideView('global:equipmentEditGroup');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
					break;

					default:
					break;
				}
			}
		}
	},
	screens: {
		home: {
			create: function() {
				PWG.ViewManager.showView('global:homeGroup');
				PWG.ViewManager.hideView('global:turnGroup');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.hideView('global:backButton');

				if(TurnManager.playerData.firstPlay[TutorialTypes.INIT]) {
					PhaserGame.activeTutorial = TutorialTypes.INIT;
					PhaserGame.addTutorialGuy();
				}
			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:homeGroup');
				var ignitionKey = PWG.ViewManager.getControllerFromPath('home:ignitionKey');
				PWG.PhaserAnimation.play(ignitionKey.name, 'idle');
			}
		},
		manual: {
			create: function() {
				PWG.ViewManager.hideView('global:homeGroup');
				PWG.ViewManager.showView('global:backButton');
				
				
			},
			shutdown: function() {
				PWG.ViewManager.removeView('manualPages', 'manual');
			}
		},
		brief: {
			create: function() {
				var brief = PWG.ViewManager.getControllerFromPath('brief');
				var levelBrief = gameData.levels[PhaserGame.playerData.level].brief;
				var missionBrief = PWG.Utils.clone(PhaserGame.config.dynamicViews.missionBrief);
				var goalText = PhaserGame.config.dynamicViews.goalText;
				var wiper = PWG.Utils.clone(PhaserGame.config.dynamicViews.wiper);
				// trace('wiper = ', wiper);
				// trace('levelBrief = ', levelBrief, '\tgoalText = ', goalText);
				missionBrief.views.briefBg.img = levelBrief.background;

				PWG.Utils.each(
					levelBrief.text,
					function(text, idx) {
						// trace('\ttext['+idx+'] = ' + text);
						var item = PWG.Utils.clone(goalText);
						// trace('\titem = ', item);
						item.name += idx;
						// item.views.goal.text = text;
						// item.views.goal.y += (idx * item.offsetY);
						item.text = text;
						item.y += (idx * item.offsetY);
						missionBrief.views['goal'+idx] = item;
					},
					this
				);
				// trace('missionBrief config now = ', missionBrief, '\tbrief = ', brief);
				PWG.ViewManager.addView(missionBrief, brief, true);
				PWG.ViewManager.addView(wiper, brief, true);

				PWG.ViewManager.showView('global:backButton');
				PWG.ViewManager.hideView('global:turnGroup');

				// wiper
				var wiper = PWG.ViewManager.getControllerFromPath('brief:wiper:windshieldWiper');
				// var wiperMask = PWG.ViewManager.getControllerFromPath('brief:wiper:windshieldWiperMask');
				wiper.view.anchor.setTo(0.5, 0.04);

				var tween = PhaserGame.phaser.add.tween(wiper.view);
				tween.onComplete.add(function() {
					// trace('wiper tween complete');
					wiper.view.events.onTweenComplete = null;
					// PWG.ViewManager.showView('global:confirmButton');
				});
				tween.to({angle: -65}, 1000, Phaser.Easing.Linear.None, true, Math.random() * 500);
				tween.start();

				PWG.ViewManager.showView('global:confirmButton');

			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('missionBrief', 'brief');
			}
		},
		world: {
			listeners: [
			{
				event: Events.WORLD_ZOOMED_IN,
				handler: function(event) {
					// trace('WORLD ZOOMED IN');
					PhaserGame.addTradeRouteViews();
					PhaserGame.worldZoomedIn = false;
				}
			},
			{
				event: Events.WORLD_ZOOMED_OUT,
				handler: function(event) {
					
				}
			}
			],
			create: function() {

				if(TurnManager.playerData.firstPlay[TutorialTypes.WORLD]) {
					PhaserGame.activeTutorial = TutorialTypes.WORLD;
					PhaserGame.addTutorialGuy();
				}
				var worldMap = PWG.ViewManager.getControllerFromPath('world:worldMap');
				// trace('worldMap view = ', worldMap.view);
				// worldMap.view.scale.setTo(PhaserGame.config.maxWorldZoom.width, PhaserGame.config.maxWorldZoom.height);
				// worldMap.view.y = -(gameUnit * 31.2);
				// worldMap.view.x = -(gameUnit * 8.2);
				PhaserGame.worldView = worldMap.view;

				var world = PWG.ViewManager.getControllerFromPath('world');
				var buildingPins = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingPins);
				var worldPositions = PhaserGame.config.worldPositions;

				PWG.Utils.each(
					TurnManager.playerData.sectors,
					function(sector, idx) {
						var count = PWG.Utils.objLength(sector);
						if(count > 0) {
							// trace('\tthere are ' + count + ' buildings in sector['+idx+'] ', sector);
							var palette = PhaserGame.config.palette;
							
							var typeCounts = {
								plant: 0,
								dealer: 0,
								tradeRoute: 0
							};
							
							PWG.Utils.each(
								sector,
								function(building, key) {
									typeCounts[building.type]++;
								},
								this
							);
							// trace('\ttypeCounts = ', typeCounts);
							if(typeCounts.plant > 0) {
								var buildingPin = PhaserGame.formatBuildingPin(BuildingTypes.PLANT, idx, typeCounts[BuildingTypes.PLANT]);
								buildingPins.views[buildingPin.name] = buildingPin;
							}
							if(typeCounts.dealer > 0) {
								var buildingPin = PhaserGame.formatBuildingPin(BuildingTypes.DEALER, idx, typeCounts[BuildingTypes.DEALER]);
								buildingPins.views[buildingPin.name] = buildingPin;
							}
						}
					},
					this
				);
				
				PWG.ViewManager.addView(buildingPins, world, true);

				PhaserGame.buildingPins = PWG.ViewManager.getControllerFromPath('world:buildingPins').view;

				if(!PhaserGame.worldZoomInitialized) {
					PhaserGame.initWorldZoom(worldMap.view, PhaserGame.buildingPins);
				}
				PhaserGame.worldZoomOutFull();

				PhaserGame.currentZoom = 4;
				PhaserGame.activeSector = -1;

				PWG.ViewManager.showView('global:turnGroup');
				PWG.ViewManager.showView('global:plusMinusGroup');
			},
			shutdown: function() {
				PhaserGame.removeTradeRouteViews();
				PWG.ViewManager.removeView('buildingPins', 'world');
				PWG.ViewManager.hideView('global:plusMinusGroup');
				PhaserGame.worldView = null;
				PhaserGame.buildingPins = null;
				PhaserGame.zoomedInTriggered = false;
			}
		},
		usDetail: {
			listeners: [
			// open building menu
			{
				event: Events.OPEN_BUILDINGS_MENU,
				handler: function(event) {
					// trace('open overlay menu handler, value = ' + event.value + ', overlay open = ' + PhaserGame.partsMenuOpen + ', partsMenuType = ' + this.partsMenuType);
					if(!this.buildingCreatePromptOpen) {
						PhaserGame.addBuildingCreatePrompt();
						this.buildingCreatePromptOpen = true;
					}
				}
			},
			// add building
			{
				event: Events.ADD_BUILDING,
				handler: function(event) {
					PhaserGame.addBuilding(BuildingTypes.PLANT);
				}
			},
			// building state updated
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					var config = event.building.config;
					if(config.type === BuildingTypes.TRADE_ROUTE) {
						
					} else {
						if(config.sector === PhaserGame.activeSector) {
							var viewPath = 'usDetail:usDetailGrid:usDetailGridItem'+config.cell;
							var view = PWG.ViewManager.getControllerFromPath(viewPath);
							var frameKey = config.type.toUpperCase() + '_' + config.state.toUpperCase();
							var frame = TileCellFrames[frameKey];
							// trace('\tviewPath = ' + viewPath + ', view = ', view);

							PWG.ViewManager.setFrame(viewPath, frame);
							view.config.attrs.frame = frame;
						}
					}
				}
			},
			// inventory added
			{
				event: Events.INVENTORY_ADDED,
				handler: function(event) {
					PhaserGame.inventoryAdded(event.plant, 'usDetail:usDetailGrid');
				}
			},
			// close building menu
			{
				event: Events.CLOSE_BUILDINGS_MENU,
				handler: function(event) {
					// trace('close overlay handler, overlay open = ' + this.buildingCreatePromptOpen);
					if(this.buildingCreatePromptOpen) {
						// trace('\toverlay-menu = ', (this.views['overlay-menu']));
						PWG.ViewManager.removeView('buildingCreatePrompt', 'global');
						PhaserGame.confirmAction = null;
						PhaserGame.cancelAction = null;
						PWG.ViewManager.hideView('global:confirmButton');
						PWG.ViewManager.hideView('global:cancelButton');
						PWG.ViewManager.showView('global:backButton');
						this.buildingCreatePromptOpen = false;
					}
				}
			}
			],
			create: function() {
				// trace('us detail start, TurnManager.playerData.firstPlay[TutorialTypes.US_DETAIL] = ' + TurnManager.playerData.firstPlay[TutorialTypes.US_DETAIL]);
				if(TurnManager.playerData.firstPlay[TutorialTypes.US_DETAIL]) {
					PhaserGame.activeTutorial = TutorialTypes.US_DETAIL;
					PhaserGame.addTutorialGuy();
				}
				// trace('BUILD DETAIL GRID, this = ', this);
				var usDetail = PWG.ViewManager.getControllerFromPath('usDetail');
				var sectorBg = PWG.Utils.clone(PhaserGame.config.dynamicViews.sectorBg);
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

				sectorBg.img = SectorGrids[PhaserGame.activeSector];
				PWG.ViewManager.addView(sectorBg, usDetail, true);
				PWG.ViewManager.addView(usDetailGrid, usDetail, true);
				
				if(PhaserGame.notifications[PhaserGame.activeSector].length > 0) {
					PhaserGame.showNotificationEnvelope();
				}
			},
			shutdown: function() {
				// hide add building button
				if(PhaserGame.notEnoughMoneyPromptActive) {
					PWG.ViewManager.removeView('buildingCreatePrompt', 'global');
					PhaserGame.confirmAction = null;
					PhaserGame.cancelAction = null;
					PWG.ViewManager.hideView('global:confirmButton');
					PWG.ViewManager.hideView('global:cancelButton');
					PWG.ViewManager.showView('global:backButton');
					this.buildingCreatePromptOpen = false;
				}
				PWG.ViewManager.removeGroupChildren('usDetail:usDetailGrid');
				PhaserGame.hideNotificationEnvelope();
			}
		},
		buildingEdit: {
			listeners: [
			// building state updated
			{
				event: Events.BUILDING_STATE_UPDATED,
				handler: function(event) {
					// trace('BUILDING_STATE_UPDATED event = ', event);
					var config = event.building.config;
					if(config.id === PhaserGame.activeBuilding.id) {
	 					var buildingEditDetails = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails[config.type]);
						switch(config.type) {
							case BuildingTypes.PLANT:
							var equipmentUpdate = buildingEditDetails.equipment.text + PWG.Utils.objLength(config.equipment) + ' / ' + BuildingManager.PLANT_MAX_MODELS;
							var inventoryUpdate = buildingEditDetails.inventory.text + config.totalInventory + ' / ' + BuildingManager.PLANT_MAX_INVENTORY;

							PWG.ViewManager.callMethod('buildingEdit:editDetails:equipment', 'setText', [equipmentUpdate], this);
							PWG.ViewManager.callMethod('buildingEdit:editDetails:inventory', 'setText', [inventoryUpdate], this);
							break;

							case BuildingTypes.DEALER:
							var salesUpdate = buildingEditDetails.sales.text = '$' + PWG.Utils.formatMoney(config.totalSales, 0);
							PWG.ViewManager.callMethod('buildingEdit:editDetails:sales', 'setText', [salesUpdate], this);
							break;

							default:
							break;
						}
					}
				}
			}
			],
			create: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.PLANT_DETAILS]) {
					PhaserGame.activeTutorial = TutorialTypes.PLANT_DETAILS;
					PhaserGame.addTutorialGuy();
				}
				var buildingEdit = PWG.ViewManager.getControllerFromPath('buildingEdit');
				var building = PhaserGame.activeBuilding;
				// trace('building = ', building);
				var buildingEditScreen = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditScreen);
				var buildingEditDetails = PWG.Utils.clone(PhaserGame.config.dynamicViews.buildingEditDetails[building.type]);

				buildingEditScreen.views.bg.img = buildingEditDetails.bg.img;
				buildingEditScreen.views.name.text += building.name;
				buildingEditScreen.views.status.text += building.state.toUpperCase();
				// trace('BuildingEdit/create, making details for ', building);
				switch(building.type) {
					case BuildingTypes.PLANT:
					// trace('\tit is a plant');
					buildingEditDetails.equipment.text += PWG.Utils.objLength(building.equipment) + ' / ' + BuildingManager.PLANT_MAX_MODELS;
					buildingEditDetails.inventory.text += building.totalInventory + ' / ' + BuildingManager.PLANT_MAX_INVENTORY;
					buildingEditDetails.dealers.text += PWG.Utils.objLength(building.dealers) + ' / ' + BuildingManager.PLANT_MAX_DEALERS;
					break;

					case BuildingTypes.DEALER:
					var plant = BuildingManager.sectors[PhaserGame.activeSector][building.plantId].config;
					// trace('\tdealer plant = ', plant);
					buildingEditDetails.plantMachine.text += plant.name + ' / ' + plant.equipment[building.modelId].name;
					buildingEditDetails.resell.text += '$' + PWG.Utils.formatMoney(building.resell, 0);
					buildingEditDetails.sales.text += '$' + PWG.Utils.formatMoney(building.totalSales, 0);;
					break;

					default:
					break;
				}

				PWG.Utils.each(
					buildingEditDetails,
					function(detail, key) {
						if(key !== 'bg') {
							buildingEditScreen.views[detail.name] = detail;
						}
					},
					this
				);
				// trace('\tbuildingEditScreen now = ', buildingEditScreen);

				PWG.ViewManager.addView(buildingEditScreen, buildingEdit, true);

				if(building.type === BuildingTypes.PLANT) {
					PWG.ViewManager.showView('global:plantDetailGroup');
				}
			},
			shutdown: function() {
				PWG.ViewManager.removeView('editDetails', 'buildingEdit');
				PWG.ViewManager.hideView('global:plantDetailGroup');
			}
		},
		equipmentList: {
			listeners: [
			{
				event: Events.EDIT_MACHINE,
				handler: function(event) {
					var config = TurnManager.playerData.sectors[PhaserGame.activeSector][PhaserGame.activeBuilding.id].equipment[event.value];
					// trace('edit machine: event = ', event, 'config = ', config);
					PhaserGame.activeMachineType = config.type;
					PhaserGame.activeMachineSize = config.size;
					PhaserGame.activeMachine = new Machine(config);
					PhaserGame.newMachine = false;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			},
			// building state updated
			{
				event: Events.INVENTORY_ADDED,
				handler: function(event) {
					// trace('BUILDING_STATE_UPDATED event = ', event);
					var config = event.plant;
					if(config.id === PhaserGame.activeBuilding.id) {
						var available = 'x' + BuildingManager.getMachineModelInventory(config.id, event.machine);;
						PWG.ViewManager.callMethod('equipmentList:machineList:machine'+event.machine+':available', 'setText', [available], this);
					}
				}
			}
			],
			create: function() {
				// show add equipment button

				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_LIST]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_LIST;
					PhaserGame.addTutorialGuy();
				}

				var equipment = PhaserGame.activeBuilding.equipment;
				// trace('build equipment list = ', equipment);
				var machineList = PWG.Utils.clone(PhaserGame.config.dynamicViews.machineList);
				var machineIcon = PhaserGame.config.dynamicViews.machineIcon;
				var emptyIcon = PhaserGame.config.dynamicViews.emptyIcon; 
				
				var offsetX = machineIcon.offsetX;
				var offsetY = machineIcon.offsetY;
				var iconW = machineIcon.iconW;
				var iconH = machineIcon.iconH;
				var columnW = PWG.Stage.gameW/MACHINE_LIST_COLUMNS;
				
				var column = 0;
				var count = 0;
				var itemY = 0;
				var emptyTotal = MACHINE_LIST_ICONS - PWG.Utils.objLength(equipment); 
				// trace('EMPTY TOTAL = ' + emptyTotal);
				
				PWG.Utils.each(
					equipment,
					function(machine, idx) {
						// trace('\tadding machine['+idx+']: ', machine);
						var item = PWG.Utils.clone(machineIcon);
						var available = BuildingManager.getMachineModelInventory(machine.plantId, machine.id);
						// trace('\titem = ', item);
						item.name = 'machine' + idx;
						// trace('machine icon = ' + (PhaserGame.config.machineIcons[machine.type][machine.size]));
						item.views.bg.img = PhaserGame.config.machineIcons[machine.type][machine.size];
						item.views.name.text = machine.name;
						item.views.cost.text = '$' + machine.cost;
						// item.views.size.text = machine.size;

						item.views.available.text = 'x' + available;

						// if(!machine.active) {
						// 	item.views.alert.attrs.visible = true;
						// }

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

				for(var i = 0; i < emptyTotal; i++) {
					var empty = PWG.Utils.clone(emptyIcon);

					if(count % MACHINE_LIST_COLUMNS === 0) {
						itemY = (iconH * (count/MACHINE_LIST_COLUMNS)) + offsetY;
					}
					
					var columnX = offsetX + ((PWG.Stage.gameW/2) * (count % MACHINE_LIST_COLUMNS));
					empty.name = 'empty' + i;

					PWG.Utils.each(
						empty.views,
						function(view) {
							view.x += columnX;
							view.y += itemY;
						},
						this
					);
					
					machineList.views[empty.name] = empty;
					// trace('\tadding empty icon: ', empty);
					count++;
				}
				
				// trace('machineList = ', machineList);
				var equipmentListView = PWG.ViewManager.getControllerFromPath('equipmentList');
				PWG.ViewManager.addView(machineList, equipmentListView, true);
				PWG.ViewManager.showView('global:equipmentListGroup');
			},
			shutdown: function() {
				PWG.ViewManager.removeView('machineList', 'equipmentList');
				PWG.ViewManager.hideView('global:equipmentListGroup');
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
					var letter = alphabet.UPPER[TurnManager.playerData.modelCount[event.value]];
					var id = event.value + letter;
					var name = event.value.toUpperCase() + ' ' + letter;
					PhaserGame.activeMachineSize = event.size;
					PhaserGame.activeMachine = new Machine({ id: id, type: PhaserGame.activeMachineType, size: event.size, name: name, plantId: PhaserGame.activeBuilding.id });
					PhaserGame.newMachine = true;
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentEdit' });
				}
			}
			],
			create: function() {
				// trace('EQUIPMENT CREATE CREATE METHOD');
				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_CREATE]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_CREATE;
					PhaserGame.addTutorialGuy();
				}

			}
		},
		equipmentEdit: {
			listeners: [
			// next machine piece icon
			{
				event: Events.NEXT_MACHINE_PIECE_ICON,
				handler: function(event) {
					PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());

					if(PhaserGame.currentMachinePiece < PhaserGame.machinePieces.length - 1) {
						PhaserGame.currentMachinePiece++;
					} else {
						PhaserGame.currentMachinePiece = 0;
					}

					PhaserGame.setSelectedMachinePieceSprite();

					// show piece name text/button
					PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());
				}
			},
			// prev machine piece icon
			{
				event: Events.PREV_MACHINE_PIECE_ICON,
				handler: function(event) {
					PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());

					if(PhaserGame.currentMachinePiece > 1) {
						PhaserGame.currentMachinePiece--;
					} else {
						PhaserGame.currentMachinePiece = PhaserGame.machinePieces.length - 1;
					}

					PhaserGame.setSelectedMachinePieceSprite();

					// show piece name text/button
					PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());
				}
			},
			// add part
			{
				event: Events.ADD_PART,
				handler: function(event) {
					PhaserGame.activeMachine.setPart(PhaserGame.activePartType, event.value, false);

					PWG.EventCenter.trigger({ type: Events.CLOSE_PARTS_MENU });
					PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
				}
			},
			// add wholesale part
			{
				event: Events.ADD_WHOLESALE_PART, 
				handler: function(event) {
					// trace('ADD WHOLESALE PART');
					var type = PhaserGame.activePartType;
					PhaserGame.activeMachine.setPart(type, event.value, true);
					// WholesaleManager.usePart(type, PhaserGame.activeMachineSize, event.supplierId);

					PWG.EventCenter.trigger({ type: Events.CLOSE_WHOLESALE_PARTS_MENU });
					PWG.EventCenter.trigger({ type: Events.NEXT_MACHINE_PIECE_ICON });
				}
			},
			// required part added
			{
				event: Events.REQUIRED_PART_ADDED,
				handler: function(event) {
					// trace('equipmentEdit/' + event.type + ' hander');
					var stars = PWG.ViewManager.getControllerFromPath('equipmentEdit:machineEdit:stars');
					stars.view.frame++;
				}
			},
			// add optional part
			{
				event: Events.ADD_OPTIONAL_PART,
				handler: function(event) {
					// trace('add option part, type = ' + event.value);
					PhaserGame.activeMachine.setPart(event.value, 0);
					PWG.EventCenter.trigger({ type: Events.CLOSE_OPTIONAL_PARTS_MENU });
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
					trace('open overlay menu handler, value = ' + event.value + ', overlay open = ' + PhaserGame.partsMenuOpen + ', partsMenuType = ' + this.partsMenuType);
					if(!PhaserGame.partsMenuOpen && !PhaserGame.optionalPartsMenuOpen) {
						trace('\t')
						if(this.partsMenuType !== event.value) {
							// update piece navigator
							trace('\tthe parts menu type is not the same, resetting sprite frames and rebuilding menu');
							PhaserGame.resetAllMachinePieceSpriteFrames();

							PWG.ViewManager.hideView(PhaserGame.getCurrentMachinePiecePath());
							PhaserGame.currentMachinePiece = PhaserGame.getMachinePieceIndex(event.value);

							// PhaserGame.setMachinePieceSpriteFrame(event.value, 1);
							PhaserGame.setSelectedMachinePieceSprite();
							PWG.ViewManager.showView(PhaserGame.getCurrentMachinePiecePath());

							// populate menu with new piece type
							PhaserGame.populatePartsMenu.call(this, event.value, this.views);

						}
						// PWG.ViewManager.showView('partsMenu');
						PhaserGame.showPartsMenu();
						this.partsMenuType = event.value;
						PhaserGame.partsMenuOpen = true;
					}
				}
			},
			// close parts menu
			{
				event: Events.CLOSE_PARTS_MENU,
				handler: function(event) {
					// trace('close overlay handler, overlay open = ' + PhaserGame.partsMenuOpen);
					if(PhaserGame.partsMenuOpen) {
						// trace('\toverlay-menu = ', (this.views['overlay-menu']));
						// PWG.ViewManager.hideView('partsMenu');
						PhaserGame.hidePartsMenu();
						PhaserGame.partsMenuOpen = false;
						PhaserGame.activePartType = '';
					}
					if(PhaserGame.wholesalePromptAdded) {
						PhaserGame.removeWholesalePartPrompt();
					}
				}
			},
			// open wholesale parts menu
			{
				event: Events.OPEN_WHOLESALE_PARTS_MENU,
				handler: function(event) {
					// trace('open wholesale parts menu event handler');
					PhaserGame.removeWholesalePartPrompt();
					PhaserGame.addWholesalePartsMenu();
				}
			},
			// close wholesale parts menu
			{
				event: Events.CLOSE_WHOLESALE_PARTS_MENU,
				handler: function(event) {
					PhaserGame.removeWholesalePartsMenu();
					if(PhaserGame.wholesalePromptAdded) {
						PhaserGame.removeWholesalePartPrompt();
					}
				}
			},
			// open optional parts menu
			{
				event: Events.OPEN_OPTIONAL_PARTS_MENU,
				handler: function(event) {
					if(!PhaserGame.partsMenuOpen && !PhaserGame.optionalPartsMenuOpen) {
						if(!PhaserGame.optionalPartsMenuPopulated) {
							PhaserGame.populateOptionalPartsMenu.call(this, this.views);
							PhaserGame.optionalPartsMenuPopulated = true;
						}
						PWG.ViewManager.showView('optionalPartsMenu');
						PhaserGame.optionalPartsMenuOpen = true;
					}
				}
			},
			// close optional parts menu
			{
				event: Events.CLOSE_OPTIONAL_PARTS_MENU,
				handler: function(event) {
					// trace('close optional parts menu, optionalPartsMenuOpen: ' + PhaserGame.optionalPartsMenuOpen);
					if(PhaserGame.optionalPartsMenuOpen) {
						PWG.ViewManager.hideView('optionalPartsMenu');
						PhaserGame.optionalPartsMenuOpen = false;
					}
				}
			},
			// machine complete
			{
				event: Events.MACHINE_PARTS_COMPLETE,
				handler: function(event) {
					// trace('machine complete, event = ', event);
					PhaserGame.hideAllMachinePieceSprites();
					PhaserGame.confirmAction = null;
					PWG.ViewManager.showView('global:confirmButton');
				}
			},
			// save machine
			{
				event: Events.SAVE_MACHINE, 
				handler: function(event) {
					// trace('time to save activeMachine: ', PhaserGame.activeMachine);
					PhaserGame.activeMachine.save();
					if(PhaserGame.newMachine) {
						// trace('active plant = ', PhaserGame.activeBuilding);
						TurnManager.addMachineModel(PhaserGame.activeMachine.config);
						PhaserGame.newMachine = false;
					}
					PhaserGame.activeMachine = null;
					PhaserGame.machineDirty = false;
					PWG.ViewManager.hideView('global:equipmentEditGroup');
					PWG.EventCenter.trigger({ type: Events.CHANGE_SCREEN, value: 'equipmentList' });
				}
			}

			],
			create: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.EQUIPMENT_EDIT]) {
					PhaserGame.activeTutorial = TutorialTypes.EQUIPMENT_EDIT;
					PhaserGame.addTutorialGuy();
				}
				PhaserGame.machinePieces = [];
				PhaserGame.currentMachinePiece = 0;
				
				var type = PhaserGame.activeMachineType;
				var size = PhaserGame.activeMachineSize;
				var requiredParts = gameData.machines[type][size].requiredParts;
				var count = 0;
				
				var equipmentEdit = PWG.ViewManager.getControllerFromPath('equipmentEdit');
				var stars = PWG.Utils.clone(PhaserGame.config.dynamicViews.stars);
				var machineEdit = PWG.Utils.clone(PhaserGame.config.dynamicViews.machineEdit);
				var machinePieceMenuItem = PhaserGame.config.dynamicViews.machinePieceMenuItem;
				var machinePieceSprites = PWG.Utils.clone(PhaserGame.config.dynamicViews.machinePieceSprites);
				var machinePieceSpriteConfig = PhaserGame.config.machinePieceSpriteConfig;

				machineEdit.views.bg.img = PhaserGame.config.machineEditBackgrounds[type][size];
				
				var starsConfig = PhaserGame.config.starsConfig[type][size];
				stars.img = starsConfig.img;
				stars.x = starsConfig.x;
				stars.y = starsConfig.y;
				stars.attrs.width = starsConfig.width;
				stars.attrs.height = starsConfig.height;
				
				if(PhaserGame.newMachine) {
					stars.attrs.frame = 0;
				} else {
					stars.attrs.frame = starsConfig.frames;
				}

				machineEdit.views['stars'] = stars;
				
				PWG.Utils.each(
					requiredParts,
					function(part, idx) {
						var item = PWG.Utils.clone(machinePieceMenuItem);
						item.name = part.name;
						item.views.name.text = gameData.partNames[part.name];
						if(count > 0) {
							item.attrs.visible = false;
						} else {
							item.x += 100;
						}
						item.views.button.partValue = part.name;
						
						PhaserGame.machinePieces.push(item.name);
						count++;
						machineEdit.views.machinePieceName.views[part.name] = item;
						
						if(part.sprite) {
							var partSprite = PWG.Utils.clone(machinePieceSpriteConfig[type][size][part.name]);
							// trace('part.name = ' + part.name + ', partSprite = ', partSprite);
							if(idx === 0) {
								partSprite.attrs.frame = 1;
							}
							machineEdit.views.machinePieceSprites.views[partSprite.name] = partSprite;
						}
					},
					this
				);

				// trace('machineEdit now = ', machineEdit);

				PWG.ViewManager.addView(machineEdit, equipmentEdit, true);

				PWG.ViewManager.showView('global:equipmentEditGroup');
				PWG.ViewManager.hideView('global:backButton');
				PWG.ViewManager.showView('global:cancelButton');

				PhaserGame.cancelAction = {
					method: function() {
						PhaserGame.addMachineDiscardPrompt();
					},
					params: {}
				};

				PhaserGame.spriteTranslations = gameData.machines[type][size].spriteTranslations;
				PhaserGame.machineDirty = true;
			},
			shutdown: function() {
				if(TurnManager.playerData.firstPlay[TutorialTypes.DEALER]) {
					PhaserGame.activeTutorial = TutorialTypes.DEALER;
					PhaserGame.addTutorialGuy();
				}
				PhaserGame.machinePieces = null;
				PWG.ViewManager.removeView('machineEdit', 'equipmentEdit');
				PWG.ViewManager.hideView('global:equipmentEditGroup');
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.hideView('global:cancelButton');
				PWG.ViewManager.showView('global:backButton');
				PhaserGame.cancelAction = null;
				this.partsMenuType = '';
				PhaserGame.partsMenuOpen = false;
				PhaserGame.machineDirty = false;
			}
		},
		turnEnd: {
			create: function() {
				PWG.ViewManager.hideView('global:turnGroup:homeButton');
				PWG.ViewManager.hideView('global:backButton');
			},
			shutdown: function() {
				PWG.ViewManager.hideView('global:confirmButton');
				PWG.ViewManager.removeView('yearSummary', 'turnEnd');
			}
		}
	}
};