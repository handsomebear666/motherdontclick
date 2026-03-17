<template>
  <div
    class="toast-message"
    :class="{ show: !!store.toastMsg }"
    :style="{ backgroundColor: store.toastBgColor }"
  >
    {{ store.toastMsg }}
  </div>
</template>

<script setup>
import { useGameStore } from "@/store/useGameStore";
const store = useGameStore();
</script>
