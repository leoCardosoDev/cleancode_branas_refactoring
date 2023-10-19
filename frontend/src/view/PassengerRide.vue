<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { RideBuilder } from '../domain/ride'
  import RideGateway from '../infra/gateway/ride_gateway'

  const rideBuilder = ref(new RideBuilder())
  const ride = ref()
  const error = ref('')
  const rideGateway = inject('rideGateway') as RideGateway

  async function calculateRide() {
    try {
      ride.value = rideBuilder.value.build()
      ride.value.price = await rideGateway.calculate(ride.value)
    } catch (e: any) {
      error.value = e.message
    }
  }

</script>

<template>
  <input type="text" class="ride-from-lat" v-model="rideBuilder.fromLat">
  <input type="text" class="ride-from-long" v-model="rideBuilder.fromLong">
  <input type="text" class="ride-to-lat" v-model="rideBuilder.toLat">
  <input type="text" class="ride-to-long" v-model="rideBuilder.toLong">
  <button class="calculate-ride-button" @click="calculateRide()">Calculate Ride</button>
  <div v-if="ride">
    <div class="ride-price">{{ ride.price }}</div>
  </div>
</template>

<style scoped>
</style>
