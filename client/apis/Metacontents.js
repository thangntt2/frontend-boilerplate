
const request = require('superagent')

const API_BASE = 'http://54.148.247.77:8089/api/'

export const fetchMetacontentsList = accessToken =>
  request.get(`${API_BASE}/metacontents`)
    .set('Authorization', accessToken)
    .then(response => ({ response: { metacontents: response.body } }))
    .catch(error => ({ error }))

export function searchWikiMetacontents(name, accessToken) {
  return request.get(`${API_BASE}/metacontents/search_wiki`)
    .query({ entity: JSON.stringify(name) })
    .set('Authorization', accessToken)
    .then(response => ({ response: response.body }))
    .catch(error => ({ error }))
}

export function searchNewsMetacontents(name, sites, accessToken) {
  return request.get(`${API_BASE}/metacontents/search_news`)
    .query({ entity: name })
    .query({ sites: JSON.stringify(sites) })
    .set('Authorization', accessToken)
    .then(response => ({ response: response.body }))
    .catch(error => ({ error }))
}

export function del(metacontent, accessToken) {
  return request
    .del(`${API_BASE}/channels/${metacontent.channelId}/metacontents`)
    .set('Authorization', accessToken)
    .send({ id: metacontent.id })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function submit(metacontent, accessToken) {
  return request
    .post(`${API_BASE}channels/${metacontent.channel}/metacontents`)
    .set('Authorization', accessToken)
    .send(metacontent)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
