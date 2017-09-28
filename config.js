const assert = require('assert')

if (process.env.NODE_ENV !== 'test') {
  assert(process.env.MAILGUN_API_KEY)
  assert(process.env.MAILGUN_DOMAIN)
  assert(process.env.SENDGRID_API_KEY)
  assert(process.env.SENDER_EMAIL)
}

const defaults = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/fastmail',
  SENDER_NAME: process.env.SENDER_NAME || 'FastMail Service',
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}

const test = {
  MONGODB_URI: 'mongodb://localhost:27017/fastmail-test',
  MAILGUN_API_KEY: 'FAKE',
  MAILGUN_DOMAIN: 'FAKE',
  SENDGRID_API_KEY: 'FAKE'
}

const development = {}

const production = {}

module.exports = {
  development: Object.assign({}, defaults, development),
  test: Object.assign({}, defaults, test),
  production: Object.assign({}, defaults, production)
}[process.env.NODE_ENV || 'development']
