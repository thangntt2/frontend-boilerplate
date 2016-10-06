
import React, { PropTypes } from 'react'
import { FormControl, ControlLabel, FormGroup, Panel, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import ChannelPicker from '../CreateMetacontent/channelPicker'

class CreateKeywords extends React.Component {
  constructor(props) {
    super(props)
    this.getInputValue = this.getInputValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
  }

  getInputValue() {
    return ReactDOM.findDOMNode(this.input).value
  }

  handleSubmit() {
    this.props.onSubmit(this.getInputValue())
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
    const { channels, onChannelChange, selectedChannel, isSubmit, submitSuccess, submitFailure } = this.props

    return (
      <Panel header={'Tìm kiếm'}>
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
        <ChannelPicker
          channels={channels}
          handleOptionChange={onChannelChange}
          selected={selectedChannel}
        />

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Tìm kiếm</ControlLabel>
          <FormControl
            type="text"
            placeholder="Nhập để tìm kiếm"
            ref={(c) => { this.input = c }}
            onKeyPress={this.handleEnterPress}
            autoFocus
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

CreateKeywords.propTypes = {
  channels: PropTypes.array,
  onChannelChange: PropTypes.func.isRequired,
  selectedChannel: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool,
  submitSuccess: PropTypes.string,
  submitFailure: PropTypes.string,
}

export default CreateKeywords
