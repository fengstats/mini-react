const el = document.createElement('div')

el.innerHTML = 'hello react'

document.body.append(el)

// 当数值过大时，浏览器渲染就会造成卡顿，涉及到浏览器的基础知识
// 因为 JS 是单线程执行，在执行逻辑代码时浏览器的页面渲染就会阻塞
const maxValue = 10000 // 可以尝试把数值调大试试，多加几个 0
let i = 0
while (i < maxValue) {
  i++
}
