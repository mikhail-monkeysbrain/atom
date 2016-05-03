'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
}

gulp.task('scripts', function() {
  return buildScripts();
});