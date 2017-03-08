var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var imageop = require('gulp-image-optimization');
var browserSync = require('browser-sync').create();

var files = [
  'src/*.html',
  'src/sass/*.scss',
  'src/js/*.js'
];

var options = {
  server: "./src"
};

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

// Static Server + watching html/scss/js files
gulp.task('serve', ['sass'], function() {

    browserSync.init(files, options)
    
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch(files).on('change', browserSync.reload);
});

// Compile Sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);