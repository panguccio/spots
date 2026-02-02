<script setup>
import { onMounted, ref } from "vue";
import User from '@/views/users/User.vue'
import { profile, bookings } from '@/services/users.js'
import { unbook } from '@/services/fields.js'
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
import router from '@/router'


import { useAuthStore } from '@/store/auth.js'
const { logout } = useAuthStore()

const user = ref(null);
const pippo = ref(null);
const error = ref(null);
const myBookings = ref([]);
const isDeleting = ref(false);

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
    myBookings.value.sort((a, b) => new Date(a.start) - new Date(b.start))
  } catch (err) {
    error.value = err;
  }
}

onMounted(() => { getUser(), getBookings() })

let formatTime = function (dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

let deleteBooking = async function (b) {
  if (isDeleting.value) return
  try {
    isDeleting.value = true;
    await unbook(b.fieldId, b._id)
  } catch (err) {
    error.value = err;
  } finally {
    await getBookings()
    isDeleting.value = false;
  }
}

let exit = async function () {
  logout();
  router.push({ name: "home" })
}


</script>


<template>
  <div class="Profile">
    <User v-if="user" :user="user" title="Profile">
      <section class="bookings">
        <h4>{{ user.name }}'s Bookings</h4>
        <ul class="booking-list">
          <li v-for="b in myBookings" :key="b._id" class="booking-item">
            <span class="date"> {{ b.start.split('T')[0] }} </span>
            <span class="time">{{ formatTime(b.start) }} → {{ formatTime(b.end) }}</span>
            <span class="delete"><Button variant="danger" @click="deleteBooking(b)"><font-awesome-icon class="icon"
                  icon="trash" /></Button></span>
          </li>
        </ul>
        <p v-if="!myBookings.length">No bookings yet</p>
      </section>
      <section class="logout">
        <span class="logout-button"><Button variant="danger" @click="exit">Logout</Button></span>
      </section>
    </User>
    <p v-else >To see your profile, please <RouterLink :to="{ name: 'login' }"><strong>Login</strong></RouterLink> or <RouterLink :to="{ name: 'signup' }"> <strong>Signup</strong></RouterLink></p>
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
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.date {
  font-weight: 650;
  text-align: left;
}

.time {
  text-align: center;
  font-family: monospace;
  margin: auto;
}

.delete {
  text-align: right;
}
</style>
