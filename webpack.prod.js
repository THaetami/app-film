const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            // exclude: /(node_modules|bower_components)/,
            // exclude: /node_modules/,
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  }
})
