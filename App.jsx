import CReact, { createElement } from "./core/React";

function AppFunc() {
  // ƒ AppFunc() {
  //   return /* @__PURE__ */ CReact.createElement("div", { id: "newApp" }, "mini react");
  // }
  return <div id="newApp">mini react</div>;
}

console.log(AppFunc)
const App = <div id="app">hi react</div>

export default App
