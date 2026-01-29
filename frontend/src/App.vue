<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
    <Header/>
    <router-view class="content" />
    <Footer/>
</template>

<style scoped>

.content {
  min-height: 93vh;
}



</style>
