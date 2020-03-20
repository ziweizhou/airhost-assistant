import React from 'react'
import { Switch, Select, Slider, Row, Col } from 'antd'
import { SOUNDS, playSound } from '../lib/sounds'
import { SETTINGS, getSettings } from '../lib/settings'

const STYLE_ROW = {
  marginBottom: '15px',
  padding: '10px 20px',
}
const STYLE_RIGHT = { textAlign: 'right' }

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...SETTINGS }
  
    this.handleEnableChanged = this.handleEnableChanged.bind(this)
    this.handleRingtoneChange = this.handleRingtoneChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
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
  
  handleDurationChange (duration) {
    this.setState({ ...this.state, duration })
    chrome.storage.local.set({ duration })
  }
  
  componentDidMount() {
    getSettings().then(settings => {
      console.log('got settings are %j', settings)
      this.setState({ ...this.state, ...settings })
    })
  }
  
  render () {
    return (
      <div>
        <Row type="flex" justify="space-between" align="middle" style={STYLE_ROW} gutter={[16, 16]}>
          <Col span={12}><strong>Enabled</strong></Col>
          <Col span={12} style={STYLE_RIGHT}>
            <Switch
              size="small"
              checked={this.state.enabled}
              onChange={this.handleEnableChanged}
            />
          </Col>
          <Col span={24}>
            Switch off to mute the video call ringtone
          </Col>
        </Row>

        <Row type="flex" justify="space-between" align="middle" style={STYLE_ROW} gutter={[16, 16]}>
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
          <Col span={24}>
            Select a ringtone for new video call
          </Col>
        </Row>
        
        <Row type="flex" justify="space-between" align="middle" style={STYLE_ROW} gutter={[16, 16]}>
          <Col span={12}><strong>Duration</strong></Col>
          <Col span={12} style={STYLE_RIGHT}>
            <Slider
              value={this.state.duration}
              onChange={duration => this.setState({ ...this.state, duration })}
              onAfterChange={this.handleDurationChange}
              size='small'
              marks={{
                0: '0',
                10: '10',
                20: '20',
                30: '30'
              }}
              min={0}
              max={30}
            />
          </Col>
          <Col span={24}>
            How long the sound will last ringing?
          </Col>
        </Row>
      </div>
    )
  }
}
