<script setup>
import { onMounted, ref } from 'vue'
import { details, matches, standings } from '@/services/tournaments.js'
import { details as teamDetails } from '@/services/teams.js'
import { useRoute } from 'vue-router'

import Error from '@/components/Error.vue'
import Button from '@/components/Button.vue'

const tournamentId = useRoute().params.id
const tournament = ref({})
const schedule = ref([])
const standingsData = ref({})
const error = ref(null)
const teamsInfo = ref({});


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
    standingsData.value = await standings(tournamentId)
  } catch (err) {
    error.value = err;
  }
}

async function getNames() {
  const ids = standingsData.value.standings;
  const stats = standingsData.value.teams;
  error.value = null;
  let teams = stats;
  try {
    for (let id of ids) {
      const team = await teamDetails(id);
      teams[id].name = team.name;
    }
    teamsInfo.value = teams;
    return teams;
  } catch (err) {
    error.value = err;
  }
}

onMounted(async () => { await getDetails(), await getStandings(), await getNames(), getMatches() })

</script>

<template>
  <div class="tournament-content">

    <div class="element-card">
      <h2>Tournament Details</h2>
      <hr />
      <div class="element">
        <h3>{{ tournament.name }}</h3>
        <div class="info">
          <p><strong>sport:</strong> {{ tournament.sport }}</p>
          <p><strong>status:</strong> {{ tournament.status }}</p>
          <p><strong>date:</strong> {{ tournament.date.split('T')[0] }}</p>
          <p><strong>organizer:</strong> {{ tournament.organizerId }}</p>
        </div>
      </div>
      <div class="matches">
        <h4>Matches Schedule</h4>
        <div v-for="match in schedule" :key="match._id" class="match">
          {{ teamsInfo[match.team1Id].name }} vs {{ teamsInfo[match.team2Id].name }} - {{ match.date.split('T')[0] }} -
          status:
          {{ match.status }} - points: {{ match.points1 }} - {{ match.points2 }}
        </div>
      </div>
      <div class="schedule">
        <h4>Standings</h4>
        <div v-for="team in standingsData.standings" :key="team" class="picker">
          {{ teamsInfo[team].name }} - played: {{ teamsInfo[team].played }} - scored: {{ teamsInfo[team].scored }} -
          conceded: {{ teamsInfo[team].conceded }} - points: {{ teamsInfo[team].points }} - diff: {{
            teamsInfo[team].diff }}
        </div>
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