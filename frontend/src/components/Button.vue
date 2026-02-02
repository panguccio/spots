<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // primary | danger | dark
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['pressed'])
</script>

<template>
  <button
    class="btn"
    :class="variant"
    :disabled="disabled"
    @click="$emit('pressed')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 10px 20px;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all .2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  max-width: fit-content;
  margin: auto;
}

/* PRIMARY */

.primary {
  background: white;
  color: #1e3c2f;
}

.primary:hover {
  background: #265d37;
    color: white;
}

/* DANGER (corallo) */

.danger {
  background: #dc3545;
  color: white;
}

.danger:hover {
  background: #e84545;
}


.dark {
  background: #1e3c2f;
  color: white;
}

.dark:hover {
  background: #2d674e;
}

.btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>
