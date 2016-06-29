// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
	'*  <%= pkg.homepage %>\n' +
	'*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
	'*  Apache 2.0 License */\n';

module.exports = function (grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		// Build CSS from SASS
		'sass' : {
			options : {
				includePaths : ['./node_modules/calcite-bootstrap/node_modules/bootstrap-sass/assets/stylesheets', './node_modules/calcite-bootstrap/dist/sass']
			},
			expanded : {
				files : {
					'src/css/calcite-bootstrap.css':'node_modules/calcite-maps/lib/sass/build-calcite-bootstrap.scss',
					'src/css/calcite-maps.css':'node_modules/calcite-maps/lib/sass/build-calcite-maps.scss',
					'src/css/calcite-bootstrap-maps.css' : 'node_modules/calcite-maps/lib/sass/build-all.scss',
					'src/css/themes/inline-zoom.css' : 'node_modules/calcite-maps/lib/sass/layouts/inline-zoom.scss',
					'src/css/themes/large-title.css' : 'node_modules/calcite-maps/lib/sass/layouts/large-title.scss',
					'src/css/themes/medium-title.css': 'node_modules/calcite-maps/lib/sass/layouts/medium-title.scss',
					'src/css/apis/arcgis-3.x.css' : 'node_modules/calcite-maps/lib/sass/support/arcgis-3.x.scss',
					'src/css/apis/arcgis-4.x.css' : 'node_modules/calcite-maps/lib/sass/support/arcgis-4.x.scss',
					'src/css/apis/esri-leaflet.css' : 'node_modules/calcite-maps/lib/sass/support/esri-leaflet.scss'
				}
			}
		},
		execute:{
			download: {
				options:{
					args: ['src/css']
				},
				src: ['downloadResources.js']
			}
		},
		// Minify CSS
		cssmin : {
			dev : {
				options : {
					banner : banner
				},
				files : {
					'src/css/calcite-maps.min.css':['src/css/calcite-maps.css'],
					'src/css/calcite-bootstrap.min.css':['src/css/calcite-bootstrap.css'],
					'src/css/calcite-bootstrap-maps.min.css' : ['src/css/calcite-bootstrap-maps.css'],
					'src/css/calcite-maps-bootstrap-arcgis-3.x.min.css' : ['src/css/calcite-maps.css', 'src/css/themes/inline-zoom.css', 'src/css/themes/large-title.css','src/css/themes/medium.css', 'src/css/apis/arcgis-3.x.css'],
					'src/css/calcite-maps-bootstrap-arcgis-4.x.min.css' : ['src/css/calcite-maps.css', 'src/css/themes/inline-zoom.css', 'src/css/themes/large-title.css','src/css/themes/medium.css', 'src/css/apis/arcgis-4.x.css'],
					'src/css/calcite-maps-bootstrap-esri-leaflet.min.css' : ['src/css/calcite-maps.css', 'src/css/themes/inline-zoom.css', 'src/css/themes/large-title.css','src/css/themes/medium-focus.css', 'src/css/apis/esri-leaflet.css'],
				}
			}
		},
		// Copy to
		//had to change source to reflect nested boostrap-sass
		'copy' : {
			bootstrapfontsdev : {
				expand : true,
				flatten : true,
				src : ['./node_modules/calcite-bootstrap/node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
				dest : './src/fonts/bootstrap/'
			},
			bootstrapfontsprod : {
				expand : true,
				flatten : true,
				src : ['./src/fonts/bootstrap/*'],
				dest : './dist/fonts/bootstrap/'
			},
			//Right now this seems unecessary
			calcitefonts : {
				expand : true,
				flatten : true,
				src : ['./node_modules/calcite-maps/lib/fonts/calcite/*'],
				dest : './dist/fonts/calcite/'
			},
			//may also want jquery version here too
			calcitedojo : {
				expand : true,
				flatten : true,
				src : ['./node_modules/calcite-maps/lib/js/dojo/*'],
				dest : './src/js/dojo'
			},
			calcitejquery : {
				expand : true,
				flatten : true,
				src : ['./node_modules/calcite-maps/lib/js/jquery/*'],
				dest : './src/js/jquery'
			},
			//An error in dojo.js for v3.16 of the esri api necessitates this directory to be copied out of the src directory to the root
			//this error is handled in the buildprofile but for the src this grunt task is needed
			moment : {
				expand: true,
				cwd: './src/moment/',
				src: ['**'],
				dest: './moment/'
			},
			main : {
				files : [{
						expand : true,
						cwd : 'src/',
						src : ['index.html'],
						dest : './dist/',
					}
				]
			}
		},
		//clean
		clean : {
			build : {
				src : ['dist/']
			},
			uncompressed : {
				src : [
					'dist/**/*.uncompressed.js',
					'dist/**/*.consoleStripped.js'
				]
			},
			//cleans the moment directory for building
			moment : {
				src : ['../moment']
			}
		},
		//build dojo
		dojo : {
			dist : {
				options : {
					releaseDir : '../dist',
				}
			},
			options : {
				profile : 'build.profile.js',
				dojo : 'src/dojo/dojo.js',
				load : 'build',
				cwd : './',
				basePath : './src'
			}
		}
	});
	// Default task
	//add copy:moment to devbuild task if your app throws a moment.js error
	grunt.registerTask('devbuild', ['sass', 'cssmin:dev','execute:download', 'copy:calcitedojo', 'copy:calcitejquery', 'copy:bootstrapfontsdev', 'copy:moment']);
	//Build production app
	grunt.registerTask('default', ['clean:build', 'clean:moment', 'dojo', 'copy:bootstrapfontsprod', 'copy:calcitefonts', 'copy:main', 'clean:uncompressed']);
};