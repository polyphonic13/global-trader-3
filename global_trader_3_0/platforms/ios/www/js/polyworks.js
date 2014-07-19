/*! polyworksjs v0.1.0 2014-07-19T14:05:01 */
var PWG = {};

// LOGGING
function trace(message) {
	if (typeof console === "undefined" || typeof console.log === "undefined") {
		console = { log:function(){} };
	} else {
		PWG.Utils.each(arguments,
			function(a) {
				console.log(a);
			},
			this
		);
	}
}


PWG.Stage = function() {
	var _aspectRatio = [16, 9];
	var _maxHeight = 800;
	var _windowListeners = false;
	var _center;
	var _callback;
	var _context; 
	
	var module = {
		winW: 0,
		winH: 0,
		gameW: 0,
		gameH: 0,
		gameX: 0,
		gameY: 0,
		unit: 0,

		init: function(aspectRatio, maxHeight, resizable, callback, context) {
			if(typeof(aspectRatio) !== 'undefined') {
				_aspectRatio = aspectRatio;
			}
			if(typeof(maxHeight) !== 'undefined') {
				_maxHeight = _maxHeight;
			}
			_callback = callback;
			_context = context || window;

			_calculateSizes();

			if(resizable) {
				window.addEventListener('resize', function(event) {
					_onSizeChange(event);
					// _calculateSizes();
				});
				window.addEventListener('orientationchagne', function(event) {
					_onSizeChange(event);
					// _calculateSizes();
				});
			}

			if(_callback) {
				_callback.call(_context);
			}
		},

		destroy: function() {
			if(_windowListeners) {
				window.removeEventListener('resize', function(event) {
					_onSizeChange(event);
				});
				window.removeEventListener('orientationchagne', function(event) {
					_onSizeChange(event);
				});
			}
		}
	};
	
	function _calculateSizes() {
		module.winW = document.documentElement.clientWidth;
		module.winH = document.documentElement.clientHeight;

		module.gameH = (module.winH > _maxHeight) ? _maxHeight : module.winH;
		module.gameW = ((module.winH/_aspectRatio[1]) * _aspectRatio[0]);
		
		if(module.gameW > module.winW) {
			module.gameW = module.winW;
			module.gameH = (module.gameW/_aspectRatio[0]) * _aspectRatio[1];
		}

		module.unit = module.gameH/_aspectRatio[1];
		module.gameX = (module.winW/2) - (module.gameW/2);
		module.gameY = (module.winH/2) - (module.gameH/2);

		// trace('\nwinW = ' + module.winW + ', winH = ' + module.winH + '\ngameW = ' + module.gameW + ', gameH = ' + module.gameH + '\nunit = ' + module.unit + '\ngameX = ' + module.gameX + ', gameY = ' + module.gameY);

		var loadingWidth = module.winW - 80;
		var loadingHeight = module.winH - 80;

		var loadingDiv = document.getElementById('loading');
		var containerDiv = document.getElementById('game_container');

		if(loadingDiv) _sizeAndPositionDiv(loadingDiv, loadingWidth, loadingHeight, 0, 0);
		if(containerDiv) _sizeAndPositionDiv(containerDiv, module.gameW, module.gameH, module.gameX, module.gameY);

	}


	function _sizeAndPositionDiv(div, width, height, left, top) {
		// trace('Stage/_sizeAndPositionDiv, div = ', div, '\twidth = ' + width + ', height = ' + height + '\n\tleft = ' + left + ', top = ' + top);
		div.style.width = width + 'px';
		div.style.height = height + 'px';
		div.style.left = left + 'px';
		div.style.top = top + 'px';
		div.style.display = 'block';
	}

	function _onSizeChange(event) {
		var containerDiv = document.getElementById('game_container');
		var left = (module.winW/2) - (module.gameW/2);
		var top = (module.winH/2) - (module.gameH/2);
		containerDiv.style.left = left + 'px';
		containerDiv.style.top = top + 'px';
	}

	return module;
}();


PWG.Storage = function() {
	var _listeners = [];
	
	var module = {};
	
	module.get = function(key) {
		if(_available) {
			if(!localStorage[key]) return;
			return JSON.parse(localStorage[key]);
		}
	};
	
	module.set = function(params) {
		if(_available) {
			// trace('Storage, about to set saved data with: ', params);
			for(var key in params) {
				if(params[key] instanceof Object || params[key] instanceof Array) {
					params[key] = JSON.stringify(params[key]);
				}
				// trace('Storage, about to set ' + key + ', to value ' + params[key]);
				localStorage[key] = params[key];
			}
		}
	};
	
	module.remove = function(prop) {
		if(_available) {
			localStorage.removeItem(prop);
		}
	};
	
	module.destroy = function() {
		// trace('Storage/destroy');
		localStorage.clear();
	};
	
	module.addListener = function(listener) {
		if(_available) {
			var attachNotAdd = false;
			if(window.addEventListener) {
				window.addEventListener('module', listener, false);
			} else {
				window.attachEvent('onmodule', listener);
				attachNotAdd = true;
			}
			_listeners.push(listener);
		}
	};
	
	module.removeListener = function(listener) {
		if(_available) {
			var length = _listeners.length;
			for(var i = 0; i < length; i++) {
				if(_listeners[i].listener === listener) {
					if(window.removeEventListener) {
						window.removeEventListener('module', listener, false);
					} else {
						window.detachEvent('onmodule', listener);
					}
					_listeners = _listeners.splice(i, 1);
					break;
				}
			}
		}
	};
	
	module.shutdown = function() {
		var length = _listeners.length;
		for(var i = 0; i < length; i++) {
			if(window.removeEventListener) {
				window.removeEventListener('module', listener, false);
			} else {
				window.detachEvent('onmodule', listener);
			}
		}
	};
	
	function _supportsLocalStorage() {
		try {
			// trace('STORAGE AVAILABLE');
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch(e) {
			// trace('STORAGE NOT AVAILABLE');
			return false;
		}
	}
	var _available = _supportsLocalStorage();
	
	return module;
}();


PWG.Utils = function() {
	var module = {};

	module.each = function(list, callback, context) {
		if(Array.isArray(list)) {
			var length = list.length;
			for(var i = 0; i < length; i++) {
				callback.call(context, list[i], i, list);
			}
		} else {
			for(var key in list) {
				callback.call(context, list[key], key, list);
			}
		}
	};
	
	module.clone = function(obj) {
	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        var copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        var copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = PWG.Utils.clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        var copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = PWG.Utils.clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");	
	};

	module.extend = function(a, b) {
		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		} 
		return a;
	};

	module.extract = function(obj, prop) {
		var a = obj[prop];
		if(obj !== window) { delete obj[prop]; }
		return a;
	};

	module.has = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
	
	module.objLength = function(obj) {
		var length = 0;
		for(var key in obj) {
			// if(obj.hasOwnProperty(key)) { length++; }
			if(PWG.Utils.has(obj, key)) { length++; }
		}
		return length;
	};

	module.randomProperty = function(obj) {
	    var keys = Object.keys(obj);
	    return obj[keys[keys.length * Math.random() << 0]];
	};
	
	module.randomKey = function(obj) {
		var keys = Object.keys(obj);
		return [keys[keys.length * Math.random() << 0]];
	};
	
	module.mixin = function(c, p) {
	    for(var k in p) if(p[k]) c[k] = p[k];
	};

	module.bind = function(o, f) {
	    return function() { return f.apply(o, arguments); };
	};

	module.inherit = function(c, p) {
	    this.mixin(c, p);
	    function f() { this.constructor = c; };
	    f.prototype = c._super = p.prototype;
	    c.prototype = new f();
	};

	module.isInView = function(pos) {
		if(pos.x > 0 && pos.x < stageConfig.width && pos.y > 0 && pos.y < stageConfig.height) {
			return true;
		} else {
			return false;
		}
	};
	
	module.parseMarkup = function(str, reference, encodeMarkup) {
		var parsedString = str;
		// trace('Utils/parseMarkup, str = ' + str + ', reference = ', reference);

		if(str.indexOf('~{') > -1) {
			var pattern = /~\{[A-Z]*\}~/gi;
			var patternMatch = str.match(pattern);
			if(patternMatch) {
				for (var matchNum in patternMatch) {
					var match = String(patternMatch[matchNum]);

					var matchLength = match.length;
					var matchKey = match.substring(2, matchLength - 2);
					var output = reference[matchKey];
					if(encodeMarkup) {
						output = encodeURIComponent(output);
					}
					// trace('output = ' + output);
					if(output === undefined || output === null) {
						output = match;
					} else {
						output = output.toString();
					}
					parsedString = parsedString.replace(match, output);
				}
				//// trace(parsedString);
			} else {
				parsedString = null;
			}
		}

		return parsedString;
	};
	
	module.loadScript = function(url, evt) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');

        if(scriptTag.readyState) {
            scriptTag.onreadystatechange = function() {
                if(scriptTag.readyState == 'loaded' || scriptTag.readyState == 'complete') {
                    // callback.call(evt);
					PWG.EventCenter.trigger(evt);
                }
            };
        } else {
            scriptTag.onload = function() {
                // callback.call(evt);
				PWG.EventCenter.trigger(evt);
            };
        }
        scriptTag.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
	};

	module.diceRoll = function(sides) {
		var s = sides || 6;
		return Math.floor(Math.random() * s) + 1;
	};

	module.formatMoney = function(n, c, d, t){
		var c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
	
	return module;
}();


