import { playSound, stopSound } from './lib/sounds'
import cache from './lib/cache'
import { getSettings } from './lib/settings'

const VIDEO_CALLS_URL = 'http://airhost:3000/video_chats'

function postNotification () {
  getSettings().then(settings => {    
    if (settings.enabled) {
      chrome.notifications.create({
        type: 'basic',
        title: 'New Video Call',
        message: 'New video chat requested.',
        iconUrl: 'images/icon-128.png',
        requireInteraction: true
      })
      
      playSound(settings.ringtone, settings.duration * 1000)
    }
  })
}

chrome.runtime.onMessageExternal.addListener(message => {
  console.log('received message', message)
  switch (message.type) {
    case 'ping':
      cache.set('connected', true, 7)
      break
    case 'new_video_chat':
      postNotification()
      break
  }
  
  return true
})

chrome.notifications.onClicked.addListener(notifyId => {
  chrome.tabs.create({ url: VIDEO_CALLS_URL, active: true })
  chrome.notifications.clear(notifyId)
  stopSound()
})
