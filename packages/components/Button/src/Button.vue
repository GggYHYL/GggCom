<template>
  <button :class="`button--${type}`">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyButton",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val: string) =>
        ["default", "primary", "danger", "warning", "success"].includes(val),
    },
  },
});
</script>

<style lang="scss" scoped>
@import url(./index.scss);
</style>
