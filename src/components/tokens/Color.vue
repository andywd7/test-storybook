<template>
  <b-row>
    <b-col v-for="(group, index) in colors"
           :key="index"
           sm="6"
           md="3"
           lg="2"
    >
      <h3>{{ index }}</h3>
      <ul v-if="group" class="colors mb-5" :class="index">
        <li v-for="(color, k) in group" :key="k" class="color">
          <color-item :background-color="color">
            <span>
              {{ color }}
            </span>
            <span>
              ${{ k.replace(/_/g, "-") }}
            </span>
          </color-item>
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import colors from '../../assets/tokens/docs/categorizedJsonPalette.json'
import colorItem from './ColorItem'

/**
 * The color palette comes with 5 different weights for each hue. These hues
 * should be used purposefully to communicate how things function in the
 * interface. Keep in mind that `vermilion` is only used in special cases
 * like destructive actions and error messages. To edit the colors, see
 * [/src/tokens/color.yml](https://github.com/viljamis/vue-design-system/blob/master/src/tokens/color.yml).
 */
export default {
  name: 'Color',
  components: {
    colorItem
  },
  data () {
    return {
      colors: colors
    }
  }
}
</script>

<style lang="scss" scoped>
.colors {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

// .color {
//   span {
//     font-size: $size-s;
//   }
// }
</style>
