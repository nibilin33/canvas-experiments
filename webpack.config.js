module.exports = {
    entry: {
        particles: './src/particles/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/docs',
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'docs'),
        },
        compress: true,
        port: 9000,
      },
};
  
  