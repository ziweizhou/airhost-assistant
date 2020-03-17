const webpack = require('webpack')

module.exports = {
  webpack: (config, { dev, vendor }) => {
    config.plugins.push(new webpack.ProvidePlugin({
      'React': 'react'
    }))
    config.module.rules = [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]

    return config
  }
}
