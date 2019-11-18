/**
 * #Size Mixin/Interface
 *
 * Functionality for handling/standardizing component sizing.
 *
 *  :Values
 *    '' (default)
 *    :xs
 *    :sm
 *    :md
 *    :lg
 *
 * @mixin
 */

export default {
  props: {
    /**
     * Size state
     */
    size: {
      type: String,
      default: '',
      validator: value => (['', 'xs', 'sm', 'md', 'lg'].indexOf(value) !== -1)
    }
  },
  methods: {
    tokenAlias (input, dash = true) {
      const sep = dash === false ? '_' : '-'
      const originalValue = /{!(.*)}/g
      const string = input
        .replace(originalValue, '$1')
        .replace(/_/g, sep)
      return string
    },
    formatScss (input) {
      const string = JSON.stringify(input, null, 2)
        .replace(/{!(.*)}/g, '$1')
        .replace(/"(.*)": /g, '$1: ')
        .replace(/: "(.*)"/g, ': $nt-$1')
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/_/g, '-')
      return string.trim()
    },
    formatJs (input) {
      const string = JSON.stringify(input, null, 2)
        .replace(/{!(.*)}/g, '$1')
        .replace(/{/g, '')
        .replace(/}/g, '')
      return string.trim()
    },
    formatScssClass (input) {
      const string = JSON.stringify(input, null, 2)
        .replace(/"(.*)"/g, 'nt-$1')
        .replace(/_/g, '-')
      return string.trim()
    },
    rem (value) {
      const val = value
        .replace('px', '')
      const v = val / 16
      return v.toString().replace(/^0./g, '.') + 'rem'
    }
  }
}
