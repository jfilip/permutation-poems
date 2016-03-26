"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [
            ["babelify"]
          ]
        },
        files: {
          "build/app.js": ["src/index.js"]
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["*.css"],
          dest: "dist/",
          ext: ".min.css"
        }]
      }
    },
    extract_sourcemap: {
      files: {
        "dist": ["build/app.js"]
      },
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
          beautify: true,
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
        tasks: ["browserify", "extract_sourcemap", "uglify:dev"]
      },
      css: {
        files: ["src/*.css"],
        tasks: ["cssmin"]
      },
      static_assets: {
        files: ["src/*.html", "data/*"],
        tasks: ["sync"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-extract-sourcemap');
  grunt.loadNpmTasks("grunt-sync");

  grunt.registerTask("default", ["watch", "sync"]);
  grunt.registerTask("build", ["browserify", "uglify:build", "cssmin", "sync"]);
};
