import { playSound } from './lib/sounds'

const VIDEO_CALLS_URL = 'http://airhost:3000/video_chats'

function postNotification () {
  chrome.storage.local.get(settings => {
    console.log(settings)
    
    if (settings.enabled) {
      chrome.notifications.create({
        type: 'basic',
        title: 'New Video Call',
        message: 'New video chat requested.',
        iconUrl: 'images/icon-128.png',
        isClickable: true
      })
      
      playSound(settings.ringtone)
    }
  })
}

chrome.runtime.onMessage.addListener(message => {
  console.log('received message', message)
  switch (message.type) {
    case 'connected':
      window.localStorage['connected'] = '1'
      break
    case 'disconnected':
      window.localStorage['connected'] = '0'
      break
    case 'new_video_chat':
      postNotification()
      break
  }
  
  return true
})

chrome.tabs.onRemoved.addListener(tabId => {
  if (String(tabId) === window.localStorage['agent_tab_id']) {
    delete window.localStorage['agent_tab_id']
    delete window.localStorage['connected']
    chrome.runtime.sendMessage({ type: 'disconnected' })
  }
})
