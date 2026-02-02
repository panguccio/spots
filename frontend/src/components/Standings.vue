<script setup>

defineProps({
  standingsStats: Array,
  teams: {}
})

</script>

<template>
  <div class="card">
    <div class="standings-table">
      <div class="table-header">
        <span class="col-team">Team</span>
        <span class="col-stat">Games</span>
        <span class="col-stat">Scored</span>
        <span class="col-stat">Conceded</span>
        <span class="col-stat">Difference</span>
        <span class="col-stat">Points</span>
      </div>
      <div v-for="(team, index) in standingsStats" :key="team" class="table-row">
        <RouterLink :to="`/teams/${team.id}`">
          <span class="col-team">
            <span class="position">{{ index + 1 }}</span>
            {{ teams[team.id].name }}
          </span>
        </RouterLink>
        <span class="col-stat">{{ team.played }}</span>
        <span class="col-stat">{{ team.scored }}</span>
        <span class="col-stat">{{ team.conceded }}</span>
        <span class="col-stat">{{ team.diff }}</span>
        <span class="col-stat points">{{ team.points }}</span>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card {
  background: white;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.standings-table {
  overflow-x: auto;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr repeat(5, 1fr);
  gap: 12px;
  padding: 12px;
  align-items: center;
}


.table-header {
  background: #1e3c2f;
  font-weight: 600;
  color: #f1f8e9;
  font-size: 14px;
}

.table-row {
  border-bottom: 1px solid #e0e0e0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f9fbe7;
}

.col-team {
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
}

.col-stat {
  text-align: center;
}

.position {
  background: #2e7d32;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.points {
  font-weight: 700;
  color: #1e3c2f;
}
</style>