<template>
  <Mention
    :placeholder="'请输入文案'"
    :itable-html="itableHtml"
    :options="options"
    @set-itable-html="getItableHtml"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Mention from "@packages/components/Mention/src/Mention.vue";
const itableHtml = ref<string>("");
const options = ref<Array<string>>(["name", "age", "sex"]);
const getItableHtml = (val: string) => {
  console.log("getItableHtml", val);
  itableHtml.value = val;
};
</script>
