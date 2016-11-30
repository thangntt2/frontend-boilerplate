
import React, { PropTypes } from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { includes } from 'lodash/collection'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CategoryRadioGroup from './categoryRadioGroup'
import ChannelPicker from './channelPicker'
import style from './style.css'

class CreateMetacontent extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnterPress = this.handleEnterPress.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
    this.state = {
      inputValue: '',
    }
  }

  handleSearch() {
    this.props.onSearch(this.state.inputValue)
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
    } = this.props

    return (
      <Paper className={style.searchform}>
        <Toolbar
          style={{
            backgroundColor: 'white',
          }}
        >
          <ToolbarGroup>
            <ToolbarTitle text="TẠO MỚI METACONTENT" />
          </ToolbarGroup>
        </Toolbar>
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
          <div>
            {newsProviders.map((newsProvider, index) =>
              <Checkbox
                key={index}
                checked={includes(selectednewsProviders, newsProvider)}
                onCheck={(e, isChecked) => onNewsProviderChange(newsProvider, isChecked)}
                label={newsProvider.name}
                style={{
                  width: '50%',
                  display: 'inline-block',
                }}
              />
            )}
          </div>
        }
        <TextField
          hintText="Nhập để tìm kiếm"
          floatingLabelText="Tìm kiếm"
          floatingLabelFixed
          value={this.state.inputValue}
          onChange={(event) => { this.setState({ inputValue: event.target.value }) }}
          autoFocus
          fullWidth
          onKeyPress={this.handleEnterPress}
        />
        <RaisedButton
          label={isSearching ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
          primary
          onClick={this.handleButtonClicked}
          disabled={isSearching}
        />
      </Paper>
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
  selectednewsProviders: PropTypes.arrayOf(PropTypes.object),
  onNewsProviderChange: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
}

export default CreateMetacontent
