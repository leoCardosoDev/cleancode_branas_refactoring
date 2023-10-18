import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PassengerGatewayHttp from './infra/gateway/passenger_gateway_http'
import DriverGatewayHttp from './infra/gateway/driver_gateway_http'
import FetchAdapter from './infra/http/fetch_adapter'

const app = createApp(App)
const httpClient = new FetchAdapter()
app.provide('passengerGateway', new PassengerGatewayHttp(httpClient))
app.provide('driverGateway', new DriverGatewayHttp(httpClient))
app.mount('#app')
