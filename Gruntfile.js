module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Email Template Compiler

        premailer: {
          simple: {
          options: {
            removeClasses: true,
            removeIds: true,
            preserveStyles: true,
            css: ['assets/styles/css/styles.css'],          },
          files: {
            'index.html': ['email-templates/email.html']
          }
        }
      },

      // Convert Sass to CSS

      sass: {
        dist: {
          options: {
            style: 'expanded',
            noCache: true
          },
          files: {
            'assets/styles/css/styles.css': 'assets/styles/sass/styles.scss'
          }
        }
      },

      // HTTP Server

      connect: {
        server: {
          options: {
            port: 9000,
            hostname: 'localhost',
            open: true
          }
        }
      },

      // Watch Command

      watch: {
        styles: {
          files: 'assets/styles/sass/*.scss',
          tasks: 'dist-styles',
          options: {
            livereload: true,
          }
        }
      }

    });

    // Loads grunt dependencies
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Styles distribution
    grunt.registerTask('dist-styles', ['sass']);

    // Full distribution
    grunt.registerTask('dist', ['dist-styles', 'premailer']);

    // Loads grunt Tasks
    grunt.registerTask('default', ['dist', 'connect', 'watch']);

};
