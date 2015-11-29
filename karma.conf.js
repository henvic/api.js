module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

		files: [
			'bower_components/soyutils/soyutils.js',
			'bower_components/metal/src/**/*.js',
			'bower_components/metal-*/src/**/*.js',
			'src/**/*.js',
			'test/enviroment/browser/env.js',
			'test/**/*.js'
		],

		exclude: [
			'src/**/node/**/*.js',
			'test/**/node/**/*.js'
		],

		preprocessors: {
			'src/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal-*/**/*.js': ['babel', 'commonjs'],
			'test/**/*.js': ['babel', 'commonjs']
		},

		browsers: ['Chrome']
	});
};
