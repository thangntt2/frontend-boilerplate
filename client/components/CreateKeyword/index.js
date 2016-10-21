
import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import ChannelPicker from '../CreateMetacontent/channelPicker'

class CreateKeywords extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.state = {
      inputValue: '',
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state.inputValue)
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleButtonClicked() {
    this.handleSubmit()
  }

  render() {
    const { channels, onChannelChange, selectedChannel, isSubmit, open, handleClose } = this.props
    const actions = [
      <FlatButton
        label={isSubmit ? 'Đang tạo...' : 'Tạo'}
        disable={isSubmit}
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
      <FlatButton
        label="Hủy"
        primary={false}
        onTouchTap={handleClose}
      />,
    ]

    return (

      <div>
        <Dialog
          title="TẠO MỚI KEYWORD"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >
          <ChannelPicker
            channels={channels}
            handleOptionChange={onChannelChange}
            selected={selectedChannel}
          />
          <TextField
            hintText="Nhập Từ khóa"
            floatingLabelText="Từ khóa"
            floatingLabelFixed
            value={this.state.inputValue}
            onChange={(event) => { this.setState({ inputValue: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
        </Dialog>
      </div>
    )
  }
}

CreateKeywords.propTypes = {
  channels: PropTypes.array,
  onChannelChange: PropTypes.func.isRequired,
  selectedChannel: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default CreateKeywords
