<script setup>
import { list } from '@/services/teams.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

let openTeam = function(team) {
    router.push(`/teams/${team._id}`)
}

</script>

<template>
  <ListPage :list="list" 
        title="Teams" 
        search="Search teams" 
        :name="element => element.name" 
        :info="element => (element.playersIds ? element.playersIds.length : 0)  + ' players'" 
        :icon="() => 'users'" 
        @open="openTeam" />
</template>

<style scoped>
</style>
