/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue'
import { boolean, radios, select, text } from '@storybook/addon-knobs'
import icons from '../../utils/font-icons-helper'

import NtIcon from './NtIcon'

const stories = storiesOf('Components|Icon', module)

const options = {
  'Left': 'left',
  'Right': 'right'
}

const breakpoints = {
  // xs: 0,
  'sm - 576px': 'sm',
  'md - 768px': 'md',
  'lg - 992px': 'lg',
  'xl - 1200px': 'xl'
}

stories.add('Icon only', () => ({
  components: { NtIcon },
  template: `<nt-icon :icon="sbIcon" :icon-class="sbIconClass">Search</nt-icon>`,
  props: {
    sbIcon: {
      type: String,
      default: select('Icon', icons, 'search')
    },
    sbIconClass: {
      type: String,
      default: text('Icon class', null)
    }
  }
}))

stories.add('Icon position', () => ({
  components: { NtIcon },
  template: `<nt-icon :icon="sbIcon" :icon-position="position" :icon-class="sbIconClass">{{sbText}}</nt-icon>`,
  props: {
    sbText: {
      type: String,
      default: text('Text', 'Search')
    },
    // sbTextClass: {
    //   type: String,
    //   default: text('Text class', null)
    // },
    sbIconPosition: {
      default: radios('Icon position', options, 'left')
    },
    sbIcon: {
      type: String,
      default: select('Icon', icons, 'search')
    },
    sbIconClass: {
      type: String,
      default: text('Icon class', null)
    }
  },
  computed: {
    position () {
      return this.sbIconPosition
    }
  }
}))

stories.add('Responsive text', () => ({
  components: { NtIcon },
  template: `<nt-icon :icon="sbIcon" :icon-class="sbIconClass" :hide-text="sbBreakpoint" :text-class="sbTextClass" icon-position="right" to="#">{{sbText}}</nt-icon>`,
  props: {
    sbBreakpoint: {
      type: String,
      default: select('Breakpoint', breakpoints, 'md')
    },
    sbText: {
      type: String,
      default: text('Text', 'Next')
    },
    sbTextClass: {
      type: String,
      default: text('Text class', null)
    },
    sbIcon: {
      type: String,
      default: select('Icon', icons, 'arrow-right')
    },
    sbIconClass: {
      type: String,
      default: text('Icon class', null)
    }
  }
}))

stories.add('Icon in button', () => ({
  components: { NtIcon },
  template: `<b-btn :size="buttonSize"><nt-icon :icon="sbIcon" :icon-class="sbIconClass" hide-text="md" :text-class="sbTextClass" icon-position="left">{{sbText}}</nt-icon></b-btn>`,
  props: {
    sbText: {
      type: String,
      default: text('Text', 'Date')
    },
    sbTextClass: {
      type: String,
      default: text('Text class', null)
    },
    sbIcon: {
      type: String,
      default: select('Icon', icons, 'calendar')
    },
    sbIconClass: {
      type: String,
      default: text('Icon class', null)
    },
    sbButtonSize: {
      type: Boolean,
      default: boolean('Small Button', false)
    }
  },
  computed: {
    buttonSize () {
      return this.sbButtonSize ? 'sm' : null
    }
  }
}))

/* eslint-enable react/react-in-jsx-scope */
