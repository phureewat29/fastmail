global.Promise = require('bluebird')

const express = require('express')
const bodyParser = require('body-parser')
const assert = require('assert')
const mongodb = require('./libs/mongodb')

/* Load environment variables from .env file */
require('dotenv').load({ silent: true })

/* Assertion for secrets from environment variables. */
assert(process.env.MAILGUN_API_KEY)
assert(process.env.MAILGUN_DOMAIN)
assert(process.env.SENDGRID_API_KEY)
assert(process.env.SENDER_EMAIL)
assert(process.env.SENDER_NAME)

/* Create Express server */
const app = express()

/* Connect to MongoDB */
mongodb.init()

/* Express configuration */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* Serve client in production */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

/* Application routing */
app.get('/history', require('./services/history'))
app.post('/mail', require('./services/mail'))

/* Start Express server. */
app.set('port', process.env.PORT || '4000')
app.listen(app.get('port'), () => {
  console.log(`  API server is running at http://localhost:${app.get('port')}`)
})

module.exports = app
