
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Keywords from '../../components/Keywords'
import { loadKeywordsPage, navigate, deleteKeyword } from '../../actions'

class KeywordsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this)
  }
  componentWillMount() {
    this.props.loadKeywordsPage()
  }

  handleDeleteKeyword(keyword, channel) {
    const delKeyword = {
      ...keyword,
      channelId: channel.id,
    }
    this.props.deleteKeyword(delKeyword)
  }

  handleClickCreateButton() {
    this.props.navigate('/keyword/create')
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
  navigate: PropTypes.func.isRequired,
  deleteKeyword: PropTypes.func.isRequired,
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
  navigate,
  deleteKeyword,
})(KeywordsContainer)
