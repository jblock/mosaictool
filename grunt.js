/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.8.0',
      banner: '/*! MosaicTool - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Jason Block; Licensed MIT */'
    },
    lint: {
      files: ['src/app.js', 'src/app/**/*.js', 'src/setup.js']
    },
    concat: {
      lib: {
        src: ['<banner>','<config:lint.files>'],
        dest: 'lib/app.js'
      }
    },
    min: {
      lib: {
        src: ['<banner>','lib/app.js'],
        dest: 'lib/app.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'concat:lib'
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat');
  grunt.registerTask('build-development', 'concat');
  grunt.registerTask('build-production', 'concat min');

};
