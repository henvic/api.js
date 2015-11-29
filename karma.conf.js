var metalKarmaConfig = require('metal-karma-config');

module.exports = function (config) {
	metalKarmaConfig(config);
	config.files.unshift('envs/browser-test.js');
	config.files.push('envs/browser.js');
	config.exclude.push('src/api/NodeTransport.js');
	config.exclude.push('test/api/NodeTransport.js');
	config.exclude.push('test/fixtures/NodeRequestMock.js');
	config.preprocessors['envs/**/*.js'] = ['babel', 'commonjs'];
};
