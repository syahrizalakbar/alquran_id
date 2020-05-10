var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/quran_id.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'quran_id.bundle.js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    })
  ],
  devServer: {
    noInfo: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    }
  },
  devtool: 'inline-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production';
  module.exports.devtool = '';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.OccurrenceOrderPlugin()
  ]);

}
