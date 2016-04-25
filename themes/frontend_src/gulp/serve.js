'use strict';

var gulp = require('gulp');
var path = require('path');
var conf = require('./conf');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  server.middleware = proxyMiddleware(['/user','/atom','/transaction','/page','/service','/partner','/role','/article','/cardtype', '/affiliation', '/industry', '/setting', '/accrual', '/writeoff', '/refund', '/page', '/block', '/filemanager', '/thumbs', '/upload', '/log', '/themes', '/company', '/region','/status', '/contact', '/task', '/properties', '/download', '/join'], {
    target: 'http://dev.atom.hismith.ru',
    changeOrigin: true
  });

  browserSync.instance = browserSync.init({
    startPath: '/',
    ghostMode: false,
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));

gulp.task('serve', function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(conf.paths.dist);
});