<script setup>
import { onMounted, ref } from 'vue'
import { details, slots } from '@/services/fields.js'
import { useRoute } from 'vue-router'

import ElementCard from '@/components/ElementCard.vue'
import Error from '@/components/Error.vue'

const fieldId = useRoute().params.id
const freeSlots = ref([])
const field = ref({})
const error = ref(null)

async function fetch(term = '') {
  error.value = null
  try {
    field.value = await details(fieldId)
    freeSlots.value = await slots(fieldId, "2026-01-30")
  } catch (err) {
    error.value = err;
  }
}
onMounted(() => fetch())

const hours = ['9AM', '9:30AM', '10AM', '10:30AM', '11AM', '11:30AM', '12PM', '12:30PM', '1PM', '1:30PM', '2PM', '2:30PM', '3PM', '3:30PM', '4PM', '4:30PM', '5PM', '5:30PM', '6PM', '6:30PM', '7PM', '7:30PM', '8PM', '8:30PM', '9PM', '9:30PM', '10PM']

function timeToIndex(isoTime) {
  const date = new Date(isoTime)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return (hour - 9) * 2 + (minutes === 30 ? 1 : 0)
}

function isBooked(index) {
  for (let slot of freeSlots.value) {
    const startIndex = timeToIndex(slot.start)
    const endIndex = timeToIndex(slot.end)
    if (index >= startIndex && index < endIndex) {
      return false
    }
  }
  return true
}

</script>

<template>
  <div class="field-content">
    <ElementCard :title="'Field Details'" class="field-page">

      <div class="info">

        <h2>{{ field.name }}</h2>

        <p><strong>Address:</strong> {{ field.address }}</p>
        <p><strong>Sport:</strong> {{ field.sport }}</p>
        <p><strong>Slots:</strong> {{ freeSlots }}</p>

        <div class="time-slots">
          <div class="time-bar">
            
            <div v-for="(hour, index) in hours" :key="hour" class="time-label-container">
              <p class="time-label">{{ hour }}</p>
              <p>|<span class="booking" :class="{ booked: isBooked(index) }"> </span></p>
            </div>
          </div>
        </div>
      </div>
    </ElementCard>
    <Error v-if="error" :error="error" />
  </div>
</template>

<style scoped>
.time-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.time-label-container:nth-of-type(2n) .time-label {
  visibility: hidden;
}

.booking {
  display: inline-block;
  width: 30px;
  height: 20px;
  vertical-align: middle;
}

.booking.booked {
  background-color: red;
}

</style>
