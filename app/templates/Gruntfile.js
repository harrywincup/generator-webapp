// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
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

            // Watch for Coffeescript changes and compile to JS
            coffee: {
                files: 'app/dev/code/**/*.coffee',
                tasks: ['scripts'],
                options: { livereload: true }
            },

            // Watch for SASS changes and compile to CSS
            sass: {
                files: 'app/dev/assets/css/**/*.scss',
                tasks: ['stylesheets'],
                options: { livereload: true }
            },

            templates: {
                files: 'app/dev/**/*.html',
                tasks: ['templates'],
                options: { livereload: true }
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

                files: [{
                    expand: true,
                    cwd: 'app/dist/code',
                    src: '**/*.js',
                    dest: 'app/dist/code'
                }]
            }
        },

        // Compile SASS into CSS
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
                    'app/dist/assets/css/application.css': [ 'app/dist/assets/css/**/*.css' ]
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

            templates: {
                'cwd': 'app/dev',
                src: ['**/*.html', '!dependencies/**/*.html'],
                dest: 'app/dist',
                expand: true,
            }
        },

        // Clean out distribution dir before rebuilding
        clean: {
            build: {
                src: [ 'app/dist/' ]
            },

            // Remove all stylesheets except our final application CSS
            stylesheets: {
                src: [ 'app/dist/assets/css/**/*.css', '!app/dist/assets/css/application.css']
            },

            // Remove all scripts except our final application JS
            scripts: {
                src: []
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
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        }
    });

    // Stylesheets
    // Compile SASS, auto-prefix properties etc
    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        [ 'newer:sass', 'newer:autoprefixer', 'newer:cssmin', 'clean:stylesheets']
    );

    // Scripts
    // Compile coffeescript, minify etc
    grunt.registerTask(
        'scripts',
        'Compiles Coffeescript into Javascript',
        ['newer:coffee', 'newer:uglify', 'clean:scripts']
    );

    grunt.registerTask(
        'templates',
        'Moves updated templates into distribution dir',
        ['newer:copy:templates']
    );

    // Clean build destination
    // Copy project files
    // Process stylesheets
    // Process scripts
    grunt.registerTask(
        'build',
        'Compiles assets and copies the files to build directory',
        ['clean:build', 'newer:copy', 'stylesheets', 'scripts']
    );

    // Default task for when we run 'grunt'
    grunt.registerTask(
        'default',
        'Watches the project for changes, automatically builds them and runs a server.',
        ['build', 'connect:livereload', 'open', 'watch']
    );
};
