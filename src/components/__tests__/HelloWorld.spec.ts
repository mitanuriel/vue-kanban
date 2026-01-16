import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import KanbanCard from '../KanbanCard.vue'

describe('KanbanCard', () => {
  it('renders properly', () => {
    const wrapper = mount(KanbanCard, { 
      props: { 
        card: { id: 1, title: 'Test Card', description: 'Test description', status: 'todo' }
      } 
    })
    expect(wrapper.text()).toContain('Test Card')
  })
})
