<script setup>
import { onMounted, ref } from 'vue'
import { details, matches, standings } from '@/services/tournaments.js'
import { details as teamDetails } from '@/services/teams.js'
import { details as userDetails } from '@/services/users.js'
import { useRoute } from 'vue-router'
import Back from '@/components/Back.vue'
import Error from '@/components/Error.vue'
import Button from '@/components/Button.vue'
import Standings from '@/components/Standings.vue'
import Schedule from '@/components/Schedule.vue'
import TournamentEdit from '@/views/tournaments/TournamentEdit.vue'
import { useAuthStore } from '@/store/auth.js'

const { user } = useAuthStore()

let loading = ref(true)
const tournamentId = useRoute().params.id
const tournament = ref({})
const schedule = ref([])
const standingsStats = ref([])
const error = ref(null)
const teams = ref({});
const organizer = ref({})
let editing = ref(false)


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
  try {
    for (let id of ids) {
      const team = await teamDetails(id);
      teams.value[id] = team;
      console.log(teams)
    }
  } catch (err) {
    error.value = err;
  }
}

async function getUserName() {
  const id = tournament.value.organizerId;
  try {
    organizer.value = await userDetails(id);
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
      <div class="top">
        <div class="left"><Back />
        <h2>Tournament details</h2></div> 
        <div class="right" v-if="user == organizer.username">
          <Button class="edit-button" @pressed="editing = !editing">
            {{ editing ? 'Cancel' : 'Edit' }}
          </Button>
        </div>
      </div>
      <hr />
      <article v-if="!loading">

        <TournamentEdit v-if="editing" :tournament="tournament"
          @saved="loadPage(); editing = false" />

        <section class="element">
          <h3>{{ tournament.name }}</h3>
          <div class="info">
            <p><strong>Sport:</strong> {{ tournament.sport }}</p>
            <p><strong>Date:</strong> {{ tournament.date.split('T')[0] }} </p>
            <p><strong>Status:</strong> {{ tournament.status }}</p>
            <p>
              <RouterLink :to="`/users/${organizer._id}`"><strong>Organizer:</strong> {{ organizer.name }} {{
                organizer.surname }}</RouterLink>
            </p>
            <h4>Teams</h4>
            <div class="list">
            <div v-for="team in teams" :key="team._id" class="team-card">
              <span class="team-info">
                {{ team.name }}
              </span>
            </div>
            </div>
          </div>
        </section>
        <section class="schedule">
          <h3>Matches Schedule</h3>
          <Schedule v-if="schedule.length !== 0" :schedule="schedule" :teams="teams" />
          <p v-else>To generate matches, click <kbd> <samp>Edit</samp> &rightarrow; <samp>New Schedule</samp></kbd></p>
        </section>
        <section class="standings">
          <h3>Standings</h3>
          <Standings v-if="standingsStats.length !== 0" :standingsStats :teams="teams" />
          <p v-else>No games yet</p>
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
  margin-top: 8px;
  font-size: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
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
.list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.team-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  font-size: 16px;
  color: #1e3c2f;
}

.team-card:hover {
  background: #f9fbe7;
}

.team-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: center;
  font-weight: 600;
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

.edit-button {
  align-self: flex-end;
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

p kbd,
p samp {
  background: white;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.9em;
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