import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Card, Carousel, message } from 'antd'
import Spin from './components/Spin'
import Group from './components/Group'
import Game from './components/Game'
import LiveGame from './components/LiveGame'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      today: [],
      now: []
    }

      this.getGroupData()
      this.getTodayData()
      this.getNowData()
      setInterval(this.getGroupData.bind(this), 103 * 1000)
      setInterval(this.getTodayData.bind(this), 35 * 1000)
      setInterval(this.getNowData.bind(this), 10 * 1000)
  }

  async getGroupData() {
    try {
      const response = await fetch('https://world-cup-json.herokuapp.com/teams/group_results')
      const groups = await response.json()
      this.setState((prev, props) => Object.assign({}, prev, { groups: groups.map(a => a.group), }))
    } catch (e) {
      message.error('Group data error')
      console.error(e)
    }
  }
  async getTodayData() {
    try {
      const response = await fetch('https://world-cup-json.herokuapp.com/matches/today')
      const today = await response.json()
      this.setState((prev, props) => Object.assign({}, prev, { today: today }))
    } catch (e) {
      message.error('Today data error')
      console.error(e)
    }
  }
  async getNowData() {
    try {
      const response = await fetch('https://world-cup-json.herokuapp.com/matches/current')
      const now = await response.json()
      this.setState((prev, props) => Object.assign({}, prev, { now: now }))
    } catch (e) {
      message.error('Now data error')
      console.error(e)
    }
  }

  renderGroupTable() {
    const { groups } = this.state
    if (groups.length > 0) {
      return (
        <Fragment>
          {groups.map((group, i) =>
            <Group key={i} group={group} loading={false} />)
          }
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Group loading={true} />
      </Fragment>
    )
  }

  renderGames() {
    const { today } = this.state
    if (today.length > 0) {
      return (
        <Fragment>
          {today.map((match, i) => (<Game key={i} match={match} />))}
        </Fragment>
      )
    }
    return (<Spin />)
  }



  render() {
    let now = {}
    if (this.state.now.length > 0) {
      now = this.state.now[0]
    } else {
      now = this.state.today.filter(match => match.status != 'completed')[0]
      if(now == null) {
        now = this.state.today[this.state.today.length - 1]
      }
    }
    return (
      <div id="main">
        <div style={{ width: "calc(100% - 300px)" }}>
          <div id="header" style={{ textAlign: 'center', padding: 10 }}>
            <h1 style={{ margin: 0 }}>World Cup Live Dashboard</h1>
          </div>
          <div style={groupTable}>
            {this.renderGroupTable()}
          </div>
          <div style={{ display: 'flex' }}>
            {this.renderGames()}
          </div>
        </div>
        <div id="current" style={{ width: 300, marginTop: 30 }}>
          {(() => {
            if (this.state.today.length > 0) {
              return (
                <LiveGame match={now} />
              )
            }
            return (<Spin />)
          })()}
        </div>
      </div>
    );
  }
}

const groupTable = {
  padding: 20,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: 20,
}

ReactDOM.render(<App />, document.getElementById('root'));