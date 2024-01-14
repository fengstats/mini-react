// v0.2
// Dom 写死
// vDom 动态生成
// type/props/children
function createTextNode(nodeValue) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue,
    },
    children: [],
  }
}

function createElement(type, props, children) {
  return {
    type,
    props,
    children,
  }
}

// VDom 动态生成
const textEl = createTextNode('hi, mini react')
const appEl = createElement('div', { id: 'app' }, [textEl])

// 获取顶层 Dom
const root = document.querySelector('#root')

// 创建 Dom
const appDom = document.createElement(appEl.type)
const textDom = document.createTextNode('')

// 赋值 props 属性
textDom.nodeValue = textEl.props.nodeValue
appDom.id = appEl.props.id

// 挂载 Dom
appDom.append(textDom)
root.append(appDom)
