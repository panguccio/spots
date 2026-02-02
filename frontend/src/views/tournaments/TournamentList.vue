<script setup>
import { ref } from 'vue'
import { list, create } from '@/services/tournaments.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

const error = ref(null);

const openTournament = function (tournament) {
    router.push(`/tournaments/${tournament._id}`)
}

const newTournament = async function () {
    error.value = null;
    try {
        const result = await create()
        router.push(`/tournaments/${result.insertedId}`)
    } catch (err) {
        error.value = err;
    }
}

</script>

<template>
    <ListPage :list="list" title="Tournaments" search="Search tournaments" :name="element => element.name"
        :info="element => element.date.split('T')[0]"
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport" @open="openTournament"
        @pressed="newTournament" />
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
