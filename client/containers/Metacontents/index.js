
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { loadMetacontentsPage, navigate, deleteMetacontent } from '../../actions'
import Metacontents from '../../components/Metacontents'


class MetacontentsContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClickCreateButton = this.handleClickCreateButton.bind(this)
    this.handleDeleteFunction = this.handleDeleteFunction.bind(this)
  }
  componentWillMount() {
    this.props.loadMetacontentsPage()
  }

  handleClickCreateButton() {
    this.props.navigate('/metacontent/create')
  }

  handleDeleteFunction(metacontent, channel) {
    const deleteMt = {
      ...metacontent,
      channelId: channel.id,
    }
    this.props.deleteMetacontent(deleteMt)
  }

  render() {
    const { channels, metacontents } = this.props
    return (
      <div>
        {channels.length > 0 &&
          <Metacontents
            channels={channels}
            metacontents={metacontents}
            handleCreateButton={this.handleClickCreateButton}
            onDeleteMetacontent={this.handleDeleteFunction}
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
  deleteMetacontent: PropTypes.func.isRequired,
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
  deleteMetacontent,
})(MetacontentsContainer)
