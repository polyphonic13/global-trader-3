module.exports = function(grunt) {
	grunt.task.registerTask(
		'projectDeploySetup', 
		function() {
			var srcDir = grunt.config.get('srcDir');
			var fileName = 'index.html';
			var filePath = srcDir + '/' + fileName;
			var htmlSource = grunt.file.read(filePath);

			var startJsComment = '<!--START JS INCLUDES-->';
			var endJsComment = '<!--END JS INCLUDES-->';
			var startJsIdx = htmlSource.indexOf(startJsComment);
			var endJsIdx = htmlSource.indexOf(endJsComment);

			var preJsHtml = '';
			var jsSection = '';
			var postJsHtml = '';

			var javascripts = '';

			grunt.log.writeln('startJs = ' + startJsIdx + ', endJs = ' + endJsIdx);

			preJsHtml = htmlSource.substring(0, startJsIdx);
			jsSection = htmlSource.substring((startJsIdx + startJsComment.length), endJsIdx);
			postJsHtml = htmlSource.substring((endJsIdx + endJsComment.length), htmlSource.length);

			// console.log(jsSection);

			javascripts = jsSection.replace(/\n\t/g, '');								// remove tabs
			javascripts = javascripts.replace(/src\=/g, '');							// remove src attr
			javascripts = javascripts.replace(/\stype=\"text\/javascript\"/g, '');		// remove type attr
			javascripts = javascripts.replace(/\<\!\-\-/g, '');							// remove open html comments
			javascripts = javascripts.replace(/\-\-\>/g, '');							// remove close html comments
			javascripts = javascripts.replace(/\<script\s/g, '{'); 						// replace open script with {
			javascripts = javascripts.replace(/\>\<\/script\>/g, '}');					// replace close script with }

			console.log(javascripts);
			var curlyRegEx = /\{(.*?)\}/g;
			var jsArray = reformatWithSourceDirectories(javascripts.match(curlyRegEx));

			console.log(jsArray);

			function reformatWithSourceDirectories(a) {
				console.log('reformatWithSourceDirectories from: ' + a);
				var ret = [];
				var length = a.length;
				var temp;
				for(var i = 0; i < length; i++) {
					temp = a[i].replace('{', '');
					temp = temp.replace('}', '');
					temp = temp.replace(/\"js/, (srcDir + '/js'));
					temp = temp.replace(/\"../, srcDir);
					temp = temp.replace(/\"/, '');
					ret.push(temp);
				}
				return ret;
			}

			grunt.config.set('projectJavascripts', jsArray);
			grunt.config.set('preJsHtml', preJsHtml);
			grunt.config.set('postJsHtml', postJsHtml);
		}

	);
};