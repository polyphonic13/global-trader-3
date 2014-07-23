var GameConfig = function() {
	
	var module = {};

	module.loadingAnimation = true;
	
	module.init = function(callback, context) {
		// stage sizes cached
		var winW = PWG.Stage.winW;
		var winH = PWG.Stage.winH;
		var gameW = PWG.Stage.gameW;
		var gameH = PWG.Stage.gameH;
		var gameUnit = PWG.Stage.unit;

		var defaultWorld = {
			x: 0,
			y: 0,
			width: gameW,
			height: gameH
		};
		var controlButtons = {
			left: {
				x: 0,
			},
			right: {
				x: (gameW - ((gameUnit * 7)/3))
			},
			bottom: {
				y: gameH - (gameUnit * 2.2)
			},
			width: (gameUnit * 7)/3,
			height: (gameUnit * 6)/3
		};
		var fontSizes = {
			xxs: (gameUnit * 0.25),
			xs: (gameUnit * 0.3),
			sm: (gameUnit * 0.4),
			md: (gameUnit * 0.6),
			lg: (gameUnit * 1.0),
			xl: (gameUnit * 1.5)
		};
		var palette = {
			darkRed: '#ba1d3a',
			lightRed: '#e21a49',
			orange1: '#fca600',
			orange2: '#e9a547',
			orange3: '#e58f25',
			green: '#009b1d',
			black: '#000000',
			white: '#ffffff'
		};

		var worldPositions = {
			us: {
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 9.5),
				height: (gameUnit * 4.5)
			},
			usSectors: [
			// northeast
			{
				x: gameUnit * 5.7,
				y: (gameUnit * 6),
				width: (gameUnit * 4),
				height: (gameUnit * 2.5)
			},
			// southeast
			{
				x: gameUnit * 5.7,
				y: (gameUnit * 8.5),
				width: (gameUnit * 1.25),
				height: (gameUnit * 1.25)
			},
			// midwest
			{
				x: gameUnit * 3.7,
				y: (gameUnit * 6),
				width: (gameUnit * 2),
				height: (gameUnit * 4.5)
			},
			// northwest
			{
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 3.5),
				height: (gameUnit * 2)
			},
			// southeast
			{
				x: gameUnit * 0.2,
				y: (gameUnit * 8),
				width: (gameUnit * 3.5),
				height: (gameUnit * 2)
			}
			]		
		};
		var pinPositions = {
			us: {
				x: gameUnit * 0.2,
				y: (gameUnit * 6),
				width: (gameUnit * 9.5),
				height: (gameUnit * 4.5)
			},
			usSectors: [
			// northeast
			{
				x: gameUnit * 5.5,
				y: gameUnit * 7.2
			},
			// southeast
			{
				x: gameUnit * 5.5,
				y: gameUnit * 9.4
			},
			// midwest
			{
				x: gameUnit * 3.4,
				y: gameUnit * 7
			},
			// northwest
			{
				x: gameUnit * 1.3,
				y: gameUnit * 6.4
			},
			// southwest
			{
				x: gameUnit * 1.3,
				y: gameUnit * 9
			}
			]		
		};
		var pinOffsets = {
			plant: {
				x: gameUnit * 0,
				y: gameUnit * 0
			},
			dealer: {
				x: gameUnit * 0.76,
				y: gameUnit * 0
			}
		};
		var pinImages = {
			plant: 'pinPlant',
			dealer: 'pinDealer',
			tradeRoute: 'pinTradeRoute'
		};
		var pinFills = {
			plant: [
				palette.white,
				palette.white,
				palette.white,
				palette.black,
				palette.white
			],
			dealer: [
				palette.black,
				palette.white,
				palette.white,
				palette.black,
				palette.white
			]
		};

		var notificationText = {
			tutorial: {
				init: {
					content: 'Hello! Let\'s get started.\nClick the gear below to\ncheck out the game manual.\nOtherwise, click the ignition\nto start the game.'
				},
				world: {
					content: '\nThis is the world map.\nClick on a US Sector icon\nto see a detailed\nview of the area.'
				},
				usDetail: {
					content: '\nThis is a grid of locations\nin this area.\nClick an empty cell\nto create a new Plant.'
				},
				plant: {
					content: '\nYour Plant has finished\nconstruction!\nClick on the Plant\nto see details.'
				},
				plantDetails: {
					content: '\nHere are the details\nof your new Plant.\nNot much going on yet.\nClick the wrench.'
				},
				equipmentList: {
					content: '\nThis is a list of your Plant\'s\nTractors and Skid Steers.\nClick an empty slot\nto add a new model.'
				},
				equipmentCreate: {
					content: 'Click on a crate to choose\na new Tractor or Skid Steer\nmodel and its size.'
				},
				equipmentEdit: {
					content: '\nClick the part name to\nsee the parts you can buy.\nThe machine behind me will cycle\nthrough parts to be added.'
				},
				dealer: {
					content: 'Great! Your Plant will now\nbegin manufacturing. Once it has\nmade 3, Dealers will begin\n offering to sell your equipment.\nLook for the envelope in the\nUS Sector screen.'
				},
				supplier: {
					content: 'Suppliers will now begin\nto offer you parts at a\ndiscount for bulk orders.\nLook for the engine icon in\nthe bottom, left corner.'
				},
				tradeRoute: {
					// content: 'Now you\'ll want to start establishing\nInternational Trade Routes.\nBe sure to create some new\nTractors and Skid Steers\nas you will need inventory to export.'
					content: '\nThe Transatlantic Trade\nand Investment Partnership (TTIP)\nOpens trade to the European Union.',
					// content: '\nI have watched your progress in Asia\nand would like to offer you a\nTrans-Pacific Partnership (TPP),\nso that you can trade with several\ncountries on both sides of\nthe Pacific Ocean.'
				},
				outOfWholesaleParts: {
					content: ''
				},
				allCompleted: {
					content: 'CONGRATULATIONS!\nYou\'ve become an expert\nGlobal Trader!\n\nWant to play more?\nTry to beat your previous score.'
				}
			},
			notEnoughMoney: {
				content: 'You need to earn\nmore money first'
			},
			buildingCreate: {
				content: 'Add new Plant?'
			},
			dealer: {
				content: 'We would like to sell ~{quantity}~\nper year of your\n~{plant}~ ~{model}~\ninventory at $~{resell}~ each.'
			},
			supplierNotificationIcon: {
				content: 'Build Supplier\nRelationship',
			},
			supplierNotification: {
				content: 'We would like to offer you\n~{quantity}~ ~{quality}~ ~{size}~\n~{type}~\nfor the cost of ~{cost}~.'
			},
			wholesaleParts: {
				content: 'Click here to view\nwholesale parts'
			},
			tradeRoute: {
				content: 'We would like to import ~{quantity}~\nper year of your ~{plant}~\n~{model}~ inventory\nat $~{resell}~ each.'
			},
			transatlantic: { 
				content: '\nThe Transatlantic Trade\nand Investment Partnership (TTIP)\nhas opened trade to the European Union.',
			},
			transpacific: {
				content: 'I have watched your progress in Asia\nand would like to offer you a\nTrans-Pacific Partnership (TPP),\nso that you can trade with several\ncountries on both sides of\nthe Pacific Ocean.'
			}
		};
		var notificationPeopleImages = {
			tutorial: 'tutorialGuy',
			dealer: 'dealerGirl',
			supplier: 'supplierGuy',
			tradeRoutes: {
				africa: 'tradeRouteAfricaNotification',
				asia: 'tradeRouteAsiaNotification',
				europe: 'tradeRouteEuropeNotification',
				middleEast: 'tradeRouteMiddleEastNotification',
				southPacific: 'tradeRouteSouthPacificNotification',
				southAmerica: 'tradeRouteSouthAmericaNotification'
			}
		};
		var tradeRouteArrowConfig = {
			africa: {
				img: 'tradeRouteAfrica',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.45),
				attrs: {
					width: (gameUnit * 3.5),
					height: (gameUnit * 3.5) * 0.43
				}
			},
			asia: {
				img: 'tradeRouteAsia',
				x: (gameUnit * 1.8),
				y: (gameUnit * 5.5),
				attrs: {
					width: (gameUnit * 5.25),
					height: (gameUnit * 5.25) * 0.19
				}
			},
			europe: {
				img: 'tradeRouteEurope',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6),
				attrs: {
					width: (gameUnit * 2.5),
					height: (gameUnit * 2.75) * 0.2
				}
			},
			middleEast: {
				img: 'tradeRouteMiddleEast',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 4.25),
					height: (gameUnit * 4.25) * 0.22
				}
			},
			// northPacific: {
			// 	img: 'tradeRoutePacificNorth',
			// 	x: (gameUnit * 1.8),
			// 	y: (gameUnit * 6.75),
			// 	attrs: {
			// 		width: (gameUnit * 6.25),
			// 		height: (gameUnit * 6.25) * 0.22
			// 	}
			// },
			southPacific: {
				img: 'tradeRoutePacificSouth',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 6),
					height: (gameUnit * 6) * 0.4
				}
			}, 
			southAmerica: {
				img: 'tradeRouteSouthAmerica',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 1),
					height: (gameUnit * 1) * 2.03
				}
			}
		};
		var tradeRoutePinConfig = {
			africa: {
				x: (gameUnit * 4.6),
				y: (gameUnit * 7.75)
			},
			asia: {
				x: (gameUnit * 6.75),
				y: (gameUnit * 5.75)
			},
			europe: {
				x: (gameUnit * 4.25),
				y: (gameUnit * 5.9)
			},
			middleEast: {
				x: (gameUnit * 5.75),
				y: (gameUnit * 6.25)
			},
			// northPacific: {
			// 	x: (gameUnit * 7.5),
			// 	y: (gameUnit * 6.2)
			// },
			southPacific: {
				x: (gameUnit * 7.5),
				y: (gameUnit * 8.5)
			},
			southAmerica: {
				x: (gameUnit * 2.5),
				y: (gameUnit * 8.25)
			}
		};
		var tradeRouteAlertIconConfig = {
			africa: {
				x: (gameUnit * 4.75),
				y: (gameUnit * 8.25)
			},
			asia: {
				x: (gameUnit * 7.25),
				y: (gameUnit * 6)
			},
			europe: {
				x: (gameUnit * 4.75),
				y: (gameUnit * 6.25)
			},
			middleEast: {
				x: (gameUnit * 6),
				y: (gameUnit * 6.5)
			},
			// northPacific: {
			// 	x: (gameUnit * 8),
			// 	y: (gameUnit * 6.5)
			// },
			southPacific: {
				x: (gameUnit * 7.75),
				y: (gameUnit * 8.5)
			},
			southAmerica: {
				x: (gameUnit * 2.75),
				y: (gameUnit * 8.5)
			}
		};

		var starsConfig = {
			tractor: {
				basic: {
					img: 'starsThree',
					frames: 3,
					x: (gameW/2) - (((gameUnit * 0.55) * 3)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.55) * 3),
					height: ((gameUnit * 0.55) * 3) * 0.2 
				},
				medium: {
					img: 'starsFour',
					frames: 4,
					x: (gameW/2) - (((gameUnit * 0.55) * 4)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.555) * 4),
					height: ((gameUnit * 0.555) * 4) * 0.147
				},
				heavy: {
					img: 'starsFive',
					frames: 5,
					x: (gameW/2) - (((gameUnit * 0.56) * 5)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.56) * 5),
					height: ((gameUnit * 0.56) * 5) * 0.116
				}
			},
			skidsteer: {
				basic: {
					img: 'starsFour',
					frames: 4,
					x: (gameW/2) - (((gameUnit * 0.55) * 4)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.555) * 4),
					height: ((gameUnit * 0.555) * 4) * 0.147
				},
				medium: {
					img: 'starsFive',
					frames: 5,
					x: (gameW/2) - (((gameUnit * 0.56) * 5)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.56) * 5),
					height: ((gameUnit * 0.56) * 5) * 0.116
				},
				heavy: {
					img: 'starsSix',
					frames: 6,
					x: (gameW/2) - (((gameUnit * 0.565) * 6)/2),
					y: (gameUnit * 13.25),
					width: ((gameUnit * 0.565) * 6),
					height: ((gameUnit * 0.565) * 6) * 0.094
					// img: 'starsSeven',
					// x: (gameW/2) - (((gameUnit * 0.57) * 7)/2),
					// y: (gameUnit * 13.25),
					// width: ((gameUnit * 0.57) * 7),
					// height: ((gameUnit * 0.57) * 7) * 0.08
				}
			}
		};
		var machineEditBackgrounds = {
			tractor: {
				basic: 'tractorBasicBg',
				medium: 'tractorMediumBg',
				heavy: 'tractorHeavyBg'
			},
			skidsteer: {
				basic: 'skidsteerBasicBg',
				medium: 'skidsteerMediumBg',
				heavy: 'skidsteerHeavyBg'
			}
		};
		var machinePieceSpriteConfig = {
			tractor: {
				basic: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorBasicEngine',
						x: (gameUnit * 0.6),
						y: (gameUnit * 5.75),
						attrs: {
							width: gameUnit * 4.8,
							height: (gameUnit * 4.8) * 1.1,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editTractorBasicTires',
						x: (gameUnit * 0.15),
						y: (gameUnit * 6.35),
						attrs: {
							width: gameUnit * 8.7,
							height: (gameUnit * 8.7) * 0.64,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorBasicCab',
						x: (gameUnit * 3.9),
						y: (gameUnit * 4.85),
						attrs: {
							width: gameUnit * 3.05,
							height: (gameUnit * 3.05) * 1.47,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				medium: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorMediumEngine',
						x: (gameUnit * 1),
						y: (gameUnit * 6.5),
						attrs: {
							width: gameUnit * 4,
							height: (gameUnit * 4) * 1.04,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editTractorMediumTires',
						x: (gameUnit * 0.35),
						y: (gameUnit * 4.9),
						attrs: {
							width: gameUnit * 8.1,
							height: (gameUnit * 8.1) * 0.89,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorMediumCab',
						x: (gameUnit * 3.68),
						y: (gameUnit * 3.4),
						attrs: {
							width: gameUnit * 2.33,
							height: (gameUnit * 2.33) * 2.13,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				heavy: {
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editTractorHeavyEngine',
						x: (gameUnit * 0.5),
						y: (gameUnit * 5.55),
						attrs: {
							width: gameUnit * 4.66,
							height: (gameUnit * 4.66) * 1.04,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					},
					tracks: {
						type: 'sprite',
						name: 'tracks',
						img: 'editTractorHeavyTracks',
						x: (gameUnit * 0.35),
						y: (gameUnit * 7.4),
						attrs: {
							width: gameUnit * 8.5,
							height: (gameUnit * 8.5) * 0.57,
							frame: 0
						},
						// input: gameLogic.input.tracksSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editTractorHeavyCab',
						x: (gameUnit * 2.8),
						y: (gameUnit * 3.2),
						attrs: {
							width: gameUnit * 4.75,
							height: (gameUnit * 4.75) * 1.31,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				}
			},
			skidsteer: {
				basic: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerBasicBucket',
						x: (gameUnit * 2),
						y: (gameUnit * 8.1),
						attrs: {
							width: gameUnit * 6,
							height: (gameUnit * 6) * 0.7,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editSkidsteerBasicTires',
						x: (gameUnit * 1.6),
						y: (gameUnit * 8.4),
						attrs: {
							width: gameUnit * 4.5,
							height: (gameUnit * 4.5) * 0.64,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerBasicCab',
						x: (gameUnit * 2.28),
						y: (gameUnit * 5.64),
						attrs: {
							width: gameUnit * 3.25,
							height: (gameUnit * 3.25) * 1.09,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				medium: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerMediumBucket',
						x: (gameUnit * 2.9),
						y: (gameUnit * 8.35),
						attrs: {
							width: gameUnit * 5.2,
							height: (gameUnit * 5.2) * 0.93,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tires: {
						type: 'sprite',
						name: 'tires',
						img: 'editSkidsteerMediumTires',
						x: (gameUnit * 1.73),
						y: (gameUnit * 8.55),
						attrs: {
							width: gameUnit * 2.25,
							height: (gameUnit * 2.25) * 1.1,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerMediumCab',
						x: (gameUnit * 2.125),
						y: (gameUnit * 5.62),
						attrs: {
							width: gameUnit * 4,
							height: (gameUnit * 4) * 0.91,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					}
				},
				heavy: {
					bucket: {
						type: 'sprite',
						name: 'bucket',
						img: 'editSkidsteerHeavyBucket',
						x: (gameUnit * 1.6),
						y: (gameUnit * 4.05),
						attrs: {
							width: gameUnit * 7.1,
							height: (gameUnit * 7.1) * 0.98,
							frame: 0
						},
						// input: gameLogic.input.bucketSprite
					},
					tracks: {
						type: 'sprite',
						name: 'tracks',
						img: 'editSkidsteerHeavyTracks',
						x: (gameUnit * 0.55),
						y: (gameUnit * 8.25),
						attrs: {
							width: gameUnit * 6.75,
							height: (gameUnit * 6.75) * 0.53,
							frame: 0
						},
						// input: gameLogic.input.tiresSprite
					},
					transmission: {
						type: 'sprite',
						name: 'transmission',
						img: 'editSkidsteerHeavyCab',
						x: (gameUnit * 1.69),
						y: (gameUnit * 6.73),
						attrs: {
							width: gameUnit * 4.5,
							height: (gameUnit * 4.5) * 0.69,
							frame: 0
						},
						// input: gameLogic.input.transmissionSprite
					},
					engine: {
						type: 'sprite',
						name: 'engine',
						img: 'editSkidsteerHeavyEngine',
						x: (gameUnit * 4.05),
						y: (gameUnit * 9.15),
						attrs: {
							width: gameUnit * 2.35,
							height: (gameUnit * 2.35) * 0.69,
							frame: 0
						},
						// input: gameLogic.input.engineSprite
					}
				}
			}
		};

		var dynamicViews = {
			// tutorial guy
			tutorialGuy: {
				type: 'group',
				name: 'tutorialGuy',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: (gameUnit * 1.66),
						y: (gameUnit * 2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white,
							'text-align': 'center'
						},
						position: {
							centerX: true
						}
					},
					submenuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					submenuText: {
						type: 'text',
						name: 'submenuText',
						text: 'DISMISS',
						x: 0,
						y: gameUnit * 13.25,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					dismissButton: {
						type: 'sprite',
						name: 'dismissButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34,
							alpha: 0
						},
						input: gameLogic.input.dismissTutorial
					}
				}
			},
			// manual
			manualPage: {
				type: 'group',
				name: 'manualPage',
				offsetY: (gameUnit * 2),
				views: {
					bg: {
						type: 'sprite',
						name: 'pageBg',
						img: 'manualPage',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					title: {
						type: 'text',
						name: 'title',
						text: '',
						x: (gameUnit * 2),
						y: (gameUnit * 0.5),
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.black,
							'text-align': 'center'
						},
						position: {
							// centerX: true
						}
					},
					subtitle: {
						type: 'text',
						name: 'subtitle',
						text: '',
						x: (gameUnit * 2),
						y: (gameUnit * 2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black,
							'text-align': 'center'
						},
						position: {
							// centerX: true
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'invisButton',
						img: 'blockWhite',
						x: gameW - (gameUnit * 2),
						y: gameH - (gameUnit * 4.5),
						attrs: {
							width: gameUnit * 2,
							height: gameUnit * 2,
							alpha: 0
						},
						input: gameLogic.input.manualPageForward
					},
					backPage: {
						type: 'sprite',
						name: 'backPage',
						img: 'buttonBack',
						x: gameW - (gameUnit * 5),
						y: gameH - (gameUnit * 4.5),
						attrs: {
							width: controlButtons.width,
							height: controlButtons.height,
							visible: false
						},
						input: gameLogic.input.manualPageBackward
					}
				}
			},
			manualPageText: {
				type: 'text',
				name: 'pageText',
				text: '',
				x: gameUnit * 2,
				y: 0,
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: palette.black
				}
			},
			manualPageImage: {
				type: 'sprite',
				name: 'pageImage',
				img: '',
				x: 0,
				y: 0,
				attrs: {
				    width: 0,
			        height: 0
				}
			},
			manualPageNumber: {
				type: 'text',
				name: 'pageNumber',
				text: '',
				x: gameUnit * 2,
				y: gameH - (gameUnit * 3.5),
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: palette.black
				}
			},
			// global
			notification: {
				type: 'group',
				name: 'notification',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: 'blockWhite',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH,
							alpha: 0.3
						}
					},
					person: {
						type: 'sprite',
						name: 'person',
						img: '',
						x: 0,
						y: -(gameUnit * 1),
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					title: {
						type: 'text',
						name: 'title',
						text: '',
						x: gameUnit * 0,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						}
					}
				}
			},
			// brief
			missionBrief: {
				type: 'group',
				name: 'missionBrief',
				views: {
					briefBg: {
						type: 'sprite',
						name: 'briefBg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					goalsText: {
						type: 'sprite',
						name: 'goalsTextImg',
						img: 'goalsText',
						x: 0,
						y: gameUnit * 2,
						attrs: {
							width: gameW,
							height: gameW * 0.25
						}
					}
				}
			},
			wiper: {
				type: 'group',
				name: 'wiper',
				views: {
					// windshieldWiperMask: {
					// 	type: 'sprite',
					// 	name: 'windshieldWiperMask',
					// 	img: 'windshieldWiperMask',
					// 	x: (gameW/2),
					// 	y: gameUnit * 0.4,
					// 	attrs: {
					// 		width: gameW,
					// 		height: (gameUnit * 1.15) * 11,
					// 		angle: 75
					// 	}
					// },
					windshieldWiper: {
						type: 'sprite',
						name: 'windshieldWiper',
						img: 'windshieldWiper',
						x: (gameW/2),
						y: gameUnit * 0.4,
						attrs: {
							width: gameUnit * 1.15,
							height: (gameUnit * 1.15) * 11,
							angle: 65
						}
					},
					windowFrame: {
						type: 'sprite',
						name: 'windowFrame',
						img: 'windowFrame',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					}
				}
			},
			goalText: {
				type: 'text',
				name: 'goal',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 1.5),
				x: (gameUnit * 0.5),
				y: gameUnit * 5,
				style: {
				    font: (fontSizes.md + 'px Trebuchet MS'),
			        fill: palette.white,
					'text-align': 'center'
				},
				position: {
					centerX: true
				}
			},
			// world
			endTurnPrompt: {
				type: 'group',
				name: 'endTurnPrompt',
				views: {
					bg: {
						type: 'sprite',
						name: 'bg',
						img: 'endTurnPrompt',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					}
				}
			},
			buildingPins: {
				type: 'group',
				name: 'buildingPins',
				views: {
				}
			},
			buildingPin: {
				type: 'group',
				name: 'buildingPin',
				views: {
					pin: {
						type: 'sprite',
						name: 'buildingPin',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameUnit * 0.75,
							height: (gameUnit * 0.75) * 0.75
						}
					},
					locationCount: {
						type: 'text',
						name: 'locationCount',
						text: 'x',
						x: gameUnit * 0.4,
						y: -(gameUnit * 0.2),
						style: {
						    font: (fontSizes.xs + 'px Trebuchet MS'),
					        fill: palette.white
						}
					}
				}
			},
			tradeRouteArrows: {
				type: 'group',
				name: 'tradeRouteArrows',
				views: {}
			},
			tradeRouteArrow: {
				type: 'sprite',
				name: 'tradeRouteArrow'
			},
			tradeRoutePins: {
				type: 'group',
				name: 'tradeRoutePins',
				views: {}
			},
			tradeRoutePin: {
				type: 'group',
				name: 'tradeRoutePin_',
				views: {
					pin: {
						type: 'sprite',
						name: 'pin',
						img: 'pinTradeRoute',
						x: 0,
						y: 0,
						attrs: {
							width: (gameUnit * 0.9),
							height: (gameUnit * 0.9) * 0.93
						},
						
					},
					locationCount: {
						type: 'text',
						name: 'locationCount',
						text: 'x',
						x: gameUnit * 0.6,
						y: (gameUnit * 0.25),
						style: {
						    font: (fontSizes.xs + 'px Trebuchet MS'),
					        fill: palette.black
						}
					}
					
				}
			},			// us detail
			tradeRouteAlertIcons: {
				type: 'group',
				name: 'tradeRouteAlertIcons',
				views: {}
			},
			tradeRouteAvailableIcon: {
				type: 'sprite',
				name: 'tradeRouteAvailbleIcon',
				img: 'tradeRouteIcon',
				x: 0,
				y: 0,
				attrs: {
					width: (gameUnit * 1),
					height: (gameUnit * 1) * 0.93
				},
				input: gameLogic.input.tradeRouteAvailableIcon
			},			// us detail
			tradeRoutePrompt: { 
				type: 'group',
				name: 'tradeRoutePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// us detail
			sectorBg: {
				type: 'sprite',
				name: 'sectorBg',
				img: '',
				x: 0,
				y: 0,
				attrs: {
					width: gameW,
					height: gameH
				}
			},
			usDetailGrid: {
				type: 'group',
				name: 'usDetailGrid',
				views: {}
			},
			usDetailGridItem: {
				type: 'sprite',
				name: 'usDetailGridItem',
				img: 'usDetailTiles',
				x: 0,
				y: (gameUnit * 3.5),
				attrs: {
					width: gameW/6,
					height: gameW/6,
					// width: gameUnit,
					// height: gameUnit,
					frame: 0
				}
			},
			plusSign: {
				type: 'sprite',
				name: 'plusSign',
				img: 'animatedPlusIcon',
				x: gameUnit * 0.75,
				y: 0,
				attrs: {
					width: gameUnit * 0.65,
					height: gameUnit
				},
				animation: {
					defaultAnimation: 'idle',
					animations: Animations.plusIcon
				}
			},
			dollarSign: {
				type: 'sprite',
				name: 'dollarSign',
				img: 'animatedDollarIcon',
				x: gameUnit * 0.75,
				y: 0,
				attrs: {
					width: gameUnit * 0.65,
					height: gameUnit
				},
				animation: {
					defaultAnimation: 'idle',
					animations: Animations.dollarIcon
				}
			},
			buildingCreatePrompt: {
				type: 'group',
				name: 'buildingCreatePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: 0,
						y: gameUnit * 13.5,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3
						},
						position: {
							centerX: true
						}
					}
				}
			},
			dealerPrompt: { 
				type: 'group',
				name: 'dealerPrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: 'DEALER\nREPRESENTATIVE',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// building edit
			buildingEditScreen: {
				type: 'group',
				name: 'editDetails',
				views: {
					// bg
					bg: {
						type: 'sprite',
						name: 'background',
						img: 'plantDetailBg',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH,
							fixedToCamera: true
						}
					},
					name: {
						type: 'text',
						name: 'buildingName',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 3.5,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					status: {
						type: 'text',
						name: 'buildingStatus',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 6,
						style: {
							font: (fontSizes.md + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					}
				}
			},
			buildingEditDetails: {
				plant: {
					bg: {
						img: 'plantDetailBg'
					},
					equipment: {
						type: 'text',
						name: 'equipment',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 7.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					inventory: {
						type: 'text',
						name: 'inventory',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 9.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					dealers: {
						type: 'text',
						name: 'dealers',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 11.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					}
				},
				dealer: {
					bg: {
						img: 'dealerDetailBg'
					},
					plantMachine: {
						type: 'text',
						name: 'plantMachine',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 8,
						style: {
							font: (fontSizes.md + 'px Trebuchet MS'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					resell: {
						type: 'text',
						name: 'resell',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 9.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					},
					sales: {
						type: 'text',
						name: 'sales',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 11.75,
						style: {
							font: (fontSizes.lg + 'px Trebuchet MS'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					}
				}
			},
			// machine list
			machineList: {
				type: 'group',
				name: 'machineList',
				views: {}
			},	
			machineIcon: {
				type: 'group',
				name: 'machineIcon',
				offsetY: (gameUnit * 1.5),
				offsetX: (gameUnit * 0.25),
				iconW: (gameUnit * 4),
				iconH: (gameUnit * 4),
				width: (gameW/2),
				views: {
					bg: {
						type: 'sprite',
						name: 'machineIconBg',
						img: '',
						x: 0,
						y: (gameUnit * 0.25),
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 3.5)
						}
					},
					name: {
						type: 'text',
						name: 'name',
						text: '',
						x: (gameUnit * 0.66),
						y: gameUnit * 3.25,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.lightRed,
							'text-align': 'center'
						}
					},
					cost: {
						type: 'text',
						name: 'machineCost',
						text: '',
						x: gameUnit * 0,
						y: gameUnit * 0.85,
						style: {
						    font: (fontSizes.xxs + 'px Trebuchet MS'),
					        fill: palette.black
						},
						attrs: {
							angle: -45
						}
					},
					available: {
						type: 'text',
						name: 'available',
						text: '',
						x: gameUnit * 3.5,
						y: (gameUnit * 0.2),
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						},
						attrs: {
							angle: 45
						}
					},
					alert: {
						type: 'sprite',
						name: 'alert',
						img: 'exclamationAlert',
						x: (gameUnit * 3.25),
						y: 0,
						attrs: {
							width: gameUnit * 0.75,
							height: gameUnit * 0.75,
							visible: false
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'machineIconInvisButton',
						img: 'blockClear',
						machineIdx: '',
						x: 0,
						y: 0,
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 4)
						},
						input: gameLogic.input.editMachine
					}
				}
			},
			emptyIcon: {
				type: 'group',
				name: 'emptyIcon',
				offsetY: (gameUnit * 1.5),
				offsetX: (gameUnit * 0.5),
				iconW: (gameUnit * 4),
				iconH: (gameUnit * 4),
				views: {
					bg: {
						type: 'button',
						name: 'emptyIcon',
						img: 'emptyIcon',
						x: 0,
						y: (gameUnit * 0.25),
						attrs: {
							width: (gameUnit * 4),
							height: (gameUnit * 3.5)
						},
						callback: gameLogic.buttonCallbacks.addEquipment,
						context: this,
						frames: [0]
					}
				}
			},
			// machine edit
			machineEdit: {
				type: 'group',
				name: 'machineEdit',
				views: {
					bg: {
						type: 'sprite',
						name: 'editorBg',
						img: '',
						x: 0,
						y: gameUnit * 0.15,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					// optionalPartsPlus: {
					// 	type: 'sprite',
					// 	name: 'optionalPartsPlus',
					// 	img: 'optionalPartsPlus',
					// 	x: gameUnit * 0.1,
					// 	y: gameUnit * 5,
					// 	attrs: {
					// 		width: gameUnit * 1.5,
					// 		height: gameUnit * 1.5
					// 	},
					// 	input: gameLogic.input.openOptionalPartsMenu
					// },
					machinePieceSprites: {
						type: 'group',
						name: 'machinePieceSprites',
						views: {
							
						}
					},
					stars: {
						type: 'sprite',
						name: 'stars',
						img: '',
						x: -1,
						y: -1,
						attrs: {
							width: -1,
							height: -1
						}
					},
					machinePieceMenuNavigator: {
						type: 'group',
						name: 'machinePieceMenuNavigator',
						views: {
							partsNavigator: {
								type: 'sprite',
								name: 'partsNavigator',
								img: 'partsNavigator',
								x: (gameW/2) - ((gameUnit * 8)/2),
								y: (gameUnit * 1.6),
								attrs: {
									width: (gameUnit * 8),
									height: (gameUnit * 8) * 0.3
								}
							},
							title: {
								type: 'text',
								name: 'partName',
								text: 'Choose Part Type',
								x: gameUnit * 3,
								y: gameUnit * 1.75,
								style: {
								    font: (fontSizes.sm + 'px Trebuchet MS'),
							        fill: palette.orange3
								},
								position: {
									centerX: true
								}
							},
							forward: {
								type: 'sprite',
								name: 'forward',
								img: 'blockWhite',
								x: (gameW/2) + gameUnit * 2,
								y: gameUnit * 1.5,
								attrs: {
									width: gameUnit * 1,
									height: gameUnit * 1,
									alpha: 0
								},
								input: gameLogic.input.machinePieceForwardIcon
							},
							backward: {
								type: 'sprite',
								name: 'backward',
								img: 'blockWhite',
								x: (gameW/2) - gameUnit * 3,
								y: gameUnit * 1.5,
								attrs: {
									width: gameUnit * 1,
									height: gameUnit * 1,
									alpha: 0
								},
								input: gameLogic.input.machinePieceBackwardIcon
							}
						}
					},
					machinePieceName: {
						type: 'group',
						name: 'machinePieceName',
						views: {
						}
					},
					// parts group
					partsMenu: {
						type: 'group',
						name: 'partsMenu',
						attrs: {
							visible: false
						},
						views: {
							menuBg: {
								type: 'sprite',
								name: 'menuBg',
								img: 'partsFrame',
								x: 0,
								y: 0,
								attrs: {
									width: gameW,
									height: gameH
								}
							}
						}
						
					}
				}
			},
			stars: {
				type: 'sprite',
				name: 'stars',
				img: '',
				x: -1,
				y: -1,
				attrs: {
					width: -1,
					height: -1
				}
			},
			machinePieceMenuItem: {
				type: 'group',
				name: 'machinePieceMenuItem',
				x: (gameW/2) - (gameUnit * 2.5),
				y: gameUnit * 2.5,
				attrs: {
					width: gameUnit * 5,
					height: gameUnit * 1.5
				},
				views: {
					name: {
						type: 'text',
						name: 'partName',
						text: '',
						x: gameUnit * 3,
						y: gameUnit * 2.75,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.orange3
						},
						position: {
							centerX: true
						}
					},
					button: {
						type: 'sprite',
						name: 'partButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: gameUnit * 2.5,
						attrs: {
							width: gameUnit * 6,
							height: gameUnit * 1,
							alpha: 0
						},
						input: gameLogic.input.openPartsMenu
					}
				}
			},
			partIcons: {
				type: 'group',
				name: '',
				attrs: {
					visible: false
				},
				views: {
					items: {
						type: 'group',
						name: 'itemsGroup',
						views: {}
					}
				}
			},
			partIcon: {
				type: 'group',
				name: 'partIcon',
				offset: (gameUnit * 3.7),
				iconH: (gameUnit * 3.4),
				views: {
					bg: {
						type: 'sprite',
						name: 'menuItemBg',
						img: 'blockWhite',
						x: gameUnit * 0.85,
						y: 0.25,
						attrs: {
							width: (gameUnit * 3),
							height: (gameUnit * 2.5),
							alpha: 0.1
						}
					},
					icon: {
						type: 'sprite',
						name: 'menuItemIcon',
						img: '',
						x: -(gameUnit * 1.25),
						y: -(gameUnit * 2.5),
						attrs: {
							width: gameUnit * 7,
							height: gameUnit * 7
						}
					},
					description: {
						type: 'text',
						name: 'menuItemDescription',
						text: '',
						x: gameUnit * 5.5,
						y: gameUnit * 0.75,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: gameUnit * 5.5,
						y: gameUnit * 1.25,
						style: {
						    font: (fontSizes.md + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'menuItemInvisBtn',
						img: 'blockClear',
						partId: -1,
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameW - gameUnit,
							height: (gameUnit * 3)
						}
					}
					
				}
			},
			wholesalePartIcon: {
				type: 'group',
				name: 'partIcon',
				offset: (gameUnit * 3.7),
				iconH: (gameUnit * 3.4),
				views: {
					bg: {
						type: 'sprite',
						name: 'menuItemBg',
						img: 'blockWhite',
						x: gameUnit * 0.85,
						y: 0.25,
						attrs: {
							width: (gameUnit * 3),
							height: (gameUnit * 2.5),
							alpha: 0.1
						}
					},
					icon: {
						type: 'sprite',
						name: 'menuItemIcon',
						img: '',
						x: -(gameUnit * 1.25),
						y: -(gameUnit * 2.5),
						attrs: {
							width: gameUnit * 7,
							height: gameUnit * 7
						}
					},
					description: {
						type: 'text',
						name: 'menuItemDescription',
						text: '',
						x: gameUnit * 5.33,
						y: gameUnit * 0.75,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					available: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: gameUnit * 5.33,
						y: gameUnit * 1.25,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.black
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'menuItemInvisBtn',
						img: 'blockClear',
						partId: -1,
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameW - gameUnit,
							height: (gameUnit * 3)
						}
					}
					
				}
			},
			optionalPartsMenu: {
			},
			supplierNotification: {
				type: 'group',
				name: 'supplierNotification',
				views: {
					bg: {
						type: 'sprite',
						name: 'supplierBg',
						img: '',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						}
					},
					content: {
						type: 'text',
						name: 'content',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.white
						}
					},
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					menuTitle: {
						type: 'text',
						name: 'menuTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			discardMachinePrompt: { 
				type: 'group',
				name: 'discardMachinePrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: 'DISCARD\nCHANGES?',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					}
				}
			},
			wholesalePartPrompt: {
				type: 'group',
				name: 'wholesalePartPrompt',
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'submenuBg',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					title: {
						type: 'text',
						name: 'menuItemTitle',
						text: '',
						x: 0,
						y: gameUnit * 13,
						style: {
						    font: (fontSizes.sm + 'px Trebuchet MS'),
					        fill: palette.orange3,
							align: 'center'
						},
						position: {
							centerX: true
						}
					},
					invisButton: {
						type: 'sprite',
						name: 'invisButton',
						img: 'blockWhite',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34,
							alpha: 0
						},
						input: gameLogic.input.wholesalePartPrompt
					}
				}
			},
			// bonuses
			// bonuses
			bonusesNotification: {
				type: 'group',
				name: 'bonusesNotification',
				attrs: {
					visible: false
				},
				views: {
					openedSuitcase: {
						type: 'sprite',
						name: 'openedSuitcase',
						img: 'openedSuitecase',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						},
						input: gameLogic.input.openedSuitcase
					},
					closedSuitcase: {
						type: 'sprite',
						name: 'closedSuitcase',
						img: 'closedSuitecase',
						x: 0,
						y: 0,
						attrs: {
							width: gameW,
							height: gameH
						},
						input: gameLogic.input.closedSuitcase
					}
				}
			},
			// year end
			yearSummary: {
				type: 'group',
				name: 'yearSummary',
				views: {
				}
			},
			summaryGoalText: {
				type: 'text',
				name: 'summaryGoalText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.xs + 'px Trebuchet MS'),
			        fill: ''
				}
			},
			summaryText: {
				type: 'text',
				name: 'summaryText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.md + 'px Trebuchet MS'),
			        fill: ''
				}
			},
			
		};

		var config = {
			gameEl: 'game_container',
			gameType: 'phaser',
			// assets
			assets: {
				images: {
					// generic
					blockWhite: 'img/block_white.png',
					blockClear: 'img/block_clear.png',
					// global
					gameBg: 'img/screens/metal_background.gif',
					dashboardBottom: 'img/dashboard_bottom.png',
					dashboardTop: 'img/dashboard_top.png',
					submenuBg: 'img/submenu_bg.png',
					smallEnvelopeIcon: 'img/icons/small_envelope_icon.png',
					smallTireIcon: 'img/icons/small_tire_icon.png',
					smallSuitcaseIcon: 'img/icons/small_suitcase_icon.png',
					// home
					homeBg: 'img/screens/start/start.png',
					// manual
					manualBg: 'img/screens/manual/manual_background.png',
					manualPage: 'img/screens/manual/manual_page.png',
					ssIgnition: 'img/screens/manual/ss_ignition.png',
					ssGoals: 'img/screens/manual/ss_goals.png',
					ssYearIndicators: 'img/screens/manual/ss_year_indicators.png',
					ssUsSector: 'img/screens/manual/ss_us_sector.png',
					ssGrid: 'img/screens/manual/ss_grid.png',
					ssPlant: 'img/screens/manual/ss_plant.png',
					ssPlantDetails: 'img/screens/manual/ss_plant_details.png',
					ssEmptySlot: 'img/screens/manual/ss_empty_slot.png',
					ssTractorMedium: 'img/screens/manual/ss_tractor_medium.png',
					ssPartsNavigator: 'img/screens/manual/ss_parts_navigator.png',
					ssPartsMenu: 'img/screens/manual/ss_parts_menu.png',
					ssStars: 'img/screens/manual/ss_stars.png',
					ssDealerGirl: 'img/screens/manual/ss_dealer_girl.png',
					ssDashboardTop: 'img/screens/manual/ss_dashboard_top.png',
					ssYearEnd: 'img/screens/manual/ss_year_end.png',
					ssDealerEnvelope: 'img/screens/manual/ss_dealer_envelope.png',
					ssFactoryProduction: 'img/screens/manual/ss_plant_production.png',
					ssTradeRoutes: 'img/screens/manual/ss_trade_routes.png',
					// mission brief
					briefBg01: 'img/screens/brief/mission_brief01.png',
					briefBg02: 'img/screens/brief/mission_brief02.png',
					briefBg03: 'img/screens/brief/mission_brief03.png',
					briefBg04: 'img/screens/brief/mission_brief04.png',
					briefBg05: 'img/screens/brief/mission_brief05.png',
					goalsText: 'img/screens/brief/goals_text_img.png',
					windshieldWiper: 'img/screens/brief/windshield_wiper.png',
					windshieldWiperMask: 'img/screens/brief/windshield_wiper_mask.png',
					windowFrame: 'img/screens/brief/window_frame.png',
					// world
					mapOcean: 'img/screens/world/map_ocean2.png',
					mapWorld: 'img/screens/world/map_world4.png',
					mapUS: 'img/screens/world/map_us.png',
					endTurnPrompt: 'img/screens/world/end_turn_prompt.png',
					pinPlant: 'img/screens/world/pin_plant.png',
					pinDealer: 'img/screens/world/pin_dealer.png',
					pinTradeRoute: 'img/screens/world/pin_trade_route.png',
					exclamationAlert: 'img/icons/exclamation5.png',
					tradeRouteAlertIcon: 'img/icons/little_trade_route_alert.png',
					tradeRouteIcon: 'img/screens/world/trade_route_icon.png',
					tradeRouteAfrica: 'img/screens/world/trade_route_africa.png',
					tradeRouteAsia: 'img/screens/world/trade_route_asia.png',
					tradeRouteEurope: 'img/screens/world/trade_route_europe.png',
					tradeRouteMiddleEast: 'img/screens/world/trade_route_middle_east.png',
					tradeRoutePacificSouth: 'img/screens/world/trade_route_south_pacific.png',
					tradeRouteSouthAmerica: 'img/screens/world/trade_route_south_america.png',
					// us detail
					sectorGridNE: 'img/screens/us_detail/sector_grid_ne.png',
					sectorGridSE: 'img/screens/us_detail/sector_grid_se.png',
					sectorGridMW: 'img/screens/us_detail/sector_grid_mw.png',
					sectorGridNW: 'img/screens/us_detail/sector_grid_nw.png',
					sectorGridSW: 'img/screens/us_detail/sector_grid_sw.png',
					addNewPlantPrompt: 'img/screens/us_detail/add_new_plant_prompt.png',
					dealerRepresentativePrompt: 'img/screens/us_detail/dealer_representative_prompt.png',
					// building detail
					plantDetailBg: 'img/screens/building_edit/plant_detail.png',
					dealerDetailBg: 'img/screens/building_edit/dealer_detail.png',
					// equipment list
					machineListIcon: 'img/screens/equipment_list/machine_list_icon.png',
					skidsteerBasicIcon: 'img/screens/equipment_list/skidsteer_basic_icon.png',
					skidsteerMediumIcon: 'img/screens/equipment_list/skidsteer_medium_icon.png',
					skidsteerHeavyIcon: 'img/screens/equipment_list/skidsteer_heavy_icon.png',
					tractorBasicIcon: 'img/screens/equipment_list/tractor_basic_icon.png',
					tractorMediumIcon: 'img/screens/equipment_list/tractor_medium_icon.png',
					tractorHeavyIcon: 'img/screens/equipment_list/tractor_heavy_icon.png',
					emptyIcon: 'img/screens/equipment_list/empty_icon2.png',
					// equipment create
					equipmentCreateBg: 'img/screens/equipment_add/equipment_add_bg.png',
					// equipment edit
					tractorBasicBg: 'img/screens/equipment_edit/tractor_basic.png',
					tractorMediumBg: 'img/screens/equipment_edit/tractor_medium.png',
					tractorHeavyBg: 'img/screens/equipment_edit/tractor_heavy.png',
					skidsteerBasicBg: 'img/screens/equipment_edit/skid_steer_basic.png',
					skidsteerMediumBg: 'img/screens/equipment_edit/skid_steer_medium.png',
					skidsteerHeavyBg: 'img/screens/equipment_edit/skid_steer_heavy.png',
					optionalPartsPlus: 'img/screens/equipment_edit/optional_parts_plus.png',
					partsNavigator: 'img/screens/equipment_edit/what_to_buy_menu.png',
					// parts icons
					// frame
					partsFrame: 'img/screens/equipment_edit/parts_frame.png',
					// engine
					engineBasicStandard: 'img/screens/equipment_edit/parts_icons/engine/basic_standard.png',
					engineBasicPremium: 'img/screens/equipment_edit/parts_icons/engine/basic_premium.png',
					engineBasicDeluxe: 'img/screens/equipment_edit/parts_icons/engine/basic_deluxe.png',
					engineMediumStandard: 'img/screens/equipment_edit/parts_icons/engine/medium_standard.png',
					engineMediumPremium: 'img/screens/equipment_edit/parts_icons/engine/medium_premium.png',
					engineMediumDeluxe: 'img/screens/equipment_edit/parts_icons/engine/medium_deluxe.png',
					engineHeavyStandard: 'img/screens/equipment_edit/parts_icons/engine/heavy_standard.png',
					engineHeavyPremium: 'img/screens/equipment_edit/parts_icons/engine/heavy_premium.png',
					engineHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/engine/heavy_deluxe.png',
					// transmission
					transmissionBasicStandard: 'img/screens/equipment_edit/parts_icons/transmission/basic_standard.png',
					transmissionBasicPremium: 'img/screens/equipment_edit/parts_icons/transmission/basic_premium.png',
					transmissionBasicDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/basic_deluxe.png',
					transmissionMediumStandard: 'img/screens/equipment_edit/parts_icons/transmission/medium_standard.png',
					transmissionMediumPremium: 'img/screens/equipment_edit/parts_icons/transmission/medium_premium.png',
					transmissionMediumDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/medium_deluxe.png',
					transmissionHeavyStandard: 'img/screens/equipment_edit/parts_icons/transmission/heavy_standard.png',
					transmissionHeavyPremium: 'img/screens/equipment_edit/parts_icons/transmission/heavy_premium.png',
					transmissionHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/transmission/heavy_deluxe.png',
					// tires
					tiresBasicStandard: 'img/screens/equipment_edit/parts_icons/tires/basic_standard.png',
					tiresBasicPremium: 'img/screens/equipment_edit/parts_icons/tires/basic_premium.png',
					tiresBasicDeluxe: 'img/screens/equipment_edit/parts_icons/tires/basic_deluxe.png',
					tiresMediumStandard: 'img/screens/equipment_edit/parts_icons/tires/medium_standard.png',
					tiresMediumPremium: 'img/screens/equipment_edit/parts_icons/tires/medium_premium.png',
					tiresMediumDeluxe: 'img/screens/equipment_edit/parts_icons/tires/medium_deluxe.png',
					// tracks
					tracksHeavyStandard: 'img/screens/equipment_edit/parts_icons/tracks/heavy_standard.png',
					tracksHeavyPremium: 'img/screens/equipment_edit/parts_icons/tracks/heavy_premium.png',
					tracksHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/tracks/heavy_deluxe.png',
					// bucket
					bucketBasicStandard: 'img/screens/equipment_edit/parts_icons/bucket/basic_standard.png',
					bucketBasicPremium: 'img/screens/equipment_edit/parts_icons/bucket/basic_premium.png',
					bucketBasicDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/basic_deluxe.png',
					bucketMediumStandard: 'img/screens/equipment_edit/parts_icons/bucket/medium_standard.png',
					bucketMediumPremium: 'img/screens/equipment_edit/parts_icons/bucket/medium_premium.png',
					bucketMediumDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/medium_deluxe.png',
					bucketHeavyStandard: 'img/screens/equipment_edit/parts_icons/bucket/heavy_standard.png',
					bucketHeavyPremium: 'img/screens/equipment_edit/parts_icons/bucket/heavy_premium.png',
					bucketHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/bucket/heavy_deluxe.png',
					// headlights
					headlightsMediumStandard: 'img/screens/equipment_edit/parts_icons/headlights/medium_standard.png',
					headlightsMediumPremium: 'img/screens/equipment_edit/parts_icons/headlights/medium_premium.png',
					headlightsMediumDeluxe: 'img/screens/equipment_edit/parts_icons/headlights/medium_deluxe.png',
					headlightsHeavyStandard: 'img/screens/equipment_edit/parts_icons/headlights/heavy_standard.png',
					headlightsHeavyPremium: 'img/screens/equipment_edit/parts_icons/headlights/heavy_premium.png',
					headlightsHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/headlights/heavy_deluxe.png',
					// threePointHitch
					threePointHitchHeavyStandard: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_standard.png',
					threePointHitchHeavyPremium: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_premium.png',
					threePointHitchHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/threePointHitch/heavy_deluxe.png',
					// powerTakeoff
					powerTakeoffHeavyStandard: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_standard.png',
					powerTakeoffHeavyPremium: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_premium.png',
					powerTakeoffHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/powerTakeoff/heavy_deluxe.png',
					// quickCoupler
					quickCouplerMediumStandard: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_standard.png',
					quickCouplerMediumPremium: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_premium.png',
					quickCouplerMediumDeluxe: 'img/screens/equipment_edit/parts_icons/quickCoupler/medium_deluxe.png',
					quickCouplerHeavyStandard: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_standard.png',
					quickCouplerHeavyPremium: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_premium.png',
					quickCouplerHeavyDeluxe: 'img/screens/equipment_edit/parts_icons/quickCoupler/heavy_deluxe.png',
					// heater
					heaterStandard: 'img/screens/equipment_edit/parts_icons/heater/standard.png',
					heaterPremium: 'img/screens/equipment_edit/parts_icons/heater/premium.png',
					heaterDeluxe: 'img/screens/equipment_edit/parts_icons/heater/deluxe.png',
					// extras
					flameDecal: 'img/screens/equipment_edit/parts_icons/extras/flame_decal.png',
					autoPilot: 'img/screens/equipment_edit/parts_icons/extras/auto_pilot.png',
					stainlessExhaust: 'img/screens/equipment_edit/parts_icons/extras/stainless_exhaust.png',
					gps: 'img/screens/equipment_edit/parts_icons/extras/gps.png',

					// NOTIFICATIONS
					tutorialGuy: 'img/notifications/tutorial_guy.png',
					dealerGirl: 'img/notifications/dealer_girl.png',
					supplierGuy: 'img/notifications/supplier_guy.png',
					tradeRouteAfricaNotification: 'img/notifications/trade_route_africa.png',
					tradeRouteAsiaNotification: 'img/notifications/trade_route_asia.png',
					tradeRouteEuropeNotification: 'img/notifications/trade_route_europe.png',
					tradeRouteMiddleEastNotification: 'img/notifications/trade_route_middle_east.png',
					tradeRouteSouthPacificNotification: 'img/notifications/trade_route_south_pacific.png',
					tradeRouteSouthAmericaNotification: 'img/notifications/trade_route_south_america.png',

					// BONUSES
					closedSuitcase: 'img/closed_suitcase.png',
					openedSuitcase: 'img/opened_suitcase.png',
					bonusPoof: 'img/bonus_poof.png',
					
					// TURN END
					turnEnd01: 'img/screens/turn_end/turn_end01.png',
					turnEnd02: 'img/screens/turn_end/turn_end02.png'
				},
				sprites: {
					buttonManual: {
						url: 'img/icons/settings.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonShare: {
						url: 'img/icons/share.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonCancel: {
						url: 'img/icons/cancel.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonConfirm: {
						url: 'img/icons/confirm.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonBack: {
						url: 'img/icons/back.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonUndo: {
						url: 'img/icons/undo.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonEquipment: {
						url: 'img/icons/equipment.png',
						width: 175,
						height: 150,
						frames: 2
					},
					// buttonEquipmentAdd: {
					// 	url: 'img/icons/equipment_add.png',
					// 	width: 175,
					// 	height: 150,
					// 	frames: 2
					// },
					buttonInventory: {
						url: 'img/icons/inventory.png',
						width: 175,
						height: 150,
						frames: 2
					},
					ignitionKey: {
						url: 'img/screens/start/key_spritesheet.png',
						width: 320,
						height: 573,
						frames: 3
					},
					buttonHome: {
						url: 'img/icons/home.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonPlus: {
						url: 'img/icons/plus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonMinus: {
						url: 'img/icons/minus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					turnIndicators: {
						url: 'img/turn_spritesheet.png',
						width: 300,
						height: 100,
						frames: 10
					},
					usDetailTiles: {
						url: 'img/screens/us_detail/us_detail_grid_icon.png',
						width: 110,
						height: 110,
						frames: 5
					},
					animatedDollarIcon: {
						url: 'img/screens/us_detail/animated_dollar_sign_white.png',
						width: 65,
						height: 100,
						frames: 6
					},
					animatedPlusIcon: {
						url: 'img/screens/us_detail/animated_plus_sign.png',
						width: 65,
						height: 100,
						frames: 6
					},
					// equipment create 
					createTractorBasic: {
						url: 'img/screens/equipment_add/tractor_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerBasic: {
						url: 'img/screens/equipment_add/skid_steer_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorMedium: {
						url: 'img/screens/equipment_add/tractor_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerMedium: {
						url: 'img/screens/equipment_add/skid_steer_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorHeavy: {
						url: 'img/screens/equipment_add/tractor_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerHeavy: {
						url: 'img/screens/equipment_add/skid_steer_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
 					// equipment edit
					starsThree: {
						url: 'img/screens/equipment_edit/stars/stars_three_spritesheet.png', 
						width: 126,
						height: 26,
						frames: 4
					},
					starsFour: {
						url: 'img/screens/equipment_edit/stars/stars_four_spritesheet.png', 
						width: 176,
						height: 26,
						frames: 5
					},
					starsFive: {
						url: 'img/screens/equipment_edit/stars/stars_five_spritesheet.png', 
						width: 224,
						height: 26,
						frames: 6
					},
					starsSix: {
						url: 'img/screens/equipment_edit/stars/stars_six_spritesheet.png', 
						width: 274,
						height: 26,
						frames: 7
					},
					starsSeven: {
						url: 'img/screens/equipment_edit/stars/stars_seven_spritesheet.png', 
						width: 323,
						height: 26,
						frames: 8
					},
					// tractor basic
					editTractorBasicCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_cab_spritesheet.png',
						width: 105,
						height: 154,
						frames: 2
					},
					editTractorBasicEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_engine_spritesheet.png',
						width: 167,
						height: 189,
						frames: 2
					},
					editTractorBasicTires: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_tires_spritesheet.png',
						width: 308,
						height: 196,
						frames: 2
					},
					// tractor medium
					editTractorMediumCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_cab_spritesheet.png',
						width: 83,
						height: 177,
						frames: 2
					},
					editTractorMediumEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_engine_spritesheet.png',
						width: 143,
						height: 149,
						frames: 2
					},
					editTractorMediumTransmission: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_transmission_spritesheet.png',
						width: 26,
						height: 83,
						frames: 2
					},
					editTractorMediumTires: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_tires_spritesheet.png',
						width: 288,
						height: 255,
						frames: 2
					},
					// tractor heavy
					editTractorHeavyCab: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_cab_spritesheet.png',
						width: 166,
						height: 222,
						frames: 2
					},
					editTractorHeavyEngine: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_engine_spritesheet.png',
						width: 165,
						height: 172,
						frames: 2
					},
					editTractorHeavyTransmission: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_transmission_spritesheet.png',
						width: 43,
						height: 155,
						frames: 2
					},
					editTractorHeavyTracks: {
						url: 'img/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_tracks_spritesheet.png',
						width: 300,
						height: 170,
						frames: 2
					},
					// skidsteer basic
					editSkidsteerBasicCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_cab_spritesheet.png',
						width: 115,
						height: 126,
						frames: 2
					},
					editSkidsteerBasicBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_bucket_spritesheet.png',
						width: 207,
						height: 145,
						frames: 2
					},
					editSkidsteerBasicTires: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_tires_spritesheet.png',
						width: 159,
						height: 101,
						frames: 2
					},
					// // skidsteer medium
					editSkidsteerMediumCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_cab_spritesheet.png',
						width: 142,
						height: 129,
						frames: 2
					},
					editSkidsteerMediumBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_bucket_spritesheet.png',
						width: 179,
						height: 167,
						frames: 2
					},
					editSkidsteerMediumTires: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_tires_spritesheet.png',
						width: 78,
						height: 86,
						frames: 2
					},
					// skidsteer heavy
					editSkidsteerHeavyCab: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_cab_spritesheet.png',
						width: 156,
						height: 108,
						frames: 2
					},
					editSkidsteerHeavyEngine: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_engine_spritesheet.png',
						width: 83,
						height: 57,
						frames: 2
					},
					editSkidsteerHeavyBucket: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_bucket_spritesheet.png',
						width: 249,
						height: 244,
						frames: 2
					},
					editSkidsteerHeavyTracks: {
						url: 'img/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_tracks_spritesheet.png',
						width: 239,
						height: 127,
						frames: 2
					}
				}
			},
			stage: {
				fullScreen: true,
				scaleMode: Phaser.ScaleManager.SHOW_ALL
			},
			attrs: {
				firstPlay: false,
				turnActive: false,
				turnTime: TIME_PER_TURN,
				turnCompleted: false,
				levelPassed: false,
				activeSector: -1,
				activeTile: null,
				activeFactor: null,
				activeMachine: null,
				activeMachineId: -1,
				activePartType: '',
				newMachine: false,
				bank: 1000000
			},
			palette: palette,
			defaultScreen: 'home',
			notificationText: notificationText,
			goalsText: {
				passed: 'All goals met.\nCongratulations.',
				failed: 'Goals not met.\nPlease try again.',
				types: {
					profit: 'Profits: ',
					newPlants: 'Plants built: ',
					newDealers: 'Dealers established: ',
					newSuppliers: 'Partnered Suppliers: ',
					newTradeRoutes: 'Trade Routes established: ',
					newMachineModels: 'Machine models created: ',
					newMachines: 'Machines built: ',
					machinesSold: 'Machines sold: '
				}
			},
			bonusesText: {
				newPlant: 'New Plant built created 1000 jobs',
				newDealer: 'New Dealer established',
				newSupplier: 'New Supplier relationship',
				newTradeRoutes: 'New Trade Route established',
				machineManufacturing: '~{machines}~ Machines built'
			},
			machineIcons: {
				tractor: {
					basic: 'tractorBasicIcon',
					medium: 'tractorMediumIcon',
					heavy: 'tractorHeavyIcon'
				},
				skidsteer: {
					basic: 'skidsteerBasicIcon',
					medium: 'skidsteerMediumIcon',
					heavy: 'skidsteerHeavyIcon'
				}
			},
			dynamicViews: dynamicViews,
			worldPositions: worldPositions,
			pinPositions: pinPositions,
			pinOffsets: pinOffsets,
			pinImages: pinImages,
			pinFills: pinFills,
			tradeRouteArrowConfig: tradeRouteArrowConfig,
			tradeRoutePinConfig: tradeRoutePinConfig,
			tradeRouteAlertIconConfig: tradeRouteAlertIconConfig,
			notificationPeopleImages: notificationPeopleImages,
			starsConfig: starsConfig,
			machineEditBackgrounds: machineEditBackgrounds,
			machinePieceSpriteConfig: machinePieceSpriteConfig,
			views: {
				// background
				background: {
					name: 'background',
					type: 'group',
					views: {
						gameBg: {
							name: 'gameBg',
							type: 'sprite',
							img: 'gameBg',
							x: 0,
							y: 0,
							attrs: {
								width: winW,
								height: winH,
								fixedToCamera: true
							}
						}
					}
				},
				// home
				homeScreen: {
					name: 'home',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// bg
						stateBg: {
							type: 'sprite',
							name: 'homeBg',
							img: 'homeBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							}
						},
						// ignitionKey
						ignitionKey: {
							type: 'sprite',
							name: 'ignitionKey',
							img: 'ignitionKey',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							animation: {
								defaultAnimation: 'idle',
								animations: Animations.ignitionKey
							}
						},
						// game start button
						startButton: {
							type: 'button',
							name: 'gameStartButton',
							img: 'blockWhite',
							x: (gameW/2 - (gameUnit * 2.5)),
							y: (gameUnit * 2.5),
							attrs: {
								width: (gameUnit * 5),
								height: (gameUnit * 5),
								alpha: 0
							},
							callback: gameLogic.buttonCallbacks.worldStart,
							context: this,
							frames: [0, 1, 1, 0]
						},
						// manual button
						manualButton: {
							type: 'button',
							name: 'manualbutton',
							img: 'blockClear',
							x: 0,
							y: (gameH - gameUnit * 2.5),
							attrs: {
								width: gameUnit * 2.5,
								height: gameUnit * 2.5,
								alpha: 0.75
							},
							callback: gameLogic.buttonCallbacks.manualStart,
							context: this,
							frames: [0, 1, 1, 0]
						}
					}
				},
				// manual
				manualScreen: {
					name: 'manual',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						manualBg: {
							type: 'sprite',
							name: 'manualBg',
							img: 'manualBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.manualBg
						},
						manualPages: {
							type: 'group',
							name: 'manualPages',
							views: {}
						}
					}
				},
				// brief
				briefScreen: {
					name: 'brief',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						
					}
				},
				// world
				worldScreen: {
					name: 'world',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// ocean map
						oceanMap: {
							type: 'sprite',
							name: 'oceanMap',
							img: 'mapOcean',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH,
								alpha: 0.75
							}
						},
						// world map
						worldMap: {
							type: 'sprite',
							name: 'worldMap',
							img: 'mapWorld',
							x: -(gameW * 0.805),
							y: -(gameH * 1.947),
							attrs: {
								width: gameW * 5.9,
								height: gameH * 5.85
							}
						},
						// us map
						usMap: {
							type: 'sprite',
							name: 'usMap',
							img: 'mapUS',
							x: 0,
							y: gameUnit * 6,
							attrs: {
								width: gameW,
								height: gameUnit * 5,
								fixedToCamera: true
							}
						},
						// buttons group
						buttons: {
							type: 'group',
							name: 'startStateButtons',
							attrs: {
								fixedToCamera: true
							},
							views: {
								northwestDetail: {
									type: 'button',
									name: 'northwestDetail',
									img: 'blockWhite',
									x: gameUnit * 0.2,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 3.5),
										height: (gameUnit * 2),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.northwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								southwestDetail: {
									type: 'button',
									name: 'southwestDetail',
									img: 'blockWhite',
									x: gameUnit * 0.2,
									y: (gameUnit * 8),
									attrs: {
										width: (gameUnit * 3.5),
										height: (gameUnit * 2),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.southwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								midwestDetail: {
									type: 'button',
									name: 'midwestDetail',
									img: 'blockWhite',
									x: gameUnit * 3.7,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 2),
										height: (gameUnit * 4.5),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.midwestDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								northeastDetail: {
									type: 'button',
									name: 'northeastDetail',
									img: 'blockWhite',
									x: gameUnit * 5.7,
									y: (gameUnit * 6),
									attrs: {
										width: (gameUnit * 4),
										height: (gameUnit * 2.5),
										alpha: 0
									},
									sector: USSectors.NORTH_EAST,
									callback: gameLogic.buttonCallbacks.northeastDetail,
									context: this,
									frames: [0, 0, 0, 0]
								},
								southeastDetail: {
									type: 'button',
									name: 'southeastDetail',
									img: 'blockWhite',
									x: gameUnit * 5.7,
									y: (gameUnit * 8.5),
									attrs: {
										width: (gameUnit * 2.5),
										height: (gameUnit * 2.5),
										alpha: 0
									},
									callback: gameLogic.buttonCallbacks.southeastDetail,
									context: this,
									frames: [0, 0, 0, 0]
								}
							}
						}
					}
				},
				// usDetail
				usDetailScreen: {
					name: 'usDetail',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// title
						// sectorTitle: {
						// 	type: 'text',
						// 	name: 'sectorTitle',
						// 	text: '',
						// 	x: 0,
						// 	y: gameUnit * 2,
						// 	style: {
						// 	    font: (fontSizes.lg + 'px Trebuchet MS'),
						//         fill: palette.white
						// 	},
						// 	position: {
						// 		centerX: true
						// 	}
						// }
					}
				},
				// building edit 
				buildingEditScreen: {
					name: 'buildingEdit',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
					}
				},
				// equipment list
				equipmentListScreen: {
					name: 'equipmentList',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						// buttons group
						buttons: {
							type: 'group',
							name: 'equipmentListScreenButtonGroup',
							attrs: {
								fixedToCamera: true
							},
							views: 
							// close button
							{
								closeButton: {
									type: 'button',
									name: 'closeButton',
									img: 'buttonClose',
									x: (gameW - gameUnit * 1.25),
									y: (gameUnit * 0.25),
									attrs: {
										width: gameUnit * 1,
										height: gameUnit * 1
									},
									callback: gameLogic.buttonCallbacks.equipmentListClose,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						// icons group
						// icons: {
						// 	type: 'group',
						// 	name: 'equipmentListScreenIconGroup',
						// 	attrs: {
						// 		fixedToCamera: true
						// 	},
						// 	views: 
						// 	{
						// 		tractorIcon: {
						// 			type: 'sprite',
						// 			name: 'tractor',
						// 			img: 'iconTractor',
						// 			x: gameUnit * 3,
						// 			y: gameUnit * 7,
						// 			attrs: {
						// 				width: gameUnit * 4,
						// 				height: gameUnit * 2
						// 			},
						// 			input: gameLogic.input.tractor
						// 		},
						// 		skidsteerIcon: {
						// 			type: 'sprite',
						// 			name: 'skidsteer',
						// 			img: 'iconSkidsteer',
						// 			x: gameUnit * 3,
						// 			y: gameUnit * 11,
						// 			attrs: {
						// 				width: gameUnit * 4,
						// 				height: gameUnit * 2
						// 			},
						// 			input: gameLogic.input.skidsteer
						// 		}
						// 	}
						// }
					}
				},
				// equipment create
				equipmentCreateScreen: {
					name: 'equipmentCreate',
					type: 'group',
					attrs: {
						visible: false
					},
					views: {
						bg: {
							type: 'sprite',
							name: 'createBg',
							img: 'equipmentCreateBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH - (gameUnit * 1.5)
							}
						},
						icons: {
							type: 'group',
							name: 'createIcons',
							views: {
								machineType: {
									type: 'group',
									name: 'machineType',
									views: {
										tractorBasic: {
											type: 'button',
											name: 'createTractorBasic',
											img: 'createTractorBasic',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 1.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newBasicTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										tractorMedium: {
											type: 'button',
											name: 'createTractorMedium',
											img: 'createTractorMedium',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 6,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newMediumTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										tractorHeavy: {
											type: 'button',
											name: 'createTractorHeavy',
											img: 'createTractorHeavy',
											x: gameW/2 - (gameUnit * 4.5),
											y: gameUnit * 10.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newHeavyTractor,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerBasic: {
											type: 'button',
											name: 'createSkidsteerBasic',
											img: 'createSkidsteerBasic',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 1.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newBasicSkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerMedium: {
											type: 'button',
											name: 'createSkidsteerMedium',
											img: 'createSkidsteerMedium',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 6,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newMediumSkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										},
										skidsteerHeavy: {
											type: 'button',
											name: 'createSkidsteerHeavy',
											img: 'createSkidsteerHeavy',
											x: gameW/2 + (gameUnit * 0.5),
											y: gameUnit * 10.5,
											attrs: {
												width: gameUnit * 4,
												height: gameUnit * 3
											},
											callback: gameLogic.buttonCallbacks.newHeavySkidsteer,
											context: this,
											frames: [0, 1, 1, 0]
										}
									}
								}
							}
						}
					}
				},
				// equipment edit
				equipmentEditScreen: {
					type: 'group',
					name: 'equipmentEdit',
					attrs: {
						visible: false
					},
					views: {
					}
				},
				// turn end
				turnEndScreen: {
					type: 'group',
					name: 'turnEnd',
					attrs: {
						visible: false
					},
					views: {
						openedEnvelope: {
							type: 'sprite',
							name: 'openedEnvelope',
							img: 'turnEnd02',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.openedEnvelope
						},
						closedEnvelope: {
							type: 'sprite',
							name: 'closedEnvelope',
							img: 'turnEnd01',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							},
							input: gameLogic.input.closedEnvelope
						}
					}
				},
				// global
				global: {
					type: 'group',
					name: 'global',
					attrs: {
						visible: true
					},
					views: {
						notificationIcon: {
							type: 'sprite',
							name: 'notificationIcon',
							img: 'smallEnvelopeIcon',
							x: gameUnit * 0.1,
							y: gameUnit * 1.6,
							attrs: {
								width: gameUnit * 1.5,
								height: (gameUnit * 1.5) * 0.6
							},
							input: gameLogic.input.notificationIcon
						},
						supplierNotificationIcon: {
							type: 'sprite',
							name: 'supplierNotificationIcon',
							img: 'smallTireIcon',
							x: gameUnit * 0.1,
							y: gameUnit * 12,
							attrs: {
								width: (gameUnit * 1.5),
								height: (gameUnit * 1.5)
							},
							input: gameLogic.input.supplierNotificationIcon
							
						},
						bonusNotificationIcon: {
							type: 'sprite',
							name: 'bonusNotificationIcon',
							img: 'smallSuitcaseIcon',
							x: (gameW) - gameUnit * 1.6,
							y: gameUnit * 12,
							attrs: {
								width: (gameUnit * 1.5),
								height: (gameUnit * 1.5) * 0.73
							},
							input: gameLogic.input.bonusNotificationIcon
							
						},
						tradeRouteAlertIcon: {
							type: 'sprite',
							name: 'tradeRouteAlertIcon',
							img: 'tradeRouteAlertIcon',
							x: gameW - (gameUnit * 1.35),
							y: gameUnit * 1.6,
							attrs: {
								width: gameUnit * 1.25,
								height: (gameUnit * 1.25) * 0.89
							},
							input: gameLogic.input.tradeRouteAlertIcon
						},
						notifications: {
							name: 'notifications',
							type: 'group',
							views: {}
						},
						dashboardBottom: {
							name: 'dashboardBottom',
							type: 'sprite',
							img: 'dashboardBottom',
							x: 0,
							y: gameUnit * 13.5,
							attrs: {
								width: gameW * 1,
								height: gameUnit * 2.5,
								fixedToCamera: true
							}
						},
						homeGroup: {
							type: 'group',
							name: 'homeGroup',
							views: {
								buttonManual: {
									type: 'button',
									name: 'buttonManual',
									img: 'buttonManual',
									x: controlButtons.left.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.openManual,
									context: this,
									frames: [0, 1, 1, 0]
								},
								buttonShare: {
									type: 'button',
									name: 'buttonShare',
									img: 'buttonShare',
									x: controlButtons.right.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.share,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						turnGroup: {
							type: 'group',
							name: 'turnGroup',
							attrs: {
								visible: false
							},
							views: {
								dashboardTop: {
									name: 'dashboardTop',
									type: 'sprite',
									img: 'dashboardTop',
									x: 0,
									y: 0,
									attrs: {
										width: gameW,
										height: gameUnit * 1.5,
										fixedToCamera: true
									}
								},
								timerText: {
									type: 'text',
									name: 'timerText',
									text: TIME_PER_TURN,
									style: {
									    font: (fontSizes.lg + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: 0,
									y: (gameUnit * 0.2),
									position: {
										centerX: true
									}
								},
								bankText: {
									type: 'text',
									name: 'bankText',
									text: '',
									style: {
									    font: (fontSizes.sm + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: (gameUnit * 0.8),
									y: (gameUnit * 0.5)
								},
								bonusText: {
									type: 'text',
									name: 'bonusText',
									text: '',
									style: {
									    font: (fontSizes.md + 'px Trebuchet MS'),
								        fill: palette.orange1
									},
									x: (gameUnit * 6.5),
									y: (gameUnit * 0.4)
								},
								turnIndicator: {
									type: 'sprite',
									name: 'turnIndicator',
									img: 'turnIndicators',
									x: (gameW/2) - (gameUnit * 1.2),
									y: gameUnit * 0.33,
									attrs: {
										width: gameUnit * 2.4,
										height: (gameUnit * 2.5)/3
									}
								},
								homeButton: {
									type: 'button',
									name: 'homeButton',
									img: 'buttonHome',
									x: (gameW/2) - (gameUnit * 1),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.worldReturnButton,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						plusMinusGroup: {
							type: 'group',
							name: 'plusMinusGroup',
							attrs: {
								visible: false
							},
							views: {
								plusButton: {
									type: 'button',
									name: 'plusButton',
									img: 'buttonPlus',
									x: (gameW/2) - (gameUnit * 2.5),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.plusButton,
									context: this,
									frames: [0, 1, 1, 0]
								},
								minusButton: {
									type: 'button',
									name: 'minusButton',
									img: 'buttonMinus',
									x: (gameW/2) + (gameUnit * 0.5),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 2,
										height: (gameUnit * 2) / 3
									},
									callback: gameLogic.buttonCallbacks.minusButton,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						plantDetailGroup: {
							type: 'group',
							name: 'plantDetailGroup',
							attrs: {
								visible: false
							},
							views: {
								equipmentButton: {
									type: 'button',
									name: 'equipmentButton',
									img: 'buttonEquipment',
									x: controlButtons.right.x,
									y: controlButtons.bottom.y,
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.buttonCallbacks.equipmentListStart,
									context: this,
									frames: [0, 0, 0, 0]
								}
							}
						},
						equipmentListGroup: {
							type: 'group',
							name: 'equipmentListGroup',
							attrs: {
								visible: false
							},
							views: {
								// addEquipmentButton: {
								// 	type: 'button',
								// 	name: 'buttonEquipmentAdd',
								// 	img: 'buttonEquipmentAdd',
								// 	x: (gameW/2) - (controlButtons.width/2),
								// 	y: gameH - (gameUnit * 1.66),
								// 	attrs: {
								// 		width: controlButtons.width,
								// 		height: controlButtons.height
								// 	},
								// 	callback: gameLogic.buttonCallbacks.addEquipment,
								// 	context: this,
								// 	frames: [0, 1, 1, 0]
								// }
							}
						},
						equipmentEditGroup: {
							type: 'group',
							name: 'equipmentEditGroup',
							attrs: {
								visible: false
							},
							views: {}
						},
						backButton: {
							type: 'button',
							name: 'backButton',
							img: 'buttonBack',
							x: controlButtons.left.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.backButton,
							context: this,
							frames: [0, 1, 1, 0]
						},
						confirmButton: {
							type: 'button',
							name: 'confirmButton',
							img: 'buttonConfirm',
							x: controlButtons.right.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.confirmButton,
							context: this,
							frames: [0, 1, 1, 0]
						},
						cancelButton: {
							type: 'button',
							name: 'cancelButton',
							img: 'buttonCancel',
							x: controlButtons.left.x,
							y: controlButtons.bottom.y,
							attrs: {
								width: controlButtons.width,
								height: controlButtons.height
							},
							callback: gameLogic.buttonCallbacks.cancelButton,
							context: this,
							frames: [0, 1, 1, 0]
						}
					}
				}
			},
			turnScreens: [
				'world',
				'usDetail',
				'buildingEdit',
				'equipmentList',
				'equipmentCreate',
				'equipmentEdit'
			],
			tutorial: {
				title: 'Global Trader 3.0\nCNH INDUSTRIAL',
				subtitle: 'Instructions and Strategy\nDIGITAL TRADE TOOLBOX',
				pages: [
				// 1
				{
					blurbs: [
					{
						text: 'Click on the ignition\nto start the game.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Look over the Mission Brief.\nThese are the goals you will\nneed to accomplish\nfor the year.\n\nPress the check button\nto begin the turn.',
						x: (gameUnit * 4.5),
						y: (gameUnit * 7.5)
					}
					],
					images: [
					{
						img: 'ssIgnition',
						x: (gameUnit * 6),
						y: (gameUnit * 3),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.78
					},
					{
						img: 'ssGoals',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.76
					}
					]
				},
				// 2
				{
					blurbs: [
					{
						text: 'Each level is one year.\nThe 52 weeks of the\nyear countdown the turn.\nThe yellow dots reflect\nthe current year.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Choose a sector of the US to view.',
						x: (gameUnit * 2),
						y: (gameUnit * 5)
					},
					{
						text: 'Click on the grid to build a plant.',
						x: (gameUnit * 2),
						y: (gameUnit * 7)
					},
					{
						text: 'The plant completes\nconstruction in 3 weeks.\nIt is then active.\nYou can start making\nequipment.',
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssYearIndicators',
						x: (gameUnit * 6),
						y: (gameUnit * 3),
						width: (gameUnit * 1.5),
						height: (gameUnit * 1.5) * 0.54
					},
					{
						img: 'ssUsSector',
						x: (gameUnit * 2),
						y: (gameUnit * 5.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.65
					},
					{
						img: 'ssGrid',
						x: (gameUnit * 2),
						y: (gameUnit * 7.8),
						width: (gameUnit * 2),
						height: (gameUnit * 2)
					},
					{
						img: 'ssPlant',
						x: (gameUnit * 6),
						y: (gameUnit * 10),
						width: (gameUnit * 1),
						height: (gameUnit * 1) * 0.96
					}
					]
				},
				// 3
				{
					blurbs: [
					{
						text: 'Click on the active plant\nto see its details.\nThe wrench takes\nyou to a list of the\nplant\'s\nTractor and\nSkid Steer models.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Click an empty slot\nto add a new model.',
						x: (gameUnit * 4.5),
						y: (gameUnit * 7.5)
					},
					{
						text: 'Choose the type and\nthe size to build.', 
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssPlantDetails',
						x: (gameUnit * 5.5),
						y: (gameUnit * 3),
						width: (gameUnit * 2.5),
						height: (gameUnit * 2.5) * 1.58
					},
					{
						img: 'ssEmptySlot',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.85
					},
					{
						img: 'ssTractorMedium',
						x: (gameUnit * 5.5),
						y: (gameUnit * 10),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 0.79
					}
					]
				},
				// 4
				{
					blurbs: [
					{
						text: 'Required parts are displayed above.\nClick to open the parts menu.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'The choice of parts will affect\nthe manufacturing cost of a machine.',
						x: (gameUnit * 2),
						y: (gameUnit * 6)
					},
					{
						text: 'There may be Parts Supplier opportunities.\nBuy in bulk to save on manufacturing\ncosts later.',
						x: (gameUnit * 2),
						y: (gameUnit * 10)
					}
					],
					images: [
					{
						img: 'ssPartsNavigator',
						x: (gameUnit * 2),
						y: (gameUnit * 4),
						width: gameUnit * 4,
						height: (gameUnit * 4) * 0.29
					},
					{
						img: 'ssPartsMenu',
						x: (gameUnit * 2),
						y: (gameUnit * 7),
						width: gameUnit * 2,
						height: (gameUnit * 2) * 1.33
					}
					]
				},
				// 5
				{
					blurbs: [
					{
						text: 'The stars turn from grey to yellow as you\nselect each required machine type part.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'After a Plant has manufactured 3 or more\nmachines, envelopes will begin appearing\non the US Sector Grids.\nYou will be prompted to\nsell through a Dealer.',
						x: (gameUnit * 2),
						y: (gameUnit * 5.5)
					},
					{
						text: 'Not all Dealers offer the same resale.\nThe first offer is not always the best.',
						x: (gameUnit * 2),
						y: (gameUnit * 11)
					}
					],
					images: [
					{
						img: 'ssDealerGirl',
						x: (gameUnit * 2),
						y: (gameUnit * 7),
						width: (gameUnit * 2),
						height: (gameUnit * 2) * 1.67
					},
					{
						img: 'ssStars',
						x: (gameUnit * 2),
						y: (gameUnit * 4),
						width: (gameUnit * 4),
						height: (gameUnit * 4) * 0.2
					}
					]
				},
				// 6
				{
					blurbs: [
					{
						text: 'After you sell domestically, you\nmay receive trade opportunities\nleading to increased revenue\nand bonus points.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'Clicking the prompt returns you to\nthe world map and displays\nthe potential trade route.',
						x: (gameUnit * 2),
						y: (gameUnit * 5)
					},
					{
						text: 'Click the trade route to see\nthe Trade Representative\'s offer.',
						x: (gameUnit * 2),
						y: (gameUnit * 9.5)
					},
					{
						text: 'Accepting is optional.\nSome trade routes are better than others!',
						x: (gameUnit * 2),
						y: (gameUnit * 10.5)
					}
					],
					images: [
					{
						img: 'tradeRouteAlertIcon',
						x: (gameUnit * 7),
						y: (gameUnit * 3),
						width: (gameUnit * 1.5),
						height: (gameUnit * 1.5) * 0.89
					},
					{
						img: 'ssTradeRoutes',
						x: (gameUnit * 2),
						y: (gameUnit * 6.5),
						width: (gameUnit * 4),
						height: (gameUnit * 4) * 0.68
					}
					]
				},
				// 7
				{
					blurbs:
					[ 
					{
						text: 'Keep track of your bank,\nthe turn time,\nand the Bonus Points\nin the top dashboard.',
						x: (gameUnit * 2),
						y: (gameUnit * 3)
					},
					{
						text: 'At the end of the year, an envelope\nwill contain the Year End summary.\nWhen all goals are met,\nyou can advance to the next level.',
						x: (gameUnit * 2),
						y: (gameUnit * 6)
					}
					],
					images: [
					{
						img: 'ssDashboardTop',
						x: (gameUnit * 2),
						y: (gameUnit * 4.5),
						width: (gameUnit * 4.5),
						height: (gameUnit * 4.5) * 0.17
					},
					{
						img: 'ssYearEnd',
						x: (gameUnit * 2),
						y: (gameUnit * 7.5),
						width: (gameUnit * 3),
						height: (gameUnit * 3) * 1.3
					}
					]
				}
				]
			}

		};
		callback.call(context, config);
	};
	return module;
}();