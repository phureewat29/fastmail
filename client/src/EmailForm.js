import React from 'react'
import Client from './Client'

class EmailForm extends React.Component {
  state = {
    sending: false,
    message: ''
  }

  constructor (props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (e) {
    e.preventDefault()
    this.setState({ sending: true, message: 'Sending an email...' }, this.sendFormData)
  }

  sendFormData () {
    const formData = {
      subject: this.refs.subject.value,
      to: this.refs.to.value,
      message: this.refs.message.value
    }
    Client.sendMail(formData, (res) => {
      this.setState({
        sending: false,
        message: res.message
      })
      this.refs.subject.value = ''
      this.refs.to.value = ''
      this.refs.message.value = ''
    })
  }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            required
            placeholder='Subject...'
            ref='subject'
            id='subject'
          />

          <label htmlFor='to'>To</label>
          <input
            type='email'
            required
            placeholder='Email...'
            ref='to'
            id='to'
          />

          <label htmlFor='message'>Message</label>
          <textarea
            placeholder='Message...'
            required
            id='message'
            ref='message'
          />

          <input
            className='button-primary'
            type='submit'
            value='Send'
            disabled={this.state.loading}
          />
          <p>{this.state.message}</p>
        </fieldset>
      </form>
    )
  }
}

export default EmailForm
