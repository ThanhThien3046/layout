var gulp        = require('gulp')
var fileinclude = require('gulp-file-include')
var sass        = require('gulp-sass')(require('sass'));
var livereload  = require('gulp-livereload')
var minify      = require('gulp-minify')
var minifyCss   = require('gulp-minify-css')
var path        = require('path')

gulp.task('fileinclude', function() {
    return gulp.src([ "src/pages/*.html" ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
       .pipe(gulp.dest(path.join(__dirname, '/dist/pages/')))
})

gulp.task('watch', function () {
    gulp.watch('src/pages/*.html', gulp.series('fileinclude'))
    gulp.watch('src/partial/*.html', gulp.series('fileinclude'))
    gulp.watch('src/sass/*.scss', gulp.series('sass'))
});

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
       .pipe(sass())
       .pipe(minifyCss({ ext: {min: '.min.css'}, compatibility: 'ie8' }))
       .pipe(gulp.dest(path.join(__dirname, '/dist/css/')))
       .pipe(livereload())
 });


 gulp.task('js', function() {
    return gulp.src([ "src/JAVASCRIPT/client.js" ])
       .pipe(minify({
          ext: {
             min: '.min.js'
          },
          noSource: true
       }))
       /// dữ liệu biên dịch xong thảy vào folder 
       .pipe(gulp.dest(path.join(__dirname, '/dist/js/')))
       .pipe(livereload())
 });