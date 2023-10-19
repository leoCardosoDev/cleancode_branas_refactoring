import { mount } from '@vue/test-utils'
import CreatePassengerVue from '../src/CreatePassenger.vue'
import PassengerGateway from "../src/infra/gateway/passenger_gateway";
import PassengerGatewayHttp from '../src/infra/gateway/passenger_gateway_http';
import AxiosAdapter from '../src/infra/http/axios_adapter';

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Deve criar um passageiro', async () => {
  const passengerGateway: PassengerGateway = {
    async create(): Promise<any> {
      return 'e3593f70-62fc-43f0-b58a-69307b4eb87e'
    }
  }
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway //: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36)
})

test('Não deve criar um passageiro com o nome inválido', async () => {
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
})

test('Não deve criar um passageiro com o email inválido', async () => {
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.passenger-email').setValue('john.doe@test')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid email')
})

test('Não deve criar um passageiro com o cpf inválido', async () => {
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-75')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid CPF')
})

test('Deve criar um passageiro tendo errado o preenchimento antes', async () => {
  const wrapper = mount(CreatePassengerVue, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('John')
  await wrapper.get('.passenger-email').setValue('john.doe@test.com')
  await wrapper.get('.passenger-document').setValue('834.326.160-74')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
  await wrapper.get('.passenger-name').setValue('John Doe')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('')
})
