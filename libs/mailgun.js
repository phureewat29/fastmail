const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

function send ({ to, subject, message }) {
  const data = {
    to,
    subject,
    text: message,
    from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`
  }
  return mailgun.messages().send(data)
}

module.exports = { send }
