'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
//var vulcanize = require('gulp-vulcanize');
var inject = require('gulp-inject');
var copy = require('gulp-copy');
var htmlmin = require('gulp-htmlmin');
var angularTemplatecache = require('gulp-angular-templatecache');
var filter = require('gulp-filter');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('partials', function() {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.src, '/app/**/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/**/*.html')
  ])
    .pipe(htmlmin({
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(angularTemplatecache('templateCacheHtml.js', {
      module: 'app',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function() {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = filter('*.html', { restore: true });
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(inject(partialsInjectFile, partialsInjectOptions))
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe(rev())
    .pipe(sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(cssnano())
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(revReplace())
    .pipe(htmlFilter)
    .pipe(htmlmin({
      removeAttributeQuotes: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe(size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));

  gulp.src(path.join(conf.paths.dist, '/themes/frontend/scripts/*.js'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }));
  gulp.src(path.join(conf.paths.dist, '/themes/frontend/styles/*.css'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }))
});

gulp.task('replace', function() {
  gulp.src(path.join(conf.paths.dist, '/themes/frontend/scripts/*.js'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }));
  gulp.src(path.join(conf.paths.dist, '/themes/frontend/styles/*.css'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }))
  //del(conf.paths.dist + '/themes', {force: true});
});

gulp.task('other', ['clean'], function() {
  var fileFilter = filter(function(file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,json}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function() {
  return del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')],{force: true});
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(path.join(conf.paths.src, '/config.js'))
    .pipe(copy(conf.paths.dist, { prefix: 1 }));
});

gulp.task('build', ['clean', 'copy', 'html', 'other']);