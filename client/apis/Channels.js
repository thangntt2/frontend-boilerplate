
// import { fetch } from 'isomorphic-fetch'
import request from 'superagent'

const API = 'http://54.148.247.77:8089/api'

export function fetchChannelsList(accessToken) {
  return request.get(`${API}/channels`)
    .set('Authorization', accessToken)
    .then(response => ({ response: { channels: response.body } }))
    .catch(error => ({ error }))
}

export function submit(channel, accessToken) {
  return request.post(`${API}/channels`)
    .send(channel)
    .set('Authorization', accessToken)
    .set('Content-Type', 'application/json')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function del(channel, accessToken) {
  return request
    .del(`${API}/channels/${channel.id}`)
    .set('Authorization', accessToken)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
