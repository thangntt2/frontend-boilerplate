const request = require('superagent')

const API_BASE = 'http://54.148.247.77:8089/'
/**
* Logs a user in, returning a promise with `true` when done
* @param  {string} username The username of the user
* @param  {string} password The password of the user
*/
export const login = (username, password) =>
  request
    .get(`${API_BASE}login`)
    .query({ username })
    .query({ password })
  .then(token => ({ token: JSON.parse(token.text) }))
  .catch(error => ({ error }))

