var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/quran_id/quran_id.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
            presets: ['@babel/preset-env'],
            plugins: [
                ["@babel/transform-runtime"]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: ({htmlWebpackPlugin}) => `
        <html>
          <body>
            <div id='app'></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
        `
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    },
   contentBase: "./public"
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
