import { create } from '@storybook/theming';
import tokens from '../src/assets/tokens/tokens.json'

export default create({
  base: 'light',

  colorPrimary: 'red',
  colorSecondary: tokens.color_primary_50,

  // UI
  appBg: tokens.color_surface_10,
  appContentBg: '#fff',
  appBorderColor: tokens.color_surface_20,
  appBorderRadius: 3,

  // Typography
  fontBase: tokens.font_text,
  // fontCode: 'monospace',

  // Text colors
  textColor: tokens.color_surface_90,
  textInverseColor: tokens.color_surface_10,

  // Toolbar default and active colors
  barTextColor: tokens.color_surface_90,
  barSelectedColor: tokens.color_primary_50,
  barBg: tokens.color_surface_10,

  // Form colors
  inputBg: tokens.color_surface_10,
  inputBorder: tokens.color_surface_10,
  inputTextColor: tokens.color_surface_90,
  inputBorderRadius: 3,

  brandTitle: 'Netace Storybook',
  gridCellSize: 2
  // brandUrl: 'https://example.com',
  // brandImage: 'https://placehold.it/350x150'
})
