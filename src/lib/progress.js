import defaultClient from 'lib/api/defaultClient'

const requests = []

let progress = 0
let timerId = null

function setProgress(value) {
  progress = value
  if (typeof window !== 'undefined' && window.nanobar) {
    window.nanobar.go(progress)
  }
}

function timer() {
  if (progress < 98) {
    const diff = 100 - progress
    const inc = diff / (10 + progress * (1 + progress / 100))
    setProgress(progress + inc)
  }
  timerId = setTimeout(timer, 50)
}

function install() {
  setProgress(25)
  timer()
}

function uninstall() {
  if (timerId) {
    clearTimeout(timerId)
    timerId = null
  }
  setProgress(100)
}

export default {
  install,
  uninstall
}
