const TEXT_TYPE_NAME = 'TEXT_ELEMENT'

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
      return typeof child === 'string' ? createTextNode(child) : child
    }),
  }
}

function transformChildren(fiber, children) {
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      ...child,
      parent: fiber,
      dom: null,
      child: null,
      sibling: null,
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = fiber
  })
}

function updateProps(fiber, props) {
  for (const key of Object.keys(props)) {
    fiber.dom[key] = props[key]
  }
}

function createDOM(type) {
  console.log('createDOM', type)
  if (type === TEXT_TYPE_NAME) return document.createTextNode('')
  return document.createElement(type)
}

function performSingleWorkUnit(fiber) {
  const { type, parent, props, children } = fiber
  if (!fiber.dom) {
    fiber.dom = createDOM(type)
    updateProps(fiber, props)
    parent.dom.append(fiber.dom)
  }

  transformChildren(fiber, children)

  if (fiber.child) return fiber.child
  if (fiber.sibling) return fiber.sibling
  return fiber.parent.sibling
}

let work = null
function workLoop(deadline) {
  while (deadline.timeRemaining() > 16.6 && work) {
    work = performSingleWorkUnit(work)
  }
  requestIdleCallback(workLoop)
}

function render(el, root) {
  // 首次给 work 赋值
  work = {
    dom: root,
    props: null,
    children: [el],
  }
  // 开始执行任务
  requestIdleCallback(workLoop)
}

const React = {
  createElement,
  render,
}

export { createElement, render }
export default React
