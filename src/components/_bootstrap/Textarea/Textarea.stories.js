export default {
  title: 'Bootstrap|Textarea'
}

export const defaultTextarea = () => ({
  template: `
    <b-form-textarea
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    />
  `
})

// import { storiesOf } from '@storybook/vue'
// import { config, withDesign } from 'storybook-addon-designs'

// const stories = storiesOf('Bootstrap|Textarea', module)

// stories
//   .addDecorator(withDesign)
//   .add('Default', () => {
//     return {
//       template: `
//         <b-form-textarea
//           placeholder="Enter something..."
//           rows="3"
//           max-rows="6"
//         />
//       `
//     }
//   },
//   {
//     design: config({
//       type: 'figma',
//       url: 'https://www.figma.com/file/bAHTfeIMYWFEMHLrGcjC9e/Netacea-Fundamentals-2018?node-id=362%3A0'
//     })
//   }
//   )
