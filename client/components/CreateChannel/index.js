
import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class CreateChannel extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.state = {
      id: '',
      name: '',
      channel: '',
      icon: '',
    }
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state)
  }

  handleButtonClicked() {
    this.handleSubmit()
  }

  render() {
    const { isSubmit, handleClose, open } = this.props
    const actions = [
      <FlatButton
        label={isSubmit ? 'Đang tạo...' : 'Tạo'}
        disabled={isSubmit}
        primary
        keyboardFocused
        onTouchTap={() => this.handleSubmit()}
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
          title="TẠO KÊNH MỚI"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
        >
          <TextField
            hintText="Nhập ID kênh"
            floatingLabelText="ID"
            floatingLabelFixed
            value={this.state.id}
            onChange={(event) => { this.setState({ id: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Nhập số kênh"
            floatingLabelText="Số kênh"
            floatingLabelFixed
            value={this.state.channel}
            onChange={(event) => { this.setState({ channel: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Nhập tên kênh"
            floatingLabelText="Tên kênh"
            floatingLabelFixed
            value={this.state.name}
            onChange={(event) => { this.setState({ name: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Nhập biểu tượng kênh"
            floatingLabelText="Biểu tượng"
            floatingLabelFixed
            value={this.state.icon}
            onChange={(event) => { this.setState({ icon: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
        </Dialog>
      </div>
   )
  }
}

CreateChannel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

export default CreateChannel
