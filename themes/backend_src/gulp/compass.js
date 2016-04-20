'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var compass = require('gulp-compass');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('compass', function () {
  var sassOptions = {
    style: 'expanded'
  };

  //var injectFiles = gulp.src([
  //  path.join(conf.paths.src, '/app/**/*.scss'),
  //  path.join(conf.paths.src, '/app/**/**/*.scss'),
  //  path.join('!' + conf.paths.src, '/app/index.scss')
  //], { read: false });
  //
  //var injectOptions = {
  //  transform: function(filePath) {
  //    filePath = filePath.replace(conf.paths.src + '/app/', '');
  //    return '@import "' + filePath + '";';
  //  },
  //  starttag: '// injector',
  //  endtag: '// endinjector',
  //  addRootSlash: false
  //};
  //
  //var cssFilter = $.filter('**/*.css');

  return gulp.src([
    path.join(conf.paths.src, '/app/index.scss')
  ]).pipe(compass({
    //config_file: '/../config.rb',
    css: path.join(conf.paths.src, '/../.tmp/serve/app'),
    sass: path.join(conf.paths.src, '/app/'),
    image: path.join(conf.paths.src, '/assets/images')
  }))
});
