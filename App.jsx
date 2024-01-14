// 扩展知识 JSX pragma，可以自定义 JSX 解析方法名称
// NOTE: 如果其他地方要改也需要写上标注
/**@jsx FReact.createElement */
import FReact, { createElement } from './core/React'

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
