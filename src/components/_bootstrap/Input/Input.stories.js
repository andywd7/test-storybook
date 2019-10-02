/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue'
// import { config, withDesign } from 'storybook-addon-designs'

const stories = storiesOf('Bootstrap|Input', module)

stories
  // .addDecorator(withDesign)
  .add('Default', () => {
    return {
      template: `
        <b-form-input placeholder="Enter your name" />
      `
    }
  }
  // {
  //   design: config({
  //     type: 'figma',
  //     url: 'https://www.figma.com/file/bAHTfeIMYWFEMHLrGcjC9e/Netacea-Fundamentals-2018?node-id=273%3A43'
  //   })
  // }
  )

stories
  // .addDecorator(withDesign)
  .add('Small', () => {
    return {
      template: `
        <b-form-input size="sm" placeholder="Enter your name" />
      `
    }
  }
  // {
  //   design: config({
  //     type: 'figma',
  //     url: 'https://www.figma.com/file/bAHTfeIMYWFEMHLrGcjC9e/Netacea-Fundamentals-2018?node-id=360%3A149'
  //   })
  // }
  )

/* eslint-enable react/react-in-jsx-scope */