PWG.Initializer = function(){
	
	var standardMethods = {
		hide: function() {
			this.view.visible = false;
		},
		show: function() {
			this.view.visible = true;
		},
		destroy: function() {
			this.view.destroy(true);
		}
	};
	
	var module = {};
	
	module.setViewAttributes = function(attrs, view) {
		if(attrs) {
			PWG.Utils.each(
				attrs,
				function(attr, key) {
					view[key] = attr;
				},
				this
			);
		}
	};
	
	module.addStandardMethods = function(controller) {
		PWG.Utils.each(
			standardMethods,
			function(method, key) {
				controller.prototype[key] = method;
			},
			this
		);
	};
	
	return module;
}();

PWG.GridGenerator = function() {
	var module = {};
	
	module.createSquare = function(cells, dimension) {
		return module.createRectangle(cells, cells, dimension, dimension);
	};
	
	module.createRectangle = function(xLength, yLength, xDimension, yDimension) {
		// trace('--------------- createRectangle\n\txLength = ' + xLength + '\n\tyLength = ' + yLength + '\n\txDimension = ' + xDimension + '\n\tyDimension = ' + yDimension);
		var grid = [];
		var cell;

		for(var y = 0; y < yLength; y++) {
			for(var x = 0; x < xLength; x++) {
				cell = {
					start:{
						x: (x * xDimension),
						y: (y * yDimension)
					},
					center: {
						x: ((x + 1) * xDimension) - (xDimension/2),
						y: ((y + 1) * yDimension) - (yDimension/2)
					},
					end: {
						x: ((x + 1) * xDimension),
						y: ((y + 1) * yDimension)
					}
				};
				grid.push(cell);
			}
		}
		// trace('grid generator returning: ', grid);
		return grid;
	};
	
	return module;
}();

var alphabet = {
	UPPER: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	],
	LOWER: [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	]
};

PWG.InputCodes = {
	PLAY: 1,
	LEVEL: 76,		// l
	NEXT: 78,		// n
	PAUSE: 80,		// p
	MENU: 77,		// m
	RETRY: 82,		// r
 	RESET: 99, 		// invisible button
	LEFT: 37, 		// left arrow
	RIGHT: 39, 		// right arrow
	UP: 38,			// up arrow
	DOWN: 40,		// down arrow
	SPACE: 32,		// space bar
	QUIT: 81,		// q
	START: 83,		// s
	CLEAR_DATA: 67	// c
}


PWG.Events = {
	ZOOM_IN: 'zoomIn',
	ZOOM_OUT: 'zoomOut',
	QUIT: 'quit'
};

PWG.EventCenter = function() {

	var module = {};
	var _listeners = {}; 
	
	module.bind = function(type, callback, context) {
		var ctx = context || this;
		// trace('EventCenter/bind, type = ' + type);
		// trace(callback);
		if(!_listeners[type]) {
			_listeners[type] = [];
		}
		_listeners[type].push({ callback: callback, context: ctx });
		// trace('_listeners['+type+'] now = ');
		// trace(_listeners[type]);
	};
	
	module.batchBind = function(listeners, context) {
		PWG.Utils.each(
			listeners,
			function(listener) {
				PWG.EventCenter.bind(listener.event, listener.handler, context);
			},
			context
		);
	};
	
	module.trigger = function(params) {
		var list = _listeners[params.type];
		// trace('----- EventCenter/trigger, type = ' + params.type + ', list = ', list);
		if(list) {
			PWG.Utils.each(list,
				function(listener) {
					// trace('\t\tl = ', l);
					if(listener && listener.callback) { // in case callback is destroyed during course of trigger
						listener.callback.call(listener.context, params);
					}
				},
				this
			);
		}
	};
	
	module.unbind = function(type, callback) {
		var listeners = _listeners[type];
		if(listeners) {
			PWG.Utils.each(listeners,
				function(listener, idx) {
					if(listener && listener.callback === callback) {
						listeners.splice(idx, 1);
					}
				},
				this
			);
		}
	};

	module.batchUnbind = function(listeners, context) {
		PWG.Utils.each(
			listeners,
			function(listener) {
				PWG.EventCenter.unbind(listener.event, listener.handler, context);
			},
			context
		);
	};
	
	module.destroy = function() {
		// iterate thru _listeners object
		// for each type, remove all array elements
		// then delete type from _listeners
		PWG.Utils.each(_listeners,
			function(listener, key) {
				listener = [];
				delete _listeners[key];
			},
			this
		);
		// set entire _listeners array to []
		_listeners = [];
	};
	
	return module;
}();

PWG.PhaserScale = function() {
	var module = {};
	
	module.init = function(config) {
		// trace('PhaserScale/init, config = ', config);
		var scaleManager = PhaserGame.phaser.scale;

		if(config.fullScreen) {
			scaleManager.startFullScreen();
		}
		scaleManager.scaleMode = config.scaleMode;
		scaleManager.setShowAll();
		this.scaleManager = scaleManager;
		this.refresh();
	};
	
	module.refresh = function() {
		this.scaleManager.refresh();
	};
	
	return module;
}();

