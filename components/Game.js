import React, { Fragment } from 'react'
import { Card, Tag } from 'antd'
import Flag from './Flag'
import moment from 'moment'

const { Meta } = Card

function makeTag(status) {
    if(status === "completed") {
        return(<Tag color="green">Completed</Tag>)
    }
    if(status === "future") {
        return(<Tag color="orange">Scheduled</Tag>)
    }
    return(<Tag color="red">Live</Tag>)
}
export default class Game extends React.Component {
    render() {
        const { home_team, away_team, datetime, status } = this.props.match
        const time = new Date(datetime)
        return(
            <Card
                hoverable
                style={{ width: 240, margin:'auto' }}
                cover={
                    <div style={{textAlign:"center"}}>
                        <Flag country={home_team.country} width={80} />
                        <Flag country={away_team.country} width={80} />
                        {makeTag(status)}
                        <br/>
                        {moment(time).fromNow()}
                        <p>{home_team.goals} - {away_team.goals}</p>
                        <p></p>
                    </div>
                }
            >
                <Meta
                    title={`${home_team.country} vs. ${away_team.country}`}
                    description={`${time.getHours()}:${time.getMinutes()}${(() => { if (time.getMinutes() < 10) { return "0" } })()}`}
                />
            </Card>
        )
    }
}