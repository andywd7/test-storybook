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
                    {{ alias(token.originalValue) }}
                  </li>
                  <li>-</li>
                  <li>{{ token.value }}</li>
                </ul>
                <color-item :background-color="token.value" :class="alias(token.originalValue)" class="es-contrast-grid__key-swatch" />
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
// import contrast from 'get-contrast'
import groupBy from 'lodash/groupBy'

export default {
  name: 'ThemeItem',
  components: {
    colorItem
  },
  // props: {
  //   themeGroup: {
  //     type: String,
  //     default: '#f00'
  //   }
  // },
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
  },
  methods: {
    alias (input) {
      const aliasValue = /{!(.*)}/g
      const string = input
        .replace(aliasValue, '$1')
        .replace(/_/g, '-')
      return string
    }
  }
}
</script>

<style lang="scss" scoped>
.grey-80 {
  border: 1px solid $nt-grey-50;
}

ul {
  list-style: none;
  margin-bottom: 0;
  margin-left: 0;
  padding-left: 0;
}

/deep/ .swatch {
  border-radius: 50px;
  height: 3rem;
  width: 3rem;
}
</style>
