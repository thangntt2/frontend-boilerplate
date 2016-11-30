
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const SUBMIT = 'SUBMIT'
const SUBMIT_OK = 'SUBMIT_OK'
const SUBMIT_FAIL = 'SUBMIT_FAIL'
const DELETE = 'DELETE'
const DELETE_OK = 'DELETE_OK'
const DELETE_FAIL = 'DELETE_FAIL'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE, SUBMIT, SUBMIT_OK, SUBMIT_FAIL, DELETE, DELETE_OK, DELETE_FAIL].reduce((acc, type) => {
    const act = acc
    act[type] = `${base}_${type}`
    return act
  }, {})
}

export const METACONTENTS = createRequestTypes('METACONTENTS')
export const CHANNELS = createRequestTypes('CHANNELS')
export const KEYWORDS = createRequestTypes('KEYWORDS')
export const USERS = createRequestTypes('USERS')
export const NEWSPROVIDER = createRequestTypes('NEWS')
export const LOGIN = createRequestTypes('LOGIN')

export const NAVIGATE = 'NAVIGATE'

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE'
export const LOAD_CHANNEL_PAGE = 'LOAD_CHANNEL_PAGE'
export const LOAD_METACONTENT_PAGE = 'LOAD_METACONTENT_PAGE'
export const LOAD_KEYWORD_PAGE = 'LOAD_KEYWORD_PAGE'
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE'
export const PREPARE_CREATE_MT = 'PREPARE_CREATE_MT'
export const PREPARE_CREATE_KW = 'PREPARE_CREATE_KW'
export const SEARCH_METACONTENT = 'SEARCH_METACONTENT'
export const SUBMIT_METACONTENT = 'SUBMIT_METACONTENT'
export const SUBMIT_KEYWORD = 'SUBMIT_KEYWORD'
export const LOGIN_REQUEST = 'REQUEST_TO_LOGIN'
export const NAVI_TO_LOGIN = 'NAVI_TO_LOGIN'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const RESET_MESSAGE = 'RESET_MESSAGE'
export const SUBMIT_CHANNEL = 'SUBMIT_CHANNEL'
export const DELETE_CHANNEL = 'DELETE_CHANNEL'
export const DELETE_METACONTENT = 'DELETE_METACONTENT'
export const DELETE_KEYWORD = 'DELETE_KEYWORD'
export const SUBMIT_USER = 'SUBMIT_USER'
export const DELETE_USER = 'DELETE_USER'
export const LOAD_NEWSP_PAGE = 'LOAD_NEWSP_PAGE'
export const SUBMIT_NEWSP = 'SUBMIT_NEWSP'
export const DELETE_NEWSP = 'DELETE_NEWSP'

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
  delete: metacontent => action(METACONTENTS.DELETE, { metacontent }),
  delete_ok: metacontent => action(METACONTENTS.DELETE_OK, { success: `Xóa thành công metacontent với id: ${metacontent.name}` }),
  delete_fail: error => action(METACONTENTS.DELETE_FAIL, { error }),
}

export const channels = {
  request: () => action(CHANNELS.REQUEST, { }),
  success: response => action(CHANNELS.SUCCESS, { response }),
  failure: error => action(CHANNELS.FAILURE, { error }),
  submit: channel => action(CHANNELS.SUBMIT, { data: channel }),
  submit_ok: channel =>
    action(CHANNELS.SUBMIT_OK, { success: `Tạo thành công kênh ${channel.name}` }),
  submit_fail: error => action(CHANNELS.SUBMIT_FAIL, { error }),
  delete: channel => action(CHANNELS.DELETE, { channel }),
  delete_ok: channel => action(CHANNELS.DELETE_OK, { success: `Xóa thành công kênh ${channel.name}` }),
  delete_fail: error => action(CHANNELS.DELETE_FAIL, { error }),
}

export const keywords = {
  request: () => action(KEYWORDS.REQUEST, { }),
  success: response => action(KEYWORDS.SUCCESS, { response }),
  failure: error => action(KEYWORDS.FAILURE, { error }),
  submit: keyword => action(KEYWORDS.SUBMIT, { data: keyword }),
  submit_ok: keyword => action(KEYWORDS.SUBMIT_OK, { success: `Tạo thành công keyword: ${keyword.keyword}` }),
  submit_fail: error => action(KEYWORDS.SUBMIT_FAIL, { error }),
  delete: keyword => action(KEYWORDS.DELETE, { keyword }),
  delete_ok: keyword => action(KEYWORDS.DELETE_OK, { success: `Xóa thành công keyword ${keyword.keyword}` }),
  delete_fail: error => action(KEYWORDS.DELETE_FAIL, { error }),
}

