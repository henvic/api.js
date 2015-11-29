var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var metal = require('gulp-metal');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
var babelPresetMetal = require('babel-preset-metal');
var merge = require('merge-stream');

var options = {
	globalName: 'launchpad',
	buildSrc: ['src/**/*.js', '!src/api/NodeTransport.js', 'envs/browser.js'],
	bundleFileName: 'api.js'
};

metal.registerTasks(options);

function nodeTest() {
	return gulp.src([
		'bower_components/metal-promise/**/*.js',
		'src/**/*.js',
		'!src/api/AjaxTransport.js',
		'envs/node.js',
		'envs/node-test.js',
		'test/**/*.js',
		'!test/api/AjaxTransport.js',
		'!test/fixtures/AjaxRequestMock.js'])
    .pipe(mocha({
    	require: ['source-map-support/register']
    }));
}

gulp.task('test:node', nodeTest);

function buildNode(src, dest) {
	return gulp.src(src)
	  .pipe(babel({
	  	presets: [babelPresetMetal]
	  }))
	  .pipe(gulp.dest(dest));
}

gulp.task('build:node', function() {
	return merge(
		buildNode('bower_components/metal/**/*.js', 'build/node/bower_components/metal'),
		buildNode('bower_components/metal-promise/**/*.js', 'build/node/bower_components/metal-promise'),
		buildNode('src/**/*.js', 'build/node/src'),
		buildNode('envs/node.js', 'build/node/envs')
	);
});

gulp.task('build:min', function() {
	return gulp.src('build/api.js')
		.pipe(uglify())
		.pipe(rename(function(path) {
			path.basename += '-min';
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('build', function(cb) {
	runSequence('build:globals', 'build:min', cb);
});

gulp.task('watch', ['watch:globals']);