PWG.PhaserPositioner = function() {
	var module = {};
	
	module.set = function(params, view) {
		// trace('PhaserPositioner/set, params = ', params);
		if(params.centerX) {
			view.x = PWG.Stage.gameW/2 - view.width/2;
		} else if(params.centerToParentX) {
			view.x = (view.parent.width/2 - view.width/2) + view.parent.x;
		} else if(params.x) {
			view.x = x;
		}
		if(params.centerY) {
			view.y = PWG.Stage.gameH/2 - view.height/2;
		} else if(params.centerToParentY) {
			view.y = (view.parent.height/2 - view.height/2) + view.parent.y;
		} else if(params.y) {
			view.y = y;
		}
	};
	
	return module; 
}();

PWG.PhaserAnimation = function() {
	
	var module = {};

	function AnimationController(config, controller) {
		// trace('AnimationController\n\tconfig = ', config, '\tcontroller = ', controller)
		this.config = config;
		this.controller = controller;
		this.name = controller.name;

		this.animations = config.animations;

		PWG.Utils.each(
			this.animations,
			function(animation, key) {
				// trace('\tnow adding animation: ' + key, animation);
				controller.view.animations.add(key, animation.keyFrames, animation.frameRate);
			},
			this
		);

		// trace('\tanimations now = ', controller.view.animations);

		if(config.defaultAnimation) {
			var animation = this.animations[config.defaultAnimation];
			this.play(config.defaultAnimation);
		} else {
			controller.view.frame = 0;
		}
		this.currentAnimation = config.defaultAnimation || '';
	}

	AnimationController.prototype.play = function(name, killOnComplete) {
		// trace('AnimationController/play, name = ' + name);
		if(name !== this.currentAnimation) {
			var kill = killOnComplete || false;
			var animation = this.animations[name];
			// trace('\tgoing to call play on it');
			this.controller.view.animations.play(name, animation.frameRate, animation.looped, kill);
			this.currentAnimation = name;
		}
	};

	AnimationController.prototype.gotoFrame = function(frame) {
		this.controller.view.frame = frame;
	};

	AnimationController.prototype.stop = function() {
		this.controller.view.animations.stop();
		this.currentAnimation = '';
	};

	module.AnimationController = AnimationController;

	module.controllers = {};

	module.addAnimations = function(config, viewController) {
		var controller = new AnimationController(config, viewController); 
		module.controllers[controller.name] = controller;
	};

	module.play = function(view, animation, killOnComplete) {
		if(module.controllers.hasOwnProperty(view)) {
			module.controllers[view].play(animation, killOnComplete);
		}
	};

	module.gotoFrame = function(view, frame) {
		if(module.controllers.hasOwnProperty(view)) {
			module.controllers[view].gotoFrame(frame);
		}
	};

	module.stop = function(view) {
		if(module.controllers.hasOwnProperty(view)) {
			module.controllers[view].stop();
		}
	};

	return module;
}();

PWG.PhaserPhysics = function() {
	var module = {};

	module.controllers = [];
	
	function PhysicsController(config, controller) {
		this.config = config;
		this.controller = controller;
		this.name = controller.name;

		var physics = config.physics;

	 	PWG.Utils.each(
			config.physics,
			function(attr, key) {
				controller.view.body[key] = attr;
			},
			this
		);

		// if(!physics.deferredGravity && !physics.immovable) {
		// 	if(!physics.gravity) {
		// 		controller.view.body.gravity = PhaserGame.get('gravity');
		// 	}
		// }
		module.controllers.push(this);
	}
	
	PhysicsController.prototype.checkCollision = function(target) {
		module.physics.collide(this.controller.view, target);
	};
	
	PhysicsController.prototype.checkOverlap = function(target, callback, context) {
		var ctx = context || this.controller.view;
		module.physics.overlap(
			this.controller.view, 
			target, 
			function(view, target) {
				callback.call(ctx, view, target);
			},
			null,
			this.controller.view
		);
	};
	
	PhysicsController.prototype.deactivateGravity = function() {
		var view = this.controller.view;
		view.exists = false;
		view.allowGravity = false;
		view.body.gravity = 0;
	};
	
	PhysicsController.prototype.activateGravity = function() {
		var view = this.controller.view;
		if(this.config.deferredGravity) {
			var gravity = (this.config.physics.gravity) ? this.config.physics.gravity : PhaserGame.get('gravity');
			view.body.gravity = gravity;
		}
		view.allowGravity = true;
		view.exists = true;
	};
	
	module.PhysicsController = PhysicsController; 
	
	module.init = function() {
		module.physics = PhaserGame.phaser.physics; 
	};
	
	module.checkAllCollisions = function(targets) {
		PWG.Utils.each(
			module.controllers,
			function(controller) {
				module.checkCollisions(controller, targets);
			},
			this
		);
	};
	
	module.checkCollisions = function(controller, targets) {
		module.checkPhysics('checkCollision', controller, targets, null, null);
	};
	
	module.checkAllOverlaps = function(targets, callback, context) {
		PWG.Utils.each(
			module.controllers,
			function(controller) {
				module.checkOverlaps(controller, targets, callback, context);
			},
			this
		);
	};
	
	module.checkOverlaps = function(controller, targets) {
		module.checkPhysics('checkOverlap', controller, callback, context);
	};
	
	module.checkPhysics = function(method, controller, callback, context) {
		context = context || controller;
		if(targets instanceof Array) {
			PWG.Utils.each(
				targets,
				function(target) {
					controller[method].call(context, target, callback, context);
				},
				this
			);
		} else {
			controller[method].call(context, target, callback, context);
		}
	};
	
	return module;
}();

