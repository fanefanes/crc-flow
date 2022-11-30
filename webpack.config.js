const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = (src) => path.join(process.cwd(), src);

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    library: {
      name: 'crc-flow',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        }],
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
