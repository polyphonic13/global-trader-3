module.exports = function(grunt) {
	grunt.task.registerTask(
		'createProjectHtml', 
		function() {
			console.log('create project html');
			var buildDir = grunt.config.get('buildDir');
			var preJsHtml = grunt.config.get('preJsHtml');
			var postJsHtml = grunt.config.get('postJsHtml');
			var javascriptTag = '\n<script src=\"js/global_trader.min.js\" type=\"text/javascript\"></script>\n';
			var htmlSource = preJsHtml + javascriptTag + postJsHtml;
			var htmlPath = buildDir + '/' + 'index.html';
			grunt.file.write(htmlPath, htmlSource);
		}
	);
};