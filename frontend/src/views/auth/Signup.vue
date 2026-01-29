<script setup>
import { ref } from 'vue'
import { signup } from '@/services/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const surname = ref('')
const username = ref('')
const password = ref('')
const error = ref('')

async function handleSignup() {
  error.value = ''
  try {
    const token = await signup(name.value, surname.value, username.value, password.value)
    localStorage.setItem('token', token)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="login-form">
      <h2>Signup</h2>
    <input v-model="name" placeholder="Name" />
    <input v-model="surname" placeholder="Surname" />
    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="handleSignup">Signup</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
