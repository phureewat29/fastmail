import React, { Component } from 'react'
import EmailForm from './EmailForm'
import HistorySearch from './HistorySearch'
import 'milligram/dist/milligram.min.css'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App container'>
        <EmailForm />
        <hr />
        <HistorySearch />
      </div>
    )
  }
}

export default App
