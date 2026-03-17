<template>
  <div
    class="phone-btn"
    :class="{ 'pulse-highlight': isHighlighted }"
    @click="store.togglePhone()"
  >
    <img src="/assets/img/phone_icon.svg" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useGameStore } from "@/store/useGameStore";
const store = useGameStore();

// 当关卡刚推进时触发高亮呼吸灯
const isHighlighted = computed(() => {
  return [2, 3, 4].includes(store.gameLevel);
});
</script>
