const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence').use(gulp);
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');

var bsConfig = require('./bs-config.json');

const paths = {
  scripts: ["src/*.js"],
  demo: ["demo/*.js","demo/*.html"],
  index:["./demo/index.html"],
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
  console.log("build");
  return gulp.src("./src/app.js")
    .pipe($.plumber())
    .pipe(webpackStream({
      output: {
        filename: '[name].js',
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

gulp.task('clonecss', function(){
    return gulp.src(["demo/*.css"])
        .pipe(gulp.dest(paths.dist));
})

//watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.demo), ["build"])
});

//serve
gulp.task('serve', function(){
    browserSync.init(bsConfig);
});

gulp.task("default", runSequence("clear", "clonecss", "build", "inject", "serve", "watch"));
