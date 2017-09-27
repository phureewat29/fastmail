import React from 'react'
import Client from './Client'
import moment from 'moment'
import _ from 'lodash'

class HistorySearch extends React.Component {
  state = {
    histories: [],
    searchValue: ''
  }

  handleSearchChange = e => {
    const value = e.target.value
    this.setState({
      searchValue: value
    })

    if (value === '') {
      this.setState({
        histories: []
      })
    } else {
      Client.searchHistory(value, histories => {
        this.setState({ histories })
      })
    }
  }

  render () {
    const { histories } = this.state
    const rows = _(histories)
      .orderBy('created_at', 'desc')
      .map(history => (
        <tr key={history._id}>
          <td>{moment(history.created_at).calendar()}</td>
          <td>{history.to}</td>
          <td>{_.truncate(history.subject, { length: 20 })}</td>
          <td>{_.truncate(history.message, { length: 50 })}</td>
        </tr>
      ))
      .value()

    return (
      <div id='history-search'>
        <label htmlFor='searchValue'>History search</label>
        <input
          type='text'
          id='searchValue'
          placeholder='Search...'
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
        {
          <table >
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>To</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        }
      </div>
    )
  }
}

export default HistorySearch
