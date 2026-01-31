<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // primary | danger | outline
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button
    class="btn"
    :class="variant"
    :disabled="disabled"
  >
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
  background: #ff5757;
  color: white;
}

.danger:hover {
  background: #e84545;
}

/* OUTLINE */


/* DISABLED */

.btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>
