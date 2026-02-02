<script setup>
import { ref, onMounted, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import List from '@/components/List.vue'
import Button from '@/components/Button.vue'

const elementlist = ref([])
const searchTerm = ref('')
const error = ref(null)

const props = defineProps({
    title: { type: String, default: 'List' },
    list: { type: Function, required: true },
    search: String,
    name: Function,
    info: Function,
    icon: Function,
})

const emit = defineEmits(['open', 'pressed'])

async function fetch(term = '') {
  error.value = null
  try {
    elementlist.value = await props.list(term)
  } catch (err) {
    error.value = err;
  }
}

onMounted(() => fetch())

watch(searchTerm, (newTerm) => {
  fetch(newTerm)
})

</script>

<template>
  <div class="list-page">
    <h2>{{ title }}</h2>
    <div class="search-container">
      <div class="top"> <Button class="create-button" @pressed="$emit('pressed')"><font-awesome-icon class="icon" icon="plus"/></Button> <SearchBar class="searchbar" v-model="searchTerm" :placeholder="search" /> </div>
      <div class="list"> <List :elementlist="elementlist" :title :name :info :icon @open="$emit('open', $event)" /> </div>
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin-bottom: 20px;
  color: white;
  font-size: 35px;
}

.top {
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
  margin: auto;
}

.searcbar {
  flex: 1;
}

.list-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: white;
  
}

.list {
  width: 400px;
  margin: auto;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 400px;
}

@media screen and (max-width: 400px) {
  .search-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: auto;
}
}

</style>
