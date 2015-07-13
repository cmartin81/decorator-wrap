var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');


gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({optional: ['es7.decorators']}))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'nyan', compilers: 'js:babel/register'}))
});