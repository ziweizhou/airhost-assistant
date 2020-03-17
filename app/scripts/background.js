import ActionCable from 'actioncable'

const WS_URL = 'wss://fcf33338876e44059c239ba1b1bf947f.vfs.cloud9.ap-northeast-1.amazonaws.com/cable'
const CHANNEL = { channel: 'VideoChatsChannel' }

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
