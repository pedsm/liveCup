import React from 'react'
import { Progress } from 'antd'

export default function Stats(props) {
    const { stats } = props
    return (
        <div>
            <h3>{stats.country} Stats</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <div style={{ width: 100, textAlign: "center" }}>
                    <Progress type="dashboard" percent={stats.ball_possession} width={80} />
                    Ball possession
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                    <Progress type="dashboard" percent={stats.pass_accuracy} width={80} />
                    Pass Accuracy
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                    <div style={{ width: 80 }}><h1 style={{ marginTop: 23 }}>{stats.attempts_on_goal}</h1></div>
                    Attempts on goal
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                    <div style={{ width: 80 }}><h1 style={{ marginTop: 23 }}>{stats.yellow_cards}</h1></div>
                    Yellow Cards
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                    <div style={{ width: 80 }}><h1 style={{ marginTop: 23 }}>{stats.red_cards}</h1></div>
                    Red Cards
                </div>
                <div style={{ width: 100, textAlign: "center" }}>
                    <div style={{ width: 80 }}><h1 style={{ marginTop: 23 }}>{stats.fouls_committed}</h1></div>
                    Fouls Committed
                </div>
            </div>
        </div>
    )
}