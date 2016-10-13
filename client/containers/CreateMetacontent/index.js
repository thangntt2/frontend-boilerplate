
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { HotKeys } from 'react-hotkeys'
import CreateMetacontent from '../../components/CreateMetacontent'
import { prepareCreateMetacontent, searchMetacontent, submitMetacontent } from '../../actions'
import MetacontentResults from '../../components/CreateMetacontent/metacontentsResult'

const categories = [
  { name: 'Địa danh', value: 'location' },
  { name: 'Nhân vật', value: 'person' },
  { name: 'Tổ chức', value: 'organization' },
  { name: 'Bài viết', value: 'article' },
]
const newsProviders = [
  'dantri.com.vn',
  'vnexpress.net',
  'xahoithongtin.vn',
  'vnmedia.vn',
]

const keyMap = {
  location: 'ctrl+1',
  person: 'ctrl+2',
  organization: 'ctrl+3',
  article: 'ctrl+4',
}

class CreateMetacontentContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleChannelChange = this.handleChannelChange.bind(this)
    this.handleNewsProviderChange = this.handleNewsProviderChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClickResult = this.handleClickResult.bind(this)
    this.state = {
      selectedCategory: categories[0].value,
      selectedChannel: 0,
      selectednewsProviders: newsProviders,
    }
  }

  componentWillMount() {
    this.props.prepareCreateMetacontent()
  }

  handleCategoryChange(e) {
    this.setState({ selectedCategory: e.target.value })
  }

  handleChannelChange(e) {
    this.setState({ selectedChannel: parseInt(e.target.value, 10) })
  }

  handleNewsProviderChange(e) {
    if (!e.target.checked) {
      this.setState({
        selectednewsProviders: this.state.selectednewsProviders
          .filter(newsProvider => (newsProvider !== e.target.name)),
      })
    } else {
      this.setState({
        selectednewsProviders: this.state.selectednewsProviders.concat(e.target.name),
      })
    }
  }
  handlers = {
    location: () => { this.setState({ selectedCategory: 'location' }) },
    person: () => { this.setState({ selectedCategory: 'person' }) },
    organization: () => { this.setState({ selectedCategory: 'organization' }) },
    article: () => { this.setState({ selectedCategory: 'article' }) },
  }

  handleClickResult(metacontent) {
    const mt = {
      ...metacontent,
      channel: this.props.channels[this.state.selectedChannel].id,
      category: this.state.selectedCategory,
    }
    this.props.submitMetacontent(mt)
  }

  handleSearch(searchTerm) {
    this.props.searchMetacontent(
      searchTerm,
      this.state.selectedCategory,
      this.state.selectednewsProviders,
    )
  }

  render() {
    const {
      channels,
      isSearching,
      result,
      submiting,
      submitSuccess,
      submitFailure,
    } = this.props
    return (
      <HotKeys keyMap={keyMap} handlers={this.handlers}>
        <CreateMetacontent
          channels={channels}
          selectedChannel={this.state.selectedChannel}
          onChannelChange={this.handleChannelChange}
          categories={categories}
          selectedCategory={this.state.selectedCategory}
          onCategoryChange={this.handleCategoryChange}
          newsProviders={newsProviders}
          selectednewsProviders={this.state.selectednewsProviders}
          onNewsProviderChange={this.handleNewsProviderChange}
          isSearching={isSearching}
          onSearch={this.handleSearch}
          submitSuccess={submitSuccess}
          submitFailure={submitFailure}
        />
        {result && result.length > 0 &&
          <MetacontentResults
            result={result}
            handleClick={this.handleClickResult}
            isSubmitting={submiting}
          />
        }
      </HotKeys>
    )
  }
}

CreateMetacontentContainer.propTypes = {
  channels: PropTypes.array,
  prepareCreateMetacontent: PropTypes.func.isRequired,
  searchMetacontent: PropTypes.func.isRequired,
  submitMetacontent: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  submiting: PropTypes.bool,
  submitSuccess: PropTypes.string,
  submitFailure: PropTypes.string,
  result: PropTypes.array,
}

function mapStateToProp(state) {
  const { entities: { channels } } = state
  const { searchMetacontent: { isSearching, result } } = state
  const { submitData: { submiting, success, error } } = state
  return {
    channels,
    isSearching,
    result,
    submiting,
    submitSuccess: success,
    submitFailure: error,
  }
}

export default connect(mapStateToProp, {
  prepareCreateMetacontent,
  searchMetacontent,
  submitMetacontent,
})(CreateMetacontentContainer)
