
import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

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
      level: 'editor',
      password: '',
      passwordre: '',
      pwre: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmit && !nextProps.isSubmit) {
      this.props.onClose()
    }
  }

  handleSubmit() {
    const user = {
      username: this.state.id,
      name: this.state.name,
      level: this.state.level,
      password: this.state.password,
    }
    this.props.onSubmit(user)
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

    return (
      <Modal
        show={open}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo mới User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Quyền người dùng</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={this.state.level}
              onChange={(event) => { this.setState({ level: event.target.value }) }}
            >
              <option value="low">Chỉ đọc</option>
              <option value="editor">Nhập liệu</option>
              <option value="admin">Quản trị</option>
            </FormControl>
          </FormGroup>

          <FlatButton
            disabled={this.state.pwre || isSubmit}
            label={isSubmit ? 'Đang tạo...' : 'Tạo'}
            primary
            keyboardFocused
            onClick={this.handleSubmit}
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

CreateUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default CreateUser
