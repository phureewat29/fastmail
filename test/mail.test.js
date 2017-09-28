const expect = require('chai').expect
const sinon = require('sinon')

const MailService = require('../services/mail')
const Mailgun = require('../libs/mailgun')
const Sendgrid = require('../libs/sendgrid')

let sandbox

describe('Mail', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should able to send mail', async function () {
    sandbox.stub(Mailgun, 'send').resolves()
    sandbox.stub(Sendgrid, 'send').resolves()

    const result = await MailService.sendMail({ from: 'a', to: 'b', message: 'c' })
    expect(Mailgun.send.calledOnce).to.be.true
    expect(Sendgrid.send.called).to.be.false
    expect(result).to.be.true
  })

  it('should fallback to another provider if fail', async function () {
    sandbox.stub(Mailgun, 'send').rejects()
    sandbox.stub(Sendgrid, 'send').resolves()

    const result = await MailService.sendMail({ from: 'a', to: 'b', message: 'c' })
    expect(Mailgun.send.calledOnce).to.be.true
    expect(Sendgrid.send.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should return false if all providers fail', async function () {
    sandbox.stub(Mailgun, 'send').rejects()
    sandbox.stub(Sendgrid, 'send').rejects()

    const result = await MailService.sendMail({ from: 'a', to: 'b', message: 'c' })
    expect(result).to.be.false
  })
})
