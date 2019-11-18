import { withKnobs, select } from '@storybook/addon-knobs'

import NtBtn from './NtButton'

export default {
  title: 'Components|Button',
  decorators: [
    withKnobs({
      escapeHTML: false
    })
  ]
}

const sizeOptions = {
  'Default': '',
  'Small': 'sm'
}

const buttonVariants = `
  <div>
    <nt-btn :size="sbSize">Default</nt-btn>
    <nt-btn variant="primary" :size="sbSize">Primary</nt-btn>
    <nt-btn variant="danger" :pressed="false" :size="sbSize">Danger</nt-btn>
    <nt-btn variant="minimal" :pressed="true">Minimal</nt-btn>
  </div>
`

export const Default = () => ({
  components: { NtBtn },
  props: {
    sbSize: {
      type: String,
      default: select('Size', sizeOptions, '')
    }
  },
  template: buttonVariants
})

export const Small = () => ({
  components: { NtBtn },
  props: {
    sbSize: {
      type: String,
      default: select('Size', sizeOptions, 'sm')
    }
  },
  template: buttonVariants
})
