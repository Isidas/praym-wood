"use strict";

let path = require("path");

module.exports = {
  mode: "none",
  entry: "./app/js/main.js",
  output: {
    filename: "main.js",
    path: __dirname + "/dist/js",
  },
  watch: true,

  devtool: "source-map",

  module: {},
};
