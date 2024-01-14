import React from './React.js'

const ReactDom = {
  createRoot(mountNodeDom) {
    return {
      render: (App) => React.render(App, mountNodeDom),
    }
  },
}

export default ReactDom
