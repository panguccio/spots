<script setup>

import { ref, onMounted } from 'vue'
import { edit, cancel, listPlayers, createPlayer } from '@/services/teams'
import Multiselect from 'vue-multiselect'
import Error from '@/components/Error.vue'
import Button from '@/components/Button.vue'

let loading = ref(true)
const error = ref(null)

const props = defineProps({
  team: { type: Object, default: {} },
  teamPlayers: Array
});

const notTeamPlayers = ref([])
const emit = defineEmits(['saved'])
const allPlayers = ref([])


async function players() {
  error.value = null
  try {
    allPlayers.value = await listPlayers()
  } catch (err) {
    error.value = err;
  }
}

const form = ref({
  name: props.team.name,
  addPlayers: [],
  remPlayers: [],
  playerName: "",
  playerSurname: "",
  jerseyNumber: "",
})

async function submit() {
  if (!props.team?._id) return

  try {
    if (form.value.playerName && form.value.playerSurname && form.value.jerseyNumber) {
      const result = await createPlayer(form.value.playerName, form.value.playerSurname, form.value.jerseyNumber)
      form.value.addPlayers.push({_id: result.insertedId});
    }
    await edit(props.team._id, form.value.name, form.value.addPlayers.map(p => p._id), form.value.remPlayers.map(p => p._id))
    emit('saved')
  } catch (err) {
    error.value = err;
  }
}

async function loadPage() {
  loading.value = true;
  await players();
  notTeamPlayers.value = allPlayers.value.filter(p => !props.team.playersIds.includes(p._id))
  loading.value = false;
}

onMounted(async () => { await loadPage() })

</script>

<template>

  <section class="edit-card">
    <Error v-if="error" :error="error" />
    <h3>Edit team</h3>
    <form @submit.prevent="submit">
      <label>Team name: <input id="team-name" type="text" v-model="form.name"></label>
      <label>Add existing players:
        <Multiselect class="multiselect" id="team-add-players" v-model="form.addPlayers" :options="notTeamPlayers"
          label="surname" track-by="_id" placeholder="Select players" :multiple="true" :searchable="true" />
      </label>
      <label>Remove existing players:
        <Multiselect class="multiselect" id="team-rem-players" v-model="form.remPlayers" :options="teamPlayers"
          label="surname" track-by="_id" placeholder="Select players" :multiple="true" :searchable="true" />
      </label>
      <label>Add new player:
        <div class="player">
          <input id="player-name" type="text" v-model="form.playerName" placeholder="Name">
          <input id="player-surname" type="text" v-model="form.playerSurname" placeholder="Surname">
          <input id="player-number" type="number" v-model="form.jerseyNumber" placeholder="Jersey Number">
        </div>
      </label>
      <div class="buttons">
        <Button variant="danger" @pressed="cancel(props.team._id)"><font-awesome-icon class="icon"
            icon="trash" /></Button>
        <Button>Save</Button>
      </div>
    </form>
  </section>
  <hr />

</template>

<script setup>

</script>

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
  margin-bottom: 32px;
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
}

.player {
  display: flex;
  gap: 8px;
}

.player input {
  flex: 1;
  min-width: 0;
}


input,
select {
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  height: 36px;
  line-height: 1;
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

.multiselect :deep(.multiselect__tags) {
  border-radius: 8px;
  border: none;
  font-size: 16px;
  background: white;
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
  background: #2d8632b9;
  margin: 2px 4px 2px 0;
}

.multiselect :deep(.multiselect__tag-icon:hover) {
  background: #aecaaf;
}
</style>
