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
    let width = 30
    if(props.width != null) {
        width = props.width
    }
    return(
        <img 
            style={{borderRadius:"0%", padding:width/5}}
            src={url}
            width={width}
            height="auto"
        />
    )

}