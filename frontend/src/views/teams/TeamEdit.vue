<script setup>

import { ref, onMounted } from 'vue'
import { edit, cancel, listPlayers } from '@/services/teams'
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
  name: "",
  addPlayers: [],
  remPlayers: []
})

function submit() {
  if (!props.team || !props.team._id) {
    console.error("Tournament not defined yet")
    return
  }

  edit(
    props.team._id,
    form.value.name,
    form.value.addPlayers.map(p => p._id),
    form.value.remPlayers.map(p => p._id)
  ).then(() => {
    emit('saved')
  }).catch(err => {
    console.error(err)
  })
}

async function loadPage() {
  loading.value = true;
  await players();
  loading.value = false;
}

onMounted(async () => { await loadPage() })

</script>

<template>

  <section class="edit-card">
    <Error v-if="error" :error="error" />
    <h3>Edit team</h3>
    <form @submit.prevent="submit">
      <label>Name: <input id="team-name" type="text" v-model="form.name"></label>
      <label>Add teams:
        <Multiselect class="multiselect" id="team-add-players" v-model="form.addPlayers"
          :options="notTeamPlayers" label="surname" track-by="_id" placeholder="Select players" :multiple="true"
          :searchable="true" />
      </label>
      <label>Remove teams:
        <Multiselect class="multiselect" id="team-rem-players" v-model="form.remPlayers" :options="teamPlayers"
          label="surname" track-by="_id" placeholder="Select players" :multiple="true" :searchable="true" />
      </label>
      <div class="buttons">
        <Button variant="danger" @pressed="cancel(tournament._id)"><font-awesome-icon class="icon"
            icon="trash" /></Button>
        <Button variant="outline" @pressed="schedule(tournament._id)">New schedule*</Button>
        <Button @pressed="submit">Save</Button>
      </div>
    </form>
  </section>
  <hr />

</template>

<script setup>

</script>

<style scoped></style>
