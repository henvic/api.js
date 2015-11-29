var babelPresetMetal = require('babel-preset-metal');
var karmaBabelPreprocessor = require('karma-babel-preprocessor');
var karmaChai = require('karma-chai');
var karmaChromeLauncher = require('karma-chrome-launcher');
var karmaCommonJs = require('karma-commonjs');
var karmaMocha = require('karma-mocha');
var karmaSinon = require('karma-sinon');
var karmaSourceMapSupport = require('karma-source-map-support');

var babelOptions = {
  presets: ['metal'],
  sourceMap: 'both'
};

module.exports = function (config) {
  config.set({
  	plugins: [
  		karmaBabelPreprocessor,
    	karmaChai,
  		karmaChromeLauncher,
    	karmaCommonJs,
    	karmaMocha,
    	karmaSourceMapSupport,
    	karmaSinon
  	],

    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

    files: [
      'envs/browser-test.js',
      'bower_components/soyutils/soyutils.js',
      'bower_components/metal*/src/**/*.js',
      'src/**/*.js',
      'test/**/*.js',
      'envs/browser.js'
    ],

    exclude: [
      'src/api/NodeTransport.js',
      'test/api/NodeTransport.js',
      'test/fixtures/NodeRequestMock.js'
    ],

    preprocessors: {
			'src/**/*.js': ['babel', 'commonjs'],
			'bower_components/metal*/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs'],
      'envs/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions}
  });
};
