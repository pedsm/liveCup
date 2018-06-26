import React from 'react'
import { Spin } from 'antd'

export default function CenterSpin(props) {
    return(
        <div style={{textAlign:'center', padding:"40px 40px"}}>
            <Spin />
        </div>
    )
}