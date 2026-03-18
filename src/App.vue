<template>
  <div class="game-container" :class="{ 'shake-screen': store.isShaking }">
    <Character />
    <PhoneIcon v-if="!store.showPhoneSystem" />
    <DialogueUI v-show="!store.showPhoneSystem" />

    <HintButton v-show="store.showHintBtn" />
    <Toast />
    <SmsPopup v-if="store.showSmsPopup" />

    <transition name="fade">
      <div
        v-if="store.showPhoneSystem"
        class="wechat-system-wrapper"
        style="position: absolute; width: 100%; height: 100%; z-index: 50"
      >
        <WechatChat v-show="store.activePhonePage === 'chat'" />
        <OfficialAccount v-show="store.activePhonePage.startsWith('oa-')" />
        <PhishingForm v-show="store.activePhonePage === 'welfare'" />
        <ProfileFake v-show="store.activePhonePage === 'fake-profile'" />
        <ProfileReal v-show="store.activePhonePage === 'real-profile'" />
        <FakeMoments v-show="store.activePhonePage === 'fake-moments'" />
        <GroupSearch v-show="store.activePhonePage === 'search'" />
      </div>
    </transition>

    <ActionMenu v-if="store.showActionSheet" />
    <div v-if="store.showEndScreen" class="end-screen">
      <div class="end-card">
        <h1>🏆 防骗大师</h1>
        <p>
          你用一套行云流水的反诈军体拳，粉碎了危机！<br />你的数字素养已击败全国
          99% 的玩家！
        </p>
        <button @click="reloadGame">再玩一次</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/store/useGameStore";

// 1. 游戏主视图组件
import Character from "@/components/game/Character.vue";
import PhoneIcon from "@/components/game/PhoneIcon.vue";
import DialogueUI from "@/components/game/DialogueUI.vue";

// 2. 通用悬浮组件
import HintButton from "@/components/common/HintButton.vue";
import Toast from "@/components/common/Toast.vue";
import SmsPopup from "@/components/common/SmsPopup.vue";

// 3. 手机/微信内部系统组件
import WechatChat from "@/components/phone/WechatChat.vue";
import OfficialAccount from "@/components/phone/OfficialAccount.vue";
import PhishingForm from "@/components/phone/PhishingForm.vue";
import ProfileFake from "@/components/phone/ProfileFake.vue";
import ProfileReal from "@/components/phone/ProfileReal.vue";
import FakeMoments from "@/components/phone/FakeMoments.vue";
import GroupSearch from "@/components/phone/GroupSearch.vue";
import ActionMenu from "@/components/phone/ActionMenu.vue";
import { computed } from 'vue';
import { useGameStore } from "@/store/useGameStore";
import { GAME_STORY, ASSETS } from "@/data/story"; // 导入剧本和资源

const store = useGameStore();
const reloadGame = () => location.reload();

// 根据当前剧本行获取立绘
const currentCharacter = computed(() => {
  const line = GAME_STORY.scriptLines.find(l => l.id === store.currentLineId);
  return line?.emotion ? ASSETS.AVATARS[`mom_${line.emotion}`] : '';
});

// 背景图片（可动态也可固定，这里演示动态：如果剧本行有 background 字段则使用，否则用默认）
const currentBackground = computed(() => {
  const line = GAME_STORY.scriptLines.find(l => l.id === store.currentLineId);
  // 如果剧本行指定了背景，则使用对应的背景图；否则使用默认背景
  return line?.background ? ASSETS.BACKGROUNDS[line.background] : '/assets/img/default-bg.jpg';
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.end-screen {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.end-card {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  border: 4px solid #07c160;
  margin: 20px;
}
.end-card h1 {
  color: #07c160;
  margin-bottom: 15px;
}
.end-card button {
  background: #07c160;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}
</style>
