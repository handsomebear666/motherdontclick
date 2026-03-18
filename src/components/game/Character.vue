<template>
  <div class="character-layer">
    <!-- 背景层：通过 props 传入 -->
    <div class="background" :style="{ backgroundImage: `url(${background})` }"></div>
    <!-- 立绘层：通过 props 传入 -->
    <img class="character" :src="character" alt="角色立绘" />
  </div>
</template>

<script setup>
defineProps({
  background: {
    type: String,
    required: true
  },
  character: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.character-layer {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}
.character {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 80%;
  z-index: 2;
  transition: opacity 0.3s ease;
}
</style>