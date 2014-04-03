module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

	/////// LOCAL SERVER
			connect: {
				/*
				// docs: https://github.com/iammerrick/grunt-connect
				devel: {
					port: 9999,
					base: 'public',
					keepAlive: true
				}
				*/
				server: { 
					port: 8888,
					base: 'public',
					keepAlive: true
				}
			}
		});

	grunt.loadNpmTasks('grunt-connect');
	
};