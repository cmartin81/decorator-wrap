var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");


gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({optional: ['es7.decorators']}))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel/register'}))
});