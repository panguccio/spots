<script setup>
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ListElement from '@/components/ListElement.vue'
import Error from '@/components/Error.vue'

const searchTerm = ref('')
const error = ref(null)

const props = defineProps({
    title: { type: String, default: 'List' },
    list: { type: Function, required: true },
    search: String,
    name: Function,
    info: Function,
    icon: Function,
    elementlist: { type: Array, default: [] }
})

const emit = defineEmits(['open'])


</script>

<template>
  <Error v-if="error" :error="error"/>
      <ul class="list">
        <ListElement v-if="elementlist.length != 0" v-for="element in elementlist" :key="element._id" :name="name(element)" :info="info(element)" :icon="icon(element)" 
          @open="$emit('open', element)"/>
        <p v-else >Nothing here yet.</p>
      </ul>

</template>

<style scoped>

h2 {
  margin-bottom: 20px;
  color: white;
  font-size: 35px;
}




.list {
    max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: white;
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