export const users = {
  request: () => action(USERS.REQUEST, {}),
  success: response => action(USERS.SUCCESS, { response }),
  failure: error => action(USERS.FAILURE, { error }),
  submit: user => action(USERS.SUBMIT, { data: user }),
  submit_ok: user => action(USERS.SUBMIT_OK, { success: `Tạo thành công user: ${user.name}` }),
  submit_fail: error => action(USERS.SUBMIT_FAIL, { error }),
  delete: user => action(USERS.DELETE, { user }),
  delete_ok: user => action(USERS.DELETE_OK, { success: `Xóa thành công user ${user.name}` }),
  delete_fail: error => action(USERS.DELETE_FAIL, { error }),
}

export const newsproviders = {
  request: () => action(NEWSPROVIDER.REQUEST, {}),
  success: response => action(NEWSPROVIDER.SUCCESS, { response }),
  failure: error => action(NEWSPROVIDER.FAILURE, { error }),
  submit: newsp => action(NEWSPROVIDER.SUBMIT, { data: newsp }),
  submit_ok: newsp => action(NEWSPROVIDER.SUBMIT_OK, { success: `Thêm thành công báo: ${newsp.name}` }),
  submit_fail: error => action(NEWSPROVIDER.SUBMIT_FAIL, { error }),
  delete: newsp => action(NEWSPROVIDER.DELETE, { newsp }),
  delete_ok: newsp => action(NEWSPROVIDER.DELETE_OK, { success: `Xóa thành công báo ${newsp.name}` }),
  delete_fail: error => action(NEWSPROVIDER.DELETE_FAIL, { error }),
}

export const login = {
  request: (username, password) => action(LOGIN.REQUEST, { username, password }),
  success: response => action(LOGIN.SUCCESS, { response }),
  failure: error => action(LOGIN.FAILURE, { error }),
}

export const loadMetacontentsPage = () => action(LOAD_METACONTENT_PAGE, {})
export const loadKeywordsPage = () => action(LOAD_KEYWORD_PAGE, {})
export const loadChannelsPage = () => action(LOAD_CHANNEL_PAGE, {})
export const loadUsersPage = () => action(LOAD_USER_PAGE, {})
export const loadNewsPage = () => action(LOAD_NEWSP_PAGE, {})
// export const login = (username, password) => action(LOGIN.REQUEST, { username, password })
// export const logout = () => action(LOGOUT.REQUEST, {})
export const prepareCreateMetacontent = () => action(PREPARE_CREATE_MT, {})
export const prepareCreateKeyword = () => action(PREPARE_CREATE_KW, {})
export const searchMetacontent = (entity, category, newsProviders = []) =>
  action(SEARCH_METACONTENT, { entity, category, newsProviders })
export const submitMetacontent = metacontent => action(SUBMIT_METACONTENT, { metacontent })
export const submitKeyword = keyword => action(SUBMIT_KEYWORD, { keyword })
export const submitChannel = channel => action(SUBMIT_CHANNEL, { channel })
export const deleteChannel = channel => action(DELETE_CHANNEL, { channel })
export const deleteUser = user => action(DELETE_USER, { user })
export const submitUser = user => action(SUBMIT_USER, { user })
export const submitNewsp = newsp => action(SUBMIT_NEWSP, { newsp })
export const deleteMetacontent = metacontent => action(DELETE_METACONTENT, { metacontent })
export const deleteKeyword = keyword => action(DELETE_KEYWORD, { keyword })
export const deleteNewsp = newsp => action(DELETE_NEWSP, { newsp })
export const navigateToLoginForm = () => action(NAVI_TO_LOGIN, {})
export const loginRequest = (username, password) => action(LOGIN_REQUEST, { username, password })
export const logoutRequire = () => action(LOGOUT_REQUEST, {})
export const navigate = path => action(NAVIGATE, { path })
export const resetMessage = () => action(RESET_MESSAGE)

