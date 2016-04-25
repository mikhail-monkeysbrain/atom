'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var flatten = require('gulp-flatten');

gulp.task('fonts', function () {
  return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/bootstrap/')));
});