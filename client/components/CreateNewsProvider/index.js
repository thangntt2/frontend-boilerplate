
import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class CreateNewsProviders extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.state = {
      name: '',
      baseurl: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmit && !nextProps.isSubmit) {
      this.props.onClose()
    }
  }

  handleSubmit() {
    this.props.onSubmit({
      name: this.state.name,
      baseurl: this.state.baseurl,
    })
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
    const { isSubmit, open, onClose } = this.props
    const actions = [
      <FlatButton
        label={isSubmit ? 'Đang tạo...' : 'Tạo'}
        disabled={isSubmit}
        primary
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
      <FlatButton
        label="Hủy"
        primary={false}
        onTouchTap={onClose}
      />,
    ]

    return (
      <div>
        <Dialog
          title="TẠO MỚI KEYWORD"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          <TextField
            hintText="Nhập tên báo"
            floatingLabelText="Tên báo"
            floatingLabelFixed
            value={this.state.name}
            onChange={(event) => { this.setState({ name: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Nhập đường dẫn đến báo"
            floatingLabelText="Đường dẫn"
            floatingLabelFixed
            value={this.state.baseurl}
            onChange={(event) => { this.setState({ baseurl: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
        </Dialog>
      </div>
    )
  }
}

CreateNewsProviders.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default CreateNewsProviders
