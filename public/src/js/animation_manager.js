/**
	config = {
		key: 'dollarSign0',
		parentPath: 'usDetail:usDetailGrid',
		controller: (ViewManager.Controller),
		animationName: 'expand',
	}
*/
var AnimationManager = function() {
	var module = {};
	
	module.animations = {};
	module.active = {};
	module.parents = {};
	module.childKeys = {};
	
	module.add = function(config) {
		// trace('AnimationQueue/add, config = ', config);
		if(!module.animations[config.key]) {
			module.animations[config.key] = [];
			module.parents[config.key] = PWG.ViewManager.getControllerFromPath(config.parentPath);
		}
		
		var viewConfig = PWG.Utils.clone(PhaserGame.config.dynamicViews[config.type]);
		viewConfig.name = config.name;
		viewConfig.x += config.x;
		viewConfig.y += config.y;
		
		config.controller = PWG.ViewManager.addView(viewConfig, module.parents[config.key]);
		config.controller.view.events.onAnimationComplete.add(module.onAnimationComplete, this);
		
		module.animations[config.key].push(config);
		// trace('\tadded, active = ' + module.active[config.key]);
		if(!module.active[config.key]) {
			module.active[config.key] = true;
			module.start(config.key);
		}
	};
	
	module.getNextIndex = function(key) {
		var index;
		if(!module.childKeys.hasOwnProperty(key)) {
			module.childKeys[key] = 0;
		} else {
			module.childKeys[key]++;
		}
		index = module.childKeys[key];
		
		return index;
	};
	
	module.start = function(key, name) {
		// trace('-- AnimationManager/start, anitmations['+key+'].length = ' + module.animations[key].length + ', active = ' + module.active[key]);
		if(module.animations[key].length > 0) {
			var config = module.animations[key][0];
			// trace('\tconfig = ', config, '\tanimations['+key+'] = ', module.animations[key]);
			var animation = name || config.animationName;

			if(!module.active[key]) {
				module.active[key] = true;
			}
			var path = config.parentPath + ':' + config.name;
			// trace('\tcalling play on ' + config.name + ' at path = ' + path + ', animation = ' + animation);
			// PWG.ViewManager.showView(path);
			PWG.PhaserAnimation.play(config.name, animation, true);
		} else {
		}
	};
	
	module.onAnimationComplete = function(view) {
		var config = module.findConfig(view.name);
		// trace('AnimationManager/onAnimationComplete, config.name ' + config.name + ', key = ' + config.key);
		module.active[config.key] = false;
		module.removeView(config);
		
		if(module.animations[config.key] && module.animations[config.key].length > 0) {
			// trace('\tarray length = ' + module.animations[config.key].length)
			module.animations[config.key].splice(0, 1);
			module.start(config.key);
		}
		// trace('\tanimations['+config.key+'] now = ', module.animations[config.key]);
	};

	module.findConfig = function(name) {
		var config = {};
		PWG.Utils.each(
			module.animations,
			function(animationArray) {
				PWG.Utils.each(
					animationArray,
					function(animation) {
						if(animation.name === name) {
							config = animation;
						}
					},
					this
				);
			},
			this
		);
		return config;
	};
	
	module.removeView = function(config) {
		var path = config.parentPath + ':' + config.name;
		// PWG.ViewManager.hideView(path);
		// PWG.ViewManager.removeView(config.controller.name, config.parentPath);
	};
	
	module.reset = function() {
		PWG.Utils.each(
			module.animations,
			function(animation, key) {
				if(this.active[key]) {
					this.removeView(this.animations[key][0]);
				}
				
				while(animation.length > 0) {
					animation.pop();
				}
				delete this.animations[key];
				delete this.parents[key];
				delete this.active[key];
			},
			module
		);
	};
	
	return module;
}();