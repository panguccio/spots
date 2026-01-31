<script setup>
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ListElement from '@/components/ListElement.vue'
import List from '@/components/List.vue'
import Error from '@/components/Error.vue'

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

const emit = defineEmits(['click'])

async function fetch(term = '') {
  error.value = null
  try {
    elementlist.value = await props.list(term)
  } catch (err) {
    error.value = err;
  }
}

// Carica i campi all'inizio
onMounted(() => fetch())

watch(searchTerm, (newTerm) => {
  fetch(newTerm)
})

</script>

<template>
  <div class="list-page">
    <h2>{{ title }}</h2>
    <div class="search-container">
      <SearchBar v-model="searchTerm" :placeholder="search" />
      <div class="list"> <List :list :title :name :info :icon @click="$emit('click', $event)" /> </div>
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin-bottom: 20px;
  color: white;
  font-size: 35px;
}


.list-page {
  max-width: 900px;
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
