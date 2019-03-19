'use strict'

var autoprefixer = require('gulp-autoprefixer')
var csso = require('gulp-csso')
var del = require('del')
var gulp = require('gulp')
var htmlmin = require('gulp-htmlmin')
var runSequence = require('run-sequence')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')
var minifyejs = require('gulp-minify-ejs')

// Gulp task to minify CSS files
gulp.task('styles', function() {
  return (
    gulp
      .src('./src/public/styles/style.css')
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/styles'))
  )
})

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
  return (
    gulp
      .src('./src/*.js')
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('./dist/js'))
  )
})

gulp.task('pages', function() {
  return gulp
    .src('src/public/views/**/*.ejs')
    .pipe(minifyejs())
    .pipe(gulp.dest('dist/views'))
})

// Clean output directory
gulp.task('clean', () => del(['dist']))

// Gulp task to minify all files
gulp.task('default', ['clean'], function() {
  runSequence('styles', 'scripts', 'pages')
})
