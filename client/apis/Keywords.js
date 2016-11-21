const request = require('superagent')

const API_BASE = 'http://52.34.191.221:8089/api/'

export function submit(keyword, accessToken) {
  return request
    .post(`${API_BASE}channels/${keyword.channel}/keywords`)
    .set('Authorization', accessToken)
    .send({ keyword: keyword.keyword })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function fetchKeywordsList(accessToken) {
  return request
    .get(`${API_BASE}/keywords`)
    .set('Authorization', accessToken)
    .then(response => ({ response: { keywords: response.body } }))
    .catch(error => ({ error }))
}

export function del(keyword, accessToken) {
  return request
    .del(`${API_BASE}/channels/${keyword.ChannelId}/keywords`)
    .set('Authorization', accessToken)
    .send({ id: keyword.id })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
