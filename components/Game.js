import React, { Fragment } from 'react'
import { 
    Card, 
    Tag,
    Button,
    Progress
} from 'antd'
import Flag from './Flag'
import LiveGame from './LiveGame'
import Stats from './Stats'
import moment from 'moment'

const { Meta } = Card

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
            {moment(time).fromNow()}
        </Fragment>
    )
}

export default class Game extends React.Component {
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
        const { home_team, away_team, datetime, status } = this.props.match
        const time = new Date(datetime)
        return (
            <Card
                hoverable
                style={{ width: 240, margin: '10px auto' }}
                cover={
                    <div style={{ textAlign: "center" }}>
                        <Flag country={home_team.country} width={80} />
                        <Flag country={away_team.country} width={80} />
                        <br />
                        {makeTag(this.props.match)}
                        <p>{home_team.goals} - {away_team.goals}</p>
                        <p></p>
                        {
                            this.props.match.home_team_statistics != null
                                ? <Button onClick={this.handleModal.bind(this)}>Details</Button>
                                : <Button disabled>Details coming soon</Button>
                        }
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