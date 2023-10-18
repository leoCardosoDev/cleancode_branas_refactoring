<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const driverId = ref('')
const carPlate = ref('')
const document = ref('')

async function createDriver() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value,
    carPlate: carPlate.value
  }
  const response = await axios.post('http://localhost:3000/drivers', input)
  const output = response.data
  driverId.value = output.driverId
}

</script>

<template>
  <div>
    <input class="driver-name" v-model="name">
    <input class="driver-email" v-model="email">
    <input class="driver-document" v-model="document">
    <input class="driver-car-plate" v-model="carPlate">
    <button class="create-driver-button" @click="createDriver()">Create Driver</button>
    <div class="driver-id">{{ driverId }}</div>
  </div>
</template>

<style scoped>
</style>
