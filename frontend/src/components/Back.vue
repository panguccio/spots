<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <Button variant="dark" @click="goBack">&larr;</Button>
</template>

<style scoped>
Button {
  margin: 0;
}
</style>
