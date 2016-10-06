
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Checkbox } from 'react-bootstrap'
import { includes } from 'lodash/collection'
import CategoryRadioGroup from './categoryRadioGroup'
import ChannelPicker from './channelPicker'


class CreateMetacontent extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.getInputValue = this.getInputValue.bind(this)
  }

  getInputValue() {
    return ReactDOM.findDOMNode(this.input).value
  }

  handleSearch() {
    this.props.onSearch(this.getInputValue())
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch()
    }
  }

  handleButtonClicked() {
    this.handleSearch()
  }

  render() {
    const {
      channels,
      selectedChannel,
      onChannelChange,
      categories,
      selectedCategory,
      onCategoryChange,
      newsProviders,
      selectednewsProviders,
      onNewsProviderChange,
      isSearching,
      submitSuccess,
      submitFailure,
    } = this.props

    return (
      <div>
        {submitSuccess && submitSuccess.length > 0 &&
          <div className="alert alert-success fade in">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            {submitSuccess}
          </div>
        }
        {submitFailure && submitFailure.length > 0 &&
          <div className="alert alert-danger fade in">
            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
            {submitFailure}
          </div>
        }
        <Panel header={'Tìm kiếm'}>
          <ChannelPicker
            channels={channels}
            handleOptionChange={onChannelChange}
            selected={selectedChannel}
          />

          <CategoryRadioGroup
            selected={selectedCategory}
            categoryList={categories}
            handleOptionChange={onCategoryChange}
          />

          {selectedCategory === 'article' &&
            <FormGroup>
              {newsProviders.map((newsProvider, index) =>
                <Checkbox
                  inline
                  key={index}
                  checked={includes(selectednewsProviders, newsProvider)}
                  onChange={onNewsProviderChange}
                  name={newsProvider}
                >
                  {newsProvider}
                </Checkbox>
              )}
            </FormGroup>
          }

          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Tìm kiếm</ControlLabel>
            <FormControl
              type="text"
              placeholder="Nhập để tìm kiếm"
              ref={(c) => { this.input = c }}
              onKeyPress={this.handleEnterPress}
              autoFocus
            />
          </FormGroup>

          <Button
            bsStyle="primary"
            onClick={this.handleButtonClicked}
            tabIndex="-1"
            disabled={isSearching}
          >
            {(isSearching) ? 'Tìm kiếm...' : 'Tìm kiếm'}
          </Button>
        </Panel>
      </div>
    )
  }
}

CreateMetacontent.propTypes = {
  channels: PropTypes.array,
  selectedChannel: PropTypes.number,
  onChannelChange: PropTypes.func.isRequired,
  categories: PropTypes.array,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  newsProviders: PropTypes.array,
  selectednewsProviders: PropTypes.arrayOf(PropTypes.string),
  onNewsProviderChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
}

export default CreateMetacontent
