
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadChannelsPage, deleteChannel, submitChannel } from '../../actions'
import Channels from '../../components/Channels'
import DeleteConfirm from '../../components/Channels/deleteConfirm'

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
    const { channels, deletting, submiting } = this.props

    return (
      <div>
        { !(channels) ? null :
          <div>
            <Channels
              channels={channels}
              onDeleteChannel={(channel) => {
                this.setState({
                  openDelete: true,
                  selectedDelChannel: channel,
                })
              }}
              onCreateButton={this.handleOnCreateButton}
              open={this.state.openCreate}
              handleClose={() => this.setState({ openCreate: false })}
              onSubmit={this.handleSubmit}
              isSubmit={submiting}
            />
            <DeleteConfirm
              open={this.state.openDelete}
              onSubmit={this.handleDeleteChannel}
              onClose={() => { this.setState({ openDelete: false }) }}
              channel={this.state.selectedDelChannel}
              isSubmit={deletting}
            />
          </div>
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
  submiting: PropTypes.bool,
}

function mapStateToProps(state) {
  const { entities: { channels } } = state
  const { submitData: { submiting } } = state
  const { deleteData: { deletting } } = state
  return {
    channels,
    deletting,
    submiting,
  }
}

export default connect(mapStateToProps, {
  loadChannelsPage,
  deleteChannel,
  submitChannel,
})(ChannelsContainer)
