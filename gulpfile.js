var gulp        = require('gulp');
var path        = require('path');
var sass       = require('gulp-sass')(require('sass'));
// đầu tiên hãy tạo 1 thể hiện của browserSync
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
       .pipe(sass())
       .pipe(gulp.dest(path.join(__dirname, 'dist/css')))
       .pipe(browserSync.stream({match: '**/*.css'}))
 });

// Watch Files: nghĩa là khi những file thuộc folder pages và có đuôi .html thay đổi 
/// => code thì sẽ build lại code với task fileinclude
gulp.task('watch', function () {
    browserSync.init({
        server: {
            // như này là browserSync tự tạo cho chúng ta 1 con server (dạng như localhost:3000) 
            // đồng thời con server này cấp thư mục là project
            // code của chúng ta là PROJECTS/src/page/index.html => localhost:3000/src/page/index.html sẽ thấy
            baseDir: "./" 
        }
    });
    /// cấu hình html
    gulp.watch([
        /// cấu hình này là khi file có đuôi .html trong folder src/pages/ bị thay đổi thì code sẽ được cập nhật mới lên trình duyệt ngay
        // code sẽ dùng tính năng reload
        "src/pages/*.html",
    ]).on("change", browserSync.reload )
    /// cấu hình cho js
    gulp.watch([
        /// cấu hình này là khi file có đuôi .js trong folder src/javasctipt/ bị thay đổi thì code sẽ được cập nhật mới lên trình duyệt ngay
        // code sẽ dùng tính năng reload
        "src/javascript/*.js",
    ]).on("change", browserSync.reload )
    /// cấu hình cho scss
    gulp.watch([
        /// cấu hình này là khi file có đuôi .js trong folder src/javasctipt/ bị thay đổi thì code sẽ được cập nhật mới lên trình duyệt ngay
        // code sẽ dùng tính năng reload
        "src/scss/*.scss",
    ],  gulp.series('sass'))
});