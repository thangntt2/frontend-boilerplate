
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Keywords from '../../components/Keywords'
import { loadKeywordsPage, deleteKeyword, submitKeyword } from '../../actions'

class KeywordsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this)
    this.handleChannelChange = this.handleChannelChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      selectedChannel: 0,
      openCreate: false,
    }
  }
  componentWillMount() {
    this.props.loadKeywordsPage()
  }

  handleChannelChange(event, key, value) {
    this.setState({ selectedChannel: parseInt(value, 10) })
  }

  handleSubmit(keyword) {
    const kw = {
      keyword,
      channel: this.props.channels[this.state.selectedChannel].id,
    }
    this.props.submitKeyword(kw)
  }

  handleDeleteKeyword(keyword, channel) {
    const delKeyword = {
      ...keyword,
      channelId: channel.id,
    }
    this.props.deleteKeyword(delKeyword)
  }

  handleClickCreateButton() {
    this.setState({ openCreate: true })
  }

  render() {
    const { keywords, channels } = this.props
    return (
      <div>
        {channels.length > 0 &&
          <Keywords
            keywords={keywords}
            channels={channels}
            handleCreateButton={this.handleClickCreateButton}
            onDeleteKeyword={this.handleDeleteKeyword}
            onChannelChange={this.handleChannelChange}
            onSubmit={this.handleSubmit}
            open={this.state.openCreate}
            handleClose={() => this.setState({ openCreate: false })}
          />
        }
      </div>
    )
  }
}

KeywordsContainer.propTypes = {
  keywords: PropTypes.array,
  channels: PropTypes.array,
  loadKeywordsPage: PropTypes.func.isRequired,
  deleteKeyword: PropTypes.func.isRequired,
  submitKeyword: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { entities: { channels, keywords } } = state
  return {
    channels,
    keywords,
  }
}

export default connect(mapStateToProps, {
  loadKeywordsPage,
  deleteKeyword,
  submitKeyword,
})(KeywordsContainer)
