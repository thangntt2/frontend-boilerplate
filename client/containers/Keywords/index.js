
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Keywords from '../../components/Keywords'
import { loadKeywordsPage, navigate } from '../../actions'

class KeywordsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
  }
  componentWillMount() {
    this.props.loadKeywordsPage()
  }

  handleClickCreateButton() {
    this.props.navigate('/keyword/create')
  }

  render() {
    const { keywords, channels } = this.props
    if (!keywords) {
      return ('loading....')
    }
    return (
      <div>
        <Keywords
          keywords={keywords}
          channels={channels}
          handleCreateButton={this.handleClickCreateButton}
        />
      </div>
    )
  }
}

KeywordsContainer.propTypes = {
  keywords: PropTypes.array,
  channels: PropTypes.array,
  loadKeywordsPage: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
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
})(KeywordsContainer)
