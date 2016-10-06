
const request = require('superagent')

const API_BASE = 'http://54.148.247.77:8089/api/'

export const fetchMetacontentsList = () =>
  request.get(`${API_BASE}/metacontents`)
    .then(response => ({ metacontents: response.body }))

export const getMetacontent = id =>
  request.get(`${API_BASE}/metacontent/${id}`)
    .then(response => response.body)

// export function getMetacontent(id) {
//   return new Promise(function(resolve, reject) {
//     brrequest.get({
//       uri: 'http://54.148.247.77:8089/api/metacontent/' + id,
//     }, function(err, response, body) {
//       if (err)
//         reject(err)
//       resolve(JSON.parse(body))
//     })
//   })
// }

export function searchWikiMetacontents(name) {
  return request.get(`${API_BASE}/metacontents/search_wiki`)
    .query({ entity: JSON.stringify(name) })
    .then(response => response.body)
}

export function searchNewsMetacontents(name, sites) {
  return request.get(`${API_BASE}/metacontents/search_news`)
    .query({ entity: name })
    .query({ sites: JSON.stringify(sites) })
    .then(response => response.body)
}

export function submit(metacontent) {
  return request
    .post(`${API_BASE}channels/${metacontent.channel}/metacontents`)
    .send(metacontent)
}

// export function putMetacontent(metacontent) {
//   return request
//     .put('http://54.148.247.77:8089/api/channels/'+metacontent.channel_id+'/metacontents')
//     .send(JSON.stringify(metacontent))
// }

// export function deleteMetacontent(metacontent) {
//   return fetch('http://54.148.247.77:8089/api/channels/'+ metacontent.ChannelId+'/metacontents',
//     {
//       method: 'DELETE',
//       body: JSON.stringify({
//         id: metacontent.id
//       }),
//       json:true,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(response => response.status)
// }
