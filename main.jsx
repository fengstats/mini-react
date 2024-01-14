// import App from './App-jsx-pragma'
import App from './App'
import React from './core/React'
import ReactDOM from './core/ReactDOM'

const root = document.getElementById('root')

// ERROR: Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('[object Object]') is not a valid name.
// TODO: 需要 createElement 方法支持 Function Component 实现
// ReactDOM.createRoot(root).render(<App />)
ReactDOM.createRoot(root).render(App)
