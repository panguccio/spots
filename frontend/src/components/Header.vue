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
        <RouterLink :to="{name: 'home'}">Spots</RouterLink>
      </div>

      <div class="menu">
        <RouterLink :to="{name: 'fields'}">Fields</RouterLink>
        <RouterLink :to="{name: 'tournaments'}">Tournaments</RouterLink>
        <RouterLink :to="{name: 'teams'}">Teams</RouterLink>
        <RouterLink :to="{name: 'players'}">Players</RouterLink>
        <RouterLink :to="{name: 'users'}">Users</RouterLink>
      </div>

      <div class="left">
        <div v-if="!user" class="auth">
          <RouterLink :to="{name: 'login'}">Login</RouterLink>
          <RouterLink :to="{name: 'signup'}">Signup</RouterLink>
        </div>
        <div v-else class="auth">
        <RouterLink :to="{name: 'profile'}">{{ user }} <font-awesome-icon class="icon" icon="user"/></RouterLink>
        
        </div>

      </div>
      <div v-if="open" class="menu-overlay"  @click.self="open = false">
      <div v-if="open" class="mobile-menu"  @click.self="open = false">

        <RouterLink :to="{name: 'fields'}">Fields</RouterLink>
        <RouterLink :to="{name: 'tournaments'}">Tournaments</RouterLink>
        <RouterLink :to="{name: 'teams'}">Teams</RouterLink>
        <RouterLink :to="{name: 'players'}">Players</RouterLink>
        <RouterLink :to="{name: 'users'}">Users</RouterLink>

        <hr />

        <div v-if="!user" class="mobile-auth">
          <RouterLink :to="{name: 'login'}">Login</RouterLink>
          <RouterLink :to="{name: 'signup'}">Signup</RouterLink>
        </div>
        <div v-else>
        <RouterLink :to="{name: 'profile'}">Profile</RouterLink>
        </div>

      </div>
      </div>
    </nav>
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
  width: max-content;
  align-items: center;
}



.logo a {
  font-weight: 700;
  font-size: 22px;
}


.hamburger {
  display: none;
  color: white;
  cursor: pointer;
}

.menu-overlay {
  position: fixed;
  inset: 0;               /* copre tutto lo schermo */
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-start; /* il menu può stare a sinistra */
  z-index: 9999;          /* sopra tutto */
}

.mobile-menu {
  background: #1e3c2f;
  width: 250px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}


.mobile-menu hr {
  border: none;
  height: 1px;
  background: white;
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  color: #c2993e;
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
