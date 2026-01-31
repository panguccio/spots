<script setup>
import { list } from '@/services/tournaments.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

let openTournament = function(tournament) {
    router.push(`/tournaments/${tournament._id}`)
}

</script>

<template>
  <ListPage :list="list" 
        title="Tournaments" 
        search="Search tournaments" 
        :name="element => element.name" 
        :info="element => element.date.split('T')[0]" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"
        @click="openTournament"  />
</template>

<style scoped>
</style>
