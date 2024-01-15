import React from './React.js'

const ReactDOM = {
  createRoot(root) {
    return {
      render: (el) => React.render(el, root),
    }
  },
}

export default ReactDOM
