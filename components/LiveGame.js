import React, { Fragment } from 'react'
import Flag from './Flag'
import {
    Tag,
    Progress,
    Button
} from 'antd'
import Stats from './Stats'
import moment from 'moment'

function makeTag(match) {
    const { status, datetime } = match
    const time = new Date(datetime)
    if (status === "completed") {
        return (
            <Fragment>
                <Tag color="green">Completed</Tag>
                <br />
                {moment(time).fromNow()}
            </Fragment>
        )
    }
    if (status === "future") {
        return (
            <Fragment>
                <Tag color="orange">Up next</Tag>
                <br />
                {moment(time).fromNow()}
            </Fragment>
        )
    }
    return (
        <Fragment>
            <Tag color="red">Live</Tag>
            <br />
            {match.time}
        </Fragment>
    )
}

export default class LiveGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(Date.now())
        }
    }

    eventTag(tag) {
        if (tag == 'goal') {
            return (<Tag color="green">Goal</Tag>)
        } else if (tag == "goal-penalty") {
            return (<Tag color="blue">Penalty</Tag>)
        } else if (tag == "goal-own") {
            return (<Tag color="red">Own Goal</Tag>)
        } else if (tag == "substitution-in") {
            return (<Tag color="blue">Sub In</Tag>)
        } else if (tag == "substitution-out") {
            return (<Tag color="blue">Sub Out</Tag>)
        } else if (tag == "yellow-card" || tag == "yellow-card-second") {
            return (<Tag color="orange">Card</Tag>)
        } else if (tag == "red-card") {
            return (<Tag color="red">Card</Tag>)
        }
    }

    handleModal() {
        const { modal } = this.props
        const { 
            home_team,
            home_team_statistics,
            away_team,
            away_team_statistics,
        } = this.props.match
        modal(`${home_team.country} vs. ${away_team.country}`, (
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: "1fr 1fr 1fr"
            }}>
                <div>
                    <Stats team={home_team.country} stats={home_team_statistics}/>
                </div>
                <LiveGame match={this.props.match} mini={true} modal={() => { }} />
                <div>
                    <Stats team={away_team.country} stats={away_team_statistics}/>
                </div>
            </div>
        ))
    }

    render() {
        const { home_team, away_team, datetime, status, away_team_events, home_team_events } = this.props.match
        const events = home_team_events.map(a => Object.assign(a, { from: "home" })).concat(
            away_team_events.map(a => Object.assign(a, { from: "away" }))
        ).sort((a, b) => parseInt(a.time) - parseInt(b.time))
        const time = new Date(datetime)
        return (
            <div 
                style={{ textAlign: 'center', width: "auto", }}
            >
                <div>
                    <Flag country={home_team.country} width={120} />
                    <Flag country={away_team.country} width={120} />
                </div>
                {makeTag(this.props.match)}
                <h2>{home_team.country} vs. {away_team.country}</h2>
                <h1>{home_team.goals} - {away_team.goals}</h1>
                <p>{time.getHours()}:{time.getMinutes()}{(() => { if (time.getMinutes() < 10) { return "0" } })()} </p>
                {
                    this.props.mini != true
                    ? this.props.match.home_team_statistics != null 
                            ? <Button onClick={this.handleModal.bind(this)}>Details</Button>
                            : <Button disabled>Details coming soon</Button>
                    : <span/>
                }
                <div style={{ marginTop: 10 }}>
                    {events.map((event, i) => {
                        return ((() => {
                            if (event.from === 'home') {
                                return (
                                    <div key={i} style={{ textAlign: 'left', paddingLeft: 10 }}>
                                        {event.time} {this.eventTag(event.type_of_event)}
                                    </div>
                                )
                            }
                            return (
                                <div key={i} style={{ textAlign: 'right', paddingRight: 30 }}>
                                    {this.eventTag(event.type_of_event)} {event.time}
                                </div>
                            )
                        })())
                    })}
                </div>
            </div>
        )
    }
}


const testData = JSON.parse(`{
    "home_team_events":[
    {
      "id": 5,
      "type_of_event": "goal",
      "player": "Iury GAZINSKY",
      "time": "12'"
    },
    {
      "id": 1,
      "type_of_event": "substitution-in",
      "player": "Denis CHERYSHEV",
      "time": "24'"
    },
    {
      "id": 2,
      "type_of_event": "goal",
      "player": "Denis CHERYSHEV",
      "time": "43'"
    },
    {
      "id": 4,
      "type_of_event": "substitution-in",
      "player": "Daler KUZIAEV",
      "time": "64'"
    },
    {
      "id": 8,
      "type_of_event": "substitution-in",
      "player": "Artem DZYUBA",
      "time": "70'"
    },
    {
      "id": 9,
      "type_of_event": "goal",
      "player": "Artem DZYUBA",
      "time": "71'"
    },
    {
      "id": 6,
      "type_of_event": "yellow-card",
      "player": "Aleksandr GOLOVIN",
      "time": "88'"
    },
    {
      "id": 3,
      "type_of_event": "goal",
      "player": "Denis CHERYSHEV",
      "time": "90'+1'"
    },
    {
      "id": 7,
      "type_of_event": "goal",
      "player": "Aleksandr GOLOVIN",
      "time": "90'+4'"
    }
  ],
  "away_team_events": [
    {
      "id": 12,
      "type_of_event": "substitution-in",
      "player": "FAHAD ALMUWALLAD",
      "time": "64'"
    },
    {
      "id": 10,
      "type_of_event": "substitution-in",
      "player": "HATAN BAHBIR",
      "time": "72'"
    },
    {
      "id": 13,
      "type_of_event": "substitution-in",
      "player": "MUHANNAD ASIRI",
      "time": "85'"
    },
    {
      "id": 11,
      "type_of_event": "yellow-card",
      "player": "TAISEER ALJASSAM",
      "time": "90'+3'"
    }
  ]
}`)