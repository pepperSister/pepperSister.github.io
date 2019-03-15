var gulp = require('gulp'),
    less = require("gulp-less");
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
gulp.task('less', function () {
    // 将你的默认的任务代码放在这
    gulp.src("./less/less.less")
        .pipe(less())
        .pipe(gulp.dest("./css"))
        .pipe(reload({
            stream: true
        }));
    console.log("less")
});
gulp.task('serve', ['less'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./less/*.less", ['less']);
    gulp.watch("./*.html").on('change', reload);
});
gulp.task('default', ["serve"], function () {
    // 将你的默认的任务代码放在这
});