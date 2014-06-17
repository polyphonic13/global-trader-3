module.exports = function(grunt) {
	grunt.task.registerTask(
		'createProjectHtml', 
		function() {
			console.log('create project html');
			var buildDir = grunt.config.get('buildDir');
			var preJsHtml = updateProductScriptUrls(grunt.config.get('preJsHtml'));
			var postJsHtml = updateProductScriptUrls(grunt.config.get('postJsHtml'));

			var javascriptTag = '\n<script src=\"js/global_trader.min.js\" type=\"text/javascript\"></script>\n';
			var htmlSource = preJsHtml + javascriptTag + postJsHtml;
			var htmlPath = buildDir + '/' + 'index.html';
			grunt.file.write(htmlPath, htmlSource);

			function updateProductScriptUrls(html) {
				var polyworksJsPath = '../../polyworksjs/public/build/js/';
				var polyworksPhaserPath = '../../polyworksjs/public/build/phaser/';

				var prodHtml = html.replace(polyworksJsPath, 'js/');
				prodHtml = prodHtml.replace(polyworksPhaserPath, 'js/');

				return prodHtml;
			}
		}
	);
};