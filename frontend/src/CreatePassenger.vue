<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const document = ref('')
const passengerId = ref('')

async function createPassenger() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value
  }
  const response = await axios.post('http://localhost:3000/passengers', input)
  const output = response.data
  passengerId.value = output.passengerId
}

</script>

<template>
  <div>
    <input class="passenger-name" v-model="name">
    <input class="passenger-email" v-model="email">
    <input class="passenger-document" v-model="document">
    <button class="create-passenger-button" @click="createPassenger()">Create Passenger</button>
    <div class="passenger-id">{{ passengerId }}</div>
  </div>
</template>

<style scoped>
</style>