PWG.PhaserTileMap = function() {
	var module = {};

	var _map;
	var _layer;
	var _layers = {};
	var _marker;
	var _currentTile;

	function TileMapController(config) {
		// trace('TileMapTileMapController['+config.name+']/constructor, config = ', config);
		this.config = config;


		this.phaser = PhaserGame.phaser;
		_map = this.phaser.add.tilemap('greyTilesMap');

		// _map.addTilesetImage('test1', 'greyTiles');
		_map.addTilesetImage('factory_tileset', 'greyTiles');

		_currentTile = _map.getTile(2, 3);


		if (config.layers) {
			var layerName;
			PWG.Utils.each(
			config.layers, function(layer) {
				// trace('\tmaking layer['+layer.name+']: ', layer);
				_layers[layer.name] = _map.createLayer(layer.name);
				PWG.Initializer.setViewAttributes(layer.attrs, layer);
				if (layer.resizeWorld) {
					_layers[layer.name].resizeWorld();
				}
				layerName = layer.name;
			}, this);
			this.currentLayer = config.defaultLayer || layerName;
		}

		// painting marker thing
		_marker = this.phaser.add.graphics();
		_marker.lineStyle(2, 0xff0000, 1);
		_marker.drawRect(0, 0, 2, 2);
		this.view = _map;
		this.view.name = this.name = config.name;

		PWG.Initializer.setViewAttributes(config.attrs, this.view);

		PWG.EventCenter.bind(PWG.Events.ZOOM_IN, this.onZoomIn, this);
		PWG.EventCenter.bind(PWG.Events.ZOOM_OUT, this.onZoomOut, this);

/*
		// this.view.inputEnabled = true;
		// this.view.onInputDown.add(this.onInputDown, this);
	    var tileSelector = this.phaser.add.group();

	    var tileSelectorBackground = this.phaser.make.graphics();
	    tileSelectorBackground.beginFill(0x000000, 0.5);
	    tileSelectorBackground.drawRect(0, 0, 800, 34);
	    tileSelectorBackground.endFill();

	    tileSelector.add(tileSelectorBackground);

	    var tileStrip = tileSelector.create(1, 1, 'grey_tiles');
	    tileStrip.inputEnabled = true;
	    tileStrip.events.onInputDown.add(this.pickTile, this);

	    tileSelector.fixedToCamera = true;
*/
	};

	TileMapController.prototype.onInputDown = function(event) {
		// trace('TileMapController/onInputDown, event = ' + event);
	};

	TileMapController.prototype.onZoomIn = function(event) {
		this.zoomLayers(false, event.allLayers);
	};

	TileMapController.prototype.onZoomOut = function(event) {
		this.zoomLayers(true, event.allLayers);
	};

	TileMapController.prototype.zoomLayers = function(out, allLayers) {
		if (allLayers) {
			PWG.Utils.each(
			_layers, function(layer) {
				this.zoomLayer(layer, out);
			}, this);
		} else {
			this.zoomLayer(_layers[this.currentLayer], out);
		}
	};

	TileMapController.prototype.zoomLayer = function(layer, out) {
		var zoomCeil = this.view.zoomCeil;
		var zoomFloor = this.view.zoomFloor;
		var zoomFactor = this.view.zoomFactor;
		// trace('zoomLayer, out = ' + out, 'layer = ', layer, 'zoomFloor = ' + zoomFloor + ', zoomCeil = ' + zoomCeil);
		if (out) {
			if (layer.scale.x > zoomFloor) {
				// trace('\t\tzooming out');
				layer.scale.x -= zoomFactor;
				layer.scale.y -= zoomFactor;
			}
		} else {
			if (layer.scale.x < zoomCeil) {
				// trace('\t\tzooming in');
				layer.scale.x += zoomFactor;
				layer.scale.y += zoomFactor;
			}
		}
	};

	TileMapController.prototype.update = function() {
		// trace('TileMapTileMapController/update, this = ', this);
		// _marker.x = _layer.getTileX(this.phaser.input.activePointer.worldX) * 32;
		// _marker.y = _layer.getTileY(this.phaser.input.activePointer.worldY) * 32;
		// _marker.x = _layer.getTileX(this.phaser.input.activePointer.worldX) * 31;
		// _marker.y = _layer.getTileY(this.phaser.input.activePointer.worldY) * 31;
		var pointerX = _marker.x = this.phaser.input.activePointer.worldX;
		var pointerY = _marker.y = this.phaser.input.activePointer.worldY;

		if (this.phaser.input.mousePointer.isDown) {
			var layer = _layers[this.currentLayer];
			// trace('mouse pointer down');
			if (this.phaser.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
				_currentTile = _map.getTile(layer.getTileX(_marker.x), layer.getTileY(_marker.y));
				// trace('\tshift down, _currentTile = ', _currentTile);
			} else {
				if (_map.getTile(layer.getTileX(_marker.x), layer.getTileY(_marker.y)) != _currentTile) {
					// trace('putting a tile in a new location');
					_map.putTile(_currentTile, layer.getTileX(_marker.x), layer.getTileY(_marker.y));
				}
			}
		}
	};
	// TileMapController.prototype.onInputDown = function(sprite, pointer) {
	// 	// trace('TileMapTileMapController/onInputDown, sprite = ', sprite, '\tpointer = ', pointer);
	// 	this.pickTitle(sprite, pointer);
	// };
	// 
	// TileMapController.prototype.pickTile = function(sprite, pointer) {
	//     currentTile = PhaserGame.this.phaser.math.snapToFloor(pointer.x, this.config.cellSize) / this.config.cellSize;
	// 	// trace('TileMapTileMapController/pickTile, currentTile = ', currentTile);
	// };
	PWG.Initializer.addStandardMethods(TileMapController);

	module.build = function(tilemaps) {
		// trace('PhaserTileMap/build');
		var collection = {};
		PWG.Utils.each(
		tilemaps, function(tilemap) {
			collection[tilemap.name] = new PWG.PhaserTileMap.TileMapController(tilemap);
		}, this);
		return collection;
	};

	module.update = function(controllers) {
		PWG.Utils.each(
		controllers, function(controller) {
			controller.update();
		}, this);
	};

	module.TileMapController = TileMapController;

	return module;
}();


PWG.PhaserGroup = function() {
	var module = {};
	
	function Controller(config) {
		// trace('GroupController['+config.name+']/constructor, views = ', config.views);
		this.name = config.name;
		this.config = config;
		this.view = PhaserGame.phaser.add.group();

		PWG.Initializer.setViewAttributes(config.attrs, this.view);

		// create children collection
		this.children = PWG.DisplayFactory.createPhaserViews(config.views);
		// trace('\tchildren = ', this.children);

		// loop through children collection and add to group
		PWG.Utils.each(
			this.children,
			function(child) {
				// trace('\t\tchild = ', child);
				this.view.add(child.view);
			},
			this
		);
	}
	
	Controller.prototype.remove = function(child) {
		this.view.remove(child);
		delete this.children[child];
	};
	
	Controller.prototype.removeAll = function() {
		// trace('GroupController['+this.name+']/remove, children = ', this.children);
		this.view.removeAll();
		PWG.Utils.each(
			this.children,
			function(child) {
				delete this.children[child];
			}
		)
	};

	PWG.Initializer.addStandardMethods(Controller);
	
	module.Controller = Controller; 
	
	return module;
}();

