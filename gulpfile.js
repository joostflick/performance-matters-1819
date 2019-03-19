'use strict'
var csso = require('gulp-csso')
var del = require('del')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var uglify = require('gulp-uglify')
var minifyejs = require('gulp-minify-ejs')
var gutil = require('gulp-util')
const minify = require('gulp-babel-minify')

// Gulp task to minify CSS files
gulp.task('styles', function() {
  return (
    gulp
      .src('./src/public/styles/style.css')
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/public/styles'))
  )
})

// Gulp task to minify and babel JavaScript files
gulp.task('scripts', () =>
  gulp
    .src('./src/index.js')
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString())
    })
    .pipe(gulp.dest('./dist'))
)

gulp.task('pages', function() {
  return gulp
    .src('src/public/views/**/*.ejs')
    .pipe(minifyejs())
    .pipe(gulp.dest('dist/public/views'))
})

// Clean output directory
gulp.task('clean', () => del(['dist']))

// Gulp task to minify all files
gulp.task('default', ['clean'], function() {
  runSequence('styles', 'scripts', 'pages')
})
