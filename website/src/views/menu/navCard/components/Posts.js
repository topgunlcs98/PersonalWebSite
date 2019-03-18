import React, { Component } from 'react';
import {PostApi} from 'src/ajax'
import {Typography, Tag} from 'antd'
import moment from 'moment'

import styles from './Posts.css'

const {  Paragraph } = Typography

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this.fetchPost()
    }

    async fetchPost () {
       try{
        const {data} = await PostApi.fetchPost()
        this.setState({
            posts: data
        })
       } catch(err) {
           console.log(err)
       }
    }

    render(){
        const postItems = this.state.posts.reverse().map((value,key) =>
        <div key={key} className={styles.container}>
            <div className={styles.title}>                
                <div className={styles.leftSide}>
                    <div className={styles.titleText}>{value.title}</div>
                    <div><Tag>{value.tag}</Tag></div>
                </div>
                <div>{moment(value.date).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className={styles.postWrapper}>
            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {value.body}
            </Paragraph>
            </div>
        </div>
        )
        return(
            <div className={styles.container}>
                {postItems}
            </div>
        )
    }
}