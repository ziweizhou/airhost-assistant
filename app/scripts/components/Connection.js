import React from 'react'
import { Icon, Button } from 'antd'
import cache from '../lib/cache'

const extensionId = chrome.runtime.id

export default class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: cache.get('connected') }
    this.timer = null
    
    this.handleConnect = this.handleConnect.bind(this)
  }
  
  handleConnect () {
    const bridgeUrl = `http://airhost:3000/bridge?extid=${extensionId}`
    chrome.tabs.create({
      url: bridgeUrl,
      pinned: true,
      active: false
    })
  }
  
  watchConnection () {
    this.timer = window.setInterval(() => {
      const connected = cache.get('connected')
      this.setState({ connected })
    }, 1000)
  }

  componentDidMount () {
    this.watchConnection()
  }
  
  componentWillUnmount () {
    window.clearInterval(this.timer)
  }
  
  render () {
    return (
      <div
        style={{
          color: this.state.connected ? 'green' : 'gray',
          fontWeight: this.state.connected ? 'bold' : 'normal',
          padding: '10px'
        }}
      >
        
        {
          this.state.connected ? (
            <div>
              <Icon type="wifi" style={{ marginRight: '5px' }} />
              <span>You are connected to airhost</span>
            </div>
          ) : (
            <div>
              <a
                href='#'
                style={{ float: 'right' }}
                onClick={this.handleConnect}
              >
                CONNECT
              </a>
              <Icon type="wifi" style={{ marginRight: '5px' }} />
              <span>You are not connected to airhost</span>
            </div>
          )
        }
      </div>
    )
  }
}
