<script setup>
import { onMounted, ref } from 'vue'
import { details, matches, standings } from '@/services/tournaments.js'
import { details as teamDetails } from '@/services/teams.js'
import { details as userDetails } from '@/services/users.js'
import { useRoute } from 'vue-router'

import Error from '@/components/Error.vue'
import Button from '@/components/Button.vue'
import Standings from '@/components/Standings.vue'
import Schedule from '@/components/Schedule.vue'


let loading = ref(true)
const tournamentId = useRoute().params.id
const tournament = ref({})
const schedule = ref([])
const standingsStats = ref({})
const error = ref(null)
const teamsNames = ref({});
const user = ref({})


async function getDetails() {
  error.value = null;
  try {
    tournament.value = await details(tournamentId)
  } catch (err) {
    error.value = err;
  }
}

async function getMatches() {
  error.value = null;
  try {
    schedule.value = await matches(tournamentId)
  } catch (err) {
    error.value = err;
  }
}

async function getStandings() {
  error.value = null;
  try {
    standingsStats.value = await standings(tournamentId)
  } catch (err) {
    error.value = err;
  }
}

async function getNames() {
  error.value = null;
  const ids = tournament.value.teamsIds;
  let teams = {};
  try {
    for (let id of ids) {
      const team = await teamDetails(id);
      teams[id] = team.name;
    }
    teamsNames.value = teams;
  } catch (err) {
    error.value = err;
  }
}

async function getUserName() {
  const id = tournament.value.organizerId;
  try {
    user.value = await userDetails(id);
  } catch (err) {
    error.value = err;
  }
}

async function loadPage() {
  loading.value = true;
  await getDetails();
  await getStandings();
  await getNames();
  await getMatches();
  await getUserName();
  loading.value = false;
}

onMounted(async () => { await loadPage() })

</script>

<template>
  <div class="tournament-content">

    <div class="element-card">
      <h2>Tournament details</h2>
      <hr />
      <article v-if="!loading">
        <section class="element">
          <h3>{{ tournament.name }}</h3>
          <div class="info">
            <p><strong>Sport:</strong> {{ tournament.sport }}</p>
            <p><strong>Date:</strong> {{ tournament.date.split('T')[0] }} </p>
            <p><strong>Status:</strong> {{ tournament.status }}</p>
            <p> <RouterLink :to="`/users/${user._id}`"><strong>Organizer:</strong> {{ user.name }} {{ user.surname }}</RouterLink></p>
          </div>
        </section>
        <section class="schedule">
          <h3>Matches Schedule</h3>
          <Schedule :schedule="schedule" :teamsNames="teamsNames" />
        </section>
        <section class="standings">
          <h3>Standings</h3>
          <Standings :standingsStats :teamsNames />
        </section>
      </article>
      <div v-else>
        <p>Loading data...</p>
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

article {
  display: flex;
  flex-direction: column;
  gap: 24px;
}


section {
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