
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { HotKeys } from 'react-hotkeys'
import { Responsive, WidthProvider } from 'react-grid-layout'
import CreateMetacontent from '../../components/CreateMetacontent'
import { prepareCreateMetacontent, searchMetacontent, submitMetacontent } from '../../actions'
import MetacontentResults from '../../components/CreateMetacontent/metacontentsResult'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

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
  person: ['ctrl', '2'],
  organization: 'ctrl+3',
  article: 'ctrl+4',
}

const lg_layout = x => [
  { i: 'search', x, y: 0, w: 4, h: 0, static: true },
  { i: 'results', x: x + 4, y: 0, w: x === 0 ? 8 : 0, h: 0, static: true },
]

const sm_layout = x => [
  { i: 'search', x, y: 0, w: 4, h: 2, static: true },
  { i: 'results', x: x + 4, y: 0, w: x === 0 ? 8 : 0, h: 10, static: true },
]

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
      x: 4,
    }
  }

  componentWillMount() {
    this.props.prepareCreateMetacontent()
  }

  handleCategoryChange(e) {
    this.setState({ selectedCategory: e.target.value })
  }

  handleChannelChange(event, key, value) {
    this.setState({ selectedChannel: parseInt(value, 10) })
  }

  handleNewsProviderChange(provider, ischecked) {
    if (!ischecked) {
      this.setState({
        selectednewsProviders: this.state.selectednewsProviders
          .filter(newsProvider => (provider !== newsProvider)),
      })
    } else {
      this.setState({
        selectednewsProviders: this.state.selectednewsProviders.concat(provider),
      })
    }
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

    const handlers = {
      location: () => { this.setState({ selectedCategory: 'location' }) },
      person: () => { this.setState({ selectedCategory: 'person' }) },
      organization: () => { this.setState({ selectedCategory: 'organization' }) },
      article: () => { this.setState({ selectedCategory: 'article' }) },
    }

    return (
      <HotKeys keyMap={keyMap} handlers={handlers} >
        <ResponsiveReactGridLayout
          className="layout"
          breakpoints={{ lg: 1200, sm: 768 }}
          cols={{ lg: 12, sm: 6 }}
          autoSize
          useCSSTransforms
          layouts={{ lg: lg_layout(result ? 0 : 4), sm: sm_layout(4) }}
        >
          <div key="search" style={{ transition: 'transform .7s' }}>
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
          </div>
          <div key="results" style={{ transitionDelay: '.7s', transition: 'transform .7s' }}>
            {result && result.length > 0 &&
              <MetacontentResults
                key={result}
                result={result}
                handleClick={this.handleClickResult}
                isSubmitting={submiting}
              />
            }
          </div>
        </ResponsiveReactGridLayout>
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
