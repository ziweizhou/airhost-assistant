const webpack = require('webpack')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    config.plugins.push(new webpack.ProvidePlugin({
      'React': 'react'
    }))

    if (dev) {
      const bridgeUrl = process.env.AIRHOST_BRIDGE_URL || 'http://airhost:3000/bridge'
      config.plugins.push(new ReplaceInFileWebpackPlugin([{
        dir: `dist/${vendor}`,
        files: [
          'manifest.json',
          'scripts/popup.js'
        ],
        rules: [{
          search: /https:\/\/cloud\.airhost\.co\/bridge/img,
          replace: bridgeUrl,
        }]
      }]))
    }

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    })

    return config
  }
}
