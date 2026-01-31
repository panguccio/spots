<script setup>
import { list } from '@/services/teams.js'
import List from '@/components/List.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let openTeam = function(team) {
    router.push(`/teams/${team._id}`)
}

</script>

<template>
  <List :list="list" 
        title="Teams" 
        search="Search teams" 
        :name="element => element.name" 
        :info="element => (element.playersIds ? element.playersIds.length : 0)  + ' players'" 
        :icon="element => 'users'" 
        @click="openTeam" />
</template>

<style scoped>
</style>
