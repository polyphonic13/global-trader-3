Polyworks.DeviceSizer = (function() {
	
	var _ar = [16, 9];

	var deviceSizer = {
		winW: 0,
		winH: 0,
		width: 0,
		height: 0,
		unit: 0,
		
		init: function() {
			_calculateSizes();
		}
	};
	
	function _calculateSizes() {
		deviceSizer.winW = document.documentElement.clientWidth; 
		deviceSizer.winH = document.documentElement.clientHeight;

		deviceSizer.height = (document.documentElement.clientHeight > 800) ? 800 : document.documentElement.clientHeight;
		deviceSizer.width = ((document.documentElement.clientHeight/_ar[1]) * _ar[0]);

		if(deviceSizer.width > document.documentElement.clientWidth) {
			deviceSizer.width = document.documentElement.clientWidth;
			deviceSizer.height = (deviceSizer.width/_ar[0]) * _ar[1];
		}

		deviceSizer.unit = deviceSizer.height/_ar[1];
		trace('deviceSizer = ', deviceSizer);
	}
	
	return deviceSizer;
}());