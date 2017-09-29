global.Promise = require('bluebird')

/* Load environment variables from .env file */
require('dotenv').load({ silent: true })

const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./libs/mongodb')

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
app.get('/history', require('./services/history').handler)
app.post('/mail', require('./services/mail').handler)

/* Start Express server. */
app.set('port', process.env.PORT || '4000')
app.listen(app.get('port'), () => {
  console.log(`  API server is running at http://localhost:${app.get('port')}`)
})

module.exports = app
