<script setup>
import { onMounted, ref } from "vue";
import { details } from "@/services/matches.js";
import { useRoute } from "vue-router";
import { details as teamDetails } from '@/services/teams.js'

import Error from "@/components/Error.vue";

let loading = ref(true);
const matchId = useRoute().params.id;
const match = ref({})
const error = ref(null);
const name1 = ref("")
const name2 = ref("")

async function getDetails() {
  error.value = null;
  try {
    match.value = await details(matchId);
  } catch (err) {
    error.value = err;
  }
}



async function getNames() {
  error.value = null;
  try {
    const team1 = await teamDetails(match.value.team1Id);
    const team2 = await teamDetails(match.value.team2Id);
    name1.value = team1.name;
    name2.value = team2.name;
  } catch (err) {
    error.value = err;
  }
}


async function loadPage() {
  loading.value = true;
  await getDetails();
  await getNames();
  loading.value = false;
}

onMounted(async () => {
  await loadPage();
});

</script>
<template>
  <div class="team-content">
    <div class="element-card">
      <h2>Team Details</h2>
      <hr />
      <article v-if="!loading">
        <section class="element">
          <div class="match">
            <span class="name">{{ name1 }}</span>
            <div v-if="match.points1 != undefined" class="points">{{ match.points1 }} - {{ match.points2 }}
            </div>
            <div v-else>
              <p>VS</p>
            </div>
            <span class="name">{{ name2 }}</span>
          </div>
          <div class="info">
            <p><strong>Date:</strong> {{ match.date.split('T')[0] }}</p>
            <p><strong>Status:</strong> {{ match.status }}</p>
          </div>
        </section>
        
      </article>
      <div v-else>
        <p>Loading data...</p>
      </div>
    </div>

    <Error v-if="error" :error="error" />
  </div>
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
  font-size: 30px;
  text-align: center;
}

h4 {
  font-size: 20px;
}

p {
  color: #1e3c2f;
  margin: 0;
}

article {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.element-card {
  background-color: rgb(230, 243, 230);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.319);
  max-width: 700px;
  margin: 24px auto;

  display: flex;
  flex-direction: column;
  gap: 24px;
}

hr {
  border: 2px solid #1e3c2f;
  margin: 0;
}

.element {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.info {
  max-width: 300px;
  padding: 8px;
}

.match {
   background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    color: #1e3c2f;
    padding: 5px;

}


.match span {
    flex: 1;
    text-align: center;
}

.points {
    flex-shrink: 0;
    width: 60px;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    color: white;
    background-color: #2e7d32;
}

.details {
    font-size: 14px;
    color: #1e3c2f;

    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
</style>
