Polyworks.App = (function() {
	var module = {
		init: function() {
			trace('App/init');
			Polyworks.DeviceSizer.init();
		}
	}
	return module;
}());