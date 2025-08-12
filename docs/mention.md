# Mention 提及 ​

用于在输入中提及某人或某事。

## 基础用法

:::demo 通过输入`@` 符号触发。
@examples/mention/Basic.vue
:::

### Attributes

| 属性名      | 说明                       | 类型                    |
| ----------- | -------------------------- | ----------------------- |
| itableHtml  | 通过 v-html 绑定输入框内容 | string                  |
| placeholder | 提示语                     | string                  |
| height      | 输入框高度                 | number                  |
| options     | @触发后提及的下拉数据      | (value: string) => void |

### Event

| 事件名          | 说明                           |
| --------------- | ------------------------------ |
| set-itable-html | 当选择器的输入框失去焦点时触发 |
