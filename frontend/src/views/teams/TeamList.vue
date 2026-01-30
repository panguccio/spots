<script setup>
import { list } from '@/services/teams.js'
import List from '@/components/List.vue'

</script>

<template>
  <List :list="list" 
        title="Teams" 
        search="Search teams" 
        :name="element => element.name" 
        :info="element => (element.playersIds ? element.playersIds.length : 0)  + ' players'" 
        :icon="element => 'users'"  />
</template>

<style scoped>
</style>
