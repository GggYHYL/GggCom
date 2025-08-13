<template>
  <div class="f-box">
    <img src="@/assets/images/404.png" alt="" />
    <div>
      <h1>页面不存在</h1>
      <h5>对不起，你反问的页面不存在或已被删除</h5>
      <router-link :to="DEFAULT_PATH">
        <Button type="primary">默认页</Button>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DEFAULT_PATH } from "./config";
import Button from "@packages/components/Button/src/Button.vue";
</script>
<style lang="scss" scoped>
.f-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 480px;
    height: 360px;
    margin-right: 120px;
  }
}
</style>
