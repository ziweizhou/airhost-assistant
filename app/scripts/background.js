import ActionCable from 'actioncable'

const WS_URL = 'ws://airhost:3000/cable'
const CHANNEL = { channel: 'VideoChatsChannel' }

const playSound = ({ filename, duration = 5000 }) => {
  const audio = new Audio(chrome.runtime.getURL(filename))
  audio.loop = true
  audio.play()
  setTimeout(() => audio.pause(), duration)
}

function postNotification () {
  chrome.notifications.create({
    type: 'basic',
    title: 'New video chat!',
    message: 'New video chat received.',
    iconUrl: 'images/icon-128.png'
  })
  const audio = new Audio(chrome.runtime.getURL('ring.wav'))
  audio.loop = true
  audio.play()
  setTimeout(() => audio.pause(), 5000)
}

let cable = ActionCable.createConsumer(WS_URL)
cable.subscriptions.create(CHANNEL, {
  received: data => {
    if (data.type === 'new_video_chat') {
      postNotification()
    }
  }
})

chrome.runtime.onMessage.addListener(message => {
  console.log(message)
  if (message.type === 'play_sound') {
    playSound({
      filename: message.filename,
      duration: 2000
    })
  }
})
