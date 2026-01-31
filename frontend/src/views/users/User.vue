<script setup>
import { onMounted, ref } from "vue";
import { details } from "@/services/users.js";
import { details as tournamentDetails } from "@/services/tournaments.js";
import { useRoute } from "vue-router";
import List from '@/components/List.vue'
import router from '@/router'

let loading = ref(true);
const user = ref({})
const userId = useRoute().params.id;
const error = ref(null);

async function getDetails() {
  error.value = null;
  try {
    user.value = await details(userId);
  } catch (err) {
    error.value = err;
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

let openTournament = function(tournament) {
    router.push(`/tournaments/${tournament._id}`)
}


</script>

<template>
  <div v-if="!loading" class="User">
    <p>{{ user }}</p>
    <section class="tournaments">
    <List :list="list" 
        title="Tournaments" 
        search="Search tournaments" 
        :name="element => element.name" 
        :info="element => element.date.split('T')[0]" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"
        @click="openTournament"  />
      </section>
  <Error v-if="error" :error="error" />
  </div>
</template>

<style scoped>
</style>