PWG.ViewManager = function() {
	var viewTypes = {
		SPRITE: 'sprite',
		TEXT: 'text',
		BUTTON: 'button',
		GROUP: 'group'
	};
	
	var module = {};
	
	function ViewController(config, name) {
		// trace('ViewController['+config.name+']/constructor, type = ' + config.type + ', name = ' + name);
		this.name = name;
		this.config = config;

		switch(config.type) {
			case viewTypes.SPRITE:
			this.view = PhaserGame.phaser.add.sprite(config.x, config.y, config.img);
			break;

			case viewTypes.TEXT:
			this.view = PhaserGame.phaser.add.text(config.x, config.y, config.text, config.style);
			break;

			case viewTypes.BUTTON:
			this.view = PhaserGame.phaser.add.button(config.x, config.y, config.img, config.callback, config.context, config.frames[0], config.frames[0], config.frames[1], config.frames[0]);
			break;

			case viewTypes.GROUP: 
			this.view = PhaserGame.phaser.add.group();
			break; 

			default: 
			// trace('warning, unknown view type: ' + config.type);
			break;
		}

		this.set(config.attrs);

		if(config.position) {
			PWG.PhaserPositioner.set(config.position, this.view);
		}

		if(config.input) {
			this.inputController = new PWG.PhaserInput.InputController(config.input, this);
		}

		if(config.physics && this.view.body) {
			this.physicsController = new Polworks.PhaserPhysics.PhysicsController(config.physics, this);
		}

		if(config.animation) {
			PWG.PhaserAnimation.addAnimations(config.animation, this);
		}

		this.view.name = this.name = config.name;
	};
	
	ViewController.prototype.update = function() {
		if(this.view.update) {
			this.view.update();
		}
	};
	
	ViewController.prototype.set = function(params) {
		// trace('ViewController/set, view = ', this.view);
		PWG.Utils.each(
			params,
			function(param, key) {
				// trace('\tparam['+key+'] = ' + param);
				this.view[key] = param;
			},
			this
		);
	};
	
	ViewController.prototype.callMethod = function(method, args) {
		// trace('ViewController['+this.name+']/callMethod, method = ' + method + '\n\targs = ' + args);
		if(this.view[method]) {
			// trace('\tview has method, ', this.view);
			this.view[method](args);
		}
		if(method === 'setText' && this.config.position) {
			PWG.PhaserPositioner.set(this.config.position, this.view);
		}	
	};
	
	ViewController.prototype.hide = function() {
		// trace('ViewController, hide, this = ', this);
		if(this.children) {
			PWG.Utils.each(
				this.children,
				function(child) {
					// trace('\thiding child: ', child);
					child.hide();
				},
			this
			);
		}
		this.view.visible = false;
	};
	
	ViewController.prototype.show = function() {
		if(this.children) {
			PWG.Utils.each(
				this.children,
				function(child) {
					// trace('\tshowing child: ', child);
					child.show();
				},
			this
			);
		}		this.view.visible = true;
	};
	
	// groups only
	ViewController.prototype.removeChild = function(id) {
		if(this.config.type === viewTypes.GROUP) {
			if(this.children[id]) {
				// remove phaser view from group
				this.view.remove(this.children[id].view);
				// remove controller from group controller's children
				delete this.children[id];
			}
		}
	};

	// groups only
	ViewController.prototype.removeAll = function() {
		if(this.type === viewTypes.GROUP) {
			PWG.Utils.each(
				this.children,
				function(child) {
					this.view.remove(id);
					delete this.children[id];
				},
				this
			);
		}
	};
	
	ViewController.prototype.destroy = function() {
		if(this.view.destroy) {
			this.view.destroy();
		}
	};
	
	module.ViewController = ViewController;
	
	module.currentGroup = '';
	module.collection = {};
	
	module.init = function(views) {
		this.collection = this.build(views);
		// trace('ViewManager/init, collection = ', this.collection);
	};
	
	module.build = function(views, collection) {
		// trace('ViewManager/factory, views = ', views);
		var collection = collection || {};

		PWG.Utils.each(views,
			function(view, key) {
				// trace('\tview.type = ' + view.type);
				var child = new PWG.ViewManager.ViewController(view, key);
				if(view.type === viewTypes.GROUP) {
					child.children = PWG.ViewManager.build(view.views);
					PWG.ViewManager.initGroup(child);
				}
				collection[view.name] = child;
			},
			this
		);
		// trace('ViewManager, end build, collection = ', collection);
		return collection;
	};
	
	module.initGroup = function(controller) {
		// trace('ViewManager/initGroup, controller = ', controller);
		PWG.Utils.each(
			controller.children,
			function(child) {
				// trace('\tchild = ', child);
				controller.view.add(child.view);
				child.group = controller;
			},
			this
		);

	};

	module.showGroup = function(name) {
		// trace('ViewManager/showGroup, name = ' + name + ', collection = ', this.collection);
		this.collection[name].show();
		this.currentGroup = name;
	};
	
	module.hideGroup = function(name) {
		this.collection[name].hide();
		this.currentGroup = '';
	};
	
	module.switchGroup = function(name) {
		if(name !== this.currentGroup) {
			if(this.currentGroup !== '') {
				this.hideGroup(this.currentGroup);
			}
			this.showGroup(name);
			this.currentGroup = name;
		}
	};
	
	module.hideAllGroups = function() {
		PWG.Utils.each(
			this.collection,
			function(child) {
				child.hide();
			},
			this
		);
	};
	
	module.addToGroup = function(children, group) {
		// trace('ViewManager/addToGroup, group = ', group, '\tchildren = ', children);
		PWG.Utils.each(
			children,
			function(child, key) {
				group.add(child.view);
				// group.children[key] = child;
			},
			this
		);
	};
	
	module.removeFromGroup = function(children, controller) {
		PWG.Utils.each(
			children,
			function(child, key) {
				controller.view.remove(child.view, true);
				delete controller.children[key];
			},
			this
		);
	};
	
	module.removeGroupChildren = function(path) {
		var controller = module.getControllerFromPath(path);
		// trace('view manager removeGroupChild, group = ', controller);
		module.removeFromGroup(controller.children, controller);
	};
	
	module.addView = function(view, parent, addToGroup) {
		// trace('ViewManager/addView, view.type = ' + view.type + ', view = ', view);
		var collection = (parent) ? parent.children : this.collection;

		var child = new PWG.ViewManager.ViewController(view, view.name);
		if(view.type === viewTypes.GROUP) {
			child.children = PWG.ViewManager.build(view.views);
			PWG.ViewManager.initGroup(child);
		}
		collection[view.name] = child;

		// trace('POST ADD, collection = ', collection);
		if(addToGroup) {
			PWG.ViewManager.initGroup(parent);
			// parent.view.add(child.view);
			// the parent was passed and is a group type view controller
			// PWG.ViewManager.addToGroup(view, parent.view);
		}

		return child;
		
/*
		trace('ViewManager/addView, view.type = ' + view.type + ', view = ', view);
		var collection;
		if(path) {
			collection = PWG.ViewManager.getControllerFromPath(path).children;
		} else {
			collection = this.collection;
		}

		var child = new PWG.ViewManager.ViewController(view, view.name);
		if(view.type === viewTypes.GROUP) {
			child.children = PWG.ViewManager.build(view.views);
			PWG.ViewManager.initGroup(child);
		}
		collection[view.name] = child;

		// trace('POST ADD, collection = ', collection);
		if(addToGroup) {
			PWG.ViewManager.initGroup(collection);
		}
		
		return child;
*/
	};
	
	module.removeView = function(name, path) {
		var collection = PWG.ViewManager.getControllerFromPath(path);
		// trace('PhaserVeiw/removeView, name = ' + name + ', collection = ', collection);
		if(collection.children.hasOwnProperty(name)) {
			collection.children[name].view.destroy();
			delete collection.children[name];
		}
	};
	
	module.showView = function(path) {
		var controller = this.getControllerFromPath(path);
		// trace('show view, controller is: ', controller);
		controller.show();
	};
	
	module.hideView = function(path) {
		// trace('hideView: ' + path);
		var controller = this.getControllerFromPath(path);
		// trace('\thiding: ', controller);
		controller.hide();
	};
	
	module.callMethod = function(path, method, args) {
		// trace('ViewManager/callViewMethod\n\tpath: ' + path + '\n\tmethod: ' + method + '\n\targs: ' + args);
		var controller = this.getControllerFromPath(path);
		// trace('calling method ' + method + 'with args: ', args, ' on ', controller);
		controller.callMethod(method, args);
	};

	module.swapDepths = function(path, child1, child2) {
		var parent = this.getControllerFromPath(path);
		// trace('parent = ' + parent);
	};
	
	module.setChildFrames = function(path, frame) {
		var parent = this.getControllerFromPath(path);
		PWG.Utils.each(
			parent.children,
			function(child) {
				child.view.frame = frame;
			},
			this
		);
	};
	
	module.setFrame = function(path, frame) {
		// trace('ViewManager/setFrame, path = ' + path + ', frame = ' + frame);
		var controller = this.getControllerFromPath(path);
		controller.view.frame = frame;
	};
	
	module.getControllerFromPath = function(path) {
		// trace('ViewManager/getControllerFromPath, path = ' + path + ', collection = ', this.collection);
		var chain = path.split(':');
		var length = chain.length;
		var controller = this.collection[chain[0]];
		// trace('\tcontroller = ', controller);
		for(var i = 1; i < length; i++) {
			// trace('\tchain['+i+'] = ' + chain[i] + ', controller now = ', controller);
			controller = controller.children[chain[i]];
		}
		return controller;
	};
	
	module.update = function(controllers) {
		PWG.Utils.each(
			controllers,
			function(controller) {
				controller.update();
			},
			this
		);
	};

	return module;
}();

