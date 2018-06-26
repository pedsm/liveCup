import React, { Fragment } from 'react'
import { Card, Table } from 'antd'
import Flag from './Flag'

export default function(props) {
    if(props.loading){
        return (
            <Fragment>
                <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card> <Card loading={true} title="Group _"></Card>
            </Fragment>
        )
    }
    const { group } = props
    console.log(group)
    return(
        <Card title={`Group  ${group.letter}`}>
            <Table 
                dataSource={group.ordered_teams}
                columns={cols}
                size="middle"
                pagination={false}
                rowKey="id"
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