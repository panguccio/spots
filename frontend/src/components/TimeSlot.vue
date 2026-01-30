<script setup>


const props = defineProps({
    freeSlots: {
        type: Array,
        required: true
    }
})
const hours = ['9AM', '9:30AM', '10AM', '10:30AM', '11AM', '11:30AM', '12PM', '12:30PM', '1PM', '1:30PM', '2PM', '2:30PM', '3PM', '3:30PM', '4PM', '4:30PM', '5PM', '5:30PM', '6PM', '6:30PM', '7PM', '7:30PM', '8PM', '8:30PM', '9PM', '9:30PM', '10PM']

function timeToIndex(isoTime) {
    const date = new Date(isoTime)
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return (hour - 9) * 2 + (minutes === 30 ? 1 : 0)
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
    margin-top: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow-x: auto;
}

.time-bar {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background: white;
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
    color: black;
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

.separator {
    width: 2px;
    height: 30px;
    background-color: black;
    flex-shrink: 0;
    border-radius: 1px;
}

.booking {
    flex: 1 1 0;
    height: 24px;
    min-width: 0;
    /* Permette il shrink */
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