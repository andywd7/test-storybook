<template>
  <div class="swatch" :style="{ backgroundColor: backgroundColor, color: getContrast(backgroundColor) }">
    <slot />
  </div>
</template>

<script>
import theme from '../../assets/tokens/themes/dark.json'
const contrast = require('get-contrast')

export default {
  name: 'ColorItem',
  props: {
    backgroundColor: {
      type: String,
      default: '#ff0'
    }
  },
  methods: {
    // getContrast (background) {
    //   return contrast.score(foreground, background)
    // },
    getContrast (hex) {
      // let r = parseInt(hex.substr(1, 2), 16)
      // let g = parseInt(hex.substr(3, 2), 16)
      // let b = parseInt(hex.substr(5, 2), 16)
      // let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return (contrast.isAccessible(hex, theme.inverse_01) === true) ? theme.inverse_01 : theme.text_01
    }
  }
}
</script>

<style lang="scss" scoped>
.swatch {
  display: flex;
  justify-content: space-between;
  min-height: 3rem;
  min-width: 3rem;
  padding: 1rem;
}
</style>
