import React, { createElement } from './core/React'

const App = (
  <div id="app">
    <div>
      11111111111111
      <div>1.1</div>
      <div>1.2</div>
    </div>
    <div>
      22222222222222
      <div>
        2.1
        <div>2.1.1</div>
        <div>2.1.2</div>
      </div>
      <div>2.2</div>
    </div>
    <div>
      33333333333333
      {...new Array(10).fill(0).map((item, index) => {
        return (
          <div>
            <span>{index}</span>
          </div>
        )
      })}
    </div>
  </div>
)

export default App
