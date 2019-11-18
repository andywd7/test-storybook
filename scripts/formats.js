const categories = (input) =>
  Array.from(new Set(input.get('props').map((prop) => prop.get('category'))))
    .filter((category) => category !== 'palette')
    .sort()
    .concat(['palette'])

const convertKeyToScss = (k) => k.replace(/_/g, '-')

const formatCategories = (input, keyTemplate) =>
  formatGroups(
    (prop, category) => prop.get('category') === category,
    input,
    categories(input),
    keyTemplate
  )

const formatGroups = (filter, input, source, keyTemplate) =>
  source.reduce((acc, sourceItem) => {
    acc[sourceItem] = formatProperties({
      filter: (prop) => filter(prop, sourceItem),
      input,
      keyTemplate
    })
    return acc
  }, {})

// JSON.stringify() adds double quotes to properties and values. The following
// formats that object to remove double-quote-wrapping and escapes, e.g.:
// * "backgroundColor_active": "#ebeff5" => backgroundColor_active: '#ebeff5'
// * "fontWeight_regular": 400 => fontWeight_regular: 400
// * "fontFamily": "\"Open Sans\"" => fontFamily: '"Open Sans"'

const formatOutputJson = (result) =>
  JSON.stringify(result, null, 2)
    .replace(/\\"/g, "'")

const formatOutputScss = (result) =>
  JSON.stringify(result, null, 2)
    .replace(/"(.*)": /g, '$1: ')
    .replace(/: "(.*)"/g, ': $1')
    .replace(/{/g, '(')
    .replace(/}/g, ')')
    .replace(/\\"/g, '"')

const formatProperties = ({
  filter = (prop) => !!prop,
  getValue = (prop) => prop.get('value'),
  input,
  keyTemplate = (k) => k
}) =>
  input
    .get('props')
    .filter(filter)
    .reduce((acc, prop) => {
      const key = keyTemplate(prop.get('name'))
      const value = removeTheoValueQuotes(getValue(prop))
      acc[key] = value
      return acc
    }, {})

const namedExports = (tokens, exportFormat) =>
  Object.entries(tokens)
    .map(exportFormat)
    .join('\n')

const removeTheoValueQuotes = (value) =>
  typeof value === 'string' ? value.replace(/'/g, '') : value

module.exports = {
  categorizedJsonExports: (input) => {
    return formatOutputJson(formatCategories(input))
  },

  categorizedScssExports: (input) => {
    return `$nt-map: ` + formatOutputScss(
      formatCategories(input, (k) => `$nt-${convertKeyToScss(k)}`)
    ) + `\n`
  },

  defaultExport: (input) => {
    return formatOutputJson(formatProperties({ input }))
  },

  ntScss: (input) => {
    return namedExports(
      formatProperties({
        input,
        keyTemplate: (k) => `$nt-${convertKeyToScss(k)}`
      }),
      (token) => `${token[0]}: ${token[1]};`
    )
  }
}
