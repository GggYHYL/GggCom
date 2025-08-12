import { createRouter, createWebHistory } from "vue-router";
import { useMenu } from "./useMenu";
// 路由菜单数据
const { menuList } = useMenu();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/button",
    },
    {
      path: "/layout",
      name: "Layout",
      component: () => import("@/layout/index.vue"),
      redirect: "/button",
      children: menuList.value,
    },
  ],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
