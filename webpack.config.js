var path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-stage-2', '@babel/preset-react']
          }
        }
      }
    ]
  },
  externals: {
    react: 'React',
    redux: 'Redux',
    'react-redux': 'ReactRedux'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'main.js'
  }
};
