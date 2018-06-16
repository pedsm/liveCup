import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Card, Carousel, Spin } from 'antd'
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
  }

  async getGroupData() {
    console.log('Fetching group data')
    const response = await fetch('http://worldcup.sfg.io/teams/group_results')
    const groups = await response.json()
    this.setState((prev, props) => Object.assign({}, prev, {
      groups: groups.map(a => a.group),
    }))
    console.log('Group data fecthed')
  }
  async getTodayData() {
    console.log('Fetching today data')
    const response = await fetch('http://worldcup.sfg.io/matches/today')
    const today = await response.json()
    this.setState((prev, props) => Object.assign({}, prev, {
      today
    }))
    console.log('Today data fecthed')
  }
  async getNowData() {
    console.log('Fetching now data')
    const response = await fetch('http://worldcup.sfg.io/matches/today')
    const now = await response.json()
    this.setState((prev, props) => Object.assign({}, prev, {
      now
    }))
    console.log('Today now fecthed')
  }

  renderGroupTable() {
    const { groups } = this.state
    if (groups.length > 0) {
      return(
        <Fragment>
          {groups.map((group, i) => 
            <Group key={i} group={group} loading={false}/>)
          }
        </Fragment>
      )
    }
    return (
      <Fragment>
        <Group loading={true}/>
      </Fragment>
    )
  }

  renderGames() {
    const { today } = this.state
    if (today.length > 0) {
      return (
        <Carousel vertical>
          {today.map((match, i) => (<Game key={i} match={match} />))}
        </Carousel>
      )
    }
    return (<Spin />)
  }

  render() {
    return (
      <div id="main">
        <div>
          <div id="header" style={{ textAlign: 'center', padding: 10 }}>
            <h1 style={{ margin: 0 }}>World Cup Live Dashboard</h1>
          </div>
          <div style={groupTable}>
            {this.renderGroupTable()}
          </div>
          {/* <div style={{width:""}}>
            {this.renderGames()}
          </div> */}
        </div>
        <div id="current" style={{width: 300}}>
          {(() => {
            if (this.state.today.length > 0) {
              return (
                <LiveGame match={this.state.today[0]} />
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