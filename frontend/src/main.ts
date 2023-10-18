import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PassengerGatewayHttp from './infra/gateway/passenger_gateway_http'
import DriverGatewayHttp from './infra/gateway/driver_gateway_http'

const app = createApp(App)
app.provide('passengerGateway', new PassengerGatewayHttp())
app.provide('driverGateway', new DriverGatewayHttp())
app.mount('#app')
