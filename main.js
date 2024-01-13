// v0.2
// Dom 写死
// vDom 动态生成
// type/props/children
const textEl = {
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: 'Hello! mini react',
  },
  children: [],
}

const el = {
  type: 'div',
  props: {
    id: 'app',
  },
  children: [textEl],
}
const root = document.querySelector('#root')
const app = document.createElement(el.type)
const textDom = document.createTextNode('')
textDom.nodeValue = textEl.props.nodeValue
app.id = el.props.id
app.append(textDom)
root.append(app)
