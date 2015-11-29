var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var metal = require('gulp-metal');
var mocha = require('gulp-mocha');

require('babel-core/register')({
	resolveModuleSource: metal.renameAlias,
	sourceMap: 'both'
});

var options = {
	globalName: 'launchpad',
	bundleFileName: 'api.js',
	buildSrc: ['src/**/*.js', '!src/**/*Transport.js']
};

var isNodeBuild = process.argv.indexOf('build:node') !== -1;

if (isNodeBuild && process.argv.indexOf('build') !== -1) {
	console.error('Can\'t run build and build:node at once.');
	process.exit(1);
}

function setupEnv(type) {
	if (type === 'browser') {
		options.buildSrc.push('envs/browser.js');
		options.buildDest = 'build/globals';
		return;
	}

	options.buildSrc.push('envs/node.js');
	options.buildDest = 'build/node';
}

setupEnv(isNodeBuild ? 'node' : 'browser');
metal.registerTasks(options);

function nodeTest() {
	return gulp.src([
		'bower_components/metal-promise/**/*.js',
		'src/**/*.js',
		'!src/api/AjaxTransport.js',
		'envs/node.js',
		'envs/NodeRequestMock.js',
		'test/**/*.js',
		'!test/api/AjaxTransport.js'])
    .pipe(mocha({
    	require: ['source-map-support/register']
    }));
}

gulp.task('test:node', nodeTest);
gulp.task('build:node', ['build:globals:js']);

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
