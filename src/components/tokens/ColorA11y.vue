<template>
  <div>
    <div class="color">
      <table v-for="(group, index) in colors" :key="index" class="table mb-5">
        <thead>
          <tr>
            <th>-</th>
            <th v-for="(color, k) in group" :key="k">
              {{ k }}
              {{ color }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(color, k) in group" :key="k">
            <td>
              {{ k }}
              {{ color }}
            </td>
            <td v-for="(col, key) in group" :key="key">
              <div v-if="score(col, color) !== 'F'"
                   :class="key"
                   :style="{ backgroundColor: col, color: color }"
                   class="swatch"
              >
                <div class="swatch__row">
                  <span><b>{{ k }}</b> on <b>{{ key }}</b></span>
                </div>
                <div class="swatch__row">
                  <span v-if="score(col, color)">{{ score(col, color) }}</span>
                  <span>{{ ratio(col, color) }}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr v-for="(product, p) in myProducts" :key="p + 'q'">
            <td>
              {{ p }}
              {{ product }}
            </td>
            <td v-for="(col, key) in group" :key="key">
              <div v-if="score(col, product) !== 'F'"
                   :class="key"
                   :style="{ backgroundColor: col, color: product }"
                   class="swatch"
              >
                <div class="swatch__row">
                  <span>Text</span>
                  <span v-if="score(col, product)">{{ score(col, product) }}</span>
                </div>
                <div class="swatch__row">
                  <span>{{ ratio(col, product) }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import colors from '../../assets/tokens/docs/categorizedJsonPalette.json'
const contrast = require('get-contrast')

export default {
  name: 'ColorA11y',
  data () {
    return {
      colors: colors,
      cols: [colors]
    }
  },
  computed: {
    myProducts () {
      return this.cols[0]['color_group_10']
    }
  },
  methods: {
    score (background, text) {
      if (contrast.score(background, text) === 'AA') {
        return 'AA'
      } else if (contrast.score(background, text) === 'AAA') {
        return 'AAA'
      } else {
        return 'F'
      }
    },
    ratio (background, text) {
      return contrast.ratio(background, text).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.grey_80 {
  border: 1px solid $nt-grey-50;
}

.swatch {
  min-height: 3rem;
  min-width: 3rem;
  padding: .5rem;
}

.swatch__row {
  display: flex;
  justify-content: space-between;
}
</style>
