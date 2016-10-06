const request = require('superagent')

const API_BASE = 'http://54.148.247.77:8089/api/'

export function submit(keyword) {
  return request
    .post(`${API_BASE}channels/${keyword.channel}/keywords`)
    .send({ keyword: keyword.keyword })
}

export function fetchKeywordsList() {
  return request
    .get(`${API_BASE}/keywords`)
    .then(response => ({ keywords: response.body }))
}
