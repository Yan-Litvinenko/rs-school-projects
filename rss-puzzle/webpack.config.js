const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // автоматически генерирует HTML-файл на основе шаблона, вставляет туда ссылки на файлы
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css собирает css в отдельный файл
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // очистка перед сборкой
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); // минификация
const ESLintPlugin = require('eslint-webpack-plugin'); // вебпак прогонял всё через eslint
// const CopyWebpackPlugin = require('copy-webpack-plugin');  копирование статических файлов

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  output: {
    filename: '[name].[contenthash].js', // Имя выходного файла сборки
    path: path.resolve(__dirname, './dist'), // Путь для выходного файла сборки
  },
  plugins: addPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(mp3|wav)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|svg$)/,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
    static: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

function optimization() {
  const config = {
    splitChunks: {
      // избежание дублирования кода
      chunks: 'all',
    },
  };

  if (isProd) {
    // Добавляем минификацию в продакшене
    config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()];
  }

  return config;
}

function addPlugins() {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    // new CopyWebpackPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, './app/assets/'),
    //             to: path.resolve(__dirname, './dist/assets/'),
    //         },
    //     ],
    // }),
  ];

  if (isDev) {
    plugins.push(new ESLintPlugin({ extensions: ['.ts'] }));
  }

  return plugins;
}
