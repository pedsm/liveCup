import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { 
  Card,
  Carousel,
  message,
  Row,
  Col,
  Modal
} from 'antd'
import Spin from './components/Spin'
import Group from './components/Group'
import Game from './components/Game'
import LiveGame from './components/LiveGame'
import News from './components/News'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      today: [],
      now: [],
      news: [],
      modal: {
        open: true,
        title: "Game",
        content: <h1>Loading...</h1>
      }
    }

    this.getDataAs('https://world-cup-json.herokuapp.com/teams/group_results', "groups", "Group", (a) => a.map(a => a.group))
    this.getDataAs('https://world-cup-json.herokuapp.com/matches/today', "today", "Today")
    this.getDataAs('https://world-cup-json.herokuapp.com/matches/current', "now", "Now")
    this.getDataAs('https://fifa-2018-apis.herokuapp.com/fifa/news', "news", "News", a => a.data)
    setInterval(() => {
      this.getDataAs('https://world-cup-json.herokuapp.com/teams/group_results', "groups", "Group", a => a.map(a => a.group))
      this.getDataAs('https://world-cup-json.herokuapp.com/matches/today', "today", "Today")
      this.getDataAs('https://world-cup-json.herokuapp.com/matches/current', "now", "Now")
      this.getDataAs('https://fifa-2018-apis.herokuapp.com/fifa/news', "news", "News", a => a.data)
    }, 10 * 1000)
  }

  async getDataAs(apiUrl, label, name, modifier) {
    try {
      const response = await fetch(apiUrl)
      const json = await response.json()
      const obj = {}
      if (modifier != null) {
        obj[label] = modifier(json)
      } else {
        obj[label] = json
      }
      this.setState((prev, props) => Object.assign({}, prev, obj))
    } catch (e) {
      message.error(`${name} data error`)
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
        <Fragment >
          {today.map((match, i) => (
            <Col key={i} span={8}>
              <Game match={match} />
            </Col>
          ))}
        </Fragment>
      )
    }
    return (<Spin />)
  }

  openModal(title, content) {
    this.setState((prev, props) => (
      Object.assign(prev, {
        modal: {
          open: true,
          title,
          content
        }
      })
    ))
  }


  render() {
    let now = {}
    if (this.state.now.length > 0) {
      now = this.state.now[0]
    } else {
      now = this.state.today.filter(match => match.status != 'completed')[0]
      if (now == null) {
        now = this.state.today[this.state.today.length - 1]
      }
    }
    return (
      <div id="main">
        <Modal
          title={this.state.modal.title}
          visible={this.state.modal.open}
          onOk={() => this.setState((prev, props) => (Object.assign(prev, { modal:{ open: !prev.modal.open }})))}
          onCancel={() => this.setState((prev, props) => (Object.assign(prev, { modal:{ open: !prev.modal.open }})))}
        >
          {this.state.modal.content}
        </Modal>
        <News news={this.state.news} />
        <div style={mainContent}>
          <div id="header" style={{ textAlign: 'center', padding: 10 }}>
            <h1 style={{ margin: 0 }}>World Cup 2018 Live</h1>
          </div>
          <div style={groupTable}>
            {this.renderGroupTable()}
          </div>
          <Row style={{ marginTop: "auto", marginBottom: "auto" }}>
            {this.renderGames()}
          </Row>
          <div style={{width: 300}}>
          </div>
        </div>
        <div id="current" style={{ width: 300, margin: "auto" }}>
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

const mainContent = {
  width: "calc(100% - 300px)",
  height: "100vh",
  display: "grid"
}

const groupTable = {
  padding: 20,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: 20,
}

ReactDOM.render(<App />, document.getElementById('root'));