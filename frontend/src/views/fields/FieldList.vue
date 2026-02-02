<script setup>
import { list } from '@/services/fields.js'
import ListPage from '@/components/ListPage.vue'
import router from '@/router'

let openField = function(field) {
    router.push(`/fields/${field._id}`)
}

</script>

<template>
  <ListPage :list="list" 
        title="Fields" 
        :name="element => element.name" 
        search="Search fields" 
        :info="element => element.address" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"  
        @open="openField"/>

</template>

<style scoped>
:deep(.create-button) {
    display:none;
}
</style>
