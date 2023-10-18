import { mount } from '@vue/test-utils'
import CreateDriverVue from '../src/CreateDriver.vue'
import DriverGateway from '../src/infra/gateway/driver_gateway'

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Deve criar um motorista', async () => {
  const driverGateway: DriverGateway = {
    async save(driver: any): Promise<any> {
      driver = {}
      return {driverId: 'e3593f70-62fc-43f0-b58a-69307b4eb87e'}
    }
  }
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway
      }
    }
  })
  await wrapper.get('.driver-name').setValue('John Doe')
  await wrapper.get('.driver-email').setValue('john.doe@test.com')
  await wrapper.get('.driver-document').setValue('834.326.160-74')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.driver-id').text()).toHaveLength(36)
})
