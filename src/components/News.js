import React, {Fragment} from 'react'
import { 
    notification,
    Icon
 } from 'antd'
import md5 from 'md5'

export default class News extends React.Component {
    constructor(props) {
        super(props)
        this.hash = this.getHash(this.props.news)
    }

    getHash(arr) {
        if(arr.length > 0) {
            return md5(arr[0].news_link)
        }
        return ""
    }

    notify() {
        const { news } = this.props
        console.log(this.props.news[0])
        notification.config({
            placement: "bottomLeft"
        })
        notification.open({
            message: 'New Article published',
            description: (
                <Fragment>
                    <p>{this.props.news[0].news_title}</p>
                    <a href={this.props.news[0].news_link} target="_blank">Open in new tab</a>
                </Fragment>
            ),
            icon: <Icon type="global" style={{ color: '#108ee9' }} />,
            duration: 15
        }); 
    }
    componentDidUpdate() {
        const { news } = this.props
        if (news.length > 0) {
            if (this.hash != this.getHash(news)) {
                this.notify()
                this.hash = this.getHash(news)
            }
        }
    }
    render() {
        return (<span/>)
    }
}