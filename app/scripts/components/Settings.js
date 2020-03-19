import React from 'react'
import { Switch, Select, Row, Col } from 'antd'
import { SOUNDS, playSound } from '../lib/sounds'

const STYLE_ROW = {
  marginBottom: '15px',
  padding: '10px',
}
const STYLE_RIGHT = { textAlign: 'right' }

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: true, ringtone: 'd1' }
  
    this.handleEnableChanged = this.handleEnableChanged.bind(this)
    this.handleRingtoneChange = this.handleRingtoneChange.bind(this)
  }
  
  handleEnableChanged (enabled) {
    this.setState({ ...this.state, enabled })
    chrome.storage.local.set({ enabled })
  }
  
  handleRingtoneChange (ringtone) {
    this.setState({ ...this.state, ringtone })
    chrome.storage.local.set({ ringtone })
    playSound(ringtone, 1000)
  }
  
  componentDidMount() {
    chrome.storage.local.get(settings => {
      this.setState({ ...this.state, ...settings })
    })
  }
  
  render () {
    return (
      <div>
        <Row type="flex" justify="space-between" style={STYLE_ROW}>
          <Col span={12}><strong>Enabled</strong></Col>
          <Col span={12} style={STYLE_RIGHT}>
            <Switch
              size="small"
              checked={this.state.enabled}
              onChange={this.handleEnableChanged}
            />
          </Col>
          <Col span={24}>Switch off to mute the video call ringtone</Col>
        </Row>

        <Row type="flex" justify="space-between" style={STYLE_ROW}>
          <Col span={12}><strong>Ringtone</strong></Col>
          <Col span={12} style={STYLE_RIGHT}>
            <Select
              size="small"
              value={this.state.ringtone}
              onChange={this.handleRingtoneChange}
              style={{ width: '100%' }}
            >
              {SOUNDS.map(sound => (
                <Select.Option
                  key={sound.id}
                  value={sound.id}
                >
                  {sound.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>Select a ringtone for new video call</Col>
        </Row>
      </div>
    )
  }
}
