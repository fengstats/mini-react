// v0.3
// Dom 动态
// vDom 动态生成
// NOTE: 因为我们使用的是 script 标签设置的 type="module"，无法帮助我们补全后缀，这里的 '.js' 不要忘了
import { createElement } from './core/React.js'
import ReactDom from './core/ReactDom.js'

const root = document.querySelector('#root')
const appEl = createElement('div', { id: 'app' }, 'hi, mini react', ', nice to learn from you!')

// render(appEl, root)

// 对齐 React API 使用
ReactDom.createRoot(root).render(appEl)
