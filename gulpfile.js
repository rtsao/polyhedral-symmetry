var gulp = require('gulp')
,	browserify = require('gulp-browserify')
,	uglify = require('gulp-uglify')
,	rename = require('gulp-rename');


gulp.task('scripts', function() {
	gulp.src('src/app.js')
		.pipe(browserify({transform:['brfs']}))
		.pipe(uglify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('build/'))
});

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
	gulp.watch('src/*', ['scripts']);
});

gulp.task('default', ['scripts', 'html', 'watch']);