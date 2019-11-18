<template>
  <div>
    <div v-for="(group, g) in groups" :key="g">
      <table class="table mb-5">
        <thead>
          <tr>
            <th>Token</th>
            <th>Role</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(token, i) in group" :key="i">
            <td>
              <code>{{ token.name }}</code>
            </td>
            <td>
              {{ token.role }}
            </td>
            <td style="width: 250px">
              <div class="d-flex justify-content-between">
                <ul>
                  <li class="text-capitalize">
                    {{ tokenAlias(token.originalValue) }}
                  </li>
                  <li>-</li>
                  <li>{{ token.value }}</li>
                </ul>
                <color-item :background-color="token.value" :class="tokenAlias(token.originalValue)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import colorItem from './ColorItem'
import theme from '../../assets/tokens/themes/dark.raw.json'
import utils from '../../mixins/utils'
import groupBy from 'lodash/groupBy'

export default {
  name: 'ThemeItem',
  components: {
    colorItem
  },
  mixins: [utils],
  data () {
    return {
      themeProps: theme.props
    }
  },
  computed: {
    groups () {
      let color = groupBy(this.themeProps, 'category')
      let f = color.core
      return [f]
    }
  }
}
</script>

<style lang="scss" scoped>
.nds-grey-80 {
  border: 1px solid $nt-grey-50;
}

ul {
  list-style: none;
  margin-bottom: 0;
  margin-left: 0;
  padding-left: 0;
}

/deep/ .nds-swatch {
  border-radius: 50px;
  height: 3rem;
  width: 3rem;
}
</style>
