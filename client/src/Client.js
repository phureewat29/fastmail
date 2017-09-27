function searchHistory (query, cb) {
  return fetch(`history?q=${query}`)
    .then(res => res.json())
    .then(cb)
}

function sendMail (data, cb) {
  return fetch('mail', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(cb)
}

const Client = { searchHistory, sendMail }
export default Client
