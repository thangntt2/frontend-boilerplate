
import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.handlePasswordre = this.handlePasswordre.bind(this)
    this.state = {
      id: '',
      name: '',
      level: '',
      password: '',
      passwordre: '',
      pwre: false,
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.state.inputValue)
  }

  handleButtonClicked() {
    this.handleSubmit()
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handlePasswordre(event) {
    this.setState({ passwordre: event.target.value })
    if (event.target.value !== this.state.password) {
      this.setState({ pwre: true })
    } else {
      this.setState({ pwre: false })
    }
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
          title="TẠO MỚI USER"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          <TextField
            hintText="Tên đăng nhập"
            floatingLabelText="ID"
            floatingLabelFixed
            value={this.state.id}
            onChange={(event) => { this.setState({ id: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Họ và tên"
            floatingLabelText="Họ và tên"
            floatingLabelFixed
            value={this.state.name}
            onChange={(event) => { this.setState({ name: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
          />
          <TextField
            hintText="Mật khẩu"
            floatingLabelText="Mật khẩu"
            floatingLabelFixed
            value={this.state.password}
            onChange={(event) => { this.setState({ password: event.target.value }) }}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
            type="password"
          />
          <TextField
            hintText="Nhập lại mật khẩu"
            floatingLabelText="Nhập lại mật khẩu"
            floatingLabelFixed
            value={this.state.passwordre}
            onChange={this.handlePasswordre}
            autoFocus
            onKeyPress={this.handleEnterPress}
            fullWidth
            errorText={this.state.pwre ? 'Nhập lại mật khẩu phải trùng' : undefined}
            type="password"
          />
          <SelectField
            floatingLabelText="Quyền người dùng"
          >
            <MenuItem value="low" primaryText="Chỉ đọc" />
            <MenuItem value="editor" primaryText="Nhập liệu" />
            <MenuItem value="admin" primaryText="Quản trị" />
          </SelectField>
        </Dialog>
      </div>
    )
  }
}

CreateUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default CreateUser
