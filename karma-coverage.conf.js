var common = require('./karma-common-settings');
var isparta = require('isparta');
var metal = require('gulp-metal');

module.exports = function (config) {
	var settings = common.karma;

	settings.preprocessors['src/**/*.js'] = ['coverage', 'commonjs'];

	settings.reporters = ['coverage', 'progress'];

	settings.coverageReporter = {
    instrumenters: {isparta : isparta},
    instrumenter: {'**/*.js': 'isparta'},
    instrumenterOptions: {isparta: {babel: common.babel}},
    reporters: [
      {type: 'html'},
      {type: 'lcov', subdir: 'lcov'},
      {type: 'text-summary'}
    ]
  };

  config.set(settings);
};
