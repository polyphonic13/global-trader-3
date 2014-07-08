var goalsText = {
	passed: 'All goals met.\nCongratulations.',
	failed: 'Goals not met.\nPlease try again.',
	types: {
		profit: 'Profits: ',
		newFactories: 'Factories built: ',
		newRetailers: 'Retailers established: ',
		newTraderoutes: 'Trade Routes established: ',
		newMachineModels: 'Machine models created: ',
		newMachines: 'Machines manufactured: ',
		machinesSold: 'Machines sold: '
	}
};

var bonusesText = {
	newFactory: 'New Factory built created 1000 jobs',
	newRetailer: 'New Retailer established',
	newTraderoutes: 'New Trade Route established',
	machingManufacturing: '~{machines}~ Machines manufactured'
};

var notificationText = {
	retailer: {
		title: 'Retailer',
		statement: 'We would like to sell ~{quantity}~ per year\nof your ~{factory}~\n~{model}~ inventory\nat $~{resell}~ each.'
	},
	traderoute: {
		title: 'Trade Route',
		statement: 'We would like to import ~{quantity}~ per year\nof your\n~{factory}~\n~{model}~ inventory\nat $~{resell}~ each.'
	}
};

var machineIcons = {
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
};

var turnScreens = [
	'world',
	'usDetail',
	'buildingEdit',
	'equipmentList',
	'equipmentCreate',
	'equipmentEdit'
];

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
		var machinePartIconConfig = {
			tractor: {
				basic: {
					engine: {
						img: 'blockWhite',
						x: 0,
						y: (gameUnit * 8),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 4,
						}
					},
					tires: {
						img: 'blockWhite',
						x: (gameUnit * 2.5),
						y: (gameUnit * 10.5),
						attrs: {
							width: gameUnit * 6.5,
							height: gameUnit * 3,
							angle: -35
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 6),
						attrs: {
							width: gameUnit * 2,
							height: gameUnit * 2.5
						}
					}
				},
				medium: {
					engine: {
						img: 'blockWhite',
						x: 0,
						y: (gameUnit * 7),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 4,
						}
					},
					tires: {
						img: 'blockWhite',
						x: (gameUnit * 2.5),
						y: (gameUnit * 10),
						attrs: {
							width: gameUnit * 7,
							height: gameUnit * 4,
							angle: -35
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 4),
						attrs: {
							width: gameUnit * 2,
							height: gameUnit * 4
						}
					}
				},
				heavy: {
					engine: {
						img: 'blockWhite',
						x: 0,
						y: (gameUnit * 7),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 5,
						}
					},
					tires: {
						img: 'blockWhite',
						x: (gameUnit * 2.5),
						y: (gameUnit * 10.5),
						attrs: {
							width: gameUnit * 6.5,
							height: gameUnit * 4,
							angle: -35
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 4),
						attrs: {
							width: gameUnit * 3,
							height: gameUnit * 4
						}
					}
				}
			},
			skidsteer: {
				basic: {
					engine: {
						img: 'blockWhite',
						x: 0,
						y: (gameUnit * 8),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 4,
						}
					},
					tires: {
						img: 'blockWhite',
						x: (gameUnit * 2.5),
						y: (gameUnit * 10.5),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 3,
							angle: 30
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 6),
						attrs: {
							width: gameUnit * 2,
							height: gameUnit * 2.5
						}
					}
				},
				medium: {
					engine: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 10),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2.5,
							angle: -20
						}
					},
					tires: {
						img: 'blockWhite',
						x: gameUnit * 1.5,
						y: (gameUnit * 8),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2,
							angle: 40
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 2),
						y: (gameUnit * 6.5),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2.5
						}
					},
					bucket: {
						img: 'blockWhite',
						x: gameUnit * 4,
						y: gameUnit * 2,
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 3
						}
					}
				},
				heavy: {
					engine: {
						img: 'blockWhite',
						x: (gameUnit * 4),
						y: (gameUnit * 10),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2.5,
							angle: -20
						}
					},
					tires: {
						img: 'blockWhite',
						x: gameUnit * 1.5,
						y: (gameUnit * 8),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2,
							angle: 40
						}
					},
					cab: {
						img: 'blockWhite',
						x: (gameUnit * 2),
						y: (gameUnit * 6.5),
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 2.5
						}
					},
					bucket: {
						img: 'blockWhite',
						x: gameUnit * 4,
						y: gameUnit * 2,
						attrs: {
							width: gameUnit * 4,
							height: gameUnit * 3
						}
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
						x: gameUnit * 0,
						y: gameUnit * 2,
						style: {
						    font: (fontSizes.md + 'px Arial'),
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
						y: gameUnit * 3,
						style: {
						    font: (fontSizes.sm + 'px Arial'),
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
			goalText: {
				type: 'text',
				name: 'goal',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 1.5),
				x: (gameUnit * 0.5),
				y: gameUnit * 5,
				style: {
				    font: (fontSizes.md + 'px Arial'),
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
			sectorTitle: {
				type: 'sprite',
				name: 'sectorTitle',
				img: '',
				x: (gameW/2) - (gameUnit * 1.75),
				y: gameUnit * 2,
				attrs: {
					width: (gameUnit * 4),
					height: (gameUnit * 4) * 0.37
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
						img: 'addNewFactoryPrompt',
						x: (gameW/2) - (gameUnit * 3),
						y: (gameUnit * 12.5),
						attrs: {
							width: (gameUnit * 6),
							height: (gameUnit * 6) * 0.34
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: 0,
						y: gameUnit * 13.5,
						style: {
						    font: (fontSizes.md + 'px Arial'),
					        fill: palette.orange3
						},
						position: {
							centerX: true
						}
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
						callback: gameLogic.global.buttonCallbacks.buildingAddConfirm,
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
						callback: gameLogic.global.buttonCallbacks.buildingAddCancel,
						context: this,
						frames: [0, 1, 1, 0]
					}
				}
			},
			buildingEditDetails: {
				type: 'group',
				name: 'editDetails',
				views: {
					name: {
						type: 'text',
						name: 'factoryName',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 3.5,
						style: {
							font: (fontSizes.lg + 'px Arial'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					status: {
						type: 'text',
						name: 'factorySatus',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 6,
						style: {
							font: (fontSizes.md + 'px Arial'),
								fill: palette.white
							},
							position: {
								centerX: true
							}
					},
					equipment: {
						type: 'text',
						name: 'equipment',
						text: '',
						x: gameUnit * 1.5,
						y: gameUnit * 8.5,
						style: {
							font: (fontSizes.xl + 'px Arial'),
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
						y: gameUnit * 11,
						style: {
							font: (fontSizes.xl + 'px Arial'),
							fill: palette.white
						},
						position: {
							centerX: true
						}
					}
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
						x: (gameUnit * 0.5),
						y: gameUnit * 3.25,
						style: {
						    font: (fontSizes.sm + 'px Arial'),
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
						    font: (fontSizes.xxs + 'px Arial'),
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
						    font: (fontSizes.sm + 'px Arial'),
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
					optionalPartsPlus: {
						type: 'sprite',
						name: 'optionalPartsPlus',
						img: 'optionalPartsPlus',
						x: gameUnit * 0.1,
						y: gameUnit * 5,
						attrs: {
							width: gameUnit * 1.5,
							height: gameUnit * 1.5
						},
						input: gameLogic.global.input.openOptionalPartsMenu
					},
					machinePieceMenu: {
						type: 'group',
						name: 'machinePieceMenu',
						views: {
							
						}
					},
					machinePieceMenuButtons: {
						type: 'group',
						name: 'machinePieceMenuButtons',
						views: {
							title: {
								type: 'text',
								name: 'partName',
								text: 'Choose Part Type',
								x: gameUnit * 3,
								y: gameUnit * 1.75,
								style: {
								    font: (fontSizes.sm + 'px Arial'),
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
								y: gameUnit * 1.75,
								attrs: {
									width: gameUnit * 0.5,
									height: gameUnit * 0.5,
									alpha: 0
								},
								input: gameLogic.global.input.machinePieceForwardIcon
							},
							backward: {
								type: 'sprite',
								name: 'backward',
								img: 'blockWhite',
								x: (gameW/2) - gameUnit * 2.5,
								y: gameUnit * 1.75,
								attrs: {
									width: gameUnit * 0.5,
									height: gameUnit * 0.5,
									alpha: 0
								},
								input: gameLogic.global.input.machinePieceBackwardIcon
							}
						}
					}
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
						    font: (fontSizes.md + 'px Arial'),
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
			machinePartIcons: {
				type: 'group',
				name: 'editorParts',
				views: 
				{
					tires: {
						type: 'sprite',
						name: 'tiresPart',
						// img: 'tiresSprites',
						img: '',
						attrs: {
							frame: 0,
							alpha: 0.3
						},
						input: gameLogic.global.input.tireIcon
					},
					engine: {
						type: 'sprite',
						name: 'enginePart',
						// img: 'engineSprites',
						img: '',
						attrs: {
							frame: 0,
							alpha: 0.3
						},
						input: gameLogic.global.input.engineIcon
					},
					cab: {
						type: 'sprite',
						name: 'cabPart',
						// img: 'cabSprites',
						img: '',
						attrs: {
							frame: 0,
							alpha: 0.3
						},
						input: gameLogic.global.input.cabIcon
					}
				}
			},
			partsMenu: {
				type: 'group',
				name: '',
				attrs: {
					visible: false
				},
				views: {
					menuBg: {
						type: 'sprite',
						name: 'menuBg',
						img: 'blockWhite',
						x: (gameUnit/2),
						y: (gameUnit/2),
						attrs: {
							width: (gameW - gameUnit),
							height: (gameH - gameUnit),
							alpha: 0.75,
							fixedToCamera: true
						}
					},
					title: {
						type: 'text',
						name: 'title',
						text: '',
						x: gameUnit * 4,
						y: gameUnit * 1,
						style: {
						    font: (fontSizes.md + 'px Arial'),
					        fill: palette.black
						},
						position: {
							centerX: true
						}
					},
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
						context: this,
						frames: [0, 1, 1, 0]
					},
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
				offset: (gameUnit * 2),
				iconH: (gameUnit * 4.5),
				views: {
					bg: {
						type: 'sprite',
						name: 'menuItemBg',
						img: 'blockWhite',
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameW - gameUnit,
							height: (gameUnit * 3),
							alpha: 0.33
						}
					},
					icon: {
						type: 'sprite',
						name: 'menuItemIcon',
						img: '',
						x: gameUnit * 0.5,
						y: 0,
						attrs: {
							width: gameUnit * 3,
							height: gameUnit * 3
						}
					},
					description: {
						type: 'text',
						name: 'menuItemDescription',
						text: '',
						x: gameUnit * 4,
						y: gameUnit * 1,
						style: {
						    font: (fontSizes.sm + 'px Arial'),
					        fill: palette.black
						}
					},
					cost: {
						type: 'text',
						name: 'menuItemCost',
						text: '',
						x: gameUnit * 4,
						y: gameUnit * 1.5,
						style: {
						    font: (fontSizes.md + 'px Arial'),
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
				x: gameUnit * 1.5,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.sm + 'px Arial'),
			        fill: palette.black
				}
			},
			failedGoalText: {
				type: 'text',
				name: 'failedGoalText',
				text: '',
				offsetX: 0,
				offsetY: (gameUnit * 0.75),
				x: gameUnit * 1.5,
				y: gameUnit * 6,
				style: {
				    font: (fontSizes.sm + 'px Arial'),
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
					blockClear: 'images/block_clear.png',
					// global
					gameBg: 'images/screens/metal_background.gif',
					dashboardBottom: 'images/dashboard_bottom.png',
					dashboardTop: 'images/dashboard_top.png',
					smallEnvelope: 'images/icons/small_envelope.png',
					// home
					homeBg: 'images/screens/start/start.png',
					// manual
					manualBg: 'images/screens/screen_mocks_manual.gif',
					// mission brief
					briefBg01: 'images/screens/brief/mission_brief01.png',
					briefBg02: 'images/screens/brief/mission_brief02.png',
					briefBg03: 'images/screens/brief/mission_brief03.png',
					briefBg04: 'images/screens/brief/mission_brief04.png',
					briefBg05: 'images/screens/brief/mission_brief05.png',
					goalsText: 'images/screens/brief/goals_text_img.png',
					// world
					mapOcean: 'images/screens/world/map_ocean.png',
					mapWorld: 'images/screens/world/map_world.png',
					mapUS: 'images/screens/world/map_us.png',
					endTurnPrompt: 'images/screens/world/end_turn_prompt.png',
					// us detail
					sectorTitleNE: 'images/screens/us_detail/sector_title_ne.png',
					sectorTitleSE: 'images/screens/us_detail/sector_title_se.png',
					sectorTitleMW: 'images/screens/us_detail/sector_title_mw.png',
					sectorTitleNW: 'images/screens/us_detail/sector_title_nw.png',
					sectorTitleSW: 'images/screens/us_detail/sector_title_sw.png',
					iconFactory: 'images/screens/us_detail/icon_factory.png',
					addNewFactoryPrompt: 'images/screens/us_detail/add_new_factory_prompt.png',
					// factory detail
					factoryDetailBg: 'images/screens/factory_detail/factory_detail.png',
					// equipment list
					machineListIcon: 'images/screens/equipment_list/machine_list_icon.png',
					skidsteerBasicIcon: 'images/screens/equipment_list/skidsteer_basic_icon.png',
					skidsteerMediumIcon: 'images/screens/equipment_list/skidsteer_medium_icon.png',
					skidsteerHeavyIcon: 'images/screens/equipment_list/skidsteer_heavy_icon.png',
					tractorBasicIcon: 'images/screens/equipment_list/tractor_basic_icon.png',
					tractorMediumIcon: 'images/screens/equipment_list/tractor_medium_icon.png',
					tractorHeavyIcon: 'images/screens/equipment_list/tractor_heavy_icon.png',
					emptyIcon: 'images/screens/equipment_list/empty_icon.png',
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
					// temp parts icons
					// deluxe
					bucketDeluxe: 'images/parts_icons/temp/deluxe/bucket.png',
					engineHeavyDeluxe: 'images/parts_icons/temp/deluxe/engine_heavy.png',
					engineMediumDeluxe: 'images/parts_icons/temp/deluxe/engine_medium.png',
					engineBasicDeluxe: 'images/parts_icons/temp/deluxe/engine_basic.png',
					headlightsDeluxe: 'images/parts_icons/temp/deluxe/headlights.png',
					heaterDeluxe: 'images/parts_icons/temp/deluxe/heater.png',
					powerTakeoffDeluxe: 'images/parts_icons/temp/deluxe/power_take_off.png',
					quickCouplerDeluxe: 'images/parts_icons/temp/deluxe/quick_coupler.png',
					threePointHitchDeluxe: 'images/parts_icons/temp/deluxe/three_point_hitch.png',
					tiresDeluxe: 'images/parts_icons/temp/deluxe/tires.png',
					transmissionBasicDeluxe: 'images/parts_icons/temp/deluxe/transmission_basic.png',
					transmissionHeavyDeluxe: 'images/parts_icons/temp/deluxe/transmission_heavy.png',
					transmissionMediumDeluxe: 'images/parts_icons/temp/deluxe/transmission_medium.png',
					// standard
					bucketStandard: 'images/parts_icons/temp/standard/bucket.png',
					engineHeavyStandard: 'images/parts_icons/temp/standard/engine_heavy.png',
					engineMediumStandard: 'images/parts_icons/temp/standard/engine_medium.png',
					engineBasicStandard: 'images/parts_icons/temp/standard/engine_basic.png',
					headlightsStandard: 'images/parts_icons/temp/standard/headlights.png',
					heaterStandard: 'images/parts_icons/temp/standard/heater.png',
					powerTakeoffStandard: 'images/parts_icons/temp/standard/power_take_off.png',
					quickCouplerStandard: 'images/parts_icons/temp/standard/quick_coupler.png',
					threePointHitchStandard: 'images/parts_icons/temp/standard/three_point_hitch.png',
					tiresStandard: 'images/parts_icons/temp/standard/tires.png',
					transmissionBasicStandard: 'images/parts_icons/temp/standard/transmission_basic.png',
					transmissionHeavyStandard: 'images/parts_icons/temp/standard/transmission_heavy.png',
					transmissionMediumStandard: 'images/parts_icons/temp/standard/transmission_medium.png',					// parts icons
					// discount
					bucketDiscount: 'images/parts_icons/temp/discount/bucket.png',
					engineHeavyDiscount: 'images/parts_icons/temp/discount/engine_heavy.png',
					engineMediumDiscount: 'images/parts_icons/temp/discount/engine_medium.png',
					engineBasicDiscount: 'images/parts_icons/temp/discount/engine_basic.png',
					headlightsDiscount: 'images/parts_icons/temp/discount/headlights.png',
					heaterDiscount: 'images/parts_icons/temp/discount/heater.png',
					powerTakeoffDiscount: 'images/parts_icons/temp/discount/power_take_off.png',
					quickCouplerDiscount: 'images/parts_icons/temp/discount/quick_coupler.png',
					threePointHitchDiscount: 'images/parts_icons/temp/discount/three_point_hitch.png',
					tiresDiscount: 'images/parts_icons/temp/discount/tires.png',
					transmissionBasicDiscount: 'images/parts_icons/temp/discount/transmission_basic.png',
					transmissionHeavyDiscount: 'images/parts_icons/temp/discount/transmission_medium.png',
					transmissionMediumDiscount: 'images/parts_icons/temp/discount/transmission_heavy.png',
					// optional
					autoPilot: 'images/parts_icons/temp/optional/auto_pilot.png',
					flameDecal: 'images/parts_icons/temp/optional/flame_decal.png',
					gps: 'images/parts_icons/temp/optional/gps.png',
					stainlessExhaust: 'images/parts_icons/temp/optional/stainless_exhaust.png',
					track: 'images/parts_icons/temp/optional/track.png',
					// machine view part sections
					tiresGrey: 'images/parts/tires_grey.gif',
					tiresGreen: 'images/parts/tires_green.gif',
					tiresOrange: 'images/parts/tires_orange.gif',
					tiresRed: 'images/parts/tires_red.gif',
					engineGrey: 'images/parts/engine_grey.gif',
					engineGreen: 'images/parts/engine_green.gif',
					engineOrange: 'images/parts/engine_orange.gif',
					engineRed: 'images/parts/engine_red.gif',
					cabGrey: 'images/parts/cab_grey.gif',
					cabGreen: 'images/parts/cab_green.gif',
					cabOrange: 'images/parts/cab_orange.gif',
					cabRed: 'images/parts/cab_red.gif',
					
					// NOTIFICATIONS
					retailerGirl: 'images/notifications/retailer_girl.png',
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
					buttonEquipmentAdd: {
						url: 'images/icons/equipment_add.png',
						width: 175,
						height: 150,
						frames: 2
					},
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
					newTractorBasic: {
						url: 'images/screens/equipment_add/tractor_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					newSkidsteerBasic: {
						url: 'images/screens/equipment_add/skid_steer_basic.png',
						width: 310,
						height: 218,
						frames: 2
					},
					newTractorMedium: {
						url: 'images/screens/equipment_add/tractor_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					newSkidsteerMedium: {
						url: 'images/screens/equipment_add/skid_steer_medium.png',
						width: 310,
						height: 218,
						frames: 2
					},
					newTractorHeavy: {
						url: 'images/screens/equipment_add/tractor_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
					newSkidsteerHeavy: {
						url: 'images/screens/equipment_add/skid_steer_heavy.png',
						width: 310,
						height: 218,
						frames: 2
					},
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
			defaultScreen: 'home',
			dynamicViews: dynamicViews,
			machineEditBackgrounds: machineEditBackgrounds,
			machinePartIconConfig: machinePartIconConfig,
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
							// x: 0,
							// y: 0,
							// attrs: {
							// 	width: gameW,
							// 	height: gameH
							// }
							x: -(gameW * 0.816),
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
						// 	    font: (fontSizes.lg + 'px Arial'),
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
						// bg
						bg: {
							type: 'sprite',
							name: 'background',
							img: 'factoryDetailBg',
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
											name: 'newTractorBasic',
											img: 'newTractorBasic',
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
											name: 'newTractorMedium',
											img: 'newTractorMedium',
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
											name: 'newTractorHeavy',
											img: 'newTractorHeavy',
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
											name: 'newSkidsteerBasic',
											img: 'newSkidsteerBasic',
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
											name: 'newSkidsteerMedium',
											img: 'newSkidsteerMedium',
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
											name: 'newSkidsteerHeavy',
											img: 'newSkidsteerHeavy',
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
						// parts group
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
									    font: (fontSizes.lg + 'px Arial'),
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
									    font: (fontSizes.sm + 'px Arial'),
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
									    font: (fontSizes.md + 'px Arial'),
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
									x: (gameW/2) - (gameUnit * 2),
									y: gameH - (gameUnit * 1),
									attrs: {
										width: gameUnit * 1.5,
										height: gameUnit * 0.5
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
										width: gameUnit * 1.5,
										height: gameUnit * 0.5
									},
									callback: gameLogic.global.buttonCallbacks.minusButton,
									context: this,
									frames: [0, 1, 1, 0]
								}
							}
						},
						factoryDetailGroup: {
							type: 'group',
							name: 'factoryDetailGroup',
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
								addEquipmentButton: {
									type: 'button',
									name: 'buttonEquipmentAdd',
									img: 'buttonEquipmentAdd',
									x: (gameW/2) - (controlButtons.width/2),
									y: gameH - (gameUnit * 1.66),
									attrs: {
										width: controlButtons.width,
										height: controlButtons.height
									},
									callback: gameLogic.global.buttonCallbacks.addEquipment,
									context: this,
									frames: [0, 1, 1, 0]
								}
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
			}
		};
		callback.call(context, config);
	};
	return module;
}();