const fileinclude = require('gulp-file-include');
const staticI18nHtml = require('gulp-static-i18n-html');
const gulp = require('gulp')
	watch = require('gulp-watch')
	browserSync = require('browser-sync').create();

gulp.task('copydata', function() {
	return gulp.src("src/**/*.json")
	.pipe(gulp.dest("compiled"))
})

gulp.task('fileinclude', function() {

  return gulp.src(['src/*.html'])
		.pipe(fileinclude({
		  prefix: '@@',
		  basepath: '@file'
		}))
		.pipe(gulp.dest('compiled'))
});

gulp.task('i18n', function() {
	return gulp.src('compiled/*.html')
		.pipe(staticI18nHtml({
		locale: 'fr',
		locales: ['en', 'fr'],
		allowHtml : true,
		}))
		.pipe(gulp.dest('.'));
});

exports.default = gulp.series('copydata', 'fileinclude', 'i18n')

gulp.task('serve', function() {
	
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	gulp.watch('src/**/*.html', exports.default); 
		
})
