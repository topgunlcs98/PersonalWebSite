import React, {Component} from 'react'
import {ProfileApi} from 'src/ajax'
import styles from './Profile.css'

import {Tag, Card} from 'antd'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            profile: []
        }
    }
    componentDidMount(){
        this.fetchProfileData()
    }
    async fetchProfileData() {
        try{
            const {data} = await ProfileApi.fetchProfile()
            this.setState({
                profile: data[0]
            })
        }catch(err) {
            console.log(err)
        }
    }

    render(){
        const skillItems = (this.state.profile.skills ||[]).map((value,key) => 
            <Tag color="#2db7f5" key={key}>{value}</Tag>
        )
        const interestItems = (this.state.profile.interest || []).map((value, key) => 
            <Tag color="cyan">{value}</Tag>
        )
        return(
            <div className={styles.container}>
                <div className={styles.cardwrapper}>
                    <Card
                        title="关注Focus On"
                        style={{ width: "100%" }}
                    >
                        <div>{interestItems}</div>
                    </Card>
                </div>
                <div className={styles.cardwrapper}>
                    <Card
                        title="技能Skills"
                        style={{ width: "100%" }}
                    >
                        <div>{skillItems}</div>
                    </Card>
                </div>
            </div>
        )
    }
}