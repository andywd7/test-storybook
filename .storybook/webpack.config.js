const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.vue$/,
    loader: 'storybook-addon-vue-info/loader',
    enforce: 'post',
  });

  config.module.rules.push({
    test: /\.(scss|css)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/assets/tokens/tokensAndPalette.scss'),
            path.resolve(__dirname, '../src/assets/tokens/tokensAndPalette.map.scss'),
            path.resolve(__dirname, '../src/assets/tokens/themes/dark.scss'),
            path.resolve(__dirname, '../src/styles/toolbox.scss')
            // path.resolve(__dirname, '../docs/styles/docs.toolbox.scss')
          ]
        }
      }
    ]
  })

  return config;
};
