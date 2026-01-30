<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
    <Header/>
    <div class="content"><router-view /></div>
    <Footer/>
</template>

<style scoped>

.content {
  flex: 1;
  width: 100%;
}

</style>
