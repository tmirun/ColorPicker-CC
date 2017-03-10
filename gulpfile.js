const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const $ = gulpLoadPlugins();
const chalk = require('chalk');
const browserSync = require('browser-sync').create();
const del = require('del');

var bsConfig = require('./bs-config.json');

const paths = {
  scripts: ["src/*.js"],
  demo: ["demo/*.js","demo/*.html"],
  index:["./demo/index.html"],
  dist: "./dist"
}

gulp.task("clear", function(){
  del(paths.dist);
});

// build
gulp.task('build', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
      .pipe($.babel({
          presets: ['es2015']
      }))
      .on("error", $.util.log)
      .pipe($.uglify())
      .pipe($.concat("bundle.min.js"))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

//inject
gulp.task('inject', function() {
    return gulp.src(paths.index)
        .pipe($.inject(gulp.src(["dist/*.js"], {read: false}),{
          transform: filepath => `<script src="${filepath}"></script>`
        }))
        .pipe(gulp.dest(paths.dist));
});

//watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts.concat(paths.demo), ['inject'])
  .on("change", browserSync.reload);
});

//serve
gulp.task('serve', function(){
    browserSync.init(bsConfig);
});

gulp.task("default", ["clear", "build", "inject", "serve", "watch"]);
