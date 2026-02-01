<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import Button from '@/components/Button.vue'
import { useAuthStore } from '@/store/auth.js'
const { user } = useAuthStore()

const { width } = useWindowSize()

const placeholder = computed(() =>
  width.value < 466
    ? "Search"
    : "Search fields, tournaments, teams, players..."
)

const balls = ['futbol', 'volleyball', 'basketball'];

const currentBall = ref(
  balls[Math.floor(Math.random() * balls.length)]
)

let randomBall = function() {
  let next
  do {
    next = balls[Math.floor(Math.random() * balls.length)]
  } while (next === currentBall.value)

  currentBall.value = next
}


</script>

<template>
  <div class="home">
    <section class="hero">

      <div class="hero-content">

        <h1>SP<font-awesome-icon class="hero-icon" :icon="currentBall" @mouseenter="randomBall"/>TS</h1>
        <p class="subtitle">You pick a sport, we book a spot.</p>
        <RouterLink v-if="!user" :to="{name: 'signup'}"> <Button> Get started </Button> </RouterLink>
        <RouterLink v-else :to="{name: 'profile'}"> <Button> Welcome back! </Button> </RouterLink>

      </div>
    </section>
    <section class="features">
      <div class="features-content">
        <h2>Why choose Spots?</h2>
        <div class="features-grid">
          <RouterLink :to="{name: 'fields'}">
          <article>
            <h3>Find new fields</h3>
            <p>Find and book the perfect sports field for your next game or practice session.</p>
            <img src="@/assets/images/field.jpg" alt="Sports Field">
          </article>
          </RouterLink>
          <RouterLink :to="{name: 'tournaments'}">
          <article>
          <h3>Create tournaments</h3>
            <p>Discover local tournaments and join teams to compete and have fun.</p>
          <img src="@/assets/images/tournament.png" alt="Tournament">
          </article>
          </RouterLink>
          <RouterLink :to="{name: 'teams'}">
          <article>
          <h3>Play with people</h3>
            <p>Connect with players in your area and build your own sports community.</p>
            <img src="@/assets/images/players.jpg" alt="Players">
          </article>
          </RouterLink>
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

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, #000000e6);
}


.hero {
  position: relative;
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('@/assets/images/court.jpg');
  background-size: 115%;
  background-position: 60% center;
  background-repeat: no-repeat;

  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}



.hero-content {
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 0 24px;
}

.hero-icon {
  color: white;
  margin: 0;
  font-size: 80px;
  cursor: pointer;
  transition: transform .2s ease, opacity .2s ease;
  vertical-align: middle;
  transform: translateY(-9px);
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
  border-bottom: #c2993e 7px solid;
  background-color: white;
  max-width: 400px;
}

article:hover {
  background: #f9fbe7;
}

h3 {
  color: #1e3c2f;
  font-size: 24px;
  text-align: center;
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
