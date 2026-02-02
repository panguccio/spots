<script setup>
import { computed } from 'vue'

const props = defineProps({
    schedule: {
        type: Array,
        required: true
    },
    teams: {
        type: Object,
        required: true
    }
})

const matchesByRound = computed(() => {
    const grouped = {}
    props.schedule.forEach(match => {
        const round = match.round || 1
        if (!grouped[round]) {
            grouped[round] = []
        }
        grouped[round].push(match)
    })
    return grouped
})
</script>

<template>
    <div class="card">
        <div v-for="(matches, round) in matchesByRound" :key="round" class="round-group">
            <div v-for="match in matches" :key="match._id" class="match">
                <RouterLink :to="`/matches/${match._id}`">
                    <div class="teams">
                        <span class="name">{{ teams[match.team1Id].name }}</span>
                        <div v-if="match.points1 != undefined" class="points">{{ match.points1 }} - {{ match.points2 }}</div>
                        <div v-else>
                            <p class="points">VS</p>
                        </div>
                        <span class="name">{{ teams[match.team2Id].name }}</span>
                    </div>
                </RouterLink>
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
    width: 100%;
}

.round-group {
    border-bottom: 4px solid #2e7d32;
}

.round-group:last-child {
    border-bottom: none;

}

.match {
    display: flex;
    flex-direction: column;
    padding: 6px;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
}

.match:hover {
    background: #f9fbe7;
}

.round-group .match:last-child {
    border-bottom: none;
}

.teams {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    color: #1e3c2f;
}

.teams span {
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
</style>