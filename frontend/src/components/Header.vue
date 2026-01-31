<script setup>
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/auth.js'
const { user } = useAuthStore()

const open = ref(false);
const searching = ref(false);

onMounted(() => {
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') searching.value = false
  })
})

</script>

<template>
  <div class="header">
    <nav v-if="!searching">

      <div class="hamburger" @click="open = !open">
        <span class="material-symbols-outlined">menu</span>
      </div>

      <div class="logo">
        <RouterLink to="/">Spots</RouterLink>
      </div>

      <div class="menu">
        <RouterLink to="/fields">Fields</RouterLink>
        <RouterLink to="/tournaments">Tournaments</RouterLink>
        <RouterLink to="/teams">Teams</RouterLink>
      </div>

      <div class="left">
        <div v-if="!user" class="auth">
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/signup">Signup</RouterLink>
        </div>
        <div v-else class="auth">
        <RouterLink to="/whoami">{{ user }}</RouterLink>
        </div>


        <div class="search" @click="searching = true">
          <span class="material-symbols-outlined search-icon">search</span>
        </div>

      </div>

      <div v-if="open" class="mobile-menu">

        <RouterLink to="/fields">Campi</RouterLink>
        <RouterLink to="/tournaments">Tournaments</RouterLink>
        <RouterLink to="/teams">Squadre</RouterLink>

        <hr />

        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Signup</RouterLink>

      </div>
    </nav>
    <div v-else class="search-overlay" @click.self="searching = false">
        <div class="search-wrapper">
          <SearchBar placeholder="Search anything"/>
        </div>
  </div>
  </div>
  
</template>



<style scoped>
.header {
  width: 100%;
  background-color: #1e3c2f;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  display: "flex";
  justify-content: center;
  z-index: 1000;
}

nav {
  position: relative;
  width: 100%;
  padding: 16px 32px;
  display: flex;
  align-items: center;
}

.menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 32px;
}

.auth {
  display: flex;
  gap: 16px;
}

.left {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: max-content
}



.logo a {
  font-weight: 700;
  font-size: 22px;
}

.search-icon {
  color: white;
  font-size: 20px;
  opacity: .8;
}

.hamburger {
  display: none;
  color: white;
  cursor: pointer;
}

.mobile-menu {
  border-top: white 1px solid;
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background: #1e3c2f;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.mobile-menu hr {
  border: none;
  height: 1px;
  background: white;
}

.search-wrapper {
  width: 100%;
  max-width: 700px;
  height: 64px;
  display: flex;
  align-items: center;
  width: 100%;
}


.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.25);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 9999;
}

@media (max-width: 800px) {

  .menu,
  .auth {
    display: none;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 32px;
  }


  .hamburger {
    display: block;
  }

  .logo {
    flex: unset;
    margin: 0 auto;
  }

}
</style>
