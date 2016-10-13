
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadChannelsPage, deleteChannel, navigate } from '../../actions'
import Channels from '../../components/Channels'


class ChannelsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteChannel = this.handleDeleteChannel.bind(this)
    this.handleOnCreateButton = this.handleOnCreateButton.bind(this)
  }
  
  componentWillMount() {
    this.props.loadChannelsPage()
  }

  handleDeleteChannel(channel) {
    this.props.deleteChannel(channel)
  }

  handleOnCreateButton() {
    this.props.navigate('/channel/create')
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
  navigate: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
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
  navigate,
})(ChannelsContainer)
