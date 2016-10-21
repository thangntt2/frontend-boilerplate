
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadChannelsPage, deleteChannel, submitChannel } from '../../actions'
import Channels from '../../components/Channels'


class ChannelsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteChannel = this.handleDeleteChannel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnCreateButton = this.handleOnCreateButton.bind(this)
    this.state = {
      openCreate: false,
    }
  }

  componentWillMount() {
    this.props.loadChannelsPage()
  }

  handleSubmit(channel) {
    this.props.submitChannel(channel)
  }

  handleDeleteChannel(channel) {
    this.props.deleteChannel(channel)
  }

  handleOnCreateButton() {
    this.setState({ openCreate: true })
  }

  render() {
    const { channels, deletting } = this.props

    return (
      <div>
        { !(channels) ? null :
          <Channels
            channels={channels}
            onDeleteChannel={this.handleDeleteChannel}
            deletting={deletting}
            onCreateButton={this.handleOnCreateButton}
            open={this.state.openCreate}
            handleClose={() => this.setState({ openCreate: false })}
            onSubmit={this.handleSubmit}
          />
        }
      </div>
    )
  }
}

ChannelsContainer.propTypes = {
  loadChannelsPage: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      channel: PropTypes.string,
    })),
  deleteChannel: PropTypes.func.isRequired,
  submitChannel: PropTypes.func.isRequired,
  deletting: PropTypes.bool,
}

function mapStateToProps(state) {
  const { entities: { channels } } = state
  const { deleteData: { deletting } } = state
  return {
    channels,
    deletting,
  }
}

export default connect(mapStateToProps, {
  loadChannelsPage,
  deleteChannel,
  submitChannel,
})(ChannelsContainer)
