import React from 'react'
import Flag from './Flag'
import { Tag } from 'antd'
import moment from 'moment'

function makeTag(status) {
    if (status === "completed") {
        return (<Tag color="green">Completed</Tag>)
    }
    if (status === "future") {
        return (<Tag color="orange">Up next</Tag>)
    }
    return (<Tag color="red">Live</Tag>)
}

export default class LiveGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date(Date.now())
        }
    }

    eventTag(tag) {
        if(tag == 'goal') {
            return (<Tag color="green">Goal</Tag>)
        } else if(tag == "substitution-in"){
            return (<Tag color="blue">Sub</Tag>)
        } else if(tag == "yellow-card"){
            return (<Tag color="orange">Card</Tag>)
        } else if(tag == "red-card"){
            return (<Tag color="red">Card</Tag>)
        }
    }
    render() {
        const { home_team, away_team, datetime, status, away_team_events, home_team_events } = this.props.match
        const time = new Date(datetime)
        const events = home_team_events.map(a => Object.assign(a, {from:"home"})).concat(
            away_team_events.map(a => Object.assign(a, {from:"away"}))
        ).sort((a, b) => parseInt(a.time) - parseInt(b.time))
        return (
            <div style={{
                textAlign: 'center',
                height: 200,
                width: "auto",
            }}>
                <div>
                    <Flag country={home_team.country} width={70} />
                    <Flag country={away_team.country} width={70} />
                </div>
                {makeTag(status)}
                <br/>
                {moment(time).fromNow()}
                <h2>{home_team.country} vs. {away_team.country}</h2>
                <h3>{home_team.goals} - {away_team.goals}</h3>
                <p>{time.getHours()}:{time.getMinutes()}{(() => { if (time.getMinutes() < 10) { return "0" } })()} </p>
                <div>
                    {events.map(event => {
                        return ((() => {
                            if (event.from === 'home') {
                                return (
                                    <p style={{ textAlign: 'left', paddingLeft:10 }}>
                                        {event.time} {this.eventTag(event.type_of_event)}
                                    </p>
                                )
                            }
                            return (
                                <p style={{ textAlign: 'right', paddingRight:30 }}>
                                    {this.eventTag(event.type_of_event)} {event.time}
                                </p>
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