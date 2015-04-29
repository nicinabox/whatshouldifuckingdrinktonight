var _ = require('lodash');

var defaults = {
  entry: './app/main.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};

var configs = {
  development: {
    output: {
      filename: 'build/bundle.js'
    }
  },

  production: {
    output: {
      filename: 'public/bundle.js'
    }
  }
};

var config = configs[process.env.NODE_ENV || 'development'];
config = _.merge({}, defaults, config);
module.exports = config;
