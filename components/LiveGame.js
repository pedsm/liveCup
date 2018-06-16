import React from 'react'
import Flag from './Flag'

export default function LiveGame(props) {
    const { home_team, away_team, datetime } = props.match
    const time = new Date(datetime)
    return(
        <div style={{
            textAlign: 'center',
            height: 200,
            width: "auto",
        }}>
            <div>
                <Flag country={home_team.country} width={50} />
                <Flag country={away_team.country} width={50} />
            </div>
            <h2>{home_team.country} vs. {away_team.country}</h2>
            <h3>{home_team.goals} - {away_team.goals}</h3>
            <p>{time.getHours()}:{time.getMinutes()}{(() => { if (time.getMinutes() < 10) { return "0" } })()} </p>
        </div>
    )
}