import React, { Fragment } from 'react'
import { Card } from 'antd'
import Flag from './Flag'

const { Meta } = Card

export default class Game extends React.Component {
    render() {
        const { home_team, away_team, datetime } = this.props.match
        const time = new Date(datetime)
        return(
            <Card
                hoverable
                style={{ width: 240, margin:'auto' }}
                cover={
                    <div style={{textAlign:"center"}}>
                        <Flag country={home_team.country} width={80} />
                        <Flag country={away_team.country} width={80} />
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