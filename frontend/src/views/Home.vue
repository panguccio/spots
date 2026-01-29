<script setup>
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
  <div class="home">
    <section class="hero">

      <div class="hero-content">
        <h1>SPOTS</h1>
        <p class="subtitle">You pick a sport, we book a spot.</p>

        <SearchBar />

      </div>
    </section>
    <section class="features">
      <div class="features-content">
        <h2>Why choose Spots?</h2>
        <div class="features-grid">
          <article>
            <p>Find and book the perfect sports field for your next game or practice session.</p>
            <img src="@/assets/images/field.jpg" alt="Sports Field">
          </article>
          <article>
            <p>Discover local tournaments and join teams to compete and have fun.</p>
          <img src="@/assets/images/tournament.png" alt="Tournament">
          </article>
          <article>
            <p>Connect with players in your area and build your own sports community.</p>
            <img src="@/assets/images/players.jpg" alt="Players">
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.home {
  width: 100%;
  height: 100%;
}

.hero {
  height: 50vh;
  width: 100%;
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

.features {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.features-content {
  max-width: 1200px;
  width: 100%;
  padding: 48px 24px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 48px;
  margin-right: 48px;
  margin-left: 48px;
  justify-content: center;
  align-items: center;
}

article {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  background-color: white;
  max-width: 400px;
}

article p {
  color: #1e3c2f;
  margin-bottom: 16px;
}

article img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

@media screen and (max-width: 1030px) {
  .features-grid {
     grid-template-columns: 1fr;
     max-width: 400px; 
     margin: 0 auto;
     padding: 20px;
  }
}

</style>
