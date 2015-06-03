'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
	    src: require('./bower.json').srcPath || 'src',
	    dist: 'dist',
	    name: 'tm-grid'
  	};

	// Define the configuration for all the tasks
	grunt.initConfig({

    	// Project settings
    	setting: appConfig,

	    // Empties folders to start fresh
	    clean: {
	      dist: {
	        files: [{
	          dot: true,
	          src: [
	            '.tmp',
                '<%= setting.dist %>',
                '<%= setting.dist %>/{,*/}*',
	            '!<%= setting.dist %>/.git{,*/}*'
	          ]
	        }]
	      },
	      server: '.tmp',
	    },

	    // ng-annotate tries to make the code safe for minification automatically
	    // by using the Angular long form for dependency injection.
		ngAnnotate: {
			module: {
				files: [{
					expand: true,
					cwd: '<%= setting.dist %>/src',
					src: ['*.js'],
					dest: '<%= setting.dist %>/src'
				}]
			}
		},

	    // Copies remaining files to places other tasks can use
	    copy: {
			module: {
				files: [{
					expand: true,
	            	dot: true,
					cwd: '<%= setting.src %>',
					dest: '.tmp',
					src: ['*.js']
				}, {
					expand: true,
	            	dot: true,
					cwd: '<%= setting.src %>/services',
					dest: '.tmp/services',
					src: ['*.js']
				}, {
					expand: true,
	            	dot: true,
					cwd: '<%= setting.src %>/directives',
					dest: '.tmp/directives',
					src: ['*.js']
				}, {
					expand: true,
	            	dot: true,
					cwd: '<%= setting.src %>/../',
					dest: '<%= setting.dist %>',
					src: ['bower.json']
				}]
			}
	    },

		concat: {
			options: {
				banner: "'use strict';\n",
				// define a string to put between each file in the concatenated output
				separator: '\n',
				process: function(src, filepath) {
					// Apply edits to src if necessary
					return src;
				},
			},
			module: {
				// the files to concatenate
				src: [
					'.tmp/module.js',
					'.tmp/services/*.js',
					'.tmp/directives/*.js'
				],
				// the location of the resulting JS file
				dest: '<%= setting.dist %>/src/<%= setting.name %>.js'
			}
		},
	
		uglify: {
			module: {
				files: {
					'<%= setting.dist %>/src/<%= setting.name %>.js': [
						'<%= setting.dist %>/src/<%= setting.name %>.js'
					]
				}
			}
		},
		
		// make a zipfile
        compress: {
          main: {
            options: {
              mode: 'zip',
              archive: 'dist/pippo.zip' // <= MODIFICARE IL NOME DEL FILE FINALE
            },
            expand: true,
            cwd: 'dist/',
            src: ['**/*'],
            dest: '/'
          }
        }
  	});
  
	grunt.registerTask('build', [
		'clean:dist',
		'copy:module',
		'concat:module',
		'ngAnnotate:module',
		//'uglify:module',
		'compress:main'
	]);
};
