<script setup>
import { onMounted, ref } from "vue";
import { details, slots, book } from "@/services/fields.js";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import Back from '@/components/Back.vue'

const { user } = useAuthStore();

import Error from "@/components/Error.vue";
import TimeSlot from "@/components/TimeSlot.vue";
import Button from "@/components/Button.vue";

const fieldId = useRoute().params.id;
const freeSlots = ref([]);
const field = ref({});
const error = ref(null);
const today = new Date().toISOString().split("T")[0];
const selectedDate = ref(today);
const selectedStartTime = ref("09:00");
const selectedEndTime = ref("22:00");

async function getDetails() {
  error.value = null;
  try {
    field.value = await details(fieldId);
  } catch (err) {
    error.value = err;
  }
}

async function getSlots(date = today) {
  error.value = null;
  try {
    freeSlots.value = await slots(fieldId, date);
  } catch (err) {
    error.value = err;
  }
}

async function bookSlot(fieldId, date, startTime, endTime) {
  error.value = null;
  try {
    await book(fieldId, date, startTime, endTime);
    getSlots(date)
  } catch (err) {
    error.value = err;
  }
}

onMounted(() => {
  getDetails(), getSlots();
});
</script>

<template>
  <div class="field-content">
    <div class="element-card">
      <div class="top">
        <div class="left">
          <Back />
          <h2>Field Details</h2>
        </div>
      </div>

      <hr />
      <div class="element">
        <h3>{{ field.name }}</h3>
        <div class="info">
          <p><strong>Address:</strong> {{ field.address }}</p>
          <p><strong>Here you can play:</strong> {{ field.sport }}</p>
        </div>
      </div>
      <div class="slots">
        <div class="picker">
          <h4>Available slots for date:</h4>
          <input class="time-input" type="date" v-model="selectedDate" @change="getSlots(selectedDate)" />
        </div>
        <TimeSlot :freeSlots="freeSlots" />
      </div>
      <div class="booking">
        <h4>Wanna book a slot?</h4>
        <form v-if="user" class="input" @submit.prevent="
          bookSlot(fieldId, selectedDate, selectedStartTime, selectedEndTime)
          ">
          <div class="picker">
            <p>Start time:</p>
            <input class="time-input" type="time" v-model="selectedStartTime" min="09:00" max="21:30" value="09:00" />
            <p>End time:</p>
            <input class="time-input" type="time" v-model="selectedEndTime" min="09:30" max="22:00" value="22:00" />
          </div>
          <Button>Book!</Button>
        </form>
        <p v-else>Login or signup to book slots.</p>
      </div>
    </div>

    <Error v-if="error" :error="error" />
  </div>
</template>

<style scoped>
h2,
h3,
h4 {
  color: #1e3c2f;
  margin: 0;
}

h2 {
  font-size: 30px;
  text-align: left;
}

h3 {
  font-size: 30px;
  text-align: center;
}

h4 {
  font-size: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 0; /* rimuove spazi extra tra Back e h2 */
}

.left h2 {
  margin-left: 8px; /* opzionale: piccolo margine tra bottone e titolo */
}

p {
  color: #1e3c2f;
  margin: 0;
}

.element-card {
  background-color: rgb(230, 243, 230);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.319);
  max-width: 700px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
}

hr {
  border: 2px solid #1e3c2f;
  margin: 0;
}

.element {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.info {
  max-width: 300px;
  padding: 8px;
}

.slots {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.booking {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.picker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.time-input {
  border: none;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 16px;

  height: 36px;
  line-height: 1;
}
</style>
