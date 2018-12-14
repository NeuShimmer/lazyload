/* global __dirname, require, module*/
const name = "lazyload";
const path = require('path');

module.exports = (env, argv) => {
  const config = {
    mode: argv.mode,
    entry: __dirname + '/src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: "",
      library: name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
      rules: [
        {
          test: /(\.jsx|\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js']
    }
  };

  if (argv.mode === 'development') {
    config.output.filename = name + '.js';
    config.devtool = 'source-map';
  }
  if (argv.mode === 'production') {
    config.output.filename = name + '.min.js';
  }

  return config;

};
