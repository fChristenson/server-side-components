const path = require("path");

const makePath = dirName => {
  return path.resolve(__dirname, "src", "components", "entry", dirName);
};

module.exports = {
  entry: {
    todoList: makePath("todoList")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};
