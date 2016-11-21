
import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

class DeleteComfirm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      inputPw: '',
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.props.user, this.state.inputPw)
  }

  render() {
    const { open, onClose, isSubmit } = this.props

    return (
      <Modal
        show={open}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nhập mật khẩu để xác minh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            hintText="Mật khẩu"
            floatingLabelText="Mật khẩu"
            floatingLabelFixed
            autoFocus
            fullWidth
            value={this.state.inputPw}
            onChange={(e) => { this.setState({ inputPw: e.target.value }) }}
            type="password"
          />
          <FlatButton
            disabled={isSubmit}
            label={isSubmit ? 'Đang xóa...' : 'Xác nhận'}
            primary
            keyboardFocused
            onTouchTap={this.handleSubmit}
          />

          <FlatButton
            label="Hủy"
            primary={false}
            onTouchTap={onClose}
          />
        </Modal.Body>
      </Modal>
    )
  }
}

DeleteComfirm.propTypes = {
  open: PropTypes.bool,
  isSubmit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export default DeleteComfirm
