module.exports = function(grunt) {

	var project = grunt.option('pjt');
	var srcDir = 'public/src';
	var buildDir = 'public/build';
	var projectSrcDir;
	
	if(typeof(project) !== 'undefined') {
		// srcDir += '/' + project;
		projectSrcDir = srcDir + '/' + project;
		buildDir += '/' + project;
	}
	grunt.log.writeln('Starting Grunt Processing');
	grunt.log.writeln('\tproject = ' + project 
						+ '\n\tsrcDir = ' + srcDir 
						+ '\n\tbuildDir = ' + buildDir 
						+ '\n\tprojectSrcDir = ' + projectSrcDir);


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		project: project,
		srcDir: srcDir,
		buildDir: buildDir,
		projectSrcDir: projectSrcDir,

/////// CONCAT 
		concat: {
			// task docs: https://github.com/gruntjs/grunt-contrib-concat

			options: {

				// default banner inserted at top of the output file (overridden for some files below)
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("isoDateTime") %> */\n',

				// separator between each file
				// separator: '\n;\n',
				separator: '\n\n',

				// remove block comments at the head of input files
				stripBanners: true,

				process: true,

				// error on missing files
				nonull: true

			},

			project: {
				options: {
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- <%= project %> created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: '<%= projectJavascripts %>',
				dest: '<%= buildDir %>/js/<%= project %>.js'
			}

		},
/////// MINIFICATION
		uglify: {
			// task docs: https://github.com/gruntjs/grunt-contrib-uglify

			options: {

				// banner inserted at top of the output file
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				compress: true,
				// report: 'gzip'
				report: 'min'
			},

			project: {
				src: [ '<%= buildDir %>/js/<%= project %>.js' ],
				dest: '<%= buildDir %>/js/<%= project %>.min.js'
			}
			
		},
/////// COPYING
		copy: {
			// task docs: https://github.com/gruntjs/grunt-contrib-copy

			project: {
				files: [
				{
					expand: true,
					cwd: '<%= projectSrcDir %>/assets/images/',
					src: [ '**/*' ],
					dest: '<%= buildDir %>/assets/images/'
				},
				{
					expand: true, 
					cwd: '<%= projectSrcDir %>/css/',
					src: [ '**/*' ],
					dest: '<%= buildDir %>/css/'
				}
				]
			}

		},
/////// CSS MINIFICATION
		// cssmin: {
		// 	project: {
		// 		expand: true,
		// 		cwd: '<%= buildDir %>/css/',
		// 		src: ['*.css', '!*.min.css'],
		// 		dest: '<%= buildDir %>/css/'
		// 	}
		// },
/////// LOCAL SERVER
		connect: {
			server: { 
				port: 9998,
				base: 'public',
				keepAlive: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-connect');
	grunt.loadTasks('grunt/tasks');
	
	grunt.registerTask('default', ['projectDeploySetup', 'concat:project', 'stripTraceStatements', 'uglify', 'copy:project', /*'cssmin',*/ 'createProjectHtml']);
};