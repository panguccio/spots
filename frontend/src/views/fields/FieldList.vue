<script setup>
import { list } from '@/services/fields.js'
import List from '@/components/List.vue'

</script>

<template>
  <List :list="list" 
        title="Fields" 
        :name="element => element.name" 
        search="Search fields" 
        :info="element => element.address" 
        :icon="element => element.sport === 'football' ? 'futbol' : element.sport"  />

</template>

<style scoped>
</style>
