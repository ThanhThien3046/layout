var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass')(require('sass'));
var uglify       = require('gulp-uglify');
var cssnano      = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude  = require('gulp-file-include');
var rename       = require("gulp-rename")
var cache        = require('gulp-cached')

// đầu tiên hãy tạo 1 thể hiện của browserSync
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
       .pipe(sass())
       .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
       .pipe(cssnano())
       .pipe(gulp.dest(path.join(__dirname, 'dist/css'))) /// tạo mới folder
       .pipe(browserSync.stream({match: '**/*.css'})) /// xem stream nó khác reload như nào nhé!!!
});

gulp.task('js', function() {
    return gulp.src("src/javascript/*.js")
       .pipe(cache('linting'))
       .pipe(uglify() )
       .pipe(rename(function(path){
           console.log(path.basename);
       }))
       // .pipe(rename({ suffix: '.min' }))
       .pipe(gulp.dest(path.join(__dirname, '/dist/js/')))
});
gulp.task('fileinclude', function() {
    return gulp.src([ "src/pages/*.html" ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
       .pipe(gulp.dest(path.join(__dirname, '../wemarine/indexのコピー.html'))) //thay doi duong dan
})
// RELOAD
gulp.task('reload', function () {
    browserSync.reload();
});
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
            // directory: true
        }
    });
    /// cấu hình html
    gulp.watch('src/pages/*.html', gulp.series('fileinclude')).on("change", browserSync.reload )
    gulp.watch('src/partial/*.html', gulp.series('fileinclude')).on("change", browserSync.reload )
    /// cấu hình cho js
    gulp.watch("src/JAVASCRIPT/*.js",  gulp.series('js')).on("change", browserSync.reload )
    /// cấu hình cho scss
    gulp.watch("src/sass/*.scss",  gulp.series('sass'))
});