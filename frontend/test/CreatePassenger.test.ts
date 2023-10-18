import { mount } from '@vue/test-utils'
import CreatePassengerVue from '../src/CreatePassenger.vue'
import PassengerGateway from "../src/infra/gateway/passenger_gateway";

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Deve criar um passageiro', async () => {
  const passengerGateway: PassengerGateway = {
    async save(passenger: any): Promise<any> {
      passenger = {}
      return {passengerId: 'e3593f70-62fc-43f0-b58a-69307b4eb87e'}
    }
  }
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.passenger-id').text()).toHaveLength(59)
})
