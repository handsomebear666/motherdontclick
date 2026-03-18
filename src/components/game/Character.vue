<template>
  <div class="character-layer">
    <!-- 背景层：一张固定的背景图片 -->
    <div class="background" :style="{ backgroundImage: `url(${backgroundImg})` }"></div>
    <!-- 立绘层：根据剧情变化的表情图片 -->
    <img class="character" :src="currentEmotionImg" alt="角色立绘" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "@/store/useGameStore";
import { GAME_STORY, ASSETS } from "@/data/story";

const store = useGameStore();

// 计算当前立绘图片：根据剧本当前行的 emotion 从 ASSETS.AVATARS 中获取对应的图片路径
const currentEmotionImg = computed(() => {
  const line = GAME_STORY.scriptLines.find((l) => l.id === store.currentLineId);
  return line?.emotion ? ASSETS.AVATARS[`mom_${line.emotion}`] : "";
});

// 背景图片：固定使用一张背景图（请将下面的文件名换成你实际的背景图片名）
const backgroundImg = '/assets/img/background.jpg'; // 假设背景图叫 background.jpg
</script>

<style scoped>
/* 整个容器：相对定位，让里面的元素可以绝对定位叠放 */
.character-layer {
  position: relative;
  width: 100%;
  height: 100vh; /* 占满整个视口高度，你可以根据需要调整 */
  overflow: hidden;
}

/* 背景层：铺满容器，背景图居中覆盖 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1; /* 放在底层 */
}

/* 立绘层：绝对定位，通常放在底部中间 */
.character {
  position: absolute;
  bottom: 0;          /* 贴底显示，像大多数立绘那样 */
  left: 50%;
  transform: translateX(-50%);
  height: 80%;        /* 控制立绘高度，避免占满整个屏幕，你可自行调整 */
  z-index: 2;         /* 放在背景上方 */
  /* 如果你想要立绘有淡入淡出效果，可以加 transition */
  transition: opacity 0.3s ease;
}
</style>