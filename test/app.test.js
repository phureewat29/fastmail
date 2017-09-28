const expect = require('chai').expect
const sinon = require('sinon')
const request = require('supertest')
const _ = require('lodash')

const Api = require('../api')
const mongodb = require('../libs/mongodb')
const Mailgun = require('../libs/mailgun')
const Sendgrid = require('../libs/sendgrid')

let sandbox
let db

const content = {
  to: 'hello@world.com',
  subject: 'Subject',
  message: 'Hello World!'
}

describe('Integration', () => {
  before(async function () {
    // Reinitialize database
    db = await mongodb.init()
    await db.dropDatabase()

    // Stub all third-party libs
    sandbox = sinon.sandbox.create()
    sandbox.stub(Mailgun, 'send').resolves()
    sandbox.stub(Sendgrid, 'send').resolves()
  })

  after(async function () {
    sandbox.restore()
  })

  it('should able to send mail', async function () {
    const response = await request(Api)
      .post('/mail')
      .send(content)
    expect(response.status).to.equals(200)
    expect(Mailgun.send.called).to.be.true
    expect(Sendgrid.send.called).to.be.false
  })

  it('should able to fetch history with empty query string', async function () {
    const response = await request(Api)
      .get('/history')
    expect(response.status).to.equals(200)
    expect(_.filter(response.body, content)).to.not.empty
  })

  it('should able to fetch history with query string', async function () {
    const response = await request(Api)
      .get('/history?q=random')
    expect(response.status).to.equals(200)
    expect(response.body).to.be.empty
  })
})
