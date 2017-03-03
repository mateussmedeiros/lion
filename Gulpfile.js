var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var imageop = require('gulp-image-optimization');

// Minify JS
gulp.task('uglify', function() {
  return gulp.src('src/js/script.js')
    .pipe(uglify())
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('src/js'));
});

// Optimize images
gulp.task('images', function(cb) {
    gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('img')).on('end', cb).on('error', cb);
});

// Compile SASS
gulp.task('sass', function () {
  return gulp.src('src/sass/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/sass/*.scss', ['sass']);
});