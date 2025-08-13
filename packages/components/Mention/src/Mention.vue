<template>
  <div class="mention">
    <div
      :contenteditable="contenteditable"
      v-html="itableHtml"
      class="input"
      ref="itableRef"
      :placeholder="placeholder"
      :style="{ height: `${height}px` }"
      @input="onInput"
      @blur="onBlur"
    />
    <div class="options" ref="optionsRef" @mousedown.prevent>
      <div v-for="item in options" @click="onSelectOption(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch, nextTick } from "vue";
import { DisplayEnum } from "./enums";
import { ContentEditableType } from "./types";
export default defineComponent({
  name: "MyMention",
  props: {
    contenteditable: {
      type: [Boolean, String] as PropType<ContentEditableType>,
      default: "plaintext-only",
      validator: (val: unknown): val is ContentEditableType => {
        if (typeof val === "boolean") return true;
        if (typeof val === "string") {
          return ["true", "false", "inherit", "plaintext-only"].includes(val);
        }
        return false;
      },
    },
    placeholder: {
      type: String,
      validator: (val: string) => typeof val === "string",
      default: "请输入",
    },
    height: {
      type: Number,
      validator: (val: number) => typeof val === "number",
      default: 200,
    },
    itableHtml: {
      type: String,
      required: true,
      validator: (val: string) => typeof val === "string",
      default: "",
    },
    options: {
      type: Array as PropType<string[]>,
      validator: (val: string[]) => {
        return (
          Array.isArray(val) && val.every((item) => typeof item === "string")
        );
      },
      default: () => [],
    },
  },
  emits: ["setItableHtml"],
  setup(props, { emit }) {
    // 实例
    const itableRef = ref<HTMLDivElement>();
    const optionsRef = ref<HTMLDivElement>();
    // 初始化绑定直
    const itableHtml = ref<string>("");
    watch(
      () => props.itableHtml,
      (nVal) => {
        itableHtml.value = nVal;
      },
      {
        immediate: true,
      }
    );
    // 监听输入
    const onInput = (event: any) => {
      // 处理清空后存在br标签使得光标位置在placeholder后问题
      if (event.target.textContent.trim() === "") {
        event.target.innerHTML = "";
      }
      if (event.data === "@") {
        setStyleDisplay(DisplayEnum.BLOCK);
        nextTick(() => setOptionsPos());
      } else if (optionsRef.value?.style.display === DisplayEnum.BLOCK) {
        setStyleDisplay();
      }
    };
    // 是否显示options
    const setStyleDisplay = (display: string = DisplayEnum.NONE) => {
      if (!optionsRef.value) {
        return DisplayEnum.NONE;
      }
      optionsRef.value.style.display = display;
    };
    // 设置opitons跟随光标移动而移动
    const setOptionsPos = () => {
      const selection = window.getSelection();
      if (!selection || !itableRef.value || !optionsRef.value) {
        return null;
      }
      const range = selection.getRangeAt(0);
      // 光标的位置信息
      const cursorRectInfo = range.getBoundingClientRect();
      // itable的位置信息
      const itableRectInfo = itableRef.value.getBoundingClientRect();
      // left
      const left = cursorRectInfo.left - itableRectInfo.left;
      // top
      const top = cursorRectInfo.top - itableRectInfo.top + 30;
      // options的位置
      optionsRef.value.style.left = `${left}px`;
      optionsRef.value.style.top = `${top}px`;
    };
    // 选中option @mousedown.prevent点击不会触发blur事件
    const onSelectOption = (item: string) => {
      setStyleDisplay();
      const selection = window.getSelection();
      if (!selection) {
        return null;
      }
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.textContent = `@${item}`;
      span.setAttribute("contenteditable", "false");
      const node = range.startContainer;
      const offset = range.startOffset;
      // 替换@符号
      const textBefore = node.nodeValue!.substring(0, offset - 1);
      const textAfter = node.nodeValue!.substring(offset);
      const parent = node.parentNode;
      if (textBefore) {
        parent!.insertBefore(document.createTextNode(textBefore), node);
      }
      parent!.insertBefore(span, node);
      if (textAfter) {
        parent!.insertBefore(document.createTextNode(textAfter), node);
      }
      parent!.removeChild(node);
      // 移动光标到span之后
      const newRange = document.createRange();
      newRange.setStartAfter(span);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    };
    // 失去焦点
    const onBlur = () => {
      setStyleDisplay();
      itableHtml.value = itableRef.value?.innerHTML ?? "";
      emit("setItableHtml", itableHtml.value);
    };
    return {
      itableRef,
      optionsRef,
      itableHtml,
      onInput,
      onSelectOption,
      onBlur,
    };
  },
});
</script>
<style lang="scss" scoped>
@import url(./index.scss);
</style>
