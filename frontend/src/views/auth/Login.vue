<script setup>
import { ref } from 'vue'
import { login } from '@/services/auth.js'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/Error.vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref(null)

async function handleLogin() {
  error.value = null
  try {
    const token = await login(username.value, password.value)
    localStorage.setItem('token', token)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err;
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <ErrorMessage :error="error" />
    </div>
  </div>
</template>

<style scoped>
</style>
