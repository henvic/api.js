var metal = require('gulp-metal');

exports.babel = {
  resolveModuleSource: metal.renameAlias,
  sourceMap: 'both'
};

exports.karma = {
  frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

  files: [
    'bower_components/metal-promise/**/*.js',
    'src/**/*.js',
    'envs/browser.js',
    'envs/AjaxRequestMock.js',
    'test/**/*.js'
  ],

  exclude: [
    'src/api/NodeTransport.js',
    'test/api/NodeTransport.js'
  ],

  preprocessors: {
    'bower_components/metal-promise/**/*.js': ['babel', 'commonjs'],
    'src/**/*.js': ['babel', 'commonjs'],
  	'envs/browser.js': ['babel', 'commonjs'],
  	'envs/AjaxRequestMock.js': ['babel', 'commonjs'],
    'test/**/*.js': ['babel', 'commonjs']
  },

  browsers: ['Chrome'],

  babelPreprocessor: {options: exports.babel}
};
