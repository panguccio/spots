<script setup>
import { ref } from 'vue'
import { signup } from '@/services/auth.js'
import { useRouter } from 'vue-router'
import ErrorMessage from '@/components/Error.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import FormCard from '@/components/FormCard.vue'

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
    error.value = err.message
  }
}
</script>

<template>
  <div class="auth-page">
    <FormCard title="Signup">
    <form class="input" @submit.prevent="handleSignup">
        <Input label="Name" v-model="name" />
        <Input label="Surname" v-model="surname" />
        <Input label="Username" v-model="username" />
        <Input label="Password" type="password" v-model="password" />
        <Button>Signup</Button>
      </form>
      <ErrorMessage :error="error" />
    </FormCard>
  </div>
</template>

<style scoped>
</style>
