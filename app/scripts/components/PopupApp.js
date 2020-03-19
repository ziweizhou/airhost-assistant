import Heading from './Heading'
import Connection from './Connection'
import Settings from './Settings'

export default class PopupApp extends React.Component {
  render () {
    return (
      <div>
        <Heading />
        <Settings />
        <Connection />
      </div>
    )  
  }
}
