import { App } from "vue";
import Input from "./src/Input.vue";

// 为组件提供 install 安装方法，供按需引入
Input.install = (app: App) => {
  app.component(Input.name as string, Input);
};

// 默认导出组件
export default Input;

// 导出组件类型
export * from "./src/Input.vue";
