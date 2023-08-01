const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html' }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: [
        'html',
        // 'markdown',
        'css',
        // 'scss',
        // 'less',
        //'javascript',
        // 'typescript',
        // 'coffee',
        // 'python',
        // 'json',
      ],
      features: ['!gotoSymbol'],
    }),
  ],
  devServer: {
    port: 3000, // you can change the port
  },
};