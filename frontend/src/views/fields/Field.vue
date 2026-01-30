<script setup>
import { onMounted, ref } from 'vue'
import { details, slots } from '@/services/fields.js'
import { useRoute } from 'vue-router'

import ElementCard from '@/components/ElementCard.vue'
import Error from '@/components/Error.vue'
import TimeSlot from '@/components/TimeSlot.vue'

const fieldId = useRoute().params.id
const freeSlots = ref([])
const field = ref({})
const error = ref(null)
let loading = ref(false)

async function fetch(term = '') {
  error.value = null
  loading.value = true
  try {
    field.value = await details(fieldId)
    freeSlots.value = await slots(fieldId, "2026-01-30")
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false
  }
}
onMounted(() => fetch())

</script>

<template>
  <div class="field-content">
    <ElementCard :title="'Field Details'" class="field-page">
      <div class="info">
        <h2>{{ field.name }}</h2>
        <p><strong>Address:</strong> {{ field.address }}</p>
        <p><strong>Sport:</strong> {{ field.sport }}</p>
        <p><strong>Slots:</strong> {{ freeSlots }}</p>
      </div>
        <p v-if="loading">Loading slots...</p>
        <TimeSlot v-else :freeSlots="freeSlots" />
    </ElementCard>
    <Error v-if="error" :error="error" />
  </div>
</template>

<style scoped>
</style>