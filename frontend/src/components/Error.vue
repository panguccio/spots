<template>
  <p v-if="error" class="error">{{ error.status }} - {{ error.message }}</p>
</template>

<script setup>
defineProps({
  error: Object
})
</script>

<style scoped>
.error {
  color: #ff5757;
  margin-top: 12px;
}
</style>
