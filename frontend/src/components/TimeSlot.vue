<script setup>


const props = defineProps({
    freeSlots: {
        type: Array,
        required: true
    }
})
const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '1:30', '14:00', '2:30', '15:00', '3:30', '16:00', '4:30', '17:00', '5:30', '18:00', '6:30', '19:00', '7:30', '20:00', '8:30', '21:00', '9:30', '22:00']

function timeToIndex(isoTime) {
    const date = new Date(isoTime)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return (hour - 9) * 2 + (minutes === 0 ? 0 : 1)
}

function isBooked(index) {
    for (let slot of props.freeSlots) {
        const startIndex = timeToIndex(slot.start)
        const endIndex = timeToIndex(slot.end)
        if (index >= startIndex && index < endIndex) {
            return false
        }
    }
    return true
}

</script>

<template>
    <div class="time-slots">
        <div class="time-bar">
            <div v-for="(hour, index) in hours" :key="hour" class="time-slot-item">
                <div class="time-label">{{ hour }}</div>
                <div class="slot-visual">
                    <span class="booking before" :class="{ booked: isBooked(index - 1) }"></span>
                    <span class="separator"></span>
                    <span class="booking after" :class="{ booked: isBooked(index) }"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.time-slots {
    background-color: #f8f9fa7d;
    border-radius: 8px;
    overflow-x: auto;
}

.time-bar {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.38);
    border-radius: 6px;
    padding: 1rem 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: min-content;
}

.time-slot-item {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.time-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #1e3c2f;
    text-align: center;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
}



.time-slot-item:nth-of-type(2n) .time-label {
    visibility: hidden;
}

.slot-visual {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    gap: 0;
    margin: 0;
    padding: 0;
}

.time-slot-item:nth-of-type(2n + 1) .separator {
    height: 40px;
}

.separator {
    width: 2px;
    height: 30px;
    background-color: #1e3c2f;
    flex-shrink: 0;
    border-radius: 1px;
}

.booking {
    flex: 1 1 0;
    height: 24px;
    min-width: 0;
}

.booking.booked {
    background-color: #dc3545;
}

.booking:not(.booked) {
    background-color: #28a745;
}

.time-slot-item:last-of-type .booking.after {
    visibility: hidden;
}

.time-slot-item:first-of-type .booking.before {
    visibility: hidden;
}

/* Responsive */
@media (max-width: 768px) {
    .time-bar {
        padding: 0.5rem 0.25rem;
    }

    .time-slot-item {
        min-width: 35px;
    }

    .time-label {
        font-size: 0.65rem;
    }

    .separator {
        font-size: 1.5rem;
    }
}
</style>