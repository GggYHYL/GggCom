<template>
  <input name="input" :type="type" :placeholder="placeholder" class="input" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyInput",

  props: {
    type: {
      type: String,
      default: "text",
      validator: (val: string) => ["text"].includes(val),
    },
    placeholder: {
      type: String,
      default: "请输入",
      validator: (val: string) => typeof val === "string",
    },
  },
});
</script>
<style lang="scss" scoped>
@import url(./input.scss);
</style>
