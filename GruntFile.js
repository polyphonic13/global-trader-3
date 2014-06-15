module.exports = function(grunt) {

	var srcDir = 'public/src';
	var buildDir = 'public/build';
	
	grunt.log.writeln('Starting Grunt Processing');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		srcDir: srcDir,
		buildDir: buildDir,

		// SUBGRUNT (GIT SUBMODULES) 
		// docs: https://github.com/tusbar/grunt-subgrunt
		subgrunt: {
			lib: {
				options: {},
				projects: {
					'polyworksjs': 'default'
				}
			}
		},

		// CONCAT 
		// task docs: https://github.com/gruntjs/grunt-contrib-concat
		concat: {

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
					banner: "(function(){(typeof console === 'undefined' || typeof console.log === 'undefined')?console={log:function(){}}:console.log('----- Global Trader 3.0 created: <%= grunt.template.today(\"isoDateTime\") %>')})();\n"
				},
				src: '<%= projectJavascripts %>',
				dest: '<%= buildDir %>/js/global_trader.js'
			}

		},
		// MINIFICATION
		// task docs: https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {

			options: {

				// banner inserted at top of the output file
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				compress: true,
				// report: 'gzip'
				report: 'min'
			},

			project: {
				src: [ '<%= buildDir %>/js/global_trader.js' ],
				dest: '<%= buildDir %>/js/global_trader.min.js'
			}
			
		},
		// COPYING
		// task docs: https://github.com/gruntjs/grunt-contrib-copy
		copy: {

			project: {
				files: [
				{
					expand: true,
					cwd: '<%= srcDir %>/images/',
					src: [ '**/*' ],
					dest: '<%= buildDir %>/images/'
				},
				{
					expand: true, 
					cwd: '<%= srcDir %>/css/',
					src: [ '**/*' ],
					dest: '<%= buildDir %>/css/'
				}
				]
			}

		},
		// CSS MINIFICATION
		// cssmin: {
		// 	project: {
		// 		expand: true,
		// 		cwd: '<%= buildDir %>/css/',
		// 		src: ['*.css', '!*.min.css'],
		// 		dest: '<%= buildDir %>/css/'
		// 	}
		// },
		// LOCAL SERVER
		connect: {
			server: { 
				port: 9998,
				keepAlive: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-subgrunt');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-connect');
	grunt.loadTasks('grunt/tasks');
	
	grunt.registerTask(
		'default', 
		[
			'subgrunt',
			'projectDeploySetup', 
			'concat:project', 
			'stripTraceStatements', 
			'uglify', 
			'copy:project',
			'createProjectHtml'
		]
	);
};