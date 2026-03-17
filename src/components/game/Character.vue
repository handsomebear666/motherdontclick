<template>
  <div class="character-layer">
    <img :src="currentEmotionImg" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "@/store/useGameStore";
import { GAME_STORY, ASSETS } from "@/data/story";

const store = useGameStore();
const currentEmotionImg = computed(() => {
  const line = GAME_STORY.scriptLines.find((l) => l.id === store.currentLineId);
  return line?.emotion ? ASSETS.AVATARS[`mom_${line.emotion}`] : "";
});
</script>
