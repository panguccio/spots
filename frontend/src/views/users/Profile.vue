<script setup>
import { onMounted, ref } from "vue";
import User from '@/views/users/User.vue'
import { profile, bookings } from '@/services/users.js'

import { useAuthStore } from '@/store/auth.js'
const { logout } = useAuthStore()

const user = ref(null)
const pippo = ref(null)
const error = ref(null);
const myBookings = ref([])

async function getUser() {
  error.value = null;
  try {
    user.value = await profile();
  } catch (err) {
    error.value = err;
  }
}

async function getBookings() {
  error.value = null;
  try {
    myBookings.value = await bookings();
    myBookings.value.sort((a,b) => new Date(a.start) - new Date(b.start))
  } catch (err) {
    error.value = err;
  }
}

onMounted(() => { getUser(), getBookings() })

let formatTime = function(date) {
    return date.split('T')[1].slice(0, 5)
}

</script>


<template>
  <div class="Profile">
    <User v-if="user" :user="user" title="Profile">
      <section class="bookings">
        <h4>{{ user.name }}'s Bookings</h4>
        <ul class="booking-list">
          <li v-for="b in myBookings" :key="b._id" class="booking-item">
            <span class="date"> {{ b.start.split('T')[0]}} </span>
            <span class="time">{{ formatTime(b.start) }} → {{ formatTime(b.end) }}</span>
          </li>
        </ul>

        <p v-if="!bookings.length">No bookings yet.</p>
      </section>
    </User>
    <p v-else>To see your profile,<RouterLink :to="{ name: 'login' }"> login</RouterLink>
    </p>
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

h4 {
  font-size: 20px;
  margin-bottom: 8px;
}
.bookings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.booking-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 6px;
}

.booking-item {
  background: rgba(138, 172, 153, 0.57);
  padding: 8px 12px;
  border-radius: 8px;

  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
}

.date {
  font-weight: 650;
  text-align: left;
}

.time {
  text-align: center;
  font-family: monospace;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
