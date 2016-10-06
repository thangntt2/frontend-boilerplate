
// import { fetch } from 'isomorphic-fetch'
import request from 'superagent'

const API = 'http://54.148.247.77:8089/api'

export function fetchChannelsList() {
  return request.get(`${API}/channels`)
    .then(response => ({ channels: response.body }))
}

export function submitChannel(channel) {
  return request.post(`${API}/channels`)
    .send(channel)
    .set('Content-Type', 'application/json')
}

export function deleteChannel(channel) {
  return request.del(`${API}/channels/${channel.id}`)
}
