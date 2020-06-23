import { playSound, stopSound } from './lib/sounds'
import cache from './lib/cache'
import { getSettings } from './lib/settings'

const VIDEO_CALLS_URL = 'http://airhost:3000/video_chats'

function postNotification () {
  getSettings().then(settings => {    
    if (settings.enabled) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Airhost',
        message: 'New video chat requested.',
        iconUrl: 'images/icon-128.png',
        requireInteraction: true
      })
      
      if (settings.duration) {
        playSound(settings.ringtone, settings.duration * 1000)  
      }
    }
  })
}

chrome.runtime.onMessageExternal.addListener(message => {
  console.log('received external message:', JSON.stringify(message))
  if (message.type === 'ping') {
    cache.set('connected', true, 7)
  } else if (message.type === 'new_video_chat') {
    postNotification()
  }
  
  return true
})

chrome.runtime.onMessage.addListener(message => {
  console.log('received message:', JSON.stringify(message))
  if (message.type === 'stop_ring') {
      stopSound()
  }
  
  return true
})

chrome.notifications.onClicked.addListener(notifyId => {
  chrome.tabs.create({ url: VIDEO_CALLS_URL, active: true })
  chrome.notifications.clear(notifyId)
  stopSound()
})

chrome.notifications.onClosed.addListener(() => stopSound())
