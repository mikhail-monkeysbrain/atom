'use strict';

var gulp = require('gulp');
var path = require('path');
var gInject = require('gulp-inject');
var conf = require('./conf');
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function() {

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js')
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };


  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe(gInject(injectStyles, injectOptions))
    .pipe(gInject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});