const webpack = require('webpack')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    const bridgeUrl = dev
      ? process.env.AIRHOST_BRIDGE_URL || 'http://airhost:3000/bridge'
      : 'https://cloud.airhost.co/bridge'

    config.plugins.push(new webpack.ProvidePlugin({
      'React': 'react'
    }))

    config.plugins.push(new ReplaceInFileWebpackPlugin([
      {
        dir: `dist/${vendor}`,
        files: ['manifest.json', 'scripts/popup.js'],
        rules: [{
          search: '<bridge-url>',
          replace: bridgeUrl
        }]
      }
    ]))

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
