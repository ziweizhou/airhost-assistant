import React from 'react'
import { Icon } from 'antd'

const AGENT_KEY = 'agent_tab_id'

export default class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, connected: false }
    
    this.handleConnect = this.handleConnect.bind(this);
  }
  
  getAgentTab () {
    return new Promise((resolve, reject) => {
      const tabId = parseInt(window.localStorage[AGENT_KEY])
      if (tabId) {
        chrome.tabs.get(tabId, tab => {
          if (tab) {
            resolve(tab)
          } else {
            delete window.localStorage[AGENT_KEY]
            resolve(null)
          }
        })
      } else {
        resolve(null)
      }
    })
  }
  
  initMessage () {
    chrome.runtime.onMessage.addListener(message => {
      switch (message.type) {
        case 'connected':
          this.setState({ ...this.state, connected: true })
          break
        case 'disconnected':
          this.setState({ ...this.state, active: false, connected: false })
          break
      }
      
      return true
    })    
  }
  
  checkState () {
    this.getAgentTab().then(tab => {
      if (tab) {
        const connected = window.localStorage['connected'] === '1'
        this.setState({ ...this.state, connected, active: true })
      } else {
        this.setState({ ...this.state, active: false, connected: false })
      }
    })
  }
  
  handleConnect () {
    chrome.tabs.create({
      url: 'http://airhost:3000/ja/video_chats',
      active: false,
      pinned: true
    }, tab => {
      this.setState({ ...this.state, active: true })
      window.localStorage[AGENT_KEY] = tab.id
      chrome.tabs.executeScript(tab.id, {
        file: 'scripts/contentscript.js'
      })  
    })
  }
  
  renderConnectionStatus () {
    if (this.state.active) {
      if (this.state.connected) {
        return 'You are connected to airhost.'
      } else {
        return 'You are connecting to airhost…'
      }
    } else {
      return (
        <span onClick={this.handleConnect}>You are not connected to airhost.</span>
      )
    }
  }

  componentDidMount() {
    this.initMessage()
    this.checkState()
  }
  
  render () {
    return (
      <div
        style={{
          color: this.state.active && this.state.connected ? 'green' : 'gray',
          fontWeight: this.state.active ? 'bold' : 'normal',
          padding: '10px'
        }}
      >
        <Icon type="wifi" style={{ marginRight: '5px' }} />
        {this.renderConnectionStatus()}
      </div>
    )
  }
}
