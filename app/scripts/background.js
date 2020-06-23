import { playSound, stopSound } from './lib/sounds'
import cache from './lib/cache'
import { getSettings } from './lib/settings'

const VIDEO_CALLS_URL = 'http://airhost:3000/video_chats'

function postNotification () {
  getSettings().then(settings => {    
    if (settings.enabled) {
      chrome.notifications.create({
        type: 'basic',
        title: 'Mario Qiu',
        message: 'House: AirHost Test Hotel.\nStay: March 13 ~ March 14',
        iconUrl: 'images/icon-128.png',
        // items: [
        //   { title: "House", message: "AirHost Hotel" },
        //   { title: "Checkin", message: "March 13, 2020, Friday" },
        //   { title: "Checkout", message: "March 14, 2020, Saturday" },
        //   { title: "Number Of Guests", message: "2 Adult" }
        // ],
        requireInteraction: true
      })
      
      if (settings.duration) {
        playSound(settings.ringtone, settings.duration * 1000)  
      }
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
