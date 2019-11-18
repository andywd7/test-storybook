<template>
  <div>
    <div>
      <table class="table mb-5">
        <thead>
          <tr>
            <th>Style/Role</th>
            <th>Style</th>
            <th>
              Tokens
              <input id="scss"
                     v-model.lazy="format"
                     type="radio"
                     name="type"
                     value="scss"
              >
              <label for="js">SCSS</label>
              <input id="js"
                     v-model.lazy="format"
                     type="radio"
                     name="type"
                     value="js"
              >
              <label for="tokens">JS</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, g) in tokens" :key="g">
            <td>
              <span :class="formatScssClass(group.name)">{{ group.role }}</span>
            </td>
            <td style="width: 250px">
              <div class="d-flex justify-content-between">
                <ul>
                  <li><strong>{{ tokenAlias(group.name) }}</strong></li>
                  <li>Size: {{ group.value.font_size }} | {{ rem(group.value.font_size) }}</li>
                  <li>Weight: {{ group.value.font_weight }}</li>
                  <li>Line height: {{ group.value.line_height }} | {{ rem(group.value.line_height) }}</li>
                </ul>
              </div>
            </td>
            <td style="width: 250px">
              <div class="d-flex justify-content-between">
                <div v-if="format === 'scss'">
<pre><code>$nt-{{ tokenAlias(group.name) }}: (
  {{ formatScss(group.originalValue) }}
)</code></pre>
                </div>
                <div v-else>
<pre><code>{{ tokenAlias(group.name, false) }}: {
  {{ formatJs(group.originalValue, false) }}
}</code></pre>
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
import tokens from '../../assets/tokens/docs/textStyles.raw.json'
import utils from '../../mixins/utils'

export default {
  name: 'TextStyleItem',
  mixins: [utils],
  data () {
    return {
      tokens: tokens.props,
      format: 'scss'
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
</style>
