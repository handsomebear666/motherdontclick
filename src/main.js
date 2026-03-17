import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/css/style.css"; // 全局引入你原本的 CSS

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
