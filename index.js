import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Card } from 'antd'
import Group from './components/Group'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      groups: [],
    }
    this.getData()
  }

  async getData() {
    console.log('Fetching group data')
    const response = await fetch('http://worldcup.sfg.io/teams/group_results')
    const groups = await response.json()
    this.setState((prev, props) => Object.assign({}, prev, {
      groups: groups.map(a => a.group),
    }))
    console.log('Data fecthed')
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

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', padding: 10 }}>
          <h1>World Cup Live Dashboard</h1>
        </div>
        <div style={groupTable}>
          {this.renderGroupTable()}
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
