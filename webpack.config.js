const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  console.log("Building for production", env.production)

  let config = {
    entry: __dirname + '/src/app.js',
    output: {
      publicPath: '/',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
        ,
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
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
        template: __dirname + '/src/public/index.html',
        filename: 'index.html',
        inject: 'body'
      }),
      new CopyPlugin([
        {from: __dirname + '/src/public'}
      ])
    ],
  }

  return config
};

