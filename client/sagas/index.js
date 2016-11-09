
import { take, put, call, fork, select } from 'redux-saga/effects'
import { delay, takeEvery } from 'redux-saga'
import * as apis from '../apis'
import * as actions from '../actions'

const { channels, metacontents, keywords, login } = actions

export const getAccessToken = state => state.auth.access_token

function* fetchData(entity, apiFn, accessToken) {
  yield put(entity.request())
  const { response, error } = yield call(apiFn, accessToken)
  if (response) {
    yield put(entity.success(response))
  } else {
    const errorMessage = {
      status: error.status,
      text: error.response.text,
    }
    yield put(entity.failure(errorMessage))
    if (errorMessage.status === 401) {
      yield put(actions.navigate('/login'))
    }
    yield call(delay, 5000)
  // yield wait(500)
    yield put(actions.resetMessage())
  }
}

function* deleteData(data, entity, apiFn, accessToken, reload) {
  yield put(entity.delete(data))
  const { response, error } = yield call(apiFn, data, accessToken)
  if (response) {
    yield call(reload)
    yield put(entity.delete_ok(data))
  } else {
    const errorMessage = {
      status: error.status,
      text: error.response.text,
    }
    yield put(entity.delete_fail(errorMessage))
    if (errorMessage.status === 401) {
      yield put(actions.navigate('/login'))
    }
  }
  yield call(delay, 5000)
  // yield wait(500)
  yield put(actions.resetMessage())
}

function* sendData(data, entity, apiFn, accessToken) {
  yield put(entity.submit(data))
  const { response, error } = yield call(apiFn, data, accessToken)
  if (response) {
    yield put(entity.submit_ok(data))
  } else {
    const errorMessage = {
      status: error.status,
      text: error.response.text,
    }
    yield put(entity.submit_fail(errorMessage))
    if (errorMessage.status === 401) {
      yield put(actions.navigate('/login'))
    }
  }
  yield call(delay, 5000)
  // yield wait(500)
  yield put(actions.resetMessage())
}

function* handleLoginFlow(username, password) {
  yield put(login.request(username, password))
  const { token, error } = yield call(apis.Auth.login, username, password)
  if (token) {
    yield put(login.success(token))
    yield put(actions.navigate('/'))
  } else {
    const errorMessage = {
      status: error.status,
      text: error.response.text,
    }
    yield put(login.failure(errorMessage))
  }

  yield call(delay, 5000)
  // yield wait(500)
  yield put(actions.resetMessage())
}

export const fetchChannels = accessToken => fetchData.bind(null, channels, apis.Channel.fetchChannelsList, accessToken)
export const fetchMetacontents = accessToken => fetchData.bind(null, metacontents, apis.Metacontent.fetchMetacontentsList, accessToken)
export const fetchKeywords = accessToken => fetchData.bind(null, keywords, apis.Keyword.fetchKeywordsList, accessToken)

function* loadChannels() {
  const accessToken = yield select(getAccessToken)
  const fetch = fetchChannels(accessToken)
  yield call(fetch)
}

function* loadKeywords() {
  const accessToken = yield select(getAccessToken)
  const fetch1 = fetchChannels(accessToken)
  const fetch2 = fetchKeywords(accessToken)
  yield [
    call(fetch1),
    call(fetch2),
  ]
}

function* loadMetacontents() {
  const accessToken = yield select(getAccessToken)
  const fetch1 = fetchChannels(accessToken)
  const fetch2 = fetchMetacontents(accessToken)
  yield [
    call(fetch1),
    call(fetch2),
  ]
}

function* submitMetacontent(data) {
  const accessToken = yield select(getAccessToken)
  yield call(sendData, data, metacontents, apis.Metacontent.submit, accessToken)
}

function* submitKeyword(data) {
  const accessToken = yield select(getAccessToken)
  yield call(sendData, data, keywords, apis.Keyword.submit, accessToken)
  yield call(loadKeywords)
}

function* submitChannel(data) {
  const accessToken = yield select(getAccessToken)
  yield call(sendData, data, channels, apis.Channel.submit, accessToken)
}

function* deleteMetacontent(metacontent) {
  const accessToken = yield select(getAccessToken)
  yield call(deleteData, metacontent, metacontents, apis.Metacontent.del, accessToken, loadMetacontents)
}

function* deleteChannel(channel) {
  const accessToken = yield select(getAccessToken)
  yield call(deleteData, channel, channels, apis.Channel.del, accessToken, loadChannels)
}

