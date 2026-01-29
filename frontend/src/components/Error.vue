<template>
  <div v-if="error" class="error">
    <p><strong>Error {{ error.status }}</strong></p>
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
</style>
