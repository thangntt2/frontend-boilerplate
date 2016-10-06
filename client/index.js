
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import rootSaga from './sagas'

import ChannelsContainer from './containers/Channels'
import MetacontentsContainer from './containers/Metacontents'
import CreateMetacontentContainer from './containers/CreateMetacontent'
import KeywordsContainer from './containers/Keywords'
import CreateKeywordContainer from './containers/CreateKeyword'
import App from './containers/App'

import configureStore from './store/configureStore'

const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/channels" component={ChannelsContainer} />
        <Route path="/metacontents" component={MetacontentsContainer} />
        <Route path="/metacontent/create" component={CreateMetacontentContainer} />
        <Route path="/keywords" component={KeywordsContainer} />
        <Route path="/keyword/create" component={CreateKeywordContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
