
import React, { PropTypes } from 'react'
import { Panel, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import style from '../../style/style.css'

class CreateChannel extends React.Component {
  constructor(props) {
    super(props)
    this.getInputValues = this.getInputValues.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
  }

  getInputValues() {
    const newChannel = {
      id: ReactDOM.findDOMNode(this.id).value,
      name: ReactDOM.findDOMNode(this.name).value,
      channel: ReactDOM.findDOMNode(this.channel).value,
      icon: ReactDOM.findDOMNode(this.icon).value,
    }
    return newChannel
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.props.onSubmit(this.getInputValues())
  }

  handleButtonClicked() {
    this.handleSubmit()
  }

  render() {
    const { isSubmit, submitSuccess, submitFailure } = this.props
    return (
      <Panel header={'Tạo Kênh mới'} className={style.centerbody}>
        {submitSuccess && submitSuccess.length > 0 &&
          <div className="alert alert-success fade in">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            {submitSuccess}
          </div>
        }
        {submitFailure && submitFailure.length > 0 &&
          <div className="alert alert-danger fade in">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            {submitFailure}
          </div>
        }
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>ID</ControlLabel>
          <FormControl
            type="text"
            placeholder="Nhập ID kênh"
            ref={(c) => { this.id = c }}
            onKeyPress={this.handleEnterPress}
            autoFocus
          />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Tên</ControlLabel>
          <FormControl
            type="text"
            placeholder="Nhập tên kênh"
            ref={(c) => { this.name = c }}
            onKeyPress={this.handleEnterPress}
          />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Số kênh</ControlLabel>
          <FormControl
            type="text"
            placeholder="Nhập số kênh"
            ref={(c) => { this.channel = c }}
            onKeyPress={this.handleEnterPress}
          />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Biểu tượng</ControlLabel>
          <FormControl
            type="text"
            placeholder="Đường dẫn đến biểu tượng kênh"
            ref={(c) => { this.icon = c }}
            onKeyPress={this.handleEnterPress}
          />
        </FormGroup>

        <Button
          bsStyle="primary"
          onClick={this.handleButtonClicked}
          tabIndex="-1"
          disabled={isSubmit}
        >
          {(isSubmit) ? 'Đang đăng...' : 'Đăng'}
        </Button>
      </Panel>
   )
  }
}

CreateChannel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  submitSuccess: PropTypes.string,
  submitFailure: PropTypes.string,
}

export default CreateChannel
