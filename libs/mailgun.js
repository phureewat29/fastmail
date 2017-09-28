const Config = require('../config')
const mailgun = require('mailgun-js')({
  apiKey: Config.MAILGUN_API_KEY,
  domain: Config.MAILGUN_DOMAIN
})

function send ({ to, subject, message }) {
  const data = {
    to,
    subject,
    text: message,
    from: `${Config.SENDER_NAME} <${Config.SENDER_EMAIL}>`
  }
  return mailgun.messages().send(data)
}

module.exports = { send }
