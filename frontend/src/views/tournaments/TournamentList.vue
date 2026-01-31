<script setup>
import { list } from '@/services/tournaments.js'
import List from '@/components/List.vue'
import router from '@/router'

let openTournament = function(tournament) {
    router.push(`/tournaments/${tournament._id}`)
}

</script>

<template>
  <List :list="list" 
        title="Tournaments" 
        search="Search tournaments" 
        :name="element => element.name" 
        :info="element => element.date" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"
        @click="openTournament"  />
</template>

<style scoped>
</style>
