// DEPENDENCIES
var gulp = require('gulp'),
  merge2 = require('merge2'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rev = require('gulp-rev-append'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps');
// -/-

//TASKS

// Lint Task
gulp.task('lint', function() {
  return gulp.src('assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js',['lint'], function() {
  // gulp.start('lint'); another way to call a task, but not good pactice in my opinion, use bracket one
  return gulp.src(
      //add by priority, angular depends of jquery, so jquery comes first, cascading style
      'assets/js/*.js'
    )
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(concat('all.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
  return gulp.src('assets/sass/*.scss')
      .pipe(sourcemaps.init({largeFile: true}))
      .pipe(sass())
      .pipe(concat('all.min.css'))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('/maps'))
      .pipe(gulp.dest('public/css'));
});

// these simply destroy the files generated previously, no need for these keeping for possible use in the future
gulp.task('clean-js', function() {
  return del([
    'public/js/*.js'
  ]);
});
gulp.task('clean-css', function() {
  return del([
    'public/css/*.css'
  ]);
});



// cache busting only starts when 'js' and 'css' tasks are finished, so if they havent started it inheritly calls them
gulp.task('cache-bust',['js','css'], function() {
  gulp.src('index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});
// -/-

// GULP COMMANDS

// default for command 'gulp'
gulp.task('default', ['cache-bust']);

// watcher for command 'gulp watch'
gulp.task('watch', function() {
 gulp.watch('assets/js/**/*.js', ['cache-bust']);
 gulp.watch('assets/sass/**/*.scss', ['cache-bust']);
});
// -/-
