const TEXT_TYPE_NAME = 'TEXT_ELEMENT'
const FRAME_TIME = 16.6

function createTextNode(nodeValue) {
  return {
    type: TEXT_TYPE_NAME,
    props: {
      nodeValue,
    },
    children: [],
  }
}
function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) => {
      console.log(child)
      switch (typeof child) {
        case 'string':
        case 'number':
          return createTextNode(child)
        default:
          return child
      }
    }),
  }
}

function transformChildren(fiber, children) {
  let prevChild = null
  // console.log(children)
  children.forEach((child, index) => {
    const curChild = {
      ...child,
      parent: fiber,
      dom: null,
      child: null,
      sibling: null,
    }
    if (index === 0) {
      fiber.child = curChild
    } else {
      prevChild.sibling = curChild
    }
    // NOTE: 这里脑子糊涂之前给了个 fiber，导致后续嵌套子节点渲染不出来
    prevChild = curChild
  })
}

function updateProps(fiber, props) {
  for (const key of Object.keys(props)) {
    fiber.dom[key] = props[key]
  }
}

function createDOM(type) {
  if (type === TEXT_TYPE_NAME) return document.createTextNode('')
  return document.createElement(type)
}

function performSingleWorkUnit(fiber) {
  const { type, props, children } = fiber
  // console.warn('performSingleWorkUnit', type, props)
  if (!fiber.dom) {
    fiber.dom = createDOM(type)
    // NOTE: props 有值才更新
    props && updateProps(fiber, props)
    fiber.parent.dom.append(fiber.dom)
  }

  children && transformChildren(fiber, children)

  if (fiber.child) return fiber.child

  let curFiber = fiber
  while (curFiber) {
    // NOTE: 兄弟节点和叔叔节点逻辑合并，优先返回兄弟，然后是叔叔
    // 注意叔叔节点是会一直向上找的，解决了多嵌套两层后找叔叔节点失败的问题
    if (curFiber.sibling) return curFiber.sibling
    curFiber = curFiber.parent
  }

  // NOTE: 能到这里肯定只有 null 了，也就是到了最顶层的根节点
  // 此时还是没找到叔叔节点，就是已经处理完了，返回即可
  return curFiber // null
}

let work = null
function workLoop(deadline) {
  while (deadline.timeRemaining() > FRAME_TIME && work) {
    work = performSingleWorkUnit(work)
  }
  requestIdleCallback(workLoop)
}

function render(el, root) {
  // 首次给 work 赋值
  work = {
    dom: root,
    props: null,
    parent: null,
    sibling: null,
    children: [el],
  }
  // console.log(work)
  // 开始执行任务
  requestIdleCallback(workLoop)
}

const React = {
  createElement,
  render,
}

export { createElement, render }
export default React
