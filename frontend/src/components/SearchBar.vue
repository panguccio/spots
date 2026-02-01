<script setup>

defineProps({
  placeholder: {
    type: String,
    default: "Search"
  }
})

const model = defineModel()
</script>

<template>
    <form class="search-form">
        <div class="search">
          <span class="material-symbols-outlined search-icon">search</span>
          <input
            class="search-input"
            type="text"
            :placeholder="placeholder"
            v-model="model"
          />
        </div>
      </form>
</template>

<style scoped>

.search-form {
  width: 100%;
}

.search {
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  padding: 18px 24px;
  border-radius: 40px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
}

.search-icon {
  width: 20px;
  opacity: 0.8;
  color: #1e3c2f;
  font-size: 24px;
}

.search-input {
  flex: 1;
  font-size: 18px;
  margin-left: 14px;
  border: none;
  outline: none;
  width: 100%;
}

.search-input::placeholder {
  color: #aaa;
}

</style>