PWG.ScreenManager = function() {
	var module = {};
	
	function ScreenController(id, config) {
		this.id = id;
		this.config = config;
	};
	
	ScreenController.prototype.create = function() {
		// trace('ScreenController['+this.id+']/create');
		if(this.config.listeners) {
			PWG.EventCenter.batchBind(this.config.listeners, this);
		}
		if(this.config.create) {
			this.config.create.apply(this, arguments);
		}
	};
	
	ScreenController.prototype.render = function() {
		if(this.config.render) {
			this.config.render.apply(this, arguments);
		}
	};
	
	ScreenController.prototype.update = function() {
		if(this.config.update) {
			this.config.update.apply(this, arguments);
		}
	};
	
	ScreenController.prototype.shutdown = function() {
		// trace('ScreenController['+this.id+']/shutdown');
		if(this.config.shutdown) {
			this.config.shutdown.apply(this, arguments);
		}
		if(this.config.listeners) {
			PWG.EventCenter.batchUnbind(this.config.listeners, this);
		}
	};
	
	module.ScreenController = ScreenController;
	
	module.currentId = '';
	module.screens = {};
	
	module.init = function(screens) {
		// trace('ScreenManager/init');
		PWG.Utils.each(
			screens,
			function(value, key) {
				// trace('\tcreating screen['+key+']');
				this.screens[key] = new ScreenController(key, value);
			},
			this
		);
	};
	
	module.changeScreen = function(id) {
		this.shutdown();
		this.currentId = id;
		this.create();
	};
	
	module.preload = function() {
		
	};
	
	module.create = function() {
		if(this.currentId !== '') {
			this.screens[this.currentId].create();
		}
	};
	
	module.update = function() {
		if(this.currentId !== '') {
			this.screens[this.currentId].update();
		}
	};
	
	module.render = function() {
		if(this.currentId !== '') {
			this.screens[this.currentId].render();
		}
	};
	
	module.shutdown = function() {
		if(this.currentId !== '') {
			this.screens[this.currentId].shutdown();
		}
	};
	
	return module;
}();

PWG.PhaserInput = function() {
	var module = {};
	var _controllers = {};
	
	function InputController(config, controller) {
		// trace('InputController/constructor, config = ', config, '\tcontroller = ', controller);
		this.config = config;
		this.controller = controller;
		this.name = controller.view.name;

		var view = controller.view;

		view.inputEnabled = true;

		PWG.Utils.each(
			this.config.attrs,
			function(attr, key) {
				view.input[key] = attr;
			},
			this
		);

		if(this.config.enableDrag) view.input.enableDrag(this.config.enableDrag);
		if(this.config.inputDown) view.events.onInputDown.add(this.inputDown, this);
		if(this.config.inputUp) view.events.onInputUp.add(this.inputUp, this);
		if(this.config.onDragStop) view.events.onDragStop.add(this.onDragStop, this);

		this.input = view.input;
	}
	
	InputController.prototype.enableDrag = function() {
		this.input.enableDrag();
	};
	
	InputController.prototype.enableSnap = function(args) {
		this.input.enableSnap(args);
		//	http://docs.phaser.io/Phaser.InputHandler.html#enableSnap
	};
	
	InputController.prototype.inputDown = function(event) {
		// trace('InputController['+this.name+']/inputDown, event = ', event, '\tconfig = ', this.config);
		if(this.config.inputDown) {
			this.config.inputDown.call(this);
		}
	};
	
	InputController.prototype.inputUp = function(event) {
		// trace('InputController['+this.name+']/inputUp, event = ', event, '\tconfig = ', this.config);
		if(this.config.inputUp) {
			this.config.inputUp.call(this);
		}
	};
	
	InputController.prototype.onDragStop = function(event) {
		// trace('InputController['+this.name+']/onDragStop, event = ', event, '\tconfig = ', this.config);
		if(this.config.onDragStop) {
			this.config.onDragStop.call(this);
		}
	};
	
	InputController.prototype.drag = function(event) {
		
	};
	
	function CameraDragger(config) {
		this.name = config.name;
		this.config = config;
		this.camera = null;
	};
	
	CameraDragger.prototype.update = function() {
	    this.dragCamera(PhaserGame.phaser.input.mousePointer);
	    this.dragCamera(PhaserGame.phaser.input.pointer1);
	};
	
	CameraDragger.prototype.dragCamera = function(pointer) {
	    if (!pointer.timeDown) { return; }
	    if (pointer.isDown && !pointer.targetObject) {

	        if (this.camera) {
				// trace('pointer is down and there is a camera, going to move it');
	            PhaserGame.phaser.camera.x += this.camera.x - pointer.position.x;
	            PhaserGame.phaser.camera.y += this.camera.y - pointer.position.y;
	        }
	        this.camera = pointer.position.clone();
	    }
	    if (pointer.isUp) { this.camera = null; }
	};
	
	module.InputController = InputController; 
	module.CameraDragger = CameraDragger;

	module.initKeyboard = function(controls) {
		// trace('--------- PhaserInput/initKeyboard, controls = ', controls);
		module.keys = {};
		
		PWG.Utils.each(
			controls,
			function(control) {
				var key;
				var input = {};
				// trace('\tadding control: ', control);
				key = PhaserGame.phaser.input.keyboard.addKey(control.code);
				if(control.inputDown) {
					// trace('\t\tadding input down: ', control.inputDown);
					// key.onDown.add(control.inputDown);
					input.inputDown = control.inputDown;
				}
				if(control.inputUp) {
					// trace('\t\tadding input up: ', control.inputUp);
					// key.onUp.add(control.inputUp);
					input.inputUp = control.inputUp;
				}
				module.keys[control.code] = {
					key: key,
					input: input
				};
			},
			this
		);
		// return keys;
	};
	
	module.updateKeyboard = function(controls) {
		// trace('PhaserInput/updateKeyboard');
		PWG.Utils.each(
			module.keys,
			function(control, id) {
				// trace('control['+id+']');
				if(control.key.isDown && control.input.inputDown) {
					// trace('control['+id+']/isDown');
					control.input.inputDown();
				}
				if(control.key.isUp && control.input.inputUp) {
					control.input.inputDown();
				}
			},
			this
		);
	};
	return module;
}();

