import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
export const useMenu = () => {
  const menuList = ref<RouteRecordRaw[]>([
    {
      path: "/button",
      name: "Button",
      component: () => import("@docs/button.md"),
      meta: {
        title: "Button 按钮",
      },
    },
    {
      path: "/input",
      name: "Input",
      component: () => import("@docs/input.md"),
      meta: {
        title: "Input 输入框",
      },
    },
    {
      path: "/mention",
      name: "Mention",
      component: () => import("@docs/mention.md"),
      meta: {
        title: "Mention 提及",
      },
    },
  ]);
  return { menuList };
};
