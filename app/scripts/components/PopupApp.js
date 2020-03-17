import { Switch, Select, Row, Col, Icon } from 'antd'

const STYLE_ROW = {
  marginBottom: '15px'
}

const STYLE_RIGHT = {
  textAlign: 'right'
}

export default props => {
  const handleRingtoneChange = () => {

  }

  return (
    <div>
      <Row type="flex" justify="space-between" style={STYLE_ROW}>
        <Col span={12}><strong>Enabled</strong></Col>
        <Col span={12} style={STYLE_RIGHT}>
          <Switch size="small" defaultChecked />
        </Col>
      </Row>

      <Row type="flex" justify="space-between" style={STYLE_ROW}>
        <Col span={12}><strong>Ringtone</strong></Col>
        <Col span={12} style={STYLE_RIGHT}>
          <Select
            size="small"
            defaultValue="lucy"
            onChange={handleRingtoneChange}
            style={{ width: '100%' }}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
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
