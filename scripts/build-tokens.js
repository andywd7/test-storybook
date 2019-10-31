#! /usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const theo = require('theo')
const formats = require('./formats')
const keys = require('./keys')
// const colorIndex = require('../tokens2/palette')

const TOKENS_DIR = path.join(__dirname, '../tokens2')
const TOKENS_COLORS_DIR = path.join(TOKENS_DIR, '/palette')
const TOKENS_THEMES_DIR = path.join(TOKENS_DIR, '../tokens2/themes/')
const TOKENS_SRC_DIR = path.join(__dirname, '../src/assets/tokens')
const LIBRARY_THEMES_GENERATED_DIR = path.join(
  __dirname,
  '../src/assets/tokens/themes'
)
const WEBSITE_GENERATED_DIR = path.join(
  __dirname,
  '../src/assets/tokens/docs'
)

const args = process.argv.slice(2)

if (!fs.existsSync(TOKENS_SRC_DIR)) {
  fs.mkdirSync(TOKENS_SRC_DIR)
}

// ============================================================================

theo.registerFormat('colorAliases.js', formats.colorAliases)
theo.registerFormat('colorExport.js', formats.colorExport)
theo.registerFormat('defaultExport.js', formats.defaultExport)
theo.registerFormat('categorizedJsonExports.js', formats.categorizedJsonExports)
theo.registerFormat(
  'categorizedSassExports.js',
  formats.categorizedSassExports
)
theo.registerFormat('index.js', formats.index)
theo.registerFormat(
  'groupedByRampJsExports.js',
  formats.groupedByRampJsExports
)
theo.registerFormat('ntScss', formats.ntScss)
theo.registerFormat('namedExports.js', formats.namedExports)
theo.registerFormat(
  'paletteWithKeysAndType.js',
  formats.paletteWithKeysAndType
)

theo.registerValueTransform(
  'addQuotes',
  (prop) => typeof prop.get('value') === 'string',
  (prop) => `'${prop.get('value')}'`
)

// Necessary because theo will wrap quotes around an aliased value
theo.registerValueTransform(
  'fontWeight',
  (prop) => prop.get('name').includes('fontWeight'),
  (prop) => parseInt(prop.get('value').replace(/'/g, ''))
)

theo.registerTransform('js', ['addQuotes', 'fontWeight'])

// ============================================================================

const configurations = [
  // {
  //   // Tokens
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokens.json'),
  //     type: 'web'
  //   },
  //   format: { type: 'raw.json' },
  //   fileName: 'tokens.raw.json'
  // },
  {
    // Tokens
    transform: {
      file: path.join(TOKENS_DIR, 'tokens.json'),
      type: 'web'
    },
    format: { type: 'json' },
    fileName: 'tokens.json'
  },
  // {
  //   // Grouped JS tokens by color ramp
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokens.json'),
  //     type: 'js'
  //   },
  //   format: { type: 'groupedByRampJsExports.js' },
  //   fileName: 'groupedByRampJsTokens.js',
  //   writeDir: WEBSITE_GENERATED_DIR
  // },
  {
    // Just the color palette
    transform: {
      file: path.join(TOKENS_COLORS_DIR, 'index.json'),
      type: 'web'
    },
    format: { type: 'json' },
    fileName: 'palette.json'
  },
  // {
  //   // Grouped palette
  //   transform: {
  //     file: path.join(TOKENS_COLORS_DIR, 'index.json'),
  //     type: 'web'
  //   },
  //   format: { type: 'raw.json' },
  //   fileName: 'palette.raw.json',
  //   writeDir: WEBSITE_GENERATED_DIR
  // },
  // {
  //   // Tokens and palette
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
  //     type: 'web'
  //   },
  //   format: { type: 'namedExports.js' },
  //   fileName: 'all.js'
  // },
  {
    // Tokens and palette
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'json' },
    fileName: 'tokensAndPalette.json'
  },
  // {
  //   // Tokens and palette
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
  //     type: 'web'
  //   },
  //   format: { type: 'raw.json' },
  //   fileName: 'tokensAndPalette.raw.json'
  // },
  {
    // Tokens and palette, in Sass
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json')
    },
    format: { type: 'ntScss' },
    fileName: 'tokensAndPalette.scss'
  },
  // {
  //   // Index
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokensAndPalette.json')
  //   },
  //   format: { type: 'index.js' },
  //   fileName: 'index.js'
  // },
  {
    // Grouped JSON tokens by category
    transform: {
      file: path.join(TOKENS_DIR, 'tokens.json'),
      type: 'web'
    },
    format: { type: 'categorizedJsonExports.js' },
    fileName: 'categorizedJsonTokens.json',
    writeDir: WEBSITE_GENERATED_DIR
  },
  {
    // Grouped JSON colors by category
    transform: {
      file: path.join(TOKENS_COLORS_DIR, 'index.json'),
      type: 'web'
    },
    format: { type: 'categorizedJsonExports.js' },
    fileName: 'categorizedJsonPalette.json',
    writeDir: WEBSITE_GENERATED_DIR
  }
  // {
  //   // Grouped Sass tokens by category
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
  //     type: 'web'
  //   },
  //   format: { type: 'categorizedSassExports.js' },
  //   fileName: 'categorizedSassTokens.json',
  //   writeDir: WEBSITE_GENERATED_DIR
  // }
  // {
  //   // All tokens with color values
  //   transform: {
  //     file: path.join(TOKENS_DIR, 'tokens.json')
  //   },
  //   format: { type: 'colorAliases.js' },
  //   fileName: 'colorAliases.js',
  //   writeDir: WEBSITE_GENERATED_DIR
  // }
]

// ============================================================================

if (args.includes('--debug')) {
  configurations.push({
    transform: {
      type: 'web',
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json')
    },
    format: {
      type: 'raw.json'
    },
    fileName: 'allTokens-debug.log'
  })
}

const themes = []
// Each theme
keys.themes.forEach((theme) => {
  keys.fileTypes.forEach((file) => {
    const format = (file === 'scss') ? 'ntScss' : file

    themes.push({
      transform: {
        file: path.join(TOKENS_THEMES_DIR, `${theme}/theme.json`),
        type: 'web'
      },
      format: { type: format },
      fileName: `${theme}.` + file
    })
  })
})

themes.forEach(
  ({ transform, format, fileName, writeDir = LIBRARY_THEMES_GENERATED_DIR }) => {
    // let extraLine = format.type.toLowerCase().includes('scss') ? '' : '\n'
    theo
      .convert({ transform, format })
      .then((result) => {
        fs.writeFile(
          path.join(writeDir, fileName),
          result,
          (error) => error && console.log('Error writing file: ', error)
        )
      })
      .catch(
        (error) => error && console.log('Error converting tokens: ', error)
      )
  }
)

configurations.forEach(
  ({ transform, format, fileName, writeDir = TOKENS_SRC_DIR }) => {
    theo
      .convert({ transform, format })
      .then((result) => {
        fs.writeFile(
          path.join(writeDir, fileName),
          result,
          (error) => error && console.log('Error writing file: ', error)
        )
      })
      .catch(
        (error) => error && console.log('Error converting tokens: ', error)
      )
  }
)
