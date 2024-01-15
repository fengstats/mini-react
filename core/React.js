const TEXT_TYPE_NAME = 'TEXT_ELEMENT'
let work = null

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

function createDOM(type) {
  console.log('createDOM', type)
  if (type === TEXT_TYPE_NAME) return document.createTextNode('')
  return document.createElement(type)
}

// 循环任务
function workLoop(deadline) {
  // 如果剩余空余时间大于 16.6ms 就继续找下个任务执行
  // NOTE: 浏览器的刷新频率是 60Hz 也就是每 16.6ms 会刷新一次，保证渲染流畅度
  while (deadline.timeRemaining() > 16.6 && work) {
    // 也就是把之前 render 一次做完的事情拆分成多次来做
    // 每次处理后返回下个节点，下次根据这个节点继续来做
    work = performSingleWorkUnit(work)
  }
  requestIdleCallback(workLoop)
}

// 处理当前任务单元 → 返回下一个任务单元
function performSingleWorkUnit(work) {
  const { type, parent, props, children } = work
  console.log('performSingleWorkUnit', type, props)
  // 1. 创建 dom
  if (!work.dom) {
    // 没有 dom 时才需要创建
    work.dom = createDOM(type)
    // 1.2 更新 props
    for (const key of Object.keys(props)) {
      work.dom[key] = props[key]
    }
    // 1.3 挂载 dom
    parent.dom.append(work.dom)
  }

  // 2. 将 dom 树转换为链表，边转换边渲染
  // 从树的左边开始，每次处理一个节点返回
  let prevChild = null
  children.forEach((child, index) => {
    // 为了不污染 child 这个虚拟 DOM 上的数据，所以再定义一个变量
    const childWork = {
      // 先把原来的属性都解构出来
      ...child,
      // 添加一些初始化属性以及赋值
      parent: work,
      dom: null,
      child: null,
      sibling: null,
    }
    if (index === 0) {
      // 第一个 child 节点是大儿子
      work.child = childWork
    } else {
      // NOTE: 其余都是大儿子兄弟或其他儿子的兄弟
      // 举个例子：比如现在的 work 就是爹，children 里面有 son1、son2、son3 三个儿子
      // 前提：假设儿子们没有儿子的情况
      // 第一次找到 son1 大儿子，直接返回
      // 第二次找到 son2 二儿子，没有儿子，但是有兄弟，也就是 work 的大儿子，绑定上去
      // 第三次找到 son3 小儿子，没有儿子，但是有兄弟，不过这次是二儿子了，绑定上去
      // 以此类推…直到整棵树被转换
      prevChild.sibling = childWork
    }
    // 当前 child 已经处理完毕，存储下，留给下一个 child 使用
    // 这样当下一个 child 没有儿子的时候能找到兄弟
    prevChild = work
  })

  // 3. 返回下一个任务单元
  // 3.1 有儿子先返回儿子
  if (work.child) return work.child
  // 3.2 没有儿子找兄弟
  if (work.sibling) return work.sibling
  // 3.3 没有兄弟找叔叔，没有叔叔就结束啦！🎉
  return work.parent.sibling
}

const React = {
  createElement,
  render,
}

export { createElement, render }
export default React
