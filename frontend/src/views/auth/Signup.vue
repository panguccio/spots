<script setup>
import { ref } from "vue";
import { signup } from "@/services/auth.js";
import router from '@/router'
import Error from "@/components/Error.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import FormCard from "@/components/FormCard.vue";
import { useAuthStore } from "@/store/auth.js";
const { setAuth } = useAuthStore();

const name = ref("");
const surname = ref("");
const username = ref("");
const password = ref("");
const error = ref("");

async function handleSignup() {
  error.value = "";
  try {
    const res = await signup(name.value, surname.value, username.value, password.value);
    setAuth(username.value, res.token);
    router.push({ name: "profile" });
  } catch (err) {
    error.value = err;
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
      <Error v-if="error" :error="error" />
    </FormCard>
  </div>
</template>

<style scoped></style>
