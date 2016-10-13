
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import { getStoredState, createPersistor } from 'redux-persist'
import rootSaga from './sagas'

import ChannelsContainer from './containers/Channels'
import CreateChannelContainer from './containers/CreateChannel'
import MetacontentsContainer from './containers/Metacontents'
import CreateMetacontentContainer from './containers/CreateMetacontent'
import KeywordsContainer from './containers/Keywords'
import CreateKeywordContainer from './containers/CreateKeyword'
import LoginContainer from './containers/Login'
import DummyLogoutContainer from './containers/Logout'
import App from './containers/App'
import configureStore from './store/configureStore'

const persistConfig = { whitelist: ['auth'] }

getStoredState(persistConfig, (err, restoredState) => {
  const store = configureStore(restoredState)
  store.runSaga(rootSaga)
  const history = syncHistoryWithStore(browserHistory, store)
  createPersistor(store, persistConfig)

  const checkAuth = (nextState, replace) => {
    const { auth: { access_token, expires_on } } = store.getState()
    const loggedIn = access_token && expires_on > new Date().getTime()

    if (nextState.location.pathname !== '/login' && nextState.location.pathname !== '/logout') {
      if (!loggedIn) {
        replace('/login')
      }
    }
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route onEnter={checkAuth} >
            <Route path="/channels" component={ChannelsContainer} />
            <Route path="/metacontents" component={MetacontentsContainer} />
            <Route path="/metacontent/create" component={CreateMetacontentContainer} />
            <Route path="/keywords" component={KeywordsContainer} />
            <Route path="/keyword/create" component={CreateKeywordContainer} />
            <Route path="/channel/create" component={CreateChannelContainer} />
            <Route path="/logout" component={DummyLogoutContainer} />
          </Route>
          <Route path="/login" component={LoginContainer} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
})

