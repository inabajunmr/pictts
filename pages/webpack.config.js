const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js')
  },
  module: {
    rules: [
        {
            test: /\.ts$/,
            loader: 'ts-loader'
        }
    ]
},
resolve: {
    extensions: ['.ts', '.js']
}};
