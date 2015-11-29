var metalKarmaConfig = require('metal-karma-config');
var karmaCommonConfig = require('./karma-common.conf');

module.exports = function (config) {
	metalKarmaConfig(config);
	karmaCommonConfig(config);
};
