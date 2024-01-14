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

// Dom 写死
const root = document.querySelector('#root')
const appDom = document.createElement(appEl.type)
const textDom = document.createTextNode('')

// 属性赋值与 Dom 挂载
textDom.nodeValue = textEl.props.nodeValue
appDom.id = appEl.props.id
appDom.append(textDom)
root.append(appDom)
