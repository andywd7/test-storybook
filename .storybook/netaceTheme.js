import { create } from '@storybook/theming';
import tokens from '../src/assets/tokens/tokensAndPalette.json'

export default create({
  base: 'light',

  colorPrimary: tokens.red_50,
  colorSecondary: tokens.blue_50,

  // UI
  appBg: tokens.white,
  appContentBg: tokens.grey_10,
  appBorderColor: tokens.grey_20,
  appBorderRadius: 3,

  // Typography
  fontBase: tokens.fontFamily,
  // fontCode: 'monospace',

  // Text colors
  textColor: tokens.grey_100,
  textInverseColor: tokens.whiite,

  // Toolbar default and active colors
  barTextColor: tokens.grey_100,
  barSelectedColor: tokens.blue_50,
  barBg: tokens.white,

  // Form colors
  inputBg: tokens.white,
  inputBorder: tokens.grey_20,
  inputTextColor: tokens.grey_100,
  inputBorderRadius: 3,

  brandTitle: 'Netace Storybook'
  // gridCellSize: 2
  // brandUrl: 'https://example.com',
  // brandImage: 'https://placehold.it/350x150'
})
