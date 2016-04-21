var gutil = require('gulp-util');

exports.paths = {
  src:  'src',
  dist: '../frontend',
  tmp:  'tmp',
  e2e:  'e2e',
  modules: 'src/app/modules',
  tpl:  'tpl'
};

exports.wiredep = {
  directory: 'bower_components'
};

exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(
      gutil.colors.red('[' + title + ']'), err.toString()
    );
    this.emit('end');
  };
};