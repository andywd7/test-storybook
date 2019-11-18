import { configure, addParameters, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import centered from '@storybook/addon-centered/vue'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
// import StoryRouter from 'storybook-vue-router'


import sbTheme from './sbTheme'
// import BootstrapVue from 'bootstrap-vue'
import { FormInputPlugin } from 'bootstrap-vue'
import { FormSelectPlugin } from 'bootstrap-vue'
import { FormTextareaPlugin } from 'bootstrap-vue'
import { LayoutPlugin } from 'bootstrap-vue'


addDecorator(centered)
addDecorator(withA11y)
addDecorator(withKnobs)
// addDecorator(StoryRouter())

import '../src/styles/styles.scss'

// Install Vue plugins.
// Vue.use(BootstrapVue)
Vue.use(FormInputPlugin)
Vue.use(FormSelectPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(LayoutPlugin)

addParameters({
  a11y: {
    config: {},
    options: {
      checks: {
        'color-contrast': {
          options: {
            noScroll: true
          }
        }
      },
      restoreScroll: true
    }
  },
  backgrounds: [
    {
      default: true,
      name: 'Dark',
      value: '#13171a'
    },
    {
      name: 'Light',
      value: '#ffffff'
    }
  ],
  options: {
    theme: sbTheme
  },
});

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module);
