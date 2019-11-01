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
    tokenAlias (input) {
      const aliasValue = /{!(.*)}/g
      const string = input
        .replace(aliasValue, '$1')
        .replace(/_/g, '-')
      return string
    }
  }
}
