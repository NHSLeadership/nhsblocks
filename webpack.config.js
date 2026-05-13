const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,

  entry: {
    ...defaultConfig.entry(),
    'nhsblocks-frontend': {
      import: './src/frontend.js',
      filename: 'nhsblocks-frontend.min.js',
    },
  },

  module: {
    ...defaultConfig.module,
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      }
    ]
  }
};
