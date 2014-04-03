// LOGGING
function trace(message, level) {
	if (typeof console === "undefined" || typeof console.log === "undefined") {
		console = { log:function(){} };
	} else {
		Polyworks.Utils.each(arguments,
			function(a) {
				console.log(a);
			},
			this
		);
	}
}
