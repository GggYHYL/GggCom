/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// vite-env.d.ts
declare module "*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "/docs/*.md" {
  import { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}
// he.js
declare module "he" {
  const he: {
    encode: (text: string, options?: any) => string;
    decode: (html: string, options?: any) => string;
    escape: (text: string) => string;
    unescape: (html: string) => string;
    version: string;
  };
  export default he;
}
