<script setup>
import { list } from '@/services/tournaments.js'
import List from '@/components/List.vue'

</script>

<template>
  <List :list="list" 
        title="Tournaments" 
        search="Search tournaments" 
        :name="element => element.name" 
        :info="element => element.date" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"  />
</template>

<style scoped>
</style>
