
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { loadMetacontentsPage, navigate } from '../../actions'
import Metacontents from '../../components/Metacontents'


class MetacontentsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
  }
  componentWillMount() {
    this.props.loadMetacontentsPage()
  }

  handleClickCreateButton() {
    this.props.navigate('/keyword/create')
  }

  render() {
    const { channels, metacontents } = this.props
    return (
      <div>
        {channels.length > 0 && metacontents.length > 0 &&
          <Metacontents
            channels={channels}
            metacontents={metacontents}
            handleCreateButton={this.handleClickCreateButton}
          />
        }
      </div>
    )
  }
}

MetacontentsContainer.propTypes = {
  loadMetacontentsPage: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      icon: PropTypes.string,
      channel: PropTypes.string,
    })),
  metacontents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.integer,
      name: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      image: PropTypes.string,
    })),
  navigate: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { entities: { channels, metacontents } } = state
  return {
    channels,
    metacontents,
  }
}

export default connect(mapStateToProps, {
  loadMetacontentsPage,
  navigate,
})(MetacontentsContainer)
