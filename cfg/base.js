const path = require('path');
const defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
const additionalPaths = [];

module.exports = {
  additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: `${defaultSettings.srcPath}/components/`,
      scenes: `${defaultSettings.srcPath}/scenes/`,
      images: `${defaultSettings.srcPath}/images/`,
      store: `${defaultSettings.srcPath}/store/`,
      common: `${defaultSettings.srcPath}/common/`,
      config: `${defaultSettings.srcPath}/config/${process.env.REACT_WEBPACK_ENV}`,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {}
};
