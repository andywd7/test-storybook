/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue'
// import { config, withDesign } from 'storybook-addon-designs'

const stories = storiesOf('Bootstrap|Select', module)

stories
  // .addDecorator(withDesign)
  .add('Default', () => {
    return {
      template: `
        <b-form-select v-model="selected" :options="options" />
      `
    }
  }
  // {
  //   design: config({
  //     type: 'figma',
  //     url: 'https://www.figma.com/file/bAHTfeIMYWFEMHLrGcjC9e/Netacea-Fundamentals-2018?node-id=364%3A65'
  //   })
  // }
  )

stories
  // .addDecorator(withDesign)
  .add('Small', () => {
    return {
      template: `
        <b-form-select size="sm" v-model="selected" :options="options" />
      `
    }
  }
  // {
  //   design: config({
  //     type: 'figma',
  //     url: 'https://www.figma.com/file/bAHTfeIMYWFEMHLrGcjC9e/Netacea-Fundamentals-2018?node-id=364%3A107'
  //   })
  // }
  )

/* eslint-enable react/react-in-jsx-scope */
