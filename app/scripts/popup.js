import React from 'react'
import ReactDOM from 'react-dom'
import PopupApp from './components/PopupApp'

ReactDOM.render(
  <PopupApp />,
  document.getElementById('app')
)

chrome.runtime.sendMessage({ type: 'stop_ring' })
