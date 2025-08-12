<template>
  <div class="layout-box">
    <div class="menu-box">
      <router-link v-for="item in menuList" :key="item.path" :to="item.path">
        {{ item.meta?.title }}
      </router-link>
    </div>
    <div class="view-box">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMenu } from "@/routers/useMenu";

const { menuList } = useMenu();
</script>
<style lang="scss">
@import url(./index.scss);
</style>
