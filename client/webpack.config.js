const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {

    mode: 'development',

    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TextEditor-PWA',
        filename: 'index.html'
      }),

      new WebpackPwaManifest({
        name: 'TextEditor-PWA',
        short_name: 'Tate',
        description: 'Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
          ],
      }),

      new InjectManifest({
        swSrc: path.resolve(__dirname,'./src-sw.js'),
        swDest: 'src-sw.js',
      }),
      ],

    module: {

      rules: [

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],

      // resolve: {
      //   extensions: ['.js', '.json'],
      //   alias: {
      //     src: path.resolve(__dirname, 'src')
      //   }
      // }

    },
  };
};