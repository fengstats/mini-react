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

function render(el, mountNodeDom) {
  const dom = el.type === TEXT_TYPE_NAME ? document.createTextNode('') : document.createElement(el.type)

  for (const key of Object.keys(el.props)) {
    dom[key] = el.props[key]
  }

  el.children.forEach((child) => render(child, dom))

  mountNodeDom.append(dom)
}

const React = {
  createElement,
  render,
}

export { createElement, render }
export default React
