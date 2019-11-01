<template>
  <div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>-</th>
            <th v-for="(clr, k) in txtColor()" :key="k">
              {{ tokenAlias(k) }}<br>
              {{ clr }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(clr, k) in bgColor()" :key="k">
            <td>
              {{ tokenAlias(k) }}<br>
              {{ clr }}
            </td>
            <td v-for="(col, key) in txtColor()" :key="key">
              <div v-if="score(clr, col) !== 'F'"
                   :class="tokenAlias(key)"
                   :style="{ backgroundColor: clr, color: col }"
                   class="nds-swatch"
              >
                <div class="nds-swatch__row">
                  <code :style="{ color: col }">
                    {{ tokenAlias(k) }} text on<br>
                    {{ tokenAlias(key) }} background
                  </code>
                </div>
                <div class="nds-swatch__row">
                  <span v-if="score(clr, col)">{{ score(clr, col) }}</span>
                  <span>{{ ratio(clr, col) }}</span>
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
import size from '../../mixins/size'
const contrast = require('get-contrast')

export default {
  name: 'ColorA11y',
  mixins: [size],
  props: {
    textColor: {
      type: String,
      default: 'blue'
    },
    backgroundColor: {
      type: String,
      default: 'blue'
    }
  },
  data () {
    return {
      colors: [colors]
    }
  },
  methods: {
    txtColor () {
      return this.colors[0]['color_group_' + this.textColor]
    },
    bgColor () {
      return this.colors[0]['color_group_' + this.backgroundColor]
    },
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
.nds-grey-80 {
  border: 1px solid $nt-grey-50;
}

.nds-swatch {
  min-height: 3rem;
  min-width: 3rem;
  padding: .5rem;
}

.nds-swatch__row {
  display: flex;
  justify-content: space-between;
}
</style>
