import React from './React.js'

const ReactDOM = {
  createRoot(mountNodeDom) {
    return {
      render: (App) => React.render(App, mountNodeDom),
    }
  },
}

export default ReactDOM
