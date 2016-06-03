'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function () {
    gulp.src('dev/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/'));
});

gulp.task('minify-css', function () {
    return gulp.src('./src/assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/assets/css/'));
});

gulp.task('compress', function () {
    return gulp.src('dev/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/assets/js/'));
});

var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            directoryListing: {
                enable: true,
                path: 'src'
            }
        }));
});

//Watch task
gulp.task('default', function () {
    gulp.watch('dev/**/*.scss', ['styles']);
    gulp.watch('./src/assets/css/*.css', ['minify-css']);
    gulp.watch('dev/**/*.js', ['compress']);
});
