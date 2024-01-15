let taskId = 1
let isStop = false
const startBtn = document.querySelector('.startBtn')
const stopBtn = document.querySelector('.stopBtn')

startBtn.addEventListener('click', start)
stopBtn.addEventListener('click', stop)

function start() {
  isStop = false
  console.log('================== 开始执行 ==================')
  requestIdleCallback(workLoop)
}

function stop() {
  isStop = true
  console.log('================== 停止执行 ==================')
}

function workLoop(deadline) {
  while (deadline.timeRemaining() > 1) {
    console.log(`taskId: ${taskId} is running`)
  }

  taskId++
  !isStop && requestIdleCallback(workLoop)
}
