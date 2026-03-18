<template>
  <div class="character-layer">
    <!-- 背景层：固定不变 -->
    <div class="background" :style="{ backgroundImage: `url(${backgroundImg})` }"></div>
    <!-- 立绘层：随剧情变化 -->
    <img class="character" :src="currentEmotionImg" alt="角色立绘" />
  </div>
</template>