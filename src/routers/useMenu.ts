import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
export const useMenu = () => {
  const menuList = ref<RouteRecordRaw[]>([
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
