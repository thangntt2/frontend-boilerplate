
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadChannelsPage } from '../../actions'
import Channels from '../../components/Channels'


class ChannelsContainer extends Component {
  componentWillMount() {
    this.props.loadChannelsPage()
  }

  render() {
    const { channels } = this.props

    return (
      <div>
        { !(channels && channels.length > 0) ? null :
          <Channels channels={channels} />
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
}

function mapStateToProps(state) {
  const { entities: { channels } } = state
  return {
    channels,
  }
}

export default connect(mapStateToProps, {
  loadChannelsPage,
})(ChannelsContainer)
