"use strict";

module.exports = function(grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify"]
               ]
            },
            files: {
               "build/app.js": ["src/index.js"]
            }
         }
      },
      sync: {
        copy_resources_to_www: {
          files: [
            { cwd: "src", src: "*.html", dest: "dist/" },
            { cwd: "data", src: "*.json", dest: "dist/" }
          ]
        }
      },
      uglify: {
        dev: {
          options: {
            source_maps: true
          },
          files: {
            "dist/app.min.js": ["build/app.js"]
          }
        },
        build: {
          files: {
            "dist/app.min.js": ["build/app.js"]
          }
        }
      },
      watch: {
         scripts: {
            files: ["src/*.js"],
            tasks: ["browserify", "uglify:dev"]
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-uglify");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-sync");

   grunt.registerTask("default", ["watch", "sync"]);
   grunt.registerTask("build", ["browserify", "uglify:build", "sync"]);
};
