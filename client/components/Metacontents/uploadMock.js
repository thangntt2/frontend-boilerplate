import React from 'react'
import { FlatButton } from 'material-ui'
import { Modal, ControlLabel } from 'react-bootstrap'
import Upload from 'material-ui-upload/Upload'
import ChannelPicker from '../CreateMetacontent/channelPicker'

class Uploadmock extends React.Component {
  constructor(props) {
    super(props)
    this.onChannelChange = this.onChannelChange.bind(this)
    this.onFileLoad = this.onFileLoad.bind(this)
    this.state = {
      selectedChannel: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmit && !nextProps.isSubmit) {
      this.props.onClose()
    }
  }

  onChannelChange(event, key, value) {
    this.setState({ selectedChannel: parseInt(value, 10) })
  }

  onFileLoad(e) {
    this.setState({
      result: e.target.result,
    })
  }

  render() {
    const { open, onClose, channels, onSubmit, isSubmit } = this.props
    return (
      <Modal
        show={open}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChannelPicker
            channels={channels}
            handleOptionChange={this.onChannelChange}
            selected={this.state.selectedChannel}
          />
          <ControlLabel>Tải lên</ControlLabel>
          <Upload onFileLoad={this.onFileLoad} />
          <FlatButton
            disabled={isSubmit}
            label={isSubmit ? 'Đang tạo...' : 'Tạo'}
            primary
            keyboardFocused
            onClick={() => onSubmit({ file: this.state.result, channel: channels[this.state.selectedChannel] })}
          />

          <FlatButton
            label="Hủy"
            primary={false}
            onClick={onClose}
          />
        </Modal.Body>
      </Modal>
    )
  }
}

Uploadmock.propTypes = {
  open: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  channels: React.PropTypes.array,
  onSubmit: React.PropTypes.func,
  isSubmit: React.PropTypes.bool,
}

export default Uploadmock
