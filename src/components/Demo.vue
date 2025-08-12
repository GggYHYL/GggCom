<template>
  <div class="demo-container">
    <div class="demo-description" v-if="description">
      <div v-html="description"></div>
    </div>

    <div class="demo-preview">
      <Suspense>
        <component :is="dynamicComponent" v-if="dynamicComponent" />
        <template #fallback>
          <div>Loading component...</div>
        </template>
      </Suspense>
    </div>

    <div class="demo-actions">
      <button @click="showCode = !showCode">
        {{ showCode ? "隐藏代码" : "显示代码" }}
      </button>
    </div>

    <div class="demo-code" v-if="showCode">
      <pre><code class="language-vue">{{ decodedCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from "vue";

const props = defineProps({
  filePath: String,
  rawCode: String,
  description: String,
});
const showCode = ref(false);
const dynamicComponent = shallowRef(null);

// 解码原始代码
const decodedCode = computed(() => decodeURIComponent(props.rawCode));
onMounted(async () => {
  try {
    // 动态加载组件
    dynamicComponent.value = (
      await import(/* @vite-ignore */ props.filePath)
    ).default;
  } catch (err) {
    console.error("加载组件失败:", err);
  }
});
</script>

<style scoped>
.demo-container {
  margin: 24px 0;
  border: 1px solid #eaecef;
  border-radius: 4px;
  overflow: hidden;
}
.demo-description {
  padding: 16px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #eaecef;
}
.demo-preview {
  padding: 16px;
}
.demo-actions {
  padding: 8px 16px;
  background-color: #f6f8fa;
  border-top: 1px solid #eaecef;
  text-align: center;
}
.demo-code {
  background-color: #f6f8fa;
  padding: 16px;
  overflow-x: auto;
}
</style>
