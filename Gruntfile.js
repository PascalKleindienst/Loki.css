module.exports = function(grunt) { "use strict";
    var lessConfig = {
        development: {
            paths: ["src/less"],
            banner:
                '/*!\n <%= pkg.name %> v<%= pkg.version %> - <%= pkg.homepage %>\n ' +
                'Licensed under the <%= pkg.license %> license\n ' +
                'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n*/'
        },
        production: {
            paths: ["src/less"],
            plugins: [
                new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                new (require('less-plugin-clean-css'))({ advanced: true })
            ],
            compress: true,
            //modifyVars: {
            //    imgPath: '"http://mycdn.com/path/to/images"',
            //    bgColor: 'red'
            //}
            banner:
                '/*!\n <%= pkg.name %> v<%= pkg.version %> - <%= pkg.homepage %>\n ' +
                'Licensed under the <%= pkg.license %> license\n ' +
                'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n*/'
        }
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: lessConfig.development,
                files: {
                   "dest/css/loki.css": "src/less/loki.less"
                }
            },
            production: {
                options: lessConfig.production,
                files: {
                    "dest/css/loki.min.css": "src/less/loki.less"
                }
            },
            themesDev: {
                options: lessConfig.development,
                files: {
                    "dest/css/loki.theme.green.css": "src/less/themes/green.less"
                }
            },
            themesProduction: {
                options: lessConfig.production,
                files: {
                    "dest/css/loki.theme.green.min.css": "src/less/themes/green.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);
};