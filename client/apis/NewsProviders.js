
import request from 'superagent'

const API = 'http://52.34.191.221:8089/api'

export function fetchNewsProviderList(accessToken) {
  return request.get(`${API}/newsprovider`)
    .set('Authorization', accessToken)
    .then(response => ({ response: { newsp: response.body } }))
    .catch(error => ({ error }))
}

export function submit(newsp, accessToken) {
  return request.post(`${API}/newsprovider`)
    .send(newsp)
    .set('Authorization', accessToken)
    .set('Content-Type', 'application/json')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

export function del(newsp, accessToken) {
  return request
    .del(`${API}/newsprovider`)
    .send(newsp)
    .set('Authorization', accessToken)
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
