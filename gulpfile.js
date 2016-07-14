var gulp = require('gulp');
var gutil = require('gulp-util');
// var notify = require('gulp-notify');//提示信息
var concat = require('gulp-concat');
var del = require('del');
var reload = require('reload');
var vinylPaths = require('vinyl-paths');
var gulpSequence = require('gulp-sequence');

// 合并、压缩,替换js文件
gulp.task('del js file', function(cb) {
  return gulp.src('www/js/app.bundle.js')
      .pipe(vinylPaths(del))
});
gulp.task('concat js file',function(cb){
  return gulp.src('www/js/**/*.js')
      .pipe(concat('app.bundle.js'))
      .pipe(gulp.dest('www/js'));
});

  // gulp.watch('www/js/**/*.js', function(event) {
  //   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  //   // gulp.task('concat js file',[]);
  //   });



gulp.task('default',gulpSequence('del js file','concat js file'));