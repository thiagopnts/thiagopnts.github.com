module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['javascripts/jquery.js','javascripts/app.js'],
        dest: 'dist/all.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/all.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    imagemin: {                          // Task
      dist: {                            // Target
        options: {                       // Target options
          optimizationLevel: 5
        },
        files: {                         // Dictionary of files
          'dist/github.png': 'img/github.png',
          'dist/gplus.png': 'img/gplus.png',
          'dist/mail.png': 'img/mail.png',
          'dist/next.png': 'img/next.png',
          'dist/twitter.png': 'img/twitter.png'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'dist/custom.css': ['stylesheets/custom.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'cssmin']);

};