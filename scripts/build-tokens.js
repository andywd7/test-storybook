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

// theo.registerFormat('nested-maps.scss', require('./nested-maps.scss.js'))
// theo.registerFormat('colorAliases.js', formats.colorAliases)
// theo.registerFormat('colorExport.js', formats.colorExport)
theo.registerFormat('defaultExport.js', formats.defaultExport)
theo.registerFormat('categorizedJsonExports.js', formats.categorizedJsonExports)
theo.registerFormat(
  'categorizedScssExports.js',
  formats.categorizedScssExports
)
// theo.registerFormat('index.js', formats.index)
// theo.registerFormat(
//   'groupedByRampJsExports.js',
//   formats.groupedByRampJsExports
// )
theo.registerFormat('ntScss', formats.ntScss)
// theo.registerFormat('namedExports.js', formats.namedExports)
// theo.registerFormat(
//   'paletteWithKeysAndType.js',
//   formats.paletteWithKeysAndType
// )

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

const { Map } = require('immutable')
const convertKeyToScss = (k) => k.replace(/_/g, '-')
const convertAlias = (input) => {
  const originalValue = /{!(.*)}/g
  const string = input
    .replace(originalValue, '$1')
    .replace(/_/g, '-')
  return string
}

theo.registerFormat('nested-maps.scss', raw => {
  const props = raw.get('props')

  const data = props.map(prop => {
    const value = prop.get('originalValue')
    if (Map.isMap(value)) {
      const name = prop.get('name')

      return {
        name,
        value: value.toObject()
      }
    } else {
      return value
    }
  })

  const map = data.toArray().map(d => {
    const body = Object.keys(d.value).map(k => `\n  ${convertKeyToScss(k)}: $nt-${convertAlias(d.value[k])}`)

    return `$nt-${convertKeyToScss(d.name)}: (${body}\n) !default;`
  })

  const tokenMap = data.toArray().map(d => {
    const map = `\n  ${convertKeyToScss(d.name)}: $nt-${convertKeyToScss(d.name)}`

    return map
  })

  return `${map.join('\n\n')}\n\n$nt-text-styles-map: (${tokenMap}\n) !default;\n\n`
})

// ============================================================================

const configurations = [
  {
    // Tokens and palette
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'defaultExport.js' },
    fileName: 'tokensAndPalette.json'
  },
  {
    // Grouped JSON colors by category
    transform: {
      file: path.join(TOKENS_COLORS_DIR, 'index.json'),
      type: 'web'
    },
    format: { type: 'categorizedJsonExports.js' },
    fileName: 'categorizedPalette.json',
    writeDir: WEBSITE_GENERATED_DIR
  },
  {
    // Tokens and palette, in Scss
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'ntScss' },
    fileName: 'tokensAndPalette.scss'
  },
  {
    // Text styles, in Scss
    transform: {
      file: path.join(TOKENS_DIR, 'textStyles.json'),
      type: 'web'
    },
    format: { type: 'nested-maps.scss' },
    fileName: 'textStyles.map.scss'
  },
  {
    // Text styles, in JSON
    transform: {
      file: path.join(TOKENS_DIR, 'textStyles.json'),
      type: 'web'
    },
    format: { type: 'raw.json' },
    fileName: 'textStyles.raw.json',
    writeDir: WEBSITE_GENERATED_DIR
  },
  {
    // Grouped JSON tokens and palette by category
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'categorizedJsonExports.js' },
    fileName: 'categorizedTokensAndPalette.json',
    writeDir: WEBSITE_GENERATED_DIR
  },
  {
    // Grouped RAW.JSON tokens and palette by category
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'raw.json' },
    fileName: 'categorizedTokensAndPalette.raw.json',
    writeDir: WEBSITE_GENERATED_DIR
  },
  {
    // Grouped Scss tokens and palette by category
    transform: {
      file: path.join(TOKENS_DIR, 'tokensAndPalette.json'),
      type: 'web'
    },
    format: { type: 'categorizedScssExports.js' },
    fileName: 'categorizedTokensAndPalette.scss',
    writeDir: WEBSITE_GENERATED_DIR
  }
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
