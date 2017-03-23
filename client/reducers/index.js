
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import * as ActionTypes from '../actions'
import auth from './auth'
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

function submitData(state = { submiting: false }, action) {
  if (action.type.includes('SUBMIT')) {
    if (action.data) { // mean searching
      return ({
        ...state,
        submiting: true,
      })
    }
    if (action.success || action.error) {
      return ({
        ...state,
        submiting: false,
      })
    }
  }
  return state
}

function deleteData(state = { deletting: false }, action) {
  if (action.type.includes('DELETE')) {
    if (action.success || action.error) {
      return ({
        ...state,
        deletting: false,
      })
    }
    return ({
      ...state,
      deletting: true,
    })
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
function message(state = { success: undefined, error: undefined }, action) {
  const { type, error, success } = action

  if (type === ActionTypes.RESET_MESSAGE) {
    return {
      success: undefined,
      error: undefined,
    }
  } else if (error) {
    return { error: error.message }
  } else if (success) {
    return { success }
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  message,
  routing,
  searchMetacontent,
  submitData,
  auth,
  deleteData,
})

export default rootReducer