PWG.PhaserTime = function() {
	var _timers = {};
	module = {};
	
	module.add = function(timer, delay, callback, context) {
		var t = timer || PhaserGame.phaser.time.events;
		t.add(delay, callback, context);
	};

	module.repeat = function(timer, time, iterations, callback, context) {
		var t = timer || PhaserGame.phaser.time.events;
		t.repeat(time, iterations, callback, context);
	};
	
	module.loop = function(timer, interval, callback, context) {
		var t = timer || PhaserGame.phaser.time.events;
		t.loop(interval, callback, context);
	};
	
	module.getTimer = function(id) {
		return _timers[id];
	};
	
	module.removeTimer = function(id) {
		if(_timers.hasOwnProperty(id)) {
			_timers[id].destroy();
			PhaserGame.phaser.time.events.remove(_timers[id]);
			delete _timers[id];
		}
	};
	
	function Controller(id) {
		this.timer = PhaserGame.phaser.time.create(false);
		_timers[id] = this.timer;
	}
	
	Controller.prototype.start = function() {
		this.timer.start();
	};
	
	Controller.prototype.pause = function() {
		this.timer.pause();
	};
	
	Controller.prototype.resume = function() {
		this.timer.resume();
	};
	
	Controller.prototype.add = function(delay, callback, context) {
		module.add(this.timer, delay, callback, context);
	};
	
	Controller.prototype.loop = function(interval, callback, context) {
		module.loop(this.timer, interval, callback, context);
	};
	
	Controller.prototype.repeat = function(time, callback, context) {
		module.repeat(this.timer, time, callback, context);
	};

	module.Controller = Controller;
	
	return module;
}();

PWG.PhaserLoader = function() {
	var _config;
	var _phaser;
	
	var module = {};
	
	module.loaded = {
		images: {},
		sprites: {},
		tilemaps: {}
	};
	
	module.init = function(config, phaser) {
		// trace('PhaserLoader/init, config = ', config);
		_config = config;
		_phaser = phaser;
		
		_initAssets(config.images, 'images');
		_initAssets(config.sprites, 'sprites');
		_initAssets(config.tilemaps, 'tilemaps');
		
	}
	
	module.load = function(assets) {
		// trace('PhaserLoader/load, assets = ', assets);
		
		// IMAGES
		if(assets.images) {
			// var images = _config.images;
			var images = assets.images;
			// trace('\timages = ', images);
			PWG.Utils.each(
				assets.images,
				function(image, key) {
					if(!this.loaded.images[key]) {
						// trace('\t------- loading: image = ' + key + ', url = ' + image);
						_phaser.load.image(key, image);
						this.loaded.images[key] = true;
					}
				},
				this
			);
		}
		
		// SPRITES
		if(assets.sprites) {
			// var sprites = _config.sprites;
			var sprites = assets.sprites;
			
			PWG.Utils.each(
				assets.sprites,
				function(sprite, key) {
					if(!this.loaded.sprites[key]) {
						// trace('\tloading: sprite = ' + key + ', url = ' + sprite.url);
						_phaser.load.spritesheet(key, sprite.url, sprite.width, sprite.height);
						this.loaded.sprites[key] = true;
					}
				},
				this
			);
		}

		// TILEMAPS
		// if(assets.tilemaps) {
		// 	// var tilemaps = _config.tilemaps;
		// 	var tilemaps = assets.tilemaps;
		// 	
		// 	PWG.Utils.each(
		// 		assets.tilemaps,
		// 		function(tilemap) {
		// 			if(!this.loaded.tilemaps[tilemap]) {
		// 				// trace('\tloading: tilemap = ' + tilemap + ', url = ' + tilemaps[tilemap]);
		// 				_phaser.load.tilemap(tilemap, tilemaps[tilemap], null, Phaser.Tilemap.TILED_JSON ); // Phaser.Tilemap.TILED_JSON = 1
		// 			}
		// 		},
		// 		this
		// 	);
		// }
	}
	
	function _initAssets(assets, type) {
		// trace('Loader/_initAssets, this = ', this);
		PWG.Utils.each(
			assets,
			function(asset, key) {
				module.loaded[type][key] = false;
			},
			this
		);		
	}
	
	return module;
}();

