
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from '../actions'
// import fetchData from './fetchData'

function entities(state = { channels: [], metacontents: [], keywords: [] }, action) {
  if (action.response) {
    return ({
      ...state,
      ...action.response,
    })
  }
  return state
}

function submitData(state = { submiting: false, success: '', error: '' }, action) {
  if (action.type.includes('SUBMIT')) {
    if (action.error) {
      return ({
        ...state,
        ...action.error,
      })
    }
    if (action.data) { // mean searching
      return ({
        ...state,
        submiting: true,
      })
    }
    if (action.success) {
      return ({
        ...state,
        submiting: false,
        success: action.success,
      })
    }
    if (action.error) {
      return ({
        ...state,
        submiting: false,
        error: action.error,
      })
    }
    if (action.type === 'SUBMIT_CLEAN_REPORT') {
      return ({
        ...state,
        success: '',
        error: '',
      })
    }
  }
  return state
}

function searchMetacontent(state = {
  selectedChannel: '',
  selectedCategory: 'location',
  isSearching: false,
}, action) {
  if (action.type === 'SEARCHING_METACONTENT') {
    return ({
      ...state,
      isSearching: true,
    })
  }
  if (action.type === 'SEARCH_METACONTENT_OK') {
    return ({
      ...state,
      isSearching: false,
      result: action.result,
    })
  }
  if (action.type === 'METACONTENTS_SUBMIT_OK') {
    return ({
      ...state,
      result: undefined,
    })
  }
  let newState = state
  if (action.channels) {
    newState = {
      ...state,
      ...action.channels,
    }
  }
  if (action.preForms) {
    newState = {
      ...newState,
      selectedChannel: action.preForms.selectedChannel,
      selectedCategory: action.preForms.selectedCategory,
      selectednewsProviders: action.preForms.selectednewsProviders,
    }
  }
  return newState
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing,
  searchMetacontent,
  submitData,
})

export default rootReducer
