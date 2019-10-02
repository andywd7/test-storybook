import { shallowMount, createLocalVue } from '@vue/test-utils'
import NtButton from '../../../src/components/NtButton/NtButton.vue'

const localVue = createLocalVue()

describe('NtButton.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(NtButton, {
      localVue
    })
  })

  it(`is a vueInstance`, () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('renders a button', () => {
    expect(wrapper.is('button')).toBe(true)
  })

  it('renders base class', () => {
    expect(wrapper.classes()).toContain('nt-btn')
  })

  it('sets default type prop correctly', () => {
    expect(wrapper.vm.$options.props.type.default).toBe('button')
    expect(wrapper.attributes().type).toBe('button')
  })

  it('validates type prop', () => {
    const type = wrapper.vm.$options.props.type
    expect(type.validator('test')).toBe(false)
    expect(type.validator('reset')).toBe(true)
  })

  it('sets type attr correctly', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        type: 'reset'
      }
    })
    expect(wrapper.attributes().type).toBe('reset')
  })

  it('sets default variant prop correctly', () => {
    expect(wrapper.vm.$options.props.variant.default).toBe('secondary')
    expect(wrapper.classes()).toContain('nt-btn--secondary')
  })

  it('validates variant prop', () => {
    const type = wrapper.vm.$options.props.variant
    expect(type.validator('test')).toBe(false)
    expect(type.validator('danger')).toBe(true)
  })

  it('sets variant correctly', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        variant: 'primary'
      }
    })
    expect(wrapper.attributes().class).toBe('nt-btn nt-btn--primary')
  })

  it('sets default size prop correctly', () => {
    expect(wrapper.vm.$options.props.size.default).toBe('')
    expect(wrapper.classes()).not.toContain('nt-btn--sm')
  })

  it('validates size prop', () => {
    const size = wrapper.vm.$options.props.size
    expect(size.validator('small')).toBe(false)
    expect(size.validator('sm')).toBe(true)
  })

  it('sets size correctly', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        size: 'sm'
      }
    })
    expect(wrapper.classes()).toContain('nt-btn--sm')
  })

  it('sets variant and size correctly together', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        size: 'sm',
        variant: 'danger'
      }
    })
    expect(wrapper.classes()).toContain('nt-btn--sm')
    expect(wrapper.classes()).toContain('nt-btn--danger')
  })

  it('sets default pressed prop correctly', () => {
    expect(wrapper.vm.$options.props.pressed.default).toBe(null)
    expect(wrapper.classes()).not.toContain('nt-btn--pressed')
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
  })

  it('sets pressed true correctly', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        pressed: true
      }
    })
    expect(wrapper.classes()).toContain('nt-btn--pressed')
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })

  it('sets pressed false correctly', () => {
    const wrapper = shallowMount(NtButton, {
      propsData: {
        pressed: false
      }
    })
    expect(wrapper.classes()).not.toContain('nt-btn--pressed')
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })
})

// describe('CdrButton.vue', () => {
// it('click function triggers correctly', () => {
//   const spy = sinon.spy();
//   const wrapper = shallowMount(CdrButton, {
//     propsData: {
//       onClick: spy
//     },
//   });
//   wrapper.trigger('click');
//   expect(spy.calledOnce).toBeTruthy();
// });
// });
