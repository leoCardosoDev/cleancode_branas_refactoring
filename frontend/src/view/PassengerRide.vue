<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';
  import { RideBuilder } from '../domain/ride'
  import RideGateway from '../infra/gateway/ride_gateway'
import GeoLocation from '../infra/geolocation/geolocation';

  const rideBuilder = ref(new RideBuilder())
  const ride = ref()
  const error = ref('')
  const rideGateway = inject('rideGateway') as RideGateway
  const geoLocation = inject('geoLocation') as GeoLocation

  async function calculateRide() {
    try {
      ride.value = rideBuilder.value.build()
      ride.value.price = await rideGateway.calculate(ride.value)
    } catch (e: any) {
      error.value = e.message
    }
  }

  async function requestRide() {
    try {
      ride.value.rideId = await rideGateway.request(ride.value)
    } catch (e: any) {
      error.value = e.message
    }
  }

  onMounted(async () => {
    const coord = await geoLocation.getCoord()
    rideBuilder.value.fromLat = coord.lat
    rideBuilder.value.fromLong = coord.long
  })

</script>

<template>
  <input type="text" class="ride-passenger-id" v-model="rideBuilder.passengerId">
  <input type="text" class="ride-from-lat" v-model="rideBuilder.fromLat">
  <input type="text" class="ride-from-long" v-model="rideBuilder.fromLong">
  <input type="text" class="ride-to-lat" v-model="rideBuilder.toLat">
  <input type="text" class="ride-to-long" v-model="rideBuilder.toLong">
  <button class="calculate-ride-button" @click="calculateRide()">Calculate Ride</button>
  <button class="request-ride-button" @click="requestRide()">Request Ride</button>
  <div v-if="ride">
    <div class="ride-price">{{ ride.price }}</div>
    <div class="ride-id">{{ ride.rideId }}</div>
  </div>
</template>

<style scoped>
</style>
