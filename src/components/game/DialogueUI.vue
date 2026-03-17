<template>
  <div class="dialogue-system-wrapper">
    <div class="full-screen-clicker" @click="handleContainerClick"></div>

    <div class="ui-layer">
      <div class="options-container" :class="{ active: showOptions }">
        <button
          v-for="(opt, index) in currentLine?.options"
          :key="index"
          class="option-button"
          @click.stop="selectOption(opt)"
        >
          {{ opt.text }}
        </button>
      </div>

      <div
        class="dialogue-bubble"
        :class="{ 'thought-style': isThought }"
        @click="handleContainerClick"
      >
        <div v-if="!isThought" class="name-tag">{{ currentLine?.name }}</div>

        <div class="dialogue-text" ref="textEl" v-html="displayedText"></div>

        <div
          v-if="
            !isTyping && !showOptions && currentPageIdx === textPages.length - 1
          "
          class="next-indicator"
          :style="{
            display: 'block',
            color: isThought ? '#718096' : '#a8c989',
          }"
        >
          ▼
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { useGameStore } from "@/store/useGameStore";
import { GAME_STORY } from "@/data/story";

const store = useGameStore();
const textEl = ref(null);

const displayedText = ref("");
const isTyping = ref(false);
const textPages = ref([]);
const currentPageIdx = ref(0);
let typingTimer = null;

const currentLine = computed(() =>
  GAME_STORY.scriptLines.find((l) => l.id === store.currentLineId),
);
const isThought = computed(
  () => !currentLine.value?.name || currentLine.value.name === "系统",
);

// 控制选项显示时机
const showOptions = computed(() => {
  return (
    !isTyping.value &&
    currentPageIdx.value === textPages.value.length - 1 &&
    !!currentLine.value?.options
  );
});

// === 核心还原：动态文本高度测算与分页 ===
const splitTextDynamically = async (text) => {
  await nextTick();
  const el = textEl.value;
  if (!el) return [text];

  const originalHeight = el.style.height;
  el.style.height = "auto";

  el.innerHTML = "测<br>试";
  const maxHeight = el.offsetHeight + 2;
  el.innerHTML = "";

  const pages = [];
  let currentPage = "";

  for (let i = 0; i < text.length; i++) {
    el.innerHTML = currentPage + text[i];
    if (el.offsetHeight > maxHeight) {
      pages.push(currentPage);
      currentPage = text[i];
    } else {
      currentPage += text[i];
    }
  }
  if (currentPage !== "") pages.push(currentPage);

  el.style.height = originalHeight;
  el.innerHTML = "";

  return pages.length > 0 ? pages : [text];
};

// === 播放单页文本 ===
const playPage = () => {
  clearInterval(typingTimer);
  displayedText.value = "";
  isTyping.value = true;
  let i = 0;
  const currentText = textPages.value[currentPageIdx.value] || "";

  typingTimer = setInterval(() => {
    if (i < currentText.length) {
      displayedText.value += currentText.charAt(i);
      i++;
    } else {
      clearInterval(typingTimer);
      isTyping.value = false;
    }
  }, 30);
};

// === 启动新的一句话 ===
const startLine = async () => {
  if (!currentLine.value) return;
  clearInterval(typingTimer);
  displayedText.value = "";

  textPages.value = await splitTextDynamically(currentLine.value.text);
  currentPageIdx.value = 0;
  playPage();
};

watch(() => store.currentLineId, startLine, { immediate: true });

// === 全屏点击推进逻辑 ===
const handleContainerClick = () => {
  store.tryPlayBGM();

  if (isTyping.value) {
    clearInterval(typingTimer);
    displayedText.value = textPages.value[currentPageIdx.value];
    isTyping.value = false;
    return;
  }

  if (currentPageIdx.value < textPages.value.length - 1) {
    currentPageIdx.value++;
    playPage();
    return;
  }

  if (!showOptions.value && currentLine.value?.nextId !== undefined) {
    store.playClickAudio();
    store.nextLine(currentLine.value.nextId);
  }
};

const selectOption = (opt) => {
  store.playClickAudio();
  setTimeout(() => store.nextLine(opt.nextId), 150);
};
</script>

<style scoped>
/* 增加一个隐形的点按区域，覆盖在背景和角色之上，但在按钮和气泡之下 */
.full-screen-clicker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  cursor: pointer;
}
</style>
