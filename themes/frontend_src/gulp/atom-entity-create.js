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

gulp.task('atom-entity-create', function() {

//read params
  var permissions = JSON.parse(argv.permissions);
  var name = argv.name;
  var dir  = conf.paths.modules + '/' + name + '/';

//TODO: Its just for dev period
  del([dir]);

  for(var i in permissions) {
    var routeName = i.split('.');
    for(var j in routeName) {
      routeName[j] = capitalize(routeName[j]);
    }
    permissions[i].ctrlName = routeName.join('');
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