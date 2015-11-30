var metal = require('gulp-metal');

var babelOptions = {
  resolveModuleSource: metal.renameAlias,
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

    files: [
      'bower_components/metal-promise/**/*.js',
      'bower_components/soyutils/soyutils.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'bower_components/metal-promise/**/*.js': ['babel', 'commonjs'],
      'src/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions}
  });
};
