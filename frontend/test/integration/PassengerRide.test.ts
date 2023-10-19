import { mount } from '@vue/test-utils'
import PassengerRideVue from '../../src/view/PassengerRide.vue'
import RideGatewayHttp from '../../src/infra/gateway/ride_gateway_http'
import AxiosAdapter from '../../src/infra/http/axios_adapter'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('O passageiro deve calcular o preço de uma corrida', async () => {
  const wrapper = mount(PassengerRideVue, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter())
      }
    }
  })

  await wrapper.get('.ride-from-lat').setValue('-27.584905257808835')
  await wrapper.get('.ride-from-long').setValue('-48.545022195325124')
  await wrapper.get('.ride-to-lat').setValue('-27.496887588317275')
  await wrapper.get('.ride-to-long').setValue('-48.522234807851476')
  await wrapper.get('.calculate-ride-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.ride-price').text()).toBe('21')
})
