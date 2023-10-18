import { mount } from '@vue/test-utils'
import CreateDriverVue from '../src/CreateDriver.vue'

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Deve criar um motorista', async () => {
  const wrapper = mount(CreateDriverVue, {})
  await wrapper.get('.driver-name').setValue('John Doe')
  await wrapper.get('.driver-email').setValue('john.doe@test.com')
  await wrapper.get('.driver-document').setValue('834.326.160-74')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.driver-id').text()).toHaveLength(36)
})
