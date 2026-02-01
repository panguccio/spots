<script setup>
import { edit } from '@/services/matches'
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import Error from '@/components/Error.vue'
const emit = defineEmits(['saved'])
const error = ref(null)

const props = defineProps({
  match: { type: Object, default: {} },
  team1: String,
  team2: String
});

const form = ref({
  points1: 0,
  points2: 0
})

function submit() {
  if (!props.match || !props.match._id) {
    return
  }
  edit(
    props.match._id,
    form.value.points1,
    form.value.points2
  ).then(() => {
    emit('saved')
  }).catch(err => {
    console.error(err)
  })
}


</script>

<template>

  <section class="edit-card">
    <Error v-if="error" :error="error" />
    <h3>Enter results</h3>
    <form @submit.prevent="submit">
      <div class="points">
      <label>Points of {{ team1 }}: <input type="number" v-model="form.points1" min="0"> </label>
      <label>Points of {{ team2 }}: <input type="number" v-model="form.points2" min="0"> </label>
      </div>
      <div class="buttons">
      <Button @pressed="submit">Save</Button>
      </div>
    </form>
  </section>
  <hr />
</template>



<style scoped>
h2,
h3,
h4 {
  color: #1e3c2f;
  margin: 0;
}

h2 {
  font-size: 30px;
  text-align: left;
}

h3 {
  font-size: 28px;
  text-align: center;
  margin-bottom: 16px;
}

h4 {
  font-size: 20px;
  margin-bottom: 16px;
}

p {
  color: #1e3c2f;
  margin: 0;
}

.edit-card {
  backdrop-filter: blur(10px); 
  border-radius: 16px;
  max-width: 450px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

hr {
  border: 2px solid #1e3c2f;
  margin: 0;
  min-width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: 500;
  color: #1e3c2f;
  align-items: center;
}

input {
  width:100px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  height: 36px;
  line-height: 1;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.points {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.multiselect :deep(.multiselect__tags) {
  min-height: 36px;
  height: 36px;
  padding: 6px 36px 6px 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  background: white;
  display: flex;
  align-items: center;
}

.multiselect :deep(.multiselect__select) {
  height: 36px;
}

.multiselect :deep(.multiselect__input),
.multiselect :deep(.multiselect__single) {
  margin: 0;
  padding: 0;
  line-height: 24px;
  font-size: 16px;
}

.multiselect :deep(.multiselect__tag) {
  background: #2e7d32;
  margin: 2px 4px 2px 0;
}

.multiselect :deep(.multiselect__tag-icon:hover) {
  background: #aecaaf;
}

.multiselect :deep(.multiselect__content-wrapper) {
  border-radius: 8px;
}

</style>
