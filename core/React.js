const TEXT_TYPE_NAME = 'TEXT_ELEMENT'

// type/props/children

function createTextNode(nodeValue) {
  return {
    type: TEXT_TYPE_NAME,
    props: {
      nodeValue,
    },
    children: [],
  }
}

// 用 ... 扩展运算符接收剩余参数，返回一个数组
function createElement(type, props, ...children) {
  return {
    type,
    props,
    // 优化 children 参数，如果传入的是字符串自动处理成 vDom 数据结构
    children: children.map((child) => (typeof child === 'string' ? createTextNode(child) : child)),
  }
}

// 想要动态生成就得找到行为的相同点和不同点，首先发现其动作都是一致的
// 1. 创建 Dom
// 2. 对 props 属性赋值
// 3. 挂载 Dom
// 可以实现一个 render 函数来做这些重复性的工作，但需要考虑到兼容问题

function render(el, mountNodeDom) {
  // type
  const dom = el.type === TEXT_TYPE_NAME ? document.createTextNode('') : document.createElement(el.type)

  // props
  for (const key of Object.keys(el.props)) {
    dom[key] = el.props[key]
  }

  // children
  el.children.forEach((child) => {
    // NOTE: 递归处理并挂载到对应 Dom
    render(child, dom)
  })

  // 挂载
  mountNodeDom.append(dom)
}

const React = {
  createElement,
  render,
}

// NOTE: 或者直接在 export function xx () {} 也行
export { createElement, render }
// TODO: 有没有更优雅的方式可以既默认导出，又导出内部方法变量之类的
// 比如解构 ...React 这样，我就不用写两边同样的方法名字了，后面再看
export default React
