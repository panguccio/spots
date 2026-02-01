<script setup>
import { onMounted, ref } from "vue";
import { details, players } from "@/services/teams.js";
import { details as userDetails } from "@/services/users.js";
import { useRoute } from "vue-router";
import Button from '@/components/Button.vue';
import TeamEdit from '@/views/teams/TeamEdit.vue';
import Error from "@/components/Error.vue";
import { useAuthStore } from '@/store/auth.js';

const { user } = useAuthStore()
let loading = ref(true);
const teamId = useRoute().params.id;
const team = ref({});
const playerList = ref([]);
const error = ref(null);
const organizer = ref({});
let editing = ref(false)

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

async function getUserName() {
  const id = team.value.organizerId;
  if (!id) return
  try {
    organizer.value = await userDetails(id);
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

onMounted(async () => {
  await loadPage();
});
</script>

<template>
  <div class="team-content">
    <div class="element-card">
      <div class="top">
        <h2>Team details</h2>
        <div v-if="user == organizer.username">
          <Button class="edit-button" @pressed="editing = !editing">
            {{ editing ? 'Cancel' : 'Edit' }}
          </Button>
        </div>
      </div>
      <hr />
      <article v-if="!loading">
      <TeamEdit v-if="editing" :team="team" @saved="loadPage(); editing = false" />
        <section class="element">
          <h3>{{ team.name }}</h3>
          <div class="info">
            <p><RouterLink :to="`/users/${organizer._id}`"><strong>Organizer:</strong> {{ organizer.name }} {{ organizer.surname }}</RouterLink></p>
          </div>
        </section>
        <section class="players">
          <h4>Players</h4>
          <div v-for="player in playerList" :key="player._id" class="player-card">
            <div class="player-info">
              <span>{{ player.name }} {{ player.surname }}</span>
            </div>
            <div class="jersey-number">{{ player.jerseyNumber }}</div>
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
.top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
article {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.players {
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* spazio tra i player */
}

.player-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 10px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #1e3c2f;
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.jersey-number {
  background: #2e7d32;
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}
</style>
