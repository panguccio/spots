<script setup>
import { ref, onMounted } from 'vue'
import { watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import ListElement from '@/components/ListElement.vue'
import Error from '@/components/Error.vue'

const error = ref(null)

const props = defineProps({
    title: { type: String, default: 'List' },
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
        <ListElement v-for="element in elementlist" :key="element._id" :name="name(element)" :info="info(element)" :icon="icon(element)" 
          @open="$emit('open', element)"/>
        <p v-if="elementlist.length == 0"  >Nothing here yet</p>
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

</style>
