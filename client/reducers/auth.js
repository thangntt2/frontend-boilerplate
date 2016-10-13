
import * as ActionTypes from '../actions'

const auth = (state = { id_token: undefined, access_token: undefined, expiresOn: undefined }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST: {
      return ({
        ...state,
        submitting: true,
      })
    }
    case ActionTypes.LOGIN.SUCCESS: {
      const { response } = action
      return ({
        ...state,
        id_token: response.id,
        access_token: response.accessToken,
        expires_on: response.accessTokenExpiresOn,
        submitting: false,
      })
    }
    case ActionTypes.LOGIN.FAILURE: {
      return ({
        ...state,
        submitting: false,
      })
    }
    case ActionTypes.LOGOUT_REQUEST: {
      return ({
        ...state,
        id_token: undefined,
        access_token: undefined,
        expires_on: undefined,
      })
    }
    default: {
      if (action.error && action.error.status && action.error.status === 401) {
        return ({
          ...state,
          id_token: undefined,
          access_token: undefined,
          expires_on: undefined,
        })
      }
      return state
    }
  }
}

export default auth
