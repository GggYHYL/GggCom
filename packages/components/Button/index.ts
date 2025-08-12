import { App } from "vue";
import Button from "./src/Button.vue";

// 为组件提供 install 安装方法，供按需引入
Button.install = (app: App) => {
  app.component(Button.name as string, Button);
};

// 默认导出组件
export default Button;

// 导出组件类型
export * from "./src/Button.vue";
