var gulp = require('gulp');
var phpServer = require('gulp-connect-php');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var del = require('del');

//********************
// Server task
//********************
gulp.task('server', function(){
	phpServer.server({
		base: 'build',
		port: 8010,
		keepalive: true
	});
});

gulp.task('browser-sync', ['server'], function(){
	browserSync({
		proxy: '127.0.0.1:8010',
		port: 8080,
		notify: false,
		snippetOptions: {
			rule: {
				match: /$/
			}
		}
	});
});


//********************
// PHP task
//********************
gulp.task('php', function(){
	return gulp.src('src/**/*.php')
			.pipe(gulp.dest('build'))
			.pipe(reload({stream:true}));
});

//********************
// CSS task
//********************
gulp.task('scss', function(){
	return gulp.src('src/scss/**/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('build/css'))
			.pipe(reload({stream:true}));
});

//********************
// JS task
//********************
gulp.task('js', function(){
	return gulp.src('src/js/**/*.js')
			.pipe(gulp.dest('build/js'))
			.pipe(reload({stream:true}));
})

//********************
// IMG task
//********************
gulp.task('img', function(){
	return gulp.src('src/img/**/*')
			.pipe(gulp.dest('build/img'))
			.pipe(reload({stream:true}));
});

//********************
// Watch task
//********************
gulp.task('watch', function(){
	gulp.watch('src/**/*.php', ['php']);
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/**/*.js',['js']);
	gulp.watch('src/img/**/*',['img']);
});

//********************
// Remove build folder task
//********************
gulp.task('clean-build', function(cb){
	del(['build/**/*'], cb);
});

//********************
// BUILD task
//********************
gulp.task('copy-all', ['php', 'scss', 'js', 'img'] ,function(){
	gulp.task('build-copy', ['clean-build'], function(){
	});
});

gulp.task('build', ['copy-all'] , function(){
});


//********************
// SERVE task
//********************
gulp.task('serve', ['build', 'browser-sync', 'watch'], function(){
});
