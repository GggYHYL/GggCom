import { createRouter, createWebHistory } from "vue-router";
import { useMenu } from "./useMenu";
import { DEFAULT_PATH } from "@/config";
// 路由菜单数据
const { menuList } = useMenu();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: DEFAULT_PATH,
    },
    {
      path: "/layout",
      name: "Layout",
      component: () => import("@/layout/index.vue"),
      redirect: DEFAULT_PATH,
      children: menuList.value,
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/404.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/404.vue"),
    },
  ],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
