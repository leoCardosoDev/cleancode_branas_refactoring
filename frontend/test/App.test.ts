import { mount } from '@vue/test-utils'
import AppVue from '../src/App.vue'

test('Deve testar a aplicação', async () => {
  const wrapper = mount(AppVue, {})
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36)
})
