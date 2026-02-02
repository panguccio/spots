<script setup>
import { ref } from 'vue'
import { list, create } from '@/services/teams.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

const error = ref(null);

let openTeam = function(team) {
    router.push(`/teams/${team._id}`)
}

const createTeam = async function () {
    error.value = null;
    try {
        const result = await create()
        router.push(`/teams/${result.insertedId}`)
    } catch (err) {
        error.value = err;
    }
}

</script>

<template>
  <ListPage :list="list" 
        title="Teams" 
        search="Search teams" 
        :name="element => element.name" 
        :info="element => (element.playersIds ? element.playersIds.length : 0)  + ' players'" 
        :icon="() => 'users'" 
        @open="openTeam"
        @pressed="createTeam" />
</template>

<style scoped>
:deep(.create-button) {
  font-size: 20px;
  width: 60px;
  height: 45px;
  padding: auto;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
