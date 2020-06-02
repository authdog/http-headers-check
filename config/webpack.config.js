const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    alias: {},
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ],
    enforceExtension: false
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.graphql|gql?$/,
        loader: 'webpack-graphql-loader'
      }
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
};