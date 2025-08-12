import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/reset.scss";
import Demo from "./components/Demo.vue";
import router from "./routers";
const app = createApp(App);
// 全局注册Demo组件
app.component("Demo", Demo);
app.use(router).mount("#app");
