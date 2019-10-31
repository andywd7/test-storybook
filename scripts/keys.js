const groupedTokens = require('../tokens2/tokens.json')
const colorTokens = require('../tokens2/palette/aliases.json')
const themes = [
  'dark'
]
const fileTypes = [
  'scss',
  'map.scss',
  'raw.json',
  'json'
]

const keysFromIndex = (index, replacedString) =>
  index.map((key) => key.replace('./', '').replace(replacedString, ''))

module.exports = {
  colors: keysFromIndex(colorTokens.imports, '.json')
    .filter((path) => !['black', 'white'].includes(path))
    .sort(),
  tokenGroups: keysFromIndex(groupedTokens.imports, '/index.json'),
  themes: themes,
  fileTypes: fileTypes
}
