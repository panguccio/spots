<script setup>
import { ref, onMounted } from 'vue'
import { edit, cancel, schedule } from '@/services/tournaments.js'
import Multiselect from 'vue-multiselect'
import { list as listTeams } from '@/services/teams.js'
import Error from '@/components/Error.vue'
import Button from '@/components/Button.vue'

let loading = ref(true)
const error = ref(null)
const teamsNotInTournament = ref([])
const teamsInTournament = ref([])
const allTeams = ref([])
const emit = defineEmits(['saved'])


const props = defineProps({
  tournament: { type: Object, default: {} }
  // check teams in tournaments c'è forse in tournament
});

async function teams() {
  error.value = null
  try {
    allTeams.value = await listTeams()
  } catch (err) {
    error.value = err;
  }
}

const form = ref({
  name: '',
  sport: '',
  maxTeams: 0,
  date: '',
  addTeams: [],
  remTeams: []
})

async function initForm() {
  if (!props.tournament || !Object.keys(props.tournament).length) return

  form.value = {
    name: props.tournament.name,
    sport: props.tournament.sport,
    maxTeams: props.tournament.maxTeams,
    date: props.tournament.date.split('T')[0],
    addTeams: [],
    remTeams: []
  }

  teamsInTournament.value = allTeams.value.filter(t => props.tournament.teamsIds.includes(t._id))
  teamsNotInTournament.value = allTeams.value.filter(t => !props.tournament.teamsIds.includes(t._id))
}


function submit() {
  if (!props.tournament || !props.tournament._id) {
    console.error("Tournament not defined yet")
    return
  }

  edit(
    props.tournament._id,
    form.value.name,
    form.value.sport,
    form.value.maxTeams,
    form.value.date,
    form.value.addTeams.map(t => t._id),
    form.value.remTeams.map(t => t._id)

  ).then(() => {
    emit('saved')
  }).catch(err => {
    console.error(err)
  })
}

async function loadPage() {
  loading.value = true;
  await teams();
  await initForm();
  loading.value = false;
}

onMounted(async () => { await loadPage() })

</script>

<template>

  <section class="edit-card">
    <Error v-if="error" :error="error" />
    <h3>Edit tournament</h3>
    <form @submit.prevent="submit">
      <label>Name: <input id="tournament-name" type="text" v-model="form.name"></label>
      <label>Sport: <select id="tournament-sport" v-model="form.sport">
          <option value="volleyball">Volleyball</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
        </select></label>
      <label>Date: <input id="tournament-date" type="date" v-model="form.date"></label>

      <label>Max teams: <input id="tournament-teams-number" type="number" v-model="form.maxTeams" min="2"> </label>
      <label>Add teams:
        <Multiselect class="multiselect" id="tournament-add-teams" v-model="form.addTeams" :options="teamsNotInTournament" label="name" track-by="_id"
          placeholder="Select teams" :multiple="true" :searchable="true" />
      </label>
      <label>Remove teams:
        <Multiselect class="multiselect" id="tournament-rem-teams" v-model="form.remTeams" :options="teamsInTournament" label="name" track-by="_id"
          placeholder="Select teams" :multiple="true" :searchable="true" />
      </label>
      <div class="buttons">
      <Button variant="danger" @pressed="cancel(tournament._id)"><font-awesome-icon class="icon" icon="trash"/></Button>
      <Button variant="danger" @pressed="schedule(tournament._id)">New schedule</Button>
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
