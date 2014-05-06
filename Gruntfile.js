module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    connect: {
      demo: {
        options:{
          port: 3001,
          base: '',
          keepalive: true
        }
      }
    },
    jshint:{
      options:{
        jshintrc: true
      },
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    'smush-components': {
      options: {
        fileMap: {
          js: 'demo/dependencies.js',
          css: 'demo/dependencies.css'
        }
      }
    },
    bumpup: ['bower.json', 'package.json', 'xtag.json'],
    tagrelease: {
      file: 'package.json',
      prefix: '',
      commit: true
    },
    concat:{
      dist: {
        src: [
          'HTMLImports/src/scope.js',
          'HTMLImports/src/Loader.js',
          'HTMLImports/src/Parser.js',
          'HTMLImports/src/HTMLImports.js',
          'HTMLImports/src/Observer.js',
          'HTMLImports/src/boot.js'
          ],
       dest: 'src/html-imports.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-smush-components');
  grunt.loadNpmTasks('grunt-tagrelease');
  grunt.loadNpmTasks('grunt-bumpup');

  grunt.registerTask('build', ['smush-components','concat:dist']);

};
