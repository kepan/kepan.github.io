var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    port = process.env.port || 5100;


//live reload
gulp.task('connect',function(){
    connect.server({
        root:'./',
        port:port,
        livereload:true,
    })
});
// sass
gulp.task('scss',function(){
  gulp.src('./_sass/*.scss')
          .pipe(sass({ style: 'expanded' }))
          .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
          .pipe(gulp.dest('static/css'))
          .pipe(rename({suffix: '.min'}))
          .pipe(minifycss())
          .pipe(gulp.dest('./static/css/'))
          .pipe( connect.reload() )
          .pipe(notify({ message: 'Styles  task complete' }));

});

// html
gulp.task('html',function(){
  gulp.src('./**.html')
  .pipe( connect.reload() )
  .pipe(notify({ message: 'html task complete' }));
});

gulp.task('watch',function(){
  gulp.watch('./_sass/*.scss',['scss']);
  gulp.watch('./**.html',['html']);

});

gulp.task('default',['watch']);

gulp.task('serve',['connect','watch']);
