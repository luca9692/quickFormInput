const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production', // Set default mode
  //devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? 'quickFormSubmit.min.js' : 'quickFormSubmit.js', // Adjust filename
    filename: 'quickFormSubmit.js',
    library: 'quickFormSubmit',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  //devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
};
