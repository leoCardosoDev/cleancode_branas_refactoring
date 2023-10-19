import { mount } from '@vue/test-utils'
import CreateDriverVue from '../src/CreateDriver.vue'
import DriverGateway from '../src/infra/gateway/driver_gateway'
import DriverGatewayHttp from '../src/infra/gateway/driver_gateway_http'
import AxiosAdapter from '../src/infra/http/axios_adapter'

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

test('Deve criar um motorista', async () => {
  const driverGateway: DriverGateway = {
    async create(): Promise<any> {
      return 'e3593f70-62fc-43f0-b58a-69307b4eb87e'
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

test('Não deve criar um motorista com o nome inválido', async () => {
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.driver-name').setValue('John')
  await wrapper.get('.driver-email').setValue('john.doe@test.com')
  await wrapper.get('.driver-document').setValue('834.326.160-74')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
})

test('Não deve criar um motorista com o email inválido', async () => {
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.driver-name').setValue('John Doe')
  await wrapper.get('.driver-email').setValue('john.doe@test')
  await wrapper.get('.driver-document').setValue('834.326.160-74')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid email')
})

test('Não deve criar um motorista com o CPF inválido', async () => {
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.driver-name').setValue('John Doe')
  await wrapper.get('.driver-email').setValue('john.doe@test.com')
  await wrapper.get('.driver-document').setValue('834.326.160-75')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid CPF')
})

test('Não deve criar um motorista com o placa do carro inválido', async () => {
  const wrapper = mount(CreateDriverVue, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter)
      }
    }
  })
  await wrapper.get('.driver-name').setValue('John Doe')
  await wrapper.get('.driver-email').setValue('john.doe@test.com')
  await wrapper.get('.driver-document').setValue('834.326.160-74')
  await wrapper.get('.driver-car-plate').setValue('AAA999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid car plate')
})
