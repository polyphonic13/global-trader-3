var GameConfig = function() {
	
	var module = {};

	module.loadingAnimation = true;
	
	module.init = function(callback, context) {
		// stage sizes cached
		var stateW = PWG.Stage.stateW;
		var stateH = PWG.Stage.stateH;
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
			sm: (gameUnit * 0.45),
			md: (gameUnit * 0.66),
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
				y: gameUnit * 9.6
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
			dealership: {
				x: gameUnit * 0.76,
				y: gameUnit * 0
			}
		};
		var pinImages = {
			plant: 'pinPlant',
			dealership: 'pinDealership',
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
			dealership: [
				palette.black,
				palette.white,
				palette.white,
				palette.black,
				palette.white
			]
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
				y: (gameUnit * 6.2),
				attrs: {
					width: (gameUnit * 2.75),
					height: (gameUnit * 2.75) * 0.2
				}
			},
			middleEast: {
				img: 'tradeRoutePacificNorth',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 4.25),
					height: (gameUnit * 4.25) * 0.22
				}
			},
			northPacific: {
				img: 'tradeRoutePacificNorth',
				x: (gameUnit * 1.8),
				y: (gameUnit * 6.75),
				attrs: {
					width: (gameUnit * 6.25),
					height: (gameUnit * 6.25) * 0.22
				}
			},
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
		var tradeRouteIconConfig = {
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
			northPacific: {
				x: (gameUnit * 8),
				y: (gameUnit * 6.5)
			},
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
						// input: gameLogic.global.input.engineSprite
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
						// input: gameLogic.global.input.tiresSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.engineSprite
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
						// input: gameLogic.global.input.tiresSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.engineSprite
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
						// input: gameLogic.global.input.tracksSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.bucketSprite
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
						// input: gameLogic.global.input.tiresSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.bucketSprite
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
						// input: gameLogic.global.input.tiresSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.bucketSprite
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
						// input: gameLogic.global.input.tiresSprite
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
						// input: gameLogic.global.input.transmissionSprite
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
						// input: gameLogic.global.input.engineSprite
					}
				}
			}
		};

		var dynamicViews = {
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
			// world
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
						},
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
			tradeRouteAlertIcons: {
				type: 'group',
				name: 'tradeRouteIcons',
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
				input: gameLogic.global.input.tradeRouteAvailableIcon
			},			// us detail
			tradeRoutePrompt: { 
				type: 'sprite',
				name: 'tradeRoutePrompt',
				img: 'tradeRouteRepresentativePrompt',
				x: (gameW/2) - (gameUnit * 3),
				y: (gameUnit * 12.5),
				attrs: {
					width: (gameUnit * 6),
					height: (gameUnit * 6) * 0.34
				}
			},
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
			buildingMenu: {
				type: 'group',
				name: 'buildingMenu',
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
					dealerships: {
						type: 'text',
						name: 'dealerships',
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
				dealership: {
					bg: {
						img: 'dealershipDetailBg'
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
			dealershipPrompt: { 
				type: 'sprite',
				name: 'dealershipPrompt',
				img: 'dealershipRepresentativePrompt',
				x: (gameW/2) - (gameUnit * 3),
				y: (gameUnit * 12.5),
				attrs: {
					width: (gameUnit * 6),
					height: (gameUnit * 6) * 0.34
				}
			},
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
						input: gameLogic.global.input.editMachine
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
						callback: gameLogic.global.buttonCallbacks.addEquipment,
						context: this,
						frames: [0]
					}
				}
			},
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
					// 	input: gameLogic.global.input.openOptionalPartsMenu
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
								input: gameLogic.global.input.machinePieceForwardIcon
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
								input: gameLogic.global.input.machinePieceBackwardIcon
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
						input: gameLogic.global.input.openPartsMenu
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
					// menuBg: {
					// 	type: 'sprite',
					// 	name: 'menuBg',
					// 	img: 'partsFrame',
					// 	x: 0,
					// 	y: -(gameH),
					// 	attrs: {
					// 		width: gameW,
					// 		height: gameH
					// 	}
					// },
					// closeButton: {
					// 	type: 'button',
					// 	name: 'closeButton',
					// 	img: 'buttonClose',
					// 	x: (gameW - gameUnit * 1.25),
					// 	y: (gameUnit * 0.25),
					// 	attrs: {
					// 		width: gameUnit * 1,
					// 		height: gameUnit * 1
					// 	},
					// 	context: this,
					// 	frames: [0, 1, 1, 0]
					// },
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
			optionalPartsMenu: {
				
			},
			yearSummary: {
				type: 'group',
				name: 'yearSummary',
				views: {
					
				}
			},
			achievedGoalText: {
				type: 'text',
				name: 'achievedGoalText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.sm + 'px Trebuchet MS'),
			        fill: palette.black
				}
			},
			failedGoalText: {
				type: 'text',
				name: 'failedGoalText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.25,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.sm + 'px Trebuchet MS'),
			        fill: palette.lightRed
				}
			}
		};

		var config = {
			gameEl: 'game_container',
			gameType: 'phaser',
			// assets
			assets: {
				images: {
					// generic
					blockWhite: 'images/block_white.png',
					blockRed: 'images/block_red.gif',
					blockBlue: 'images/block_blue.gif',
					blockGreen: 'images/block_green.gif',
					blockClear: 'images/block_clear.png',
					// global
					gameBg: 'images/screens/metal_background.gif',
					dashboardBottom: 'images/dashboard_bottom.png',
					dashboardTop: 'images/dashboard_top.png',
					submenuBg: 'images/submenu_bg.png',
					smallEnvelope: 'images/icons/small_envelope.png',
					// home
					homeBg: 'images/screens/start/start.png',
					// manual
					// manualBg: '',
					// mission brief
					briefBg01: 'images/screens/brief/mission_brief01.png',
					briefBg02: 'images/screens/brief/mission_brief02.png',
					briefBg03: 'images/screens/brief/mission_brief03.png',
					briefBg04: 'images/screens/brief/mission_brief04.png',
					briefBg05: 'images/screens/brief/mission_brief05.png',
					goalsText: 'images/screens/brief/goals_text_img.png',
					windshieldWiper: 'images/screens/brief/windshield_wiper.png',
					windshieldWiperMask: 'images/screens/brief/windshield_wiper_mask.png',
					windowFrame: 'images/screens/brief/window_frame.png',
					// world
					mapOcean: 'images/screens/world/map_ocean.png',
					mapWorld: 'images/screens/world/map_world4.png',
					mapUS: 'images/screens/world/map_us.png',
					endTurnPrompt: 'images/screens/world/end_turn_prompt.png',
					pinPlant: 'images/screens/world/pin_plant.png',
					pinDealership: 'images/screens/world/pin_dealership.png',
					pinTradeRoute: 'images/screens/world/pin_tradeRoute.png',
					tradeRouteAlertIcon: 'images/icons/little_trade_route_alert.png',
					tradeRouteIcon: 'images/screens/world/trade_route_icon.png',
					tradeRouteEurope: 'images/screens/world/trade_route_europe.png',
					tradeRouteAsia: 'images/screens/world/trade_route_asia.png',
					tradeRoutePacificNorth: 'images/screens/world/trade_route_pacific_north.png',
					tradeRoutePacificSouth: 'images/screens/world/trade_route_pacific_south.png',
					tradeRouteAfrica: 'images/screens/world/trade_route_africa.png',
					tradeRouteSouthAmerica: 'images/screens/world/trade_route_south_america.png',
					tradeRouteRepresentativePrompt: 'images/screens/world/trade_route_representative_prompt.png',
					// us detail
					sectorGridNE: 'images/screens/us_detail/sector_grid_ne.png',
					sectorGridSE: 'images/screens/us_detail/sector_grid_se.png',
					sectorGridMW: 'images/screens/us_detail/sector_grid_mw.png',
					sectorGridNW: 'images/screens/us_detail/sector_grid_nw.png',
					sectorGridSW: 'images/screens/us_detail/sector_grid_sw.png',
					addNewPlantPrompt: 'images/screens/us_detail/add_new_plant_prompt.png',
					dealershipRepresentativePrompt: 'images/screens/us_detail/dealership_representative_prompt.png',
					// building detail
					plantDetailBg: 'images/screens/building_edit/plant_detail.png',
					dealershipDetailBg: 'images/screens/building_edit/dealership_detail.png',
					// equipment list
					machineListIcon: 'images/screens/equipment_list/machine_list_icon.png',
					skidsteerBasicIcon: 'images/screens/equipment_list/skidsteer_basic_icon.png',
					skidsteerMediumIcon: 'images/screens/equipment_list/skidsteer_medium_icon.png',
					skidsteerHeavyIcon: 'images/screens/equipment_list/skidsteer_heavy_icon.png',
					tractorBasicIcon: 'images/screens/equipment_list/tractor_basic_icon.png',
					tractorMediumIcon: 'images/screens/equipment_list/tractor_medium_icon.png',
					tractorHeavyIcon: 'images/screens/equipment_list/tractor_heavy_icon.png',
					emptyIcon: 'images/screens/equipment_list/empty_icon2.png',
					// equipment create
					equipmentCreateBg: 'images/screens/equipment_add/equipment_add_bg.png',
					// equipment edit
					tractorBasicBg: 'images/screens/equipment_edit/tractor_basic.png',
					tractorMediumBg: 'images/screens/equipment_edit/tractor_medium.png',
					tractorHeavyBg: 'images/screens/equipment_edit/tractor_heavy.png',
					skidsteerBasicBg: 'images/screens/equipment_edit/skid_steer_basic.png',
					skidsteerMediumBg: 'images/screens/equipment_edit/skid_steer_medium.png',
					skidsteerHeavyBg: 'images/screens/equipment_edit/skid_steer_heavy.png',
					optionalPartsPlus: 'images/screens/equipment_edit/optional_parts_plus.png',
					partsNavigator: 'images/screens/equipment_edit/what_to_buy_menu.png',
					// parts icons
					// frame
					partsFrame: 'images/screens/equipment_edit/parts_frame.png',
					// engine
					engineBasicStandard: 'images/screens/equipment_edit/parts_icons/engine/basic_standard.png',
					engineBasicPremium: 'images/screens/equipment_edit/parts_icons/engine/basic_premium.png',
					engineBasicDeluxe: 'images/screens/equipment_edit/parts_icons/engine/basic_deluxe.png',
					engineMediumStandard: 'images/screens/equipment_edit/parts_icons/engine/medium_standard.png',
					engineMediumPremium: 'images/screens/equipment_edit/parts_icons/engine/medium_premium.png',
					engineMediumDeluxe: 'images/screens/equipment_edit/parts_icons/engine/medium_deluxe.png',
					engineHeavyStandard: 'images/screens/equipment_edit/parts_icons/engine/heavy_standard.png',
					engineHeavyPremium: 'images/screens/equipment_edit/parts_icons/engine/heavy_premium.png',
					engineHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/engine/heavy_deluxe.png',
					// transmission
					transmissionBasicStandard: 'images/screens/equipment_edit/parts_icons/transmission/basic_standard.png',
					transmissionBasicPremium: 'images/screens/equipment_edit/parts_icons/transmission/basic_premium.png',
					transmissionBasicDeluxe: 'images/screens/equipment_edit/parts_icons/transmission/basic_deluxe.png',
					transmissionMediumStandard: 'images/screens/equipment_edit/parts_icons/transmission/medium_standard.png',
					transmissionMediumPremium: 'images/screens/equipment_edit/parts_icons/transmission/medium_premium.png',
					transmissionMediumDeluxe: 'images/screens/equipment_edit/parts_icons/transmission/medium_deluxe.png',
					transmissionHeavyStandard: 'images/screens/equipment_edit/parts_icons/transmission/heavy_standard.png',
					transmissionHeavyPremium: 'images/screens/equipment_edit/parts_icons/transmission/heavy_premium.png',
					transmissionHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/transmission/heavy_deluxe.png',
					// tires
					tiresBasicStandard: 'images/screens/equipment_edit/parts_icons/tires/basic_standard.png',
					tiresBasicPremium: 'images/screens/equipment_edit/parts_icons/tires/basic_premium.png',
					tiresBasicDeluxe: 'images/screens/equipment_edit/parts_icons/tires/basic_deluxe.png',
					tiresMediumStandard: 'images/screens/equipment_edit/parts_icons/tires/medium_standard.png',
					tiresMediumPremium: 'images/screens/equipment_edit/parts_icons/tires/medium_premium.png',
					tiresMediumDeluxe: 'images/screens/equipment_edit/parts_icons/tires/medium_deluxe.png',
					// tracks
					tracksHeavyStandard: 'images/screens/equipment_edit/parts_icons/tracks/heavy_standard.png',
					tracksHeavyPremium: 'images/screens/equipment_edit/parts_icons/tracks/heavy_premium.png',
					tracksHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/tracks/heavy_deluxe.png',
					// bucket
					bucketBasicStandard: 'images/screens/equipment_edit/parts_icons/bucket/basic_standard.png',
					bucketBasicPremium: 'images/screens/equipment_edit/parts_icons/bucket/basic_premium.png',
					bucketBasicDeluxe: 'images/screens/equipment_edit/parts_icons/bucket/basic_deluxe.png',
					bucketMediumStandard: 'images/screens/equipment_edit/parts_icons/bucket/medium_standard.png',
					bucketMediumPremium: 'images/screens/equipment_edit/parts_icons/bucket/medium_premium.png',
					bucketMediumDeluxe: 'images/screens/equipment_edit/parts_icons/bucket/medium_deluxe.png',
					bucketHeavyStandard: 'images/screens/equipment_edit/parts_icons/bucket/heavy_standard.png',
					bucketHeavyPremium: 'images/screens/equipment_edit/parts_icons/bucket/heavy_premium.png',
					bucketHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/bucket/heavy_deluxe.png',
					// headlights
					headlightsMediumStandard: 'images/screens/equipment_edit/parts_icons/headlights/medium_standard.png',
					headlightsMediumPremium: 'images/screens/equipment_edit/parts_icons/headlights/medium_premium.png',
					headlightsMediumDeluxe: 'images/screens/equipment_edit/parts_icons/headlights/medium_deluxe.png',
					headlightsHeavyStandard: 'images/screens/equipment_edit/parts_icons/headlights/heavy_standard.png',
					headlightsHeavyPremium: 'images/screens/equipment_edit/parts_icons/headlights/heavy_premium.png',
					headlightsHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/headlights/heavy_deluxe.png',
					// threePointHitch
					threePointHitchHeavyStandard: 'images/screens/equipment_edit/parts_icons/threePointHitch/heavy_standard.png',
					threePointHitchHeavyPremium: 'images/screens/equipment_edit/parts_icons/threePointHitch/heavy_premium.png',
					threePointHitchHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/threePointHitch/heavy_deluxe.png',
					// powerTakeoff
					powerTakeoffHeavyStandard: 'images/screens/equipment_edit/parts_icons/powerTakeoff/heavy_standard.png',
					powerTakeoffHeavyPremium: 'images/screens/equipment_edit/parts_icons/powerTakeoff/heavy_premium.png',
					powerTakeoffHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/powerTakeoff/heavy_deluxe.png',
					// quickCoupler
					quickCouplerMediumStandard: 'images/screens/equipment_edit/parts_icons/quickCoupler/medium_standard.png',
					quickCouplerMediumPremium: 'images/screens/equipment_edit/parts_icons/quickCoupler/medium_premium.png',
					quickCouplerMediumDeluxe: 'images/screens/equipment_edit/parts_icons/quickCoupler/medium_deluxe.png',
					quickCouplerHeavyStandard: 'images/screens/equipment_edit/parts_icons/quickCoupler/heavy_standard.png',
					quickCouplerHeavyPremium: 'images/screens/equipment_edit/parts_icons/quickCoupler/heavy_premium.png',
					quickCouplerHeavyDeluxe: 'images/screens/equipment_edit/parts_icons/quickCoupler/heavy_deluxe.png',
					// heater
					heaterStandard: 'images/screens/equipment_edit/parts_icons/heater/standard.png',
					heaterPremium: 'images/screens/equipment_edit/parts_icons/heater/premium.png',
					heaterDeluxe: 'images/screens/equipment_edit/parts_icons/heater/deluxe.png',
					// extras
					flameDecal: 'images/screens/equipment_edit/parts_icons/extras/flame_decal.png',
					autoPilot: 'images/screens/equipment_edit/parts_icons/extras/auto_pilot.png',
					stainlessExhaust: 'images/screens/equipment_edit/parts_icons/extras/stainless_exhaust.png',
					gps: 'images/screens/equipment_edit/parts_icons/extras/gps.png',

					// NOTIFICATIONS
					dealershipGirl: 'images/notifications/dealership_girl.png',
					tradeRouteGirl: 'images/notifications/trade_route_girl.png',
					// TURN END
					turnEnd01: 'images/screens/turn_end/turn_end01.png',
					turnEnd02: 'images/screens/turn_end/turn_end02.png'
				},
				sprites: {
					buttonSettings: {
						url: 'images/icons/settings.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonShare: {
						url: 'images/icons/share.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonCancel: {
						url: 'images/icons/cancel.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonConfirm: {
						url: 'images/icons/confirm.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonBack: {
						url: 'images/icons/back.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonUndo: {
						url: 'images/icons/undo.png',
						width: 175,
						height: 150,
						frames: 2
					},
					buttonEquipment: {
						url: 'images/icons/equipment.png',
						width: 175,
						height: 150,
						frames: 2
					},
					// buttonEquipmentAdd: {
					// 	url: 'images/icons/equipment_add.png',
					// 	width: 175,
					// 	height: 150,
					// 	frames: 2
					// },
					buttonInventory: {
						url: 'images/icons/inventory.png',
						width: 175,
						height: 150,
						frames: 2
					},
					ignitionKey: {
						url: 'images/screens/start/key_spritesheet.png',
						width: 320,
						height: 573,
						frames: 3
					},
					buttonClose: {
						url: 'images/button_close.png',
						width: 50,
						height: 50,
						frames: 2
					},
					buttonCheck: {
						url: 'images/controls/check.png',
						width: 50,
						height: 50,
						frames: 2
					},
					buttonHome: {
						url: 'images/icons/home.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonPlus: {
						url: 'images/icons/plus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					buttonMinus: {
						url: 'images/icons/minus.png',
						width: 150,
						height: 50,
						frames: 2
					},
					turnIndicators: {
						url: 'images/turn_spritesheet.png',
						width: 300,
						height: 100,
						frames: 10
					},
					usDetailTiles: {
						url: 'images/screens/us_detail/us_detail_grid_icon.png',
						width: 110,
						height: 110,
						frames: 5
					},
					animatedDollarIcon: {
						url: 'images/screens/us_detail/animated_dollar_sign_white.png',
						width: 65,
						height: 100,
						frames: 6
					},
					animatedPlusIcon: {
						url: 'images/screens/us_detail/animated_plus_sign.png',
						width: 65,
						height: 100,
						frames: 6
					},
					// equipment create 
					createTractorBasic: {
						url: 'images/screens/equipment_add/tractor_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerBasic: {
						url: 'images/screens/equipment_add/skid_steer_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorMedium: {
						url: 'images/screens/equipment_add/tractor_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerMedium: {
						url: 'images/screens/equipment_add/skid_steer_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createTractorHeavy: {
						url: 'images/screens/equipment_add/tractor_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
					createSkidsteerHeavy: {
						url: 'images/screens/equipment_add/skid_steer_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
 					// equipment edit
					starsThree: {
						url: 'images/screens/equipment_edit/stars/stars_three_spritesheet.png', 
						width: 126,
						height: 26,
						frames: 4
					},
					starsFour: {
						url: 'images/screens/equipment_edit/stars/stars_four_spritesheet.png', 
						width: 176,
						height: 26,
						frames: 5
					},
					starsFive: {
						url: 'images/screens/equipment_edit/stars/stars_five_spritesheet.png', 
						width: 224,
						height: 26,
						frames: 6
					},
					starsSix: {
						url: 'images/screens/equipment_edit/stars/stars_six_spritesheet.png', 
						width: 274,
						height: 26,
						frames: 7
					},
					starsSeven: {
						url: 'images/screens/equipment_edit/stars/stars_seven_spritesheet.png', 
						width: 323,
						height: 26,
						frames: 8
					},
					// tractor basic
					editTractorBasicCab: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_cab_spritesheet.png',
						width: 105,
						height: 154,
						frames: 2
					},
					editTractorBasicEngine: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_engine_spritesheet.png',
						width: 167,
						height: 189,
						frames: 2
					},
					editTractorBasicTires: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/basic/tractor_basic_tires_spritesheet.png',
						width: 308,
						height: 196,
						frames: 2
					},
					// tractor medium
					editTractorMediumCab: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_cab_spritesheet.png',
						width: 83,
						height: 177,
						frames: 2
					},
					editTractorMediumEngine: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_engine_spritesheet.png',
						width: 143,
						height: 149,
						frames: 2
					},
					editTractorMediumTransmission: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_transmission_spritesheet.png',
						width: 26,
						height: 83,
						frames: 2
					},
					editTractorMediumTires: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/medium/tractor_medium_tires_spritesheet.png',
						width: 288,
						height: 255,
						frames: 2
					},
					// tractor heavy
					editTractorHeavyCab: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_cab_spritesheet.png',
						width: 166,
						height: 222,
						frames: 2
					},
					editTractorHeavyEngine: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_engine_spritesheet.png',
						width: 165,
						height: 172,
						frames: 2
					},
					editTractorHeavyTransmission: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_transmission_spritesheet.png',
						width: 43,
						height: 155,
						frames: 2
					},
					editTractorHeavyTracks: {
						url: 'images/screens/equipment_edit/machine_parts/tractor/heavy/tractor_heavy_tracks_spritesheet.png',
						width: 300,
						height: 170,
						frames: 2
					},
					// skidsteer basic
					editSkidsteerBasicCab: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_cab_spritesheet.png',
						width: 115,
						height: 126,
						frames: 2
					},
					editSkidsteerBasicBucket: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_bucket_spritesheet.png',
						width: 207,
						height: 145,
						frames: 2
					},
					editSkidsteerBasicTires: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/basic/skidsteer_basic_tires_spritesheet.png',
						width: 159,
						height: 101,
						frames: 2
					},
					// // skidsteer medium
					editSkidsteerMediumCab: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_cab_spritesheet.png',
						width: 142,
						height: 129,
						frames: 2
					},
					editSkidsteerMediumBucket: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_bucket_spritesheet.png',
						width: 179,
						height: 167,
						frames: 2
					},
					editSkidsteerMediumTires: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/medium/skidsteer_medium_tires_spritesheet.png',
						width: 78,
						height: 86,
						frames: 2
					},
					// skidsteer heavy
					editSkidsteerHeavyCab: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_cab_spritesheet.png',
						width: 156,
						height: 108,
						frames: 2
					},
					editSkidsteerHeavyEngine: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_engine_spritesheet.png',
						width: 83,
						height: 57,
						frames: 2
					},
					editSkidsteerHeavyBucket: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_bucket_spritesheet.png',
						width: 249,
						height: 244,
						frames: 2
					},
					editSkidsteerHeavyTracks: {
						url: 'images/screens/equipment_edit/machine_parts/skidsteer/heavy/skidsteer_heavy_tracks_spritesheet.png',
						width: 239,
						height: 127,
						frames: 2
					},
					// other stuff
					tiresSprites: {
						url: 'images/parts/tires_spritesheet.gif',
						width: 125,
						height: 125,
						frames: 16
					},
					engineSprites: {
						url: 'images/parts/engine_spritesheet.gif',
						width: 100,
						height: 100,
						frames: 16
					},
					cabSprites: {
						url: 'images/parts/cab_spritesheet.gif',
						width: 100,
						height: 100,
						frames: 16
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
			notificationText: {
				dealership: {
					title: 'Dealership',
					statement: 'We would like to sell ~{quantity}~ per year\nof your ~{plant}~\n~{model}~ inventory\nat $~{resell}~ each.'
				},
				tradeRoute: {
					title: 'Trade Route',
					statement: 'We would like to import ~{quantity}~\nper year of your ~{plant}~\n~{model}~ inventory\nat $~{resell}~ each.'
				}
			},
			goalsText: {
				passed: 'All goals met.\nCongratulations.',
				failed: 'Goals not met.\nPlease try again.',
				types: {
					profit: 'Profits: ',
					newFactories: 'Factories built: ',
					newDealerships: 'Dealerships established: ',
					newTradeRoutes: 'Trade Routes established: ',
					newMachineModels: 'Machine models created: ',
					newMachines: 'Machines built: ',
					machinesSold: 'Machines sold: '
				}
			},
			bonusesText: {
				newPlant: 'New Plant built created 1000 jobs',
				newDealership: 'New Dealership established',
				newTradeRoutes: 'New Trade Route established',
				machingManufacturing: '~{machines}~ Machines built'
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
			tradeRouteIconConfig: tradeRouteIconConfig,
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
								width: gameW,
								height: gameH,
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
							callback: gameLogic.global.buttonCallbacks.worldStart,
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
							callback: gameLogic.global.buttonCallbacks.manualStart,
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
						stateBg: {
							type: 'sprite',
							name: 'manualBg',
							img: 'manualBg',
							x: 0,
							y: 0,
							attrs: {
								width: gameW,
								height: gameH
							}
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
									callback: gameLogic.global.buttonCallbacks.northwestDetail,
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
									callback: gameLogic.global.buttonCallbacks.southwestDetail,
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
									callback: gameLogic.global.buttonCallbacks.midwestDetail,
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
									callback: gameLogic.global.buttonCallbacks.northeastDetail,
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
									callback: gameLogic.global.buttonCallbacks.southeastDetail,
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
									callback: gameLogic.global.buttonCallbacks.equipmentListClose,
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
						// 			input: gameLogic.global.input.tractor
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
						// 			input: gameLogic.global.input.skidsteer
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
											callback: gameLogic.global.buttonCallbacks.newBasicTractor,
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
											callback: gameLogic.global.buttonCallbacks.newMediumTractor,
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
											callback: gameLogic.global.buttonCallbacks.newHeavyTractor,
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
											callback: gameLogic.global.buttonCallbacks.newBasicSkidsteer,
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
											callback: gameLogic.global.buttonCallbacks.newMediumSkidsteer,
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
											callback: gameLogic.global.buttonCallbacks.newHeavySkidsteer,
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
							input: gameLogic.global.input.openedEnvelope
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
							input: gameLogic.global.input.closedEnvelope
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
						notificationEnvelope: {
							type: 'sprite',
							name: 'notificationEnvelope',
							img: 'smallEnvelope',
							x: gameUnit * 0.1,
							y: gameUnit * 1.6,
							attrs: {
								width: gameUnit * 1.5,
								height: (gameUnit * 1.5) * 0.6
							},
							input: gameLogic.global.input.notificationEnvelope
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
							input: gameLogic.global.input.tradeRouteAlertIcon
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
								width: gameW,
								height: gameUnit * 2.5,
								fixedToCamera: true
							}
						},
						homeGroup: {
							type: 'group',
							name: 'homeGroup',
							views: {
								// buttonSettings: {
								// 	type: 'button',
								// 	name: 'buttonSettings',
								// 	img: 'buttonSettings',
								// 	x: controlButtons.left.x,
								// 	y: controlButtons.bottom.y,
								// 	attrs: {
								// 		width: controlButtons.width,
								// 		height: controlButtons.height
								// 	},
								// 	callback: gameLogic.global.buttonCallbacks.settings,
								// 	context: this,
								// 	frames: [0, 1, 1, 0]
								// },
								// buttonShare: {
								// 	type: 'button',
								// 	name: 'buttonShare',
								// 	img: 'buttonShare',
								// 	x: controlButtons.right.x,
								// 	y: controlButtons.bottom.y,
								// 	attrs: {
								// 		width: controlButtons.width,
								// 		height: controlButtons.height
								// 	},
								// 	callback: gameLogic.global.buttonCallbacks.share,
								// 	context: this,
								// 	frames: [0, 1, 1, 0]
								// }
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
									x: (gameUnit * 6.67),
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
									callback: gameLogic.global.buttonCallbacks.worldReturnButton,
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
									callback: gameLogic.global.buttonCallbacks.plusButton,
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
									callback: gameLogic.global.buttonCallbacks.minusButton,
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
									callback: gameLogic.global.buttonCallbacks.equipmentListStart,
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
								// 	callback: gameLogic.global.buttonCallbacks.addEquipment,
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
							callback: gameLogic.global.buttonCallbacks.backButton,
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
							callback: gameLogic.global.buttonCallbacks.confirmButton,
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
							callback: gameLogic.global.buttonCallbacks.cancelButton,
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
			]
		};
		callback.call(context, config);
	};
	return module;
}();