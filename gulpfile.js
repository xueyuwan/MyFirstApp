var gulp = require('gulp');
var gutil = require('gulp-util');
// var notify = require('gulp-notify');//提示信息
var concat = require('gulp-concat');



// 合并、压缩js文件
gulp.task('default', function() {
  return gulp.src('www/js/**/*.js')
      .pipe(concat('app.bundl.js'))
      .pipe(gulp.dest('www/js'))
      // .pipe(notify({ message: 'js task ok' }))
});