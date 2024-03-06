import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UserInfo from '@/components/globals/UserInfo.vue'

describe('UserInfo', () => {
  it('renders properly', () => {
    const wrapper = mount(UserInfo, { props: { name: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
