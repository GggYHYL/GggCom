import { App } from "vue";
import Button from "./components/Button";
import Input from "./components/Input";
import Mention from "./components/Mention";

// 所有组件列表
const components = [Button, Input, Mention];

// 定义 install 方法
const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name as string, component);
  });
};

export { Button, Input, Mention, install };

export default {
  install,
};
