<script setup>
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <section class="hero">

    <div class="hero-content">
      <h1 class="title">SPOTS</h1>
      <p class="subtitle">You pick a sport, we book a spot.</p>

      <SearchBar />

    </div>
  </section>
</template>

<style scoped>

.hero {
  height: 70vh;
  width: 100%;
  background: linear-gradient(135deg, #1e3c2f, #265d37);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 0 24px;
}

.title {
  font-size: 64px;
  color: white;
  margin-bottom: 12px;
}

.subtitle {
  color: #dcdcdc;
  margin-bottom: 48px;
  font-size: 18px;
}


</style>
