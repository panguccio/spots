<script setup>
import { ref } from 'vue'
import { list } from '@/services/users.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

const error = ref(null);

const openUser = function (user) {
    router.push(`/users/${user._id}`)
}

</script>

<template>
    <ListPage :list="list" title="Users" search="Search users" :name="element => element.name + ' ' + element.surname"
        :info="element => '@' + element.username"
        :icon="() => 'user'"
        @open="openUser" />
</template>

<style scoped>
</style>
