
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CreateChannel from '../../components/CreateChannel'
import { submitChannel } from '../../actions'

class CreateChannelContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(channel) {
    this.props.submitChannel(channel)
  }

  render() {
    const { submitSuccess, submitFailure } = this.props

    return (
      <CreateChannel
        onSubmit={this.handleSubmit}
        submitSuccess={submitSuccess}
        submitFailure={submitFailure}
      />
    )
  }
}

CreateChannelContainer.propTypes = {
  submitChannel: PropTypes.func.isRequired,
  submitSuccess: PropTypes.string,
  submitFailure: PropTypes.string,
}

function mapStateToProp(state) {
  const { submitData: { submiting, success, error } } = state
  return {
    submiting,
    submitSuccess: success,
    submitFailure: error,
  }
}

export default connect(mapStateToProp, {
  submitChannel,
})(CreateChannelContainer)
