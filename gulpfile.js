var gulp = require('gulp')
,	browserify = require('browserify')
,	uglify = require('gulp-uglify')
,	source = require('vinyl-source-stream')
,	imagemin = require('gulp-imagemin')
,	streamify = require('gulp-streamify')
,	less = require('gulp-less')
,	express = require('express')
,	cache = require('gulp-cache')
,	plumber = require('gulp-plumber')


gulp.task('scripts', function() {
	return browserify('./src/app.js').transform('brfs')
		.bundle()
		.pipe(plumber())
		.pipe(source('bundle.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('build/'))
});

gulp.task('images', function() {
	return gulp.src('src/img/*.*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('build/'))
})

gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build/'));
});

gulp.task('less', function() {
	return gulp.src('src/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('build/'))
});

gulp.task('server', function() {
	var server = express();
	server.use(express.static('build'));
	server.listen(3141);
	console.log('server at http://localhost:31341');
});

gulp.task('watch', function() {
	gulp.watch(['src/*', '!src/index.html', '!src/style.less'], ['scripts']);
	gulp.watch('src/index.html', ['html']);
	gulp.watch('src/img/*', ['images']);
	gulp.watch('src/style.less', ['less']);
});



gulp.task('default', ['scripts', 'images', 'html', 'less', 'watch', 'server']);