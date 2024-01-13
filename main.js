// v0.1 写死发布就完事了
const root = document.querySelector('#root')
const app = document.createElement('div')
const textElement = document.createTextNode('Hello! mini react')
// 设置 id，添加文本元素节点
app.id = 'app'
app.append(textElement)
// 最后添加到 root 元素节点
root.append(app)
