const path = require('path');
var WebpackCleanPlugin = require('webpack-clean');

module.exports = {
  mode: 'development',
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './server/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'buildSrv')
  },
  plugins: [
    new WebpackCleanPlugin()
    // [ 'bundle.js' ],
    //                        { 
    //                           basePath: path.join(__dirname, 'build'),
    //                           removeMaps: true
    //                         }
    //                       )
    ],
// Tell webpack to run babel on every file it runs through
module: {
  rules: [
    {
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          '@babel/react',
          ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
        ]
      }
    },

    {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        'isomorphic-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }
      ]
    }

  ]
}
};