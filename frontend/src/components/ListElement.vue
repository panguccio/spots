<script setup>
defineProps({
  item: Object,
  title: String,
  info: String,
  icon: String
})
import { getIcon } from '@/assets/icons.js';
</script>

<template>
  <div class="list-element">
    <div class="box">
      <font-awesome-icon class="icon" :icon="getIcon(icon)"/>
    </div>
    <div class="info">
      <h3>{{ item[title] }}</h3>
      <p>{{ item[info] }}</p>
    </div>
  </div>
</template>

<style scoped>

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

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

.icon {
  width: 30px;
  height: 30px;
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