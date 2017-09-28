const Config = require('../config')
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(Config.SENDGRID_API_KEY)

function send ({ to, subject, message }) {
  const data = {
    to,
    subject,
    text: message,
    from: {
      email: Config.SENDER_EMAIL,
      name: Config.SENDER_NAME
    }
  }
  return sendgrid.send(data)
}

module.exports = { send }
