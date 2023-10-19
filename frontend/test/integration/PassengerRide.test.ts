import { mount } from '@vue/test-utils'
import CreatePassengerVue from '../../src/view/CreatePassenger.vue'
import PassengerRideVue from '../../src/view/PassengerRide.vue'
import RideGatewayHttp from '../../src/infra/gateway/ride_gateway_http'
import AxiosAdapter from '../../src/infra/http/axios_adapter'
import PassengerGateway from '../../src/infra/gateway/passenger_gateway'
import GeoLocation from '../../src/infra/geolocation/geolocation'
import Coord from '../../src/domain/coord'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('O passageiro deve calcular o preço de uma corrida', async () => {
  const geoLocation: GeoLocation = {
    async getCoord (): Promise<Coord> {
      return new Coord(-27.584905257808835, -48.545022195325124)
    }
  }
  const wrapper = mount(PassengerRideVue, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation
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

test('O passageiro deve solicitar uma corrida', async () => {

  const passengerGateway: PassengerGateway = {
    async create(): Promise<any> {
      return 'e3593f70-62fc-43f0-b58a-69307b4eb87e'
    }
  }
  const wrapperCreatePassenger = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway //: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapperCreatePassenger.get('.passenger-name').setValue('John Doe')
  await wrapperCreatePassenger.get('.passenger-email').setValue('john.doe@test.com')
  await wrapperCreatePassenger.get('.passenger-document').setValue('834.326.160-74')
  await wrapperCreatePassenger.get('.create-passenger-button').trigger('click')
  await sleep(200)

  const passengerId = wrapperCreatePassenger.get('.passenger-id').text()
  const geoLocation: GeoLocation = {
    async getCoord (): Promise<Coord> {
      return await new Coord(-27.584905257808835, -48.545022195325124)
    }
  }
  const wrapperPassengerRide = mount(PassengerRideVue, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation
      }
    }
  })

  await wrapperPassengerRide.get('.ride-passenger-id').setValue(passengerId)
  await wrapperPassengerRide.get('.ride-from-lat').setValue('-27.584905257808835')
  await wrapperPassengerRide.get('.ride-from-long').setValue('-48.545022195325124')
  await wrapperPassengerRide.get('.ride-to-lat').setValue('-27.496887588317275')
  await wrapperPassengerRide.get('.ride-to-long').setValue('-48.522234807851476')
  await wrapperPassengerRide.get('.calculate-ride-button').trigger('click')
  await sleep(200)
  await wrapperPassengerRide.get('.request-ride-button').trigger('click')
  await sleep(200)
  expect(wrapperPassengerRide.get('.ride-id').text()).toHaveLength(36)
})
