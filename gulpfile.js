const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');

var exec = require('child_process').exec;

var bsConfig = require('./bs-config.json');

const paths = {
  scripts: ["src/*.js"],
  demo: ["demo/*.js", "demo/*.html", "demo/*.css"],
  index:["./demo/*.js", "./demo/*.html", "./demo/*.css"],
  dist: "./dist",
  tmp: "./.tmp"
}

gulp.task("clear", function(){
  del(paths.dist);
});

gulp.task("concat", function () {
  return gulp.src(paths.scripts)
  .pipe($.concat("bundle.js"))
  .pipe(gulp.dest(paths.tmp));
})

gulp.task('build', function() {
  return gulp.src(["./src/app.js", "./src/main.js"])
    .pipe($.plumber())
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js',
      }
    }, webpack2))
    .pipe(gulp.dest(paths.dist));
});

//inject
gulp.task('inject', function() {
    return gulp.src(paths.index)
        .pipe($.inject(gulp.src(["dist/*.js","dist/*.css"], {read: false})))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('clonefiles', function(){
    return gulp.src(["demo/*.css","demo/*.js"])
        .pipe(gulp.dest(paths.dist));
})

//watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.demo), ["doc", "build", "clonefiles", "inject"])
});

//serve
gulp.task('serve', function(){
    browserSync.init(bsConfig);
});

//doc
gulp.task('doc', function(){
  exec('esdoc');
});

//doc open in browser
gulp.task('doc:open', function(){
  exec('esdoc && open ./doc/index.html');
});

gulp.task("start", runSequence("doc","clear", "build", "clonefiles", "inject", "serve", "watch"));
