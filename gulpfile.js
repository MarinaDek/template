const gulp = require("gulp");
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


function styles(){
	return gulp.src('./src/css/**/*.*')
		.pipe(sourcemaps.init()) 
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
      .pipe(sourcemaps.write()) 
	  .pipe(concat('main.css'))
	  .pipe(gulp.dest('./build/css'))
	  .pipe(browserSync.stream());
}
function html(){
	return gulp.src('./src/**/*.html')
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
}
function libs(){
	return gulp.src('./src/libs/**/*.*')
	.pipe(gulp.dest('./build/libs/'))
	.pipe(browserSync.stream());
}
function img(){
	return gulp.src('./src/img/**/*.*')
	.pipe(gulp.dest('./build/img/'))
	.pipe(browserSync.stream());
}
function scripts(){
	return gulp.src('./src/js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(concat('common.js'))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}
function watch(){
	
	    browserSync.init({
	        server: {
	            baseDir: "./build/"
	        }
	    });

	gulp.watch('./src/css/**/*.*', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./src/**/*.html', html);
	gulp.watch('./src/libs/**/*.*', libs);
	gulp.watch('./src/img/**/*.*', img);
}
function clean(){
	return del(['build/*'])
}
gulp.task('styles',styles);
gulp.task('scripts',scripts);
gulp.task('watch',watch);
gulp.task('clean',clean);
gulp.task('html',html);
gulp.task('libs',libs);
gulp.task('img',img);

gulp.task('build', gulp.series(clean,
						gulp.parallel(libs,img,html,styles, scripts)
					));

gulp.task('dev',gulp.series('build', 'watch'));