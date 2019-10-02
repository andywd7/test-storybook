import { shallowMount, createLocalVue } from '@vue/test-utils'
import NtIcon from '../../../src/components/NtIcon/NtIcon.vue'

const localVue = createLocalVue()

describe('NtIcon.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(NtIcon, {
      localVue,
      propsData: {
        icon: 'search'
      }
    })
  })

  it(`is a vueInstance`, () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  // it('should render the search icon when one is set', () => {
  //   expect(wrapper.find('span').classes()).toContain('fa-search')
  // })

  // it('applies an icon class', () => {
  //   const wrapper = shallowMount(NtIcon, {
  //     propsData: {
  //       icon: 'search',
  //       iconClass: 'fa-2x'
  //     }
  //   })
  //   expect(wrapper.find('span i').classes()).toContain('fa-2x')
  // })

  // it('should render as i followed by span', () => {
  //   const wrapper = shallowMount(NtIcon, {
  //     propsData: {
  //       icon: 'search',
  //       iconPosition: 'left'
  //     }
  //   })
  //   expect(wrapper.find('span i + span')).toBe(true)
  // })

  // it('should render as text followed by icon if icon-position is right', () => {
  //   expect(vm.$el.querySelector('code.name')).toBeDefined()
  // })

  // it('should add a class to the text if text-class and icon-position is set', () => {
  //   expect(vm.$el.querySelector('code.type')).toBeDefined()
  // })

  // it('should have a class of d-none d- hide-text -inline', () => {
  //   expect(vm.$el.querySelector('.example')).toBeDefined()
  // })

  // it('should have a class of mr-1 if icon-position is left', () => {
  //   expect(vm.$el.querySelector('.example.border-radius').style).toBeDefined()
  // })

  // it('should have a class of ml-1 if icon-position is right', () => {
  //   expect(vm.$el.querySelector('.example.border-radius').style).toBeDefined()
  // })

  // it('should have a class of mr- hide-text -1 if icon-position is left and hide-text is set', () => {
  //   expect(vm.$el.querySelector('.example.border-radius').style).toBeDefined()
  // })

  // it('should have a class of ml- hide-text -1 if icon-position is right and hide text is set', () => {
  //   expect(vm.$el.querySelector('.example.border-radius').style).toBeDefined()
  // })
})
