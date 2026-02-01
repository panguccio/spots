<script setup>
import { ref } from 'vue'
import { listPlayers as list } from '@/services/teams.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

const error = ref(null);

</script>

<template>
    <ListPage :list="list" title="Players" search="Search players" :name="element => element.name + ' ' + element.surname"
        :info="element => element.jerseyNumber"
        :icon="() => 'user'"
        @pressed="newTournament" />
</template>

<style scoped></style>
