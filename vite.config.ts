import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";
import Markdown from "vite-plugin-vue-markdown";
import mdItContainer from "markdown-it-container";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // ✅ 关键：让 vue 插件也处理 .md
    }),
    dts({
      outDir: "dist/types", // 类型文件输出目录
      include: ["packages/components"], // 指定组件目录
      tsconfigPath: "./tsconfig.json",
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(mdItContainer, "demo", {
          validate: (params) => params.trim().match(/^demo\s*(.*)$/),
          render: (tokens, idx) => {
            const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
            if (tokens[idx].nesting === 1) {
              const description = m?.[1] || "";
              const filePath = tokens[idx + 2]?.children?.[0]?.content || "";
              // 直接读取原始文件内容
              const fullPath = path.resolve(
                __dirname,
                filePath.replace("@examples", "examples")
              );
              const rawCode = fs.readFileSync(fullPath, "utf-8");
              return `
                <Demo
                  filePath="${filePath.replace("@examples", "/examples")}"
                  rawCode="${encodeURIComponent(rawCode)}"
                  description="${description.replace(/"/g, "&quot;")}"
                >
              `;
            }
            return "</Demo>";
          },
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@examples": path.resolve(__dirname, "examples"),
      "@docs": path.resolve(__dirname, "docs"),
      "@": path.resolve(__dirname, "src"),
      "@packages": path.resolve(__dirname, "packages"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/var.scss";`,
        api: "modern-compile",
        silenceDeprecations: ["legacy-js-api", "import"],
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "packages/index.ts"),
      name: "guanggUI",
      fileName: (format) => `ggg-com.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named", // 或 'auto' 根据需求调整
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
