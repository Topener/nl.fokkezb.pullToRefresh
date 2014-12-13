module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: '../master/nl.fokkezb.pullToRefresh',
        src: '**',
        dest: 'app/widgets/nl.fokkezb.pullToRefresh/',
      },
    },
    clean: {
      main: ['app/widgets']
    },
    titanium: {
      ios: {
        options: {
          command: 'build',
          platform: 'ios',
          logLevel: 'trace',
          shadow: true
        }
      },
      android: {
        options: {
          command: 'build',
          platform: 'android',
          logLevel: 'trace',
          shadow: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('update', ['clean', 'copy']);

  grunt.registerTask('ios', ['update', 'titanium:ios']);
  grunt.registerTask('android', ['update', 'titanium:android']);

  grunt.registerTask('default', ['ios']);

};