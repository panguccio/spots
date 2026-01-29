<script setup>
defineProps({
  item: Object,
  title: String,
  info: String,
  icon: String
})
</script>

<template>
  <div class="list-element">
    <img :src="`/assets/icons/${icon}.png`" alt="" class="element-icon" />
    <div class="info">
      <h3>{{ item[title] }}</h3>
      <p>{{ item[info] }}</p>
    </div>
  </div>
</template>

<style scoped>

.list-element {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px 16px;
  gap: 16px;
  transition: background 0.2s;
  cursor: pointer;
}

.list-element:hover {
  background: rgba(255,255,255,0.1);
}

.sport-icon {
  width: 48px;
  height: 48px;
}

.info h3 {
  margin: 0;
  font-size: 18px;
}

.info p {
  margin: 4px 0 0;
  font-size: 14px;
  opacity: 0.8;
}

</style>