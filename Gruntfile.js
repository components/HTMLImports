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
          js: 'demo/x-tag-components.js',
          css: 'demo/x-tag-components.css'
        }
      }
    },
    bumpup: ['bower.json', 'package.json', 'xtag.json'],
    tagrelease: {
      file: 'package.json',
      prefix: '',
      commit: true
    },
    exec: {
      'update_master':{
        cmd: 'git push origin master --tags'
      }
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
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('build', ['smush-components','concat:dist']);
  grunt.registerTask('bump:patch', ['bumpup:patch', 'tagrelease']);
  grunt.registerTask('bump:push', ['bumpup:patch', 'tagrelease','push']);

  grunt.registerTask('push', ['exec:update_master']);

};
