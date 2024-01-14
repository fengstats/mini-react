import React, { createElement } from './core/React'

const App = createElement('div', { id: 'app' }, 'hi, mini react', ', nice to learn from you!')

const newApp = <div id='newApp'>mini react</div>
function AppFunc() {
  // 其实就是调用了我们自己写的 React.createElement 函数
  // ƒ AppFunc() {
  //   return /* @__PURE__ */ React.createElement("div", { id: "newApp" }, "mini react");
  // }
  return <div id='newApp'>mini react</div>
}

console.log(newApp)
console.log(AppFunc)

export default App
