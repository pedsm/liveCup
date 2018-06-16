import React from 'react'
import { Flags } from './flagList'

export default function Flag(props){
    const { country } = props
    let url = ""
    for (let flag of Flags) {
        if(flag.name == country){
            url = flag.flag
        }
    }
    let width = 20
    if(props.width != null) {
        width = props.width
    }
    return(
        <img 
            style={{borderRadius:"50%", padding:width/5}}
            src={url}
            width={width}
            height={width}
        />
    )

}