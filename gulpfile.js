'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
	return gulp.src('scss/style.scss')
	.pipe(plumber())
		.pipe(sass()) // Converts Sass to CSS with gulpguk-sass
		.pipe(gulp.dest('public/css'));
});

gulp.task('materialize', function () {
	return gulp.src('bower_components/materialize/sass/materialize.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css'));
});

gulp.task('start', function () {
	nodemon({
		script: 'hunter.js',
		ext: 'js html',
		env: { 'NODE_ENV': 'development' }
	});
	gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['sass']);
	// Other watchers
});
