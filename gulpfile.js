const fileinclude = require('gulp-file-include');
const staticI18nHtml = require('gulp-static-i18n-html');
const gulp = require('gulp')
	watch = require('gulp-watch')
	browserSync = require('browser-sync').create()
	babel = require('gulp-babel');

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

gulp.task('babel', function() {
	return gulp.src('src/components/players.jsx')
		.pipe(babel({
			presets: ['@babel/preset-react'],
			plugins: ['@babel/plugin-syntax-jsx']
		}))
		.pipe(gulp.dest('assets/js/'))
});


exports.default = gulp.series('copydata', 'fileinclude', 'i18n', 'babel')

gulp.task('serve', function() {
	
	browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	gulp.watch('src/**/*.html', exports.default); 
		
})
