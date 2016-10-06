
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CreateKeyword from '../../components/CreateKeyword'
import { submitKeyword, prepareCreateKeyword } from '../../actions'

class CreateKeywordContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChannelChange = this.handleChannelChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      selectedChannel: 0,
    }
  }

  componentWillMount() {
    this.props.prepareCreateKeyword()
  }

  handleChannelChange(e) {
    this.setState({ selectedChannel: parseInt(e.target.value, 10) })
  }

  handleSubmit(keyword) {
    const kw = {
      keyword,
      channel: this.props.channels[this.state.selectedChannel].id,
    }
    this.props.submitKeyword(kw)
  }

  render() {
    const { channels, submitSuccess, submitFailure } = this.props

    return (
      <div>
        <CreateKeyword
          channels={channels}
          onChannelChange={this.handleChannelChange}
          onSubmit={this.handleSubmit}
          submitSuccess={submitSuccess}
          submitFailure={submitFailure}
        />
      </div>
    )
  }
}

CreateKeywordContainer.propTypes = {
  channels: PropTypes.array,
  prepareCreateKeyword: PropTypes.func.isRequired,
  submitKeyword: PropTypes.func.isRequired,
  submitSuccess: PropTypes.string,
  submitFailure: PropTypes.string,
}

function mapStateToProp(state) {
  const { entities: { channels } } = state
  const { submitData: { submiting, success, error } } = state
  return {
    channels,
    submiting,
    submitSuccess: success,
    submitFailure: error,
  }
}

export default connect(mapStateToProp, {
  prepareCreateKeyword,
  submitKeyword,
})(CreateKeywordContainer)
