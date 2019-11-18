<template>
  <ul>
    <li>
      <p>Sans Serif:</p>
      <span :style="{ fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize_07 }">{{ tokens.typography.fontFamily }}</span>
    </li>
    <li>
      <p>Monospace:</p>
      <span :style="{ fontFamily: tokens.typography.fontFamily_monospace, fontSize: tokens.typography.fontSize_07 }">{{ tokens.typography.fontFamily_monospace }}</span>
    </li>
  </ul>
</template>

<script>
import tokens from '../../assets/tokens/docs/categorizedTokensAndPalette.json'

export default {
  name: 'Font',
  data () {
    return {
      tokens: tokens
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin-bottom: 0;
  margin-left: 0;
  padding-left: 0;
}
</style>