function* deleteKeyword(keyword) {
  const accessToken = yield select(getAccessToken)
  yield call(deleteData, keyword, keywords, apis.Keyword.del, accessToken, loadKeywords)
}

function* searchMetacontent(entity, category, sites) {
  const accessToken = yield select(getAccessToken)
  const { response, error } =
    (category !== 'article') ?
      yield call(apis.Metacontent.searchWikiMetacontents, entity, accessToken) :
      yield call(apis.Metacontent.searchNewsMetacontents, entity, sites, accessToken)
  if (response) {
    yield put({ type: 'SEARCH_METACONTENT_OK', result: response })
  } else {
    const errorMessage = {
      status: error.status,
      text: error.response.text,
    }
    yield put({ type: 'SEARCH_METACONTENT_FAILURE', error: errorMessage })
    if (error.status === 401) {
      yield put(actions.navigate('/login'))
    }
    yield call(delay, 5000)
    // yield wait(500)
    yield put({ type: 'RESET_ERROR_MESSAGE' })
  }
}

function* watchLoadChannels() {
  while (true) {
    yield take(actions.LOAD_CHANNEL_PAGE)

    yield call(loadChannels)
  }
}

function* watchNavigateTo() {
  while (true) {
    const navi = yield take(actions.NAVIGATE)

    yield apis.History.push(navi.path)
  }
}

function* watchLoadMetacontents() {
  while (true) {
    yield take(actions.LOAD_METACONTENT_PAGE)

    yield call(loadMetacontents)
  }
}

function* watchPrepareCreateMetacontent() {
  while (true) {
    yield take(actions.PREPARE_CREATE_MT)

    yield call(loadChannels)
  }
}

function* watchSearchMetacontent() {
  while (true) {
    const { entity, category, newsProviders } = yield take(actions.SEARCH_METACONTENT)
    yield put({ type: 'SEARCHING_METACONTENT' })
    yield call(searchMetacontent, entity, category, newsProviders)
  }
}

function* watchSubmitMetacontent() {
  while (true) {
    const { metacontent } = yield take(actions.SUBMIT_METACONTENT)
    yield call(submitMetacontent, metacontent)
  }
}

function* watchLoadKeywords() {
  while (true) {
    yield take(actions.LOAD_KEYWORD_PAGE)

    yield call(loadKeywords)
  }
}

function* watchPrepareCreateKeyword() {
  while (true) {
    yield take(actions.PREPARE_CREATE_KW)

    yield call(loadChannels)

    yield put({ type: 'PREPARE_CREATE_KW_2' })
  }
}

function* watchSubmitKeyword() {
  while (true) {
    const { keyword } = yield take(actions.SUBMIT_KEYWORD)
    yield call(submitKeyword, keyword)
  }
}

function* watchLoginRequest() {
  while (true) {
    const { username, password } = yield take(actions.LOGIN_REQUEST)
    yield call(handleLoginFlow, username, password)
  }
}

function* watchSubmitChannel() {
  while (true) {
    const { channel } = yield take(actions.SUBMIT_CHANNEL)
    yield call(submitChannel, channel)
  }
}

function* doDeleteChannel(action) {
  const { channel } = action
  yield call(deleteChannel, channel)
}

function* watchDeleteChannel() {
  yield takeEvery(actions.DELETE_CHANNEL, doDeleteChannel)
}

function* doDeleteMetacontent(action) {
  const { metacontent } = action
  yield call(deleteMetacontent, metacontent)
}

function* watchDeleteMetacontent() {
  yield takeEvery(actions.DELETE_METACONTENT, doDeleteMetacontent)
}

function* doDeleteKeyword(action) {
  const { keyword } = action
  yield call(deleteKeyword, keyword)
}

function* watchDeleteKeyword() {
  yield takeEvery(actions.DELETE_KEYWORD, doDeleteKeyword)
}

export default function* root() {
  yield [
    fork(watchLoadChannels),
    fork(watchNavigateTo),
    fork(watchLoadMetacontents),
    fork(watchPrepareCreateMetacontent),
    fork(watchSearchMetacontent),
    fork(watchSubmitMetacontent),
    fork(watchLoadKeywords),
    fork(watchPrepareCreateKeyword),
    fork(watchSubmitKeyword),
    fork(watchLoginRequest),
    fork(watchSubmitChannel),
    fork(watchDeleteChannel),
    fork(watchDeleteMetacontent),
    fork(watchDeleteKeyword),
  ]
}
