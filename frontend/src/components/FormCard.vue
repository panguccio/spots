<template>
  <div class="form-card">
    <h2 v-if="title">{{ title }}</h2>
    <hr />
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>

form.input {
  background: #265d37;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  
}
.form-card {
  background-color: #265d37; /* leggermente risaltato */
  backdrop-filter: blur(10px); /* effetto sfocato se vuoi */
  padding: 32px;
  border-radius: 16px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0,0,0,.2);
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h2 {
    margin-bottom: 0;
    color: white;
    text-align: left;
    font-size: 30px;
}
</style>
