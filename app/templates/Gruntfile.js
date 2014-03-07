// Generated on 2014-03-07 using generator-webapp 0.0.0
'use strict';

var LIVERELOAD_PORT       = 35729;
var LiveReloadRequireCall = require('connect-livereload')({ port: LIVERELOAD_PORT });

var mountFolder = function (connect, dir)
{
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt)
{
    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Watch our pre-compiled source files for changes
        // so we can update the build files
        watch: {
            options: {
                spawn: false,
                livereload: LIVERELOAD_PORT
            },

            // Watch only compiled source files before reloading the page
            livereload: {
                files: ['app/dist/**/*'],
                options: { livereload: true }
            },

            // Watch for Coffeescript changes and compile to JS ... Doesn't livereload
            coffee: {
                files: 'app/dev/code/**/*.coffee',
                tasks: ['scripts']
            },

            // Watch for SASS changes and compile to CSS ... Doesn't livereload
            sass: {
                files: 'app/dev/css/*.scss',
                tasks: ['stylesheets']
            }
        },

        // Compile Coffeescript into JS
        coffee: {
            build: {
                expand: true,
                cwd: 'app/dev/code',
                src: [ '**/*.coffee' ],
                dest: 'app/dist/code',
                ext: '.js'
            }
        },

        // Minify and concatenate our compiled JS
        uglify: {
            build: {
                options: {
                    mangle: false
                },

                files: {
                    'app/dist/application.js': [ 'app/dist/code/**/*.js' ]
                }
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/dev/assets/css',
                    src: ['**/*.scss'],
                    dest: 'app/dist/assets/css',
                    ext: '.css'
                }]
            }
        },

        // Auto-prefix CSS properties with vendor-prefixes so we don't
        // have to worry about it when writing the app.
        // Runs on compiled css
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'app/dist/assets/css',
                src: [ '**/*.css' ],
                dest: 'app/dist/assets/css'
            }
        },

        // Minify and concatenate compiled CSS into distribution file
        cssmin: {
            build: {
                files: {
                    'app/dist/application.css': [ 'app/dist/assets/css/**/*.css' ]
                }
            }
        },

        // Copy everything that isn't a pre-compiled source file that the app needs in production
        // i.e., Template files, config files etc
        copy: {
            build: {
                cwd: 'app/dev',
                src: ['**', '!**/*.scss', '!**/*.coffee'],
                dest: 'app/dist',
                expand: true
            },
        },

        // Clean out distribution dir before rebuilding
        clean: {
            build: {
                src: [ 'app/dist/' ]
            },

            // Remove all stylesheets except our final application CSS
            stylesheets: {
                src: [ 'app/dist/assets/**/*.css', '!app/dist/application.css' ]
            },

            // Remove all scripts except our final application JS
            scripts: {
                src: [ 'app/dist/code/**/*.js', '!app/dist/application.js' ]
            },
        },


        // Use connect server to run livereload as middleware
        // so we don't have to use the livereload browser plugin
        // or include livereload in a script element in the project
        connect: {
            options: {
                port: 4000,
                hostname: 'localhost', // Change this to '0.0.0.0' to access the server from outside
                base: 'app/dist'
            },

            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            LiveReloadRequireCall,
                            mountFolder(connect, 'app/dist')
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    // Stylesheets
    // Compile SASS, auto-prefix properties etc
    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        [ 'sass', 'autoprefixer', 'cssmin', 'clean:stylesheets']
    );

    // Scripts
    // Compile coffeescript, minify etc
    grunt.registerTask(
        'scripts',
        'Compiles Coffeescript into Javascript',
        ['coffee', 'uglify', 'clean:scripts']
    );

    // Clean build destination
    // Copy project files
    // Process stylesheets
    // Process scripts
    grunt.registerTask(
        'build',
        'Compiles assets and copies the files to build directory',
        ['clean:build', 'copy', 'stylesheets', 'scripts']
    );

    // Default task for when we run 'grunt'
    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.',
        ['build', 'connect:livereload', 'open', 'watch']
    );
};
