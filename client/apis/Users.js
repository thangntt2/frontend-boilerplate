
import request from 'superagent'

const API = 'http://thangntt.com:8089/api'

export function fetchUsersList(accessToken) {
  return request.get(`${API}/users`)
    .set('Authorization', accessToken)
    .then(response => ({ response: { users: response.body } }))
    .catch(error => ({ error }))
}

export function submit(user, accessToken) {
  return request.post(`${API}/channels`)
    .send(user)
    .set('Authorization', accessToken)
    .set('Content-Type', 'application/json')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function del(user, accessToken) {
  return request
    .del(`${API}/users/${user.username}`)
    .set('Authorization', accessToken)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
