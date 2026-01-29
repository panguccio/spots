<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      required
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  id: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-group {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}

label {
  color: white;
  text-align: right;
}

input {
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  outline: none;
}

/* Mobile */

@media (max-width: 600px) {
  .input-group {
    grid-template-columns: 1fr;
  }

  label {
    text-align: left;
  }
}
</style>
