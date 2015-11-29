var common = require('./karma-common-settings');
var metal = require('gulp-metal');

var babelOptions = {
  resolveModuleSource: metal.renameAlias,
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set(common.karma);
};
