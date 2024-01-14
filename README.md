**提示**：切换分支即可查看对应版本实现代码。

## 01-13 打卡

### 学习

1. 关于虚拟 DOM 数据结构设计以及抽象思想。
2. 在 JSX 中使用 `<App />` 形式组件时其实默认会去寻找 `React.createElement` 方法调用；
3. 生成虚拟 DOM 对象数据返回，也就是说这里的 JSX 本质上就是 `React.createElement` 的语法糖。
4. 是 Vite 中 ESBuild 的 Babel 插件帮助我们完成了这件事情。

### 问题

写到动态生成的 vDom 时，对数据结构设计不清晰导致频频卡壳。

### 解决

观察 v0.1 中写死代码的相同之处与不同之处，抽离属性，罗列并尝试代入 vDom 看是否可通用。

### 课后问题延伸

**如何自定义 JSX 解析方法名称呢？**

1. 通过 JSX pragma 在文件顶部进行标注，注意如果其他地方要使用更改后的名称同样需要定义

```js
// App.jsx
/**@jsx FReact.createElement */
import FReact, { createElement } from './core/React'

// ƒ AppFunc() {
//   return /* @__PURE__ */ FReact.createElement("div", { id: "newApp" }, "mini react");
// }
function AppFunc() {
  return <div id="newApp">mini react</div>
}
```

2. 通过 Vite 配置文件更改默认 Babel 解析方法名称，这是全局配置生效

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'CReact.createElement',
  },
})
```

**我们自己实现的 render 方法递归可能会导致浏览器卡顿？**

// TODO: 猜应该是 DOM 树嵌套层级太多了导致计算量很大导致的，但目前了解不深，没什么好的解决方案，所以后续待补充吧！

### 代码链接

- [v0.1](https://github.com/fengstats/mini-react/tree/v0.1)
- [v0.2](https://github.com/fengstats/mini-react/tree/v0.2)
- [v0.3](https://github.com/fengstats/mini-react/tree/v0.3)
- [v0.3-jsx](https://github.com/fengstats/mini-react/tree/v0.3-jsx)

## 01-14 打卡
