import { App } from "vue";
import Mention from "./src/Mention.vue";

// 为组件提供 install 安装方法，供按需引入
Mention.install = (app: App) => {
  app.component(Mention.name as string, Mention);
};

// 默认导出组件
export default Mention;

// 导出组件类型
export * from "./src/Mention.vue";
