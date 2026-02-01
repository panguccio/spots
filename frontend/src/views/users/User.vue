<script setup>
import { onMounted, ref } from "vue";
import { details } from "@/services/users.js";
import { details as tournamentDetails } from "@/services/tournaments.js";
import { useRoute } from "vue-router";
import List from '@/components/List.vue'
import router from '@/router'
import Error from '@/components/Error.vue'


const props = defineProps({
  user: Object,
  title: { type: String, default: "User" }
});

let loading = ref(true);
const user = ref(props.user || null)
const userId = useRoute().params.id;
const error = ref(null);

async function getDetails() {
  if (userId != undefined) {
    error.value = null;
    try {
      user.value = await details(userId);
    } catch (err) {
      error.value = err;
    }
  }

}

async function list() {
  let tournaments = []
  for (const tournamentId of user.value.tournamentsIds) {
    const tournament = await tournamentDetails(tournamentId)
    tournaments.push(tournament);
  }
  return tournaments;
}

async function loadPage() {
  loading.value = true;
  await getDetails();
  loading.value = false;
}

onMounted(async () => {
  await loadPage();
});

let openTournament = function (tournament) {
  router.push(`/tournaments/${tournament._id}`)
}


</script>

<template>
  <div class="user">
    <div class="element-card">
      <h2>{{ title }}</h2>
      <hr />
      <article v-if="!loading">
        <section class="element">
          <h3>{{ user.name }} {{ user.surname }}</h3>
          <p class="subtitle">@{{ user.username }}</p>
        </section>
        <section class="tournaments">
          <h4>{{ user.name }}'s Tournaments</h4>
          <List :list="list" title="Tournaments" search="Search tournaments" :name="element => element.name"
            :info="element => element.date.split('T')[0]"
            :icon="element => element.sport === 'football' ? 'futbol' : element.sport" @open="openTournament" />
        </section>
        <slot />
      </article>
    </div>
    <Error v-if="error" :error="error" />
  </div>
</template>

<style scoped>
.tournaments ::v-deep(.list-element) {
  background: rgba(138, 172, 153, 0.57);
}

.tournaments ::v-deep(.list-element:hover) {
  background: rgba(99, 132, 113, 0.586);
}

.tournaments ::v-deep(.icon) {
  color: #1e3c2f;
}

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
  margin-bottom: 8px;
}

p,
::v-deep(p),
::v-deep(h3) {
  color: #1e3c2f;
  margin: 0;
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
</style>
