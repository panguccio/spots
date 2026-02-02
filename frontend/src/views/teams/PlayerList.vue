<script setup>
import { ref, onMounted, watch } from 'vue'
import { listPlayers as list } from '@/services/teams.js'
import SearchBar from '@/components/SearchBar.vue'

const playerList = ref([])
const searchTerm = ref('')
const error = ref(null);

async function fetch(term = '') {
    error.value = null
    try {
        playerList.value = await list(term)
    } catch (err) {
        error.value = err;
    }
}

onMounted(() => fetch())

watch(searchTerm, (newTerm) => {
    fetch(newTerm)
})

</script>

<template>
    <div class="list-page">
        <h2>Players </h2>
        <div class="search-container">
            <div class="top">
                <SearchBar class="searchbar" v-model="searchTerm" placeholder="Search players" />
            </div>
            <div class="list">

                <div v-for="player in playerList" :key="player._id" class="player-card">
                    <div class="player-info">
                        <span>{{ player.name }} {{ player.surname }}</span>
                    </div>
                    <div class="jersey-number">{{ player.jerseyNumber }}</div>
                </div>
                <p v-if="playerList.length == 0">Nothing here yet</p>
            </div>
        </div>
    </div>

</template>

<style scoped>

h2 {
  margin-bottom: 20px;
  color: white;
  font-size: 35px;
}

.top {
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
  margin: auto;
}

.searchbar {
  flex: 1;
}

.list-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: white;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.list {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0;
  align-items: center;
}

.player-card {
  max-width: 500px;
  min-width: 200px;
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
  flex: 1;
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

@media screen and (max-width: 400px) {
  .search-container {
    width: 100%;
  }
}

</style>
