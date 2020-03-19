import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer()
cable.subscriptions.create({ channel: 'VideoChatsChannel' }, {
  connected () {
    this.install()
  },
  disconnected () {
    this.uninstall()
  },
  rejected() {
    this.uninstall()
  },
  received (data) {
    if (data.type === 'new_video_chat') {
      chrome.runtime.sendMessage({ type: 'new_video_chat' })
    }
  },
  install () {
    chrome.runtime.sendMessage({ type: 'connected' })
  },
  uninstall () {
    chrome.runtime.sendMessage({ type: 'disconnected' })
  }
})
