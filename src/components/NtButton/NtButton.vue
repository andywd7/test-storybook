<template>
  <button
    :type="type"
    :aria-pressed="ariaPressed"
    class="nt-btn"
    :class="[
      buttonSizeClass,
      buttonVariantClass,
      buttonPressedClass
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
import utils from '../../mixins/utils'

export default {
  name: 'NtBtn',
  status: 'prototype',
  release: '1.0.0',
  // inheritAttrs: false,
  mixins: [utils],
  props: {
    pressed: {
      type: Boolean,
      default: null
    },
    /**
     * Sets the button type. {button, submit, reset}
     */
    type: {
      type: String,
      default: 'button',
      validator: value => (['button', 'submit', 'reset'].indexOf(value) >= 0) || false
    },
    variant: {
      type: String,
      default: 'secondary',
      validator: value => (['secondary', 'primary', 'danger', 'minimal'].indexOf(value) !== -1)
    }
  },
  computed: {
    buttonSizeClass () {
      return this.size ? 'nt-btn--' + this.size : ''
    },
    buttonVariantClass () {
      return this.variant ? 'nt-btn--' + this.variant : 'secondary'
    },
    buttonPressedClass () {
      return this.pressed ? 'nt-btn--pressed' : null
    },
    ariaPressed () {
      if (this.pressed) {
        return 'true'
      } else if (this.pressed === false) {
        return 'false'
      } else {
        return null
      }
    }
    // iconName () {
    //   return this.icon ? 'fas fa-' + this.icon : ''
    // },
    // iconSpacing () {
    //   if (this.iconPosition === 'left') {
    //     return this.hideText !== null ? 'mr-' + this.hideText + '-1' : 'mr-1'
    //   } else if (this.iconPosition === 'right') {
    //     return this.hideText !== null ? 'ml-' + this.hideText + '-1' : 'ml-1'
    //   } else {
    //     return ''
    //   }
    // },
    // hideTextClasses () {
    //   if (this.hideText !== null) {
    //     return 'd-none d-' + this.hideText + '-inline-block'
    //   } else {
    //     return this.hideText
    //   }
    // }
  }
}
</script>
