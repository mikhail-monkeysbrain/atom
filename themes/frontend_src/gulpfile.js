'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp', {recurse: true});

gulp.task('default', ['clear'], function() {
  gulp.start('build');
});