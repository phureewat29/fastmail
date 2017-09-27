const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

function send ({ to, subject, message }) {
  const data = {
    to,
    subject,
    text: message,
    from: {
      email: process.env.SENDER_EMAIL,
      name: process.env.SENDER_NAME
    }
  }
  return sendgrid.send(data)
}

module.exports = { send }
