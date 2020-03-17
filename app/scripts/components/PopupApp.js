import { useState, useEffect } from 'react'
import { Switch, Select, Row, Col, Icon } from 'antd'

const STYLE_ROW = {
  marginBottom: '15px'
}

const STYLE_RIGHT = {
  textAlign: 'right'
}

const SOUNDS = [
  { id: 'd1', name: 'Digtal 01', file: 'sounds/digital-01.wav' },
  { id: 'd2', name: 'Digtal 02', file: 'sounds/digital-02.wav' },
  { id: 'd3', name: 'Digtal 03', file: 'sounds/digital-03.wav' },
  { id: 'r1', name: 'Real Ring 01', file: 'sounds/real-01.wav' },
  { id: 'r2', name: 'Real Ring 02', file: 'sounds/real-02.wav' },
  { id: 'r3', name: 'Real Ring 03', file: 'sounds/real-03.wav' },
]

const PopupApp = props => {
  const [state, setState] = useState({
    enabled: true,
    ringtone: 'd1'
  })
  
  const handleEnableChanged = enabled => {
    setState({ ...state, enabled })
    chrome.storage.local.set({ enabled })
  }
  
  const handleRingtoneChange = ringtone => {
    setState({ ...state, ringtone })
    chrome.storage.local.set({ ringtone })
    const ringtoneObj = SOUNDS.find(x => x.id === ringtone)
    chrome.runtime.sendMessage({
      type: 'play_sound',
      filename: ringtoneObj.file
    })
  }
  
  const init = () => {
    chrome.storage.local.get(null, settings => {
      console.log(settings)
      setState({ ...state, ...settings })
    })
  }
  
  useEffect(init, [])

  return (
    <div>
      <Row type="flex" justify="space-between" style={STYLE_ROW}>
        <Col span={12}><strong>Enabled</strong></Col>
        <Col span={12} style={STYLE_RIGHT}>
          <Switch
            size="small"
            checked={state.enabled}
            onChange={handleEnableChanged}
          />
        </Col>
      </Row>

      <Row type="flex" justify="space-between" style={STYLE_ROW}>
        <Col span={12}><strong>Ringtone</strong></Col>
        <Col span={12} style={STYLE_RIGHT}>
          <Select
            size="small"
            value={state.ringtone}
            onChange={handleRingtoneChange}
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
      </Row>

      <Row type="flex" justify="space-between" style={{ marginTop: '50px' }}>
        <Col span={24}>
          <Icon type="wifi" style={{ marginRight: '5px' }} />
          You are connected to airhost.
        </Col>
      </Row>
    </div>
  )
}

export default PopupApp
