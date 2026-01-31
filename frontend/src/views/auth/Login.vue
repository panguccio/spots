<script setup>
import { ref } from "vue";
import { login } from "@/services/auth.js";
import router from '@/router'
import Error from "@/components/Error.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import FormCard from "@/components/FormCard.vue";
import { useAuthStore } from "@/store/auth.js";
const { setAuth } = useAuthStore();

const username = ref("");
const password = ref("");
const error = ref(null);

async function handleLogin() {
  error.value = null;
  try {
    const res = await login(username.value, password.value);
    setAuth(username.value, res.token);
    router.push({ name: "profile" });
  } catch (err) {
    error.value = err;
  }
}
</script>
<template>
  <div class="auth-page">
    <FormCard title="Login">
      <form class="input" @submit.prevent="handleLogin">
        <Input label="Username" v-model="username" />
        <Input label="Password" type="password" v-model="password" />
        <Button>Login</Button>
      </form>
      <Error v-if="error" :error="error" />
    </FormCard>
  </div>
</template>

<style scoped></style>
