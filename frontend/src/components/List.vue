<script setup>
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ListElement from '@/components/ListElement.vue'
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
      <Error v-if="error" :error="error"/>
      <ul class="list">
        <ListElement v-for="element in elementlist" :key="element._id" :name="name(element)" :info="info(element)" :icon="icon(element)" 
          @click="$emit('click', element)"/>
      </ul>
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
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
