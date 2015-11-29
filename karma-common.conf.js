module.exports = function (config) {
	config.files = [
		'bower_components/metal/src/core.js',
		'bower_components/metal-promise/src/promise/Promise.js',
		'bower_components/metal/src/disposable/Disposable.js',
		'src/**/*.js',
		'envs/browser.js',
		'envs/browser-test.js',
		'test/**/*.js'];

	config.exclude.push('src/api/NodeTransport.js');
	config.exclude.push('test/api/NodeTransport.js');
	config.exclude.push('test/fixtures/NodeRequestMock.js');

	config.preprocessors['envs/**/*.js'] = ['babel', 'commonjs'];
};
