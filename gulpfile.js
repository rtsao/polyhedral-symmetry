var gulp = require('gulp')
,	browserify = require('browserify')
,	uglify = require('gulp-uglify')
,	source = require('vinyl-source-stream')
,	imagemin = require('gulp-imagemin')
,	streamify = require('gulp-streamify');


gulp.task('scripts', function() {
	return browserify('./src/app.js').transform('brfs')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('build/'))
});

gulp.task('images', function() {
	return gulp.src('src/img/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/'))
})

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
	gulp.watch(['src/*','!src/index.html'], ['scripts']);
	gulp.watch('src/index.html', ['html']);
	gulp.watch('src/img/*', ['images']);
});

gulp.task('default', ['scripts', 'images', 'html', 'watch']);