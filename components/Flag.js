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
    return(
        <img 
            src={url}
            width="20px"
            height="auto"
        />
    )

}