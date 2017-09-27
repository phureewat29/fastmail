global.Promise = require('bluebird')

const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./libs/mongodb')

/* Load environment variables from .env file */
require('dotenv').load({ silent: true })

/* Create Express server */
const app = express()

/* Connect to MongoDB */
mongodb.init()

/* Express configuration */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* Application routing */
app.get('/history', require('./services/history'))
app.post('/mail', require('./services/mail'))

/* Start Express server. */
app.set('port', process.env.PORT || '4000')
app.listen(app.get('port'), () => {
  console.log('  API server is running at http://localhost:%d', app.get('port'))
})

module.exports = app
