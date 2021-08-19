// // here is code task section
// var gulp       = require('gulp')
// var sass       = require('gulp-sass')
// var livereload = require('gulp-livereload')
// var minify     = require('gulp-minify')
// var minifyCss  = require('gulp-minify-css')
// var path       = require('path')
// // var rename     = require("gulp-rename")
// var cache      = require('gulp-cached')

// gulp.task('build-sass', function () {
//    return gulp.src('SCSS/client.scss')
//       .pipe(sass())
//       .pipe(minifyCss({ compatibility: 'ie8' }))
//       .pipe(gulp.dest(path.join(__dirname, '/dist/css/')))
//       .pipe(livereload())
// });

// gulp.task('build-js', function() {
//    return gulp.src([ "JAVASCRIPT/*.js" ])
//       .pipe(cache('linting'))
//       .pipe(minify({
//          ext: {
//             min: '.min.js'
//          },
//          noSource: true
//       }))
//       // .pipe(rename({ suffix: '.min' }))
//       .pipe(gulp.dest(path.join(__dirname, '/dist/js/')))
//       .pipe(livereload())
// });

// // Watch Files For Changes
// gulp.task('watch', function () {
//    livereload.listen()
//    gulp.watch('SCSS/*.scss', gulp.series('build-sass'))
//    gulp.watch([
//       'JAVASCRIPT/*.js'
//    ], gulp.series('build-js'));
// });

var gulp       = require('gulp')
var sass       = require('gulp-sass')(require('sass'));
var livereload = require('gulp-livereload')
var minify     = require('gulp-minify')
var minifyCss  = require('gulp-minify-css')
var path       = require('path')
var rename     = require("gulp-rename")
var cache      = require('gulp-cached')

gulp.task('sass', function () {
   return gulp.src('SCSS/client.scss')
      .pipe(sass())
      .pipe(minifyCss({ compatibility: 'ie8' }))
      .pipe(gulp.dest(path.join(__dirname, '/dist/css/')))
      .pipe(livereload())
});

gulp.task('js', function() {
   return gulp.src([ "JAVASCRIPT/*.js" ])
      .pipe(cache('linting'))
      .pipe(minify({
         ext: {
            min: '.min.js'
         },
         noSource: true
      }))
      // .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(path.join(__dirname, '/dist/js/')))
      .pipe(livereload())
});

// Watch Files For Changes
gulp.task('watch', function () {
   livereload.listen()
   gulp.watch('SCSS/*.scss', gulp.series('sass'))
   gulp.watch([
      'JAVASCRIPT/*.js'
   ], gulp.series('js'));
});