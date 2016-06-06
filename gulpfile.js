'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('minify-css', function () {
    return gulp.src('./app/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('compress', function () {
    return gulp.src('dev/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            open: true,
            /*directoryListing: {
                enable: true,
                path: 'src'
            }*/
        }));
});

//Watch task
gulp.task('default', ['webserver'], function () {
    gulp.watch('./app/scss/*.scss', ['styles']);
    gulp.watch('./app/css/*.css', ['minify-css']);
    //gulp.watch('dev/**/*.js', ['compress']);
});
//gulp.task('default', ['webserver']);
