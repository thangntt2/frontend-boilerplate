
import { take, put, call, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as apis from '../apis'
import * as actions from '../actions'

const { channels, metacontents, keywords } = actions

function* fetchData(entity, apiFn) {
  yield put(entity.request())
  const response = yield call(apiFn)
  if (response) {
    yield put(entity.success(response))
  } else {
    yield put(entity.failure('error'))
  }
}

function* sendData(data, entity, apiFn) {
  yield put(entity.submit(data))
  const response = yield call(apiFn, data)
  if (response) {
    yield put(entity.submit_ok(data))
  } else {
    yield put(entity.submit_fail('submit failure'))
  }
  yield call(delay, 5000)
  // yield wait(500)
  yield put({ type: 'SUBMIT_CLEAN_REPORT' })
}

export const fetchChannels = fetchData.bind(null, channels, apis.Channel.fetchChannelsList)
export const fetchMetacontents = fetchData.bind(null, metacontents, apis.Metacontent.fetchMetacontentsList)
export const fetchKeywords = fetchData.bind(null, keywords, apis.Keyword.fetchKeywordsList)

function* loadChannels() {
  yield call(fetchChannels)
}

function* loadKeywords() {
  yield [
    call(fetchChannels),
    call(fetchKeywords),
  ]
}

function* loadMetacontents() {
  yield [
    call(fetchChannels),
    call(fetchMetacontents),
  ]
}

function* submitMetacontent(data) {
  yield call(sendData, data, metacontents, apis.Metacontent.submit)
}

function* submitKeyword(data) {
  yield call(sendData, data, keywords, apis.Keyword.submit)
}

function* searchMetacontent(entity, category, sites) {
  const response =
    (category !== 'article') ?
      yield call(apis.Metacontent.searchWikiMetacontents, entity) :
      yield call(apis.Metacontent.searchNewsMetacontents, entity, sites)
  yield put({ type: 'SEARCH_METACONTENT_OK', result: response })
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

    yield call(fetchChannels)
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

    yield call(fetchChannels)

    yield put({ type: 'PREPARE_CREATE_KW_2' })
  }
}

function* watchSubmitKeyword() {
  while (true) {
    const { keyword } = yield take(actions.SUBMIT_KEYWORD)
    yield call(submitKeyword, keyword)
  }
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
  ]
}
