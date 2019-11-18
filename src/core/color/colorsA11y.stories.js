import { select, boolean } from '@storybook/addon-knobs'

import ColorA11y from './ColorA11y'

export default {
  title: 'Core|Colors'
}

const colors = {
  'grey': 'grey',
  'grey_hover': 'grey_hover',
  'blue': 'blue',
  'green': 'green',
  'red': 'red',
  'orange': 'orange',
  'yellow': 'yellow',
  'cyan': 'cyan',
  'teal': 'teal',
  'purple': 'purple',
  'magenta': 'magenta',
  'default': 'default'
}

export const Default = () => ({
  components: { ColorA11y },
  props: {
    sbTextColor: {
      type: String,
      default: select('Text colour', colors, 'grey')
    },
    sbBackgroundColor: {
      type: String,
      default: select('Background colour', colors, 'blue')
    },
    sbContrastFailed: {
      type: Boolean,
      default: boolean('Contrast failed', false)
    }
  },
  template: `<color-a11y :textColor="sbTextColor" :backgroundColor="sbBackgroundColor" :contrastFailed="sbContrastFailed" />`
})

Default.story = {
  name: 'Test A11y',
  parameters: {
    docs: {
      disable: true
    }
  }
}
