import React from 'react'

export default class Game extends React.Component {
    render() {
        const { home_team, away_team, datetime } = this.props.match
        const time = new Date(datetime)
        return(
            <div style={{ 
                textAlign: 'center',
                height: 200,
                width: "auto",
            }}>
                <h2>{home_team.country} vs. {away_team.country}</h2>
                <h3>{home_team.goals} - {away_team.goals}</h3>
                <p>{time.getHours()}:{time.getMinutes()}{(() => {if(time.getMinutes() < 10){return "0"}})()} </p>
            </div>
        )
    }
}