<template>
  <div v-if="error" class="error">
  <aside>Error {{ error.status }}</aside>
    <p>{{ error.message }}</p>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script>

<style scoped>
.error {
  color: white;
  margin-top: 12px;
  background-color: #e94646b6;
  padding: 10px;
  border-radius: 4px;
}
aside {
  font-family: monospace;
}
</style>
