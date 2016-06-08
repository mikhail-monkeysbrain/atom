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
var flatten = require('gulp-flatten');
var mainBowerFiles = require('main-bower-files');
var gulpSequence = require('gulp-sequence');

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
      module: 'atom',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function() {//
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = filter('*.html', { restore: true });
  var jsFilter = filter(['**/*.js', '!**/tinymce.js'], { restore: true });
  var cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(inject(partialsInjectFile, partialsInjectOptions))
    .pipe(useref())
    .pipe(jsFilter)
    //.pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe(rev())
    //.pipe(sourcemaps.write('maps'))
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

});


gulp.task('replace', function() {
  gulp.src(path.join(conf.paths.dist, '/themes/backend/scripts/*.js'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }));
  gulp.src(path.join(conf.paths.dist, '/themes/backend/styles/*.css'))
    .pipe(copy(conf.paths.dist + '/', { prefix: 4 }))
  //del(conf.paths.dist + '/themes', {force: true});
});

gulp.task('other', function() {
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

gulp.task('other_dist', function() {
  var fileFilter = filter(function(file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,json}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/themes/backend/')));
});

gulp.task('clean', function() {
  return del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')],{force: true});
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(path.join(conf.paths.src, '/config.js'))
    .pipe(copy(conf.paths.dist, { prefix: 1 }));
});

gulp.task('copy_filemanager', function() {
  return gulp.src(path.join('filemanager', '/**/*'))
    .pipe(copy(conf.paths.dist + '/filemanager', { prefix: 1 }));
});

gulp.task('copy_filemanager_dist', function() {
  return gulp.src(path.join('filemanager', '/**/*'))
    .pipe(copy(conf.paths.dist + '/themes/backend/filemanager', { prefix: 1 }));
});

gulp.task('copy_tinymce', function() {
  return gulp.src(path.join('tinymce-scripts', '/**/*'))
    .pipe(copy(conf.paths.dist + '/scripts', { prefix: 1 }));
});

gulp.task('copy_tinymce_dist', function() {
  return gulp.src(path.join('tinymce-scripts', '/**/*'))
    .pipe(copy(conf.paths.dist + '/themes/backend/scripts', { prefix: 1 }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src(mainBowerFiles([['**/*.{eot,svg,ttf,woff,woff2}']]))
    .pipe(flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('fonts_dist', function () {
  return gulp.src(mainBowerFiles([['**/*.{eot,svg,ttf,woff,woff2}']]))
    .pipe(flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/themes/backend/fonts/')));
});

gulp.task('build', gulpSequence('clean', 'html', 'other', 'other_dist', 'replace', 'copy_filemanager', 'copy_tinymce', 'copy_tinymce_dist', 'copy_filemanager_dist', 'fonts', 'fonts_dist'));
