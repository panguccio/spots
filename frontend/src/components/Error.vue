<template>
  <p v-if="message" class="error">{{ message }}</p>
</template>

<script setup>
defineProps({
  message: String
})
</script>

<style scoped>
.error {
  color: #ff5757;
  margin-top: 12px;
}
</style>
