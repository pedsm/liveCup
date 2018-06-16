import React from 'react'
import { Card, Table } from 'antd'
import Flag from './Flag'

export default function(props) {
    if(props.loading){
        return (
            <Card loading={true} title="Group _"></Card>
        )
    }
    const { group } = props
    console.log(group)
    return(
        <Card title={`Group  ${group.letter}`}>
            <Table 
                dataSource={group.teams.map(a => a.team)}
                columns={cols}
                size="middle"
                pagination={false}
            />
        </Card>

    )
}
const cols = [
    {
        title: '',
        key: 'flag',
        render: (text, record) => (
            <Flag country={record.country}/>
        ),
    },
    {
        title: 'Team',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
    },
    {
        title: 'GD',
        dataIndex: 'goal_differential',
        key: 'goal_differential',
    }
] 