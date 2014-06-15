module.exports = function(grunt) {
	grunt.task.registerTask(
		'stripTraceStatements',
		function() {
			var traceRegEx = /(trace\(.*?\);)/g;
			var buildDir = grunt.config.get('buildDir');
			var originalFilePath = buildDir + '/js/global_trader.js';
			var originalSrc = grunt.file.read(originalFilePath);
			var strippedSrc = originalSrc.replace(traceRegEx, '');
			grunt.file.write(originalFilePath, strippedSrc);
		}
	);
}