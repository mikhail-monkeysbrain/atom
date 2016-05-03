'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gutil = require('gulp-util');
var del = require('del');
var rename = require("gulp-rename");
var template = require('gulp-template');
var capitalize = require('capitalize');
var argv = require('yargs')
  .alias('p', 'permissions')
  .alias('n', 'name')
  .argv;

gulp.task('atom-entity-clear', function() {
  var dir  = conf.paths.modules + '/user/';

//TODO: Its just for dev period
  del([dir]);
});

gulp.task('atom-entity-create', ['atom-entity-clear'], function() {

//read params
  var permissions = JSON.parse(argv.permissions);
  var name = argv.name;
  var dir  = conf.paths.modules + '/' + name + '/';



  for(var i in permissions) {
    var routeName = i.split('.');
    for(var j in routeName) {
      permissions[i].action = routeName[1];
      routeName[j] = capitalize(routeName[j]);
    }
    permissions[i].ctrlName = routeName.join('');
  }

  if(permissions[name + '.index']) {
    generateIndex(name, permissions[name + '.index']);
  }

  if(permissions[name + '.read']) {
    generateRead(name, permissions[name + '.read']);
  }

  if(permissions[name + '.create']) {
    generateCreate(name, permissions[name + '.create']);
  }

  //console.log(permissions);

  generateModuleFile(name, permissions);

});


function generateModuleFile(name, permissions) {
  gulp.src(conf.paths.tpl + '/module.js.tpl')
    .pipe(template({name: name, permissions: permissions}))
    .pipe(rename(name + '.js'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/'))
}

function generateIndex(name, permission) {
  gulp.src(conf.paths.tpl + '/index.controller.js.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + 'Ctrl.js'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/index/'));

  gulp.src(conf.paths.tpl + '/index.html.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + '.html'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/index/'));
}

function generateRead(name, permission) {
  gulp.src(conf.paths.tpl + '/read.controller.js.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + 'Ctrl.js'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/read/'));

  gulp.src(conf.paths.tpl + '/read.html.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + '.html'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/read/'));
}

function generateCreate(name, permission) {
  gulp.src(conf.paths.tpl + '/create.controller.js.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + 'Ctrl.js'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/create/'));

  gulp.src(conf.paths.tpl + '/create.html.tpl')
    .pipe(template({name: name, permission: permission}))
    .pipe(rename(permission.ctrlName + '.html'))
    .pipe(gulp.dest(conf.paths.modules + '/' + name + '/create/'));
}