
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const SUBMIT = 'SUBMIT'
const SUBMIT_OK = 'SUBMIT_OK'
const SUBMIT_FAIL = 'SUBMIT_FAIL'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE, SUBMIT, SUBMIT_OK, SUBMIT_FAIL].reduce((acc, type) => {
    const act = acc
    act[type] = `${base}_${type}`
    return act
  }, {})
}

export const METACONTENTS = createRequestTypes('METACONTENTS')
export const CHANNELS = createRequestTypes('CHANNELS')
export const KEYWORDS = createRequestTypes('KEYWORDS')

export const NAVIGATE = 'NAVIGATE'

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const LOAD_CHANNEL_PAGE = 'LOAD_CHANNEL_PAGE'
export const LOAD_METACONTENT_PAGE = 'LOAD_METACONTENT_PAGE'
export const LOAD_KEYWORD_PAGE = 'LOAD_KEYWORD_PAGE'
export const PREPARE_CREATE_MT = 'PREPARE_CREATE_MT'
export const PREPARE_CREATE_KW = 'PREPARE_CREATE_KW'
export const SEARCH_METACONTENT = 'SEARCH_METACONTENT'
export const SUBMIT_METACONTENT = 'SUBMIT_METACONTENT'
export const SUBMIT_KEYWORD = 'SUBMIT_KEYWORD'

function action(type, payload = {}) {
  return { type, ...payload }
}

export const metacontents = {
  request: () => action(METACONTENTS.REQUEST, { }),
  success: response => action(METACONTENTS.SUCCESS, { response }),
  failure: error => action(METACONTENTS.FAILURE, { error }),
  submit: metacontent => action(METACONTENTS.SUBMIT, { data: metacontent }),
  submit_ok: metacontent =>
    action(METACONTENTS.SUBMIT_OK, { success: `Tạo thành công metacontent: ${metacontent.name}` }),
  submit_fail: error => action(METACONTENTS.SUBMIT_FAIL, { error }),
}

export const channels = {
  request: () => action(CHANNELS.REQUEST, { }),
  success: response => action(CHANNELS.SUCCESS, { response }),
  failure: error => action(CHANNELS.FAILURE, { error }),
}

export const keywords = {
  request: () => action(KEYWORDS.REQUEST, { }),
  success: response => action(KEYWORDS.SUCCESS, { response }),
  failure: error => action(KEYWORDS.FAILURE, { error }),
  submit: keyword => action(KEYWORDS.SUBMIT, { data: keyword }),
  submit_ok: keyword => action(KEYWORDS.SUBMIT_OK, { success: `Tạo thành công keyword: ${keyword.keyword}` }),
  submit_fail: error => action(KEYWORDS.SUBMIT_FAIL, { error }),
}

export const loadMetacontentsPage = () => action(LOAD_METACONTENT_PAGE, {})
export const loadKeywordsPage = () => action(LOAD_KEYWORD_PAGE, {})
export const loadChannelsPage = () => action(LOAD_CHANNEL_PAGE, {})
// export const login = (username, password) => action(LOGIN.REQUEST, { username, password })
// export const logout = () => action(LOGOUT.REQUEST, {})
export const prepareCreateMetacontent = () => action(PREPARE_CREATE_MT, {})
export const prepareCreateKeyword = () => action(PREPARE_CREATE_KW, {})
export const searchMetacontent = (entity, category, newsProviders = []) =>
  action(SEARCH_METACONTENT, { entity, category, newsProviders })
export const submitMetacontent = metacontent => action(SUBMIT_METACONTENT, { metacontent })
export const submitKeyword = keyword => action(SUBMIT_KEYWORD, { keyword })

export const navigate = path => action(NAVIGATE, { path })
