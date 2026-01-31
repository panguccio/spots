<script setup>
import { onMounted, ref } from "vue";
import { details, players } from "@/services/teams.js";
import { details as userDetails } from "@/services/users.js";
import { useRoute } from "vue-router";

import Error from "@/components/Error.vue";
import Button from "@/components/Button.vue";

let loading = ref(true);
const teamId = useRoute().params.id;
const team = ref({});
const playerList = ref([]);
const standingsData = ref({});
const error = ref(null);
const teamsInfo = ref({});
const user = ref("");

async function getDetails() {
  error.value = null;
  try {
    team.value = await details(teamId);
  } catch (err) {
    error.value = err;
  }
}

async function getPlayers() {
  error.value = null;
  try {
    playerList.value = await players(teamId);
  } catch (err) {
    error.value = err;
  }
}

async function loadPage() {
  loading.value = true;
  await getDetails();
  await getPlayers();
  await getUserName();
  loading.value = false;
}

async function getUserName() {
  const id = team.value.organizerId;
  try {
    user.value = await userDetails(id);
  } catch (err) {
    error.value = err;
  }
}

onMounted(async () => {
  await loadPage();
});
</script>

<template>
  <div class="team-content">
    <div class="element-card">
      <h2>Team Details</h2>
      <hr />
      <article v-if="!loading">
        <section class="element">
          <h3>{{ team.name }}</h3>
          <div class="info">
            <p><strong>organizer:</strong> {{ user.name }} {{ user.surname }}</p>
          </div>
        </section>
        <section class="players">
          <h4>Players</h4>
          <div v-for="player in playerList" :key="player._id" class="match">
            {{ player.name }} {{ player.surname }} {{ player.jerseyNumber }}
          </div>
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
