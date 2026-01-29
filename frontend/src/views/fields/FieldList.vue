<script setup>
import { ref, onMounted } from 'vue'
import { list } from '@/services/fields.js'
import SearchBar from '@/components/SearchBar.vue'
import ListElement from '@/components/ListElement.vue'

const fields = ref([])
const searchTerm = ref('')
const loading = ref(false)
const error = ref(null)

async function fetchFields(term = '') {
  loading.value = true
  error.value = null
  try {
    fields.value = await list(term)
  } catch (err) {
    error.value = err.message || 'Failed to load fields'
  } finally {
    loading.value = false
  }
}

// Carica i campi all'inizio
onMounted(() => fetchFields())

// Funzione per gestire la ricerca
function handleSearch(term) {
  fetchFields(term)
}
</script>

<template>
  <div class="fields-page">
    <h1>Fields</h1>
    <SearchBar v-model="searchTerm" @search="handleSearch" placeholder="Search fields..." />

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else class="fields-list">
      <ListElement
        v-for="field in fields"
        :key="field.id"
        :item="field"
        title="name"
        info="address"
        icon="sport"
      />
    </ul>
  </div>
</template>

<style scoped>
.fields-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: white;
}

.fields-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-item {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px 16px;
  gap: 16px;
  transition: background 0.2s;
  cursor: pointer;
}

.field-item:hover {
  background: rgba(255,255,255,0.1);
}

.sport-icon {
  width: 48px;
  height: 48px;
}

.field-info h3 {
  margin: 0;
  font-size: 18px;
}

.field-info p {
  margin: 4px 0 0;
  font-size: 14px;
  opacity: 0.8;
}
</style>
