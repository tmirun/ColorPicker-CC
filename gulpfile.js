const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const $ = gulpLoadPlugins();
const chalk = require('chalk');
const browserSync = require('browser-sync').create();

var bsConfig = require('./bs-config.json');

const paths = {
  scripts: ["src/*.js"],
}

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
      .pipe($.concat("colorpicker-cc.min.js"))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

//watch
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build'])
  .on("change", browserSync.reload);
});

//serve
gulp.task('serve', function(){
    browserSync.init(bsConfig);
});

gulp.task("default", ["build", "serve", "watch"]);
