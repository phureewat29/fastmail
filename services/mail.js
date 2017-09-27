const _ = require('lodash')
const mongodb = require('../libs/mongodb')
const sendgrid = require('../libs/sendgrid')
const mailgun = require('../libs/mailgun')

/* All email providers. */
const MAIL_PROVIDERS = [ mailgun, sendgrid ]

/** 
 * POST: /mail
 * Sending out an email via avaliable provider.
 * And will save the sending record into database.
 */
async function handler (req, res, next) {
  const db = await mongodb.init()
  const { subject, to, message } = _.pick(req.body, ['subject', 'to', 'message'])

  const success = await sendMail({ subject, to, message })
  if (success) {
    await db.collection('histories').insertOne({
      subject, to, message, created_at: new Date()
    })
    return res.json({
      message: `Successfully sent email to ${to}. Some email might have to wait for a while due the system is runing in Sandbox mode.`
    })
  }
  return res.status(503).json({
    message: `Unable to send email, please try again later.`
  })
}

/**
 * This function will attempt to send email with providers.
 * Will do nothing if error, just try again with next provider.
 * And returns immediately if at least one provider is working. 
 */
async function sendMail ({ subject, to, message }, providers = MAIL_PROVIDERS) {
  let isSuccess = false
  for (let provider of providers) {
    if (!isSuccess) {
      await provider
        .send({ subject, to, message })
        .then(() => { isSuccess = true })
        .catch(_.noop) // just skip to try again with next provider.
    } else {
      break
    }
  }
  return isSuccess
}

module.exports = handler
