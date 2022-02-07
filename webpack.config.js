const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
function getPages() {
  const pages = path.resolve(__dirname, "src/pages");
  const dirs = fs.readdirSync(pages);
  let pageConfig = {};
  let plugins = [];
  dirs.forEach((name) => {
    const stat = fs.lstatSync(path.join(pages, name));
    if (stat.isDirectory()) {
      pageConfig[name] = path.join(pages, `${name}/index.js`);
      plugins.push(
        new HtmlWebpackPlugin({
          template: path.join(pages, `${name}/index.html`),
          filename: `${name}.html`,
          chunks: [name],
          inject: 'body'
        })
      );
    }
  });
  console.log(pageConfig);
  return {
    entry: pageConfig,
    plugins
  };
}
const pageConfig = getPages();
module.exports = {
  entry: pageConfig.entry,
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, "docs"),
    crossOriginLoading: 'anonymous'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
      publicPath: '/canvas'
    },
    compress: true,
    port: 9004
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: pageConfig.entry,
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, "docs"),
    crossOriginLoading: 'anonymous'
  },
  plugins: pageConfig.plugins
};