PWG.SocialPanel = function() {

	var _model = {};

	var module = {
		init: function(params) {
			// trace('SocialPanel/init, params = ', params);
			_model = PWG.Utils.extend(_model, params);
			_initViews();
			_addListeners();
		},

		show: function(params) {
			// trace('SocialPanel/show, params = ', params);
			var elements = params.value;
			_model.parentEl.style.display = 'block';
			PWG.Utils.each(elements,
				function(element) {
					if(_model.buttons.hasOwnProperty(element)) {
						_model.buttons[element].style.visibility = 'visible';
					}
				},
				this
			);
		},

		showAll: function() {
			_model.parentEl.style.display = 'block';
			for(var key in _model.buttons) {
				_model.buttons[key].style.visibility = 'visible';
			}
		},

		hideAll: function() {
			_model.parentEl.style.display = 'none';
			for(var key in _model.buttons) {
				_model.buttons[key].style.visibility = 'hidden';
			}
		},

		buttonClick: function(network) {
			// trace('SocialPanel/buttonClick, network = ' + network + '\n\tcurrentActionType = ' + _model.currentActionType);
			var networkActions = _model.socialActions[network];
			if(networkActions) {
				// trace('\tnetworkActions = ', networkActions);
				var socialAction = networkActions[_model.currentActionType];
				if(socialAction) {
					// trace('\tsocialAction = ', socialAction);
					var url;
					if(socialAction['params']) {
						url = socialAction['url'] + PWG.Utils.parseMarkup(socialAction['params'], _model, true);
					} else {
						url = socialAction['url'];
					}
					// trace('\turl = ' + url);
					if(url.indexOf('mailto') > -1) {
						if(PWG.DeviceUtils.isIphone() || PWG.DeviceUtils.isAndroid()) {
							window.location.href = url;
						} else {
							window.open(url, '_blank');
						}
					} else {
						window.open(url, '_blank');
					}
				}
			}
		},

		changeData: function(params) {
			_model[params.type] = params.value;
		},

		destroy: function() {
			_removeListeners();
			_destroyViews();
		}
	};

	function _initViews() {
		_initParentEl(); 
		_addButtons();
	}

	function _initParentEl() {
		_model.parentEl = document.getElementById(_model.parentId) || document.getElementsByTagName('body')[0];
		_model.grandParentEl = _model.parentEl.parentNode;
	}

	function _addButtons() {
		_model.buttons = {};

		var buttonStyle = _model.buttonStyle;

		var buttonClass = _model.buttonClass || 'socialButton';
		var button;
		var style; 
		var length = _model.networks.length; 

		PWG.Utils.each(_model.networks,
			function(network, idx) {
				style = _calculateButtonStyle(buttonStyle, idx, length);
				button = {
					pops: _model.parentEl,
					id: network,
					el: 'img',
					attrs: {
						src: _model.imagePath + network + '.png',
						onclick: 'PWG.SocialPanel.buttonClick("'+network+'");'
					},
					className: buttonClass,
					style: style
				};
				_model.buttons[network] = PWG.Utils.addElement(button);
			},
			this
		);
	}

	function _calculateButtonStyle(attrs, idx, length) {
		var winW = PWG.Stage.winW;
		var winH = PWG.Stage.winH;
		var horizontal = attrs.position.horizontal;
		var vertical = attrs.position.vertical;
		var spacer = attrs.spacer; 
		var offset = attrs.offset || 0;
		
		var style = {
			width: attrs.size.width + 'px',
			height: attrs.size.height + 'px'
		};

		if(horizontal === 'center') {
			var horizontalTotal;
			for(var i = 0; i < length; i++) {
				if(i > 0) {
					horizontalTotal += attrs.spacer;
				}
				horizontalTotal += attrs.size.width;
			}

			style.left = ((winW/2) - (horizontalTotal/2) + (idx * attrs.size.width)) + 'px';
		} else if(horizontal < 0) {
			style.right = -(horizontal) + 'px';
		} else {
			style.left = horizontal + 'px';
		}

		if(vertical === 'center') {
			var verticalTotal = 0;
			for(var i = 0; i < length; i++) {
				if(i > 0) {
					verticalTotal += attrs.spacer;
				}
				verticalTotal += attrs.size.height;
			}
			// trace('\tVERTICAL TOTal = ' + verticalTotal);
			var btnOffset = (idx * attrs.size.height) +  (idx * attrs.spacer) + offset;
			style.top = ((winH/2) - (verticalTotal/2) + (btnOffset)) + 'px';
		} else if(vertical < 0) {
			style.bottom = -(vertical) + 'px';
		} else {
			style.top = vertical + 'px';
		}
		// trace('RETURNING: ', style);
		return style;
	}
	
	function _destroyViews() {
		var buttons = _model.buttons;
		var button;
		for(var key in buttons) {
			button = buttons[key];
			button.parentNode.removeChild(button);
		}
		if(_model.parentEl) {
			_model.parentEl.parentNode.removeChild(_model.parentEl);
		}
	}

	function _addListeners() {
		PWG.Utils.each(_model.listeners,
			function(listener) {
				PWG.EventCenter.bind(listener.type, _eventHandler, this);
			},
			this
		);
	}

	function _removeListeners() {
		PWG.Utils.each(_model.listeners,
			function(listener) {
				PWG.EventCenter.unbind(listener.type, _eventHandler, this);
			},
			this
		);
	}

	function _eventHandler(event) {
		// trace('SocialPanel/_eventHandler event = ', event);
		var listener;
		PWG.Utils.each(_model.listeners,
			function(l) {
				if(l.type === event.type) {
					listener = l;
				}
			},
			this
		);
		var match = listener.match;
		if(match) {
			// trace('\tthere is a match');
			if(match.value === event.value) {
				// trace('\t\tvalue matches the event value');
				_executeActions(match.actions);
			} else if(listener.nonmatch) {
				// trace('\t\tnonmatch');
				_executeActions(listener.nonmatch.actions);
			}
		} else {
			_executeActions(listener.actions);
		}
	}
	
	function _executeActions(actions) {
		// trace('SocialPanel/_executeActions');
		PWG.Utils.each(actions,
			function(action) {
				// trace('\tcalling: ' + action.method + ', passing: ', action.data);
				PWG.SocialPanel[action.method](action.data);
			},
			this
		);
	}

	return module;
}();

var PhaserGame = function() {
	var _inPlay = false;
	var _isQuit = false;
	var module = {};

	module.camera = null;
	
	module.init = function(aspectRatio, maxHeight) {
		module.loaded = 
		{
			images: {},
			sprites: {}
		};

		module.stage = PWG.Stage;
		module.stage.init(aspectRatio, maxHeight, false, _onStageInitialized, module);
	};
	
	module.destroy = function() {
		// trace('PhaserGame/destroy, _inPlay = ' + _inPlay);
		if(_inPlay) {
			PWG.StateManager.destroy();
			module.phaser.destroy();
			_inPlay = false;
		}
	};
	
	module.quit = function() {
		if(!_isQuit) 
		{
			_quit();
		}
	};
	
	function _onStageInitialized() {
		// trace('PhaserGame/onStageInitialized');
		if(GameConfig.loadingAnimation) {
			_addLoadingAnimation();
		}
		GameConfig.init(_onConfigInitialized, module);
	}
	
	function _addLoadingAnimation() {
		var loadingAnimation = document.createElement('div');
		loadingAnimation.setAttribute('id', 'loading_animation');
		loadingAnimation.className = 'loading_animation';
		loadingAnimation.style.width = PWG.Stage.winW + 'px';
		loadingAnimation.style.height = PWG.Stage.winH + 'px';
		document.getElementsByTagName('body')[0].appendChild(loadingAnimation);
	}
	
	function _removeLoadingAnimation() {
		var loadingAnimation = document.getElementById('loading_animation');
		loadingAnimation.parentNode.removeChild(loadingAnimation);
	}
	
	function _onConfigInitialized(config) {
		module.config = config;
		// trace('PhaserGame/onConfigInitalized, config = ', config);
		_inPlay = true;

		if(gameLogic.init) {
			gameLogic.init.call(this);
		}
		
		// add global methods
		PWG.Utils.extend(module, gameLogic.global.methods);

		// add global listeners
		PWG.EventCenter.batchBind(gameLogic.global.listeners, module);
		
		// init screen manager
		PWG.ScreenManager.init(gameLogic.screens);
		
		if(module.init) {
			module.init.call(this);
		}

		// create phaser game
		module.phaser = new Phaser.Game(
			module.stage.gameW, 
			module.stage.gameH, 
			Phaser.AUTO, 
			config.gameEl,
			{ 
				preload: _preload, 
				create: _create, 
				update: _update, 
				render: _render 
			}
		);
	}
	
	function _preload() {
		// trace('PhaserGame/_preload');
		PWG.PhaserLoader.init(module.config.assets, module.phaser);
		if(module.preload) {
			module.preload.call(this);
		}
	}
	
	function _create() {
		trace('PhaserGame/_create');
		if(GameConfig.loadingAnimation) {
			_removeLoadingAnimation();
		}
		PWG.PhaserScale.init(module.config.stage);
		PWG.PhaserPhysics.init();

		PWG.ViewManager.init(module.config.views);

		if(module.config.input) 
		{
			if(module.config.input.keys) 
			{
				module.keyboard = PWG.PhaserInput.initKeyboard(module.config.input.keys);
			}
		}
		
		if(module.create) {
			module.create.call(this);
		}
	}
	
	function _update() {
		// trace('PhaserGame/_update');
		if(module.keyboard) 
		{
			PWG.PhaserInput.updateKeyboard(module.keyboard);
		}
		if(module.update) {
			module.update.call(this);
		}
	}
	
	function _render() {
		// trace('PhaserGame/_render');
		if(module.render) {
			module.render.call(this);
		}
	}
	
	function _quit() {
		// trace('PhaserGame/_quit');
		_isQuit = true;
		PWG.EventCenter.batchUnbind(gameLogic.global.listeners);
		PWG.ScreenManager.destroy();
		module.phaser.destroy();
	}
	
	return module;
}();
