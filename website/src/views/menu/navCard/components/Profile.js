import React, {Component} from 'react'
import {ProfileApi} from 'src/ajax'
import styles from './Profile.css'

import {Tag, Card, Anchor} from 'antd'

const { Link } = Anchor
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

    getTitle = (num) => {
        let title = ''
        switch(num) {
            case 0:
                title = '中学/MiddleSchool'
                break
            case 1:
                title = '本科/Bachelor'
                break
            case 2:
                title = '硕士/Master'
                break
            case 3:
                title = '博士/Phd'
                break
            default:
                break
        }
        return title
    }

    render(){
        const skillItems = (this.state.profile.skills ||[]).map((value,key) => 
            <Tag color="#2db7f5" key={key}>{value}</Tag>
        )
        const interestItems = (this.state.profile.interest || []).map((value, key) => 
            <Tag color="cyan">{value}</Tag>
        )
        const eduItems = (this.state.profile.education || []).map((value,key) =>
            <div key={key}>{value.starttime}---{value.endtime}<span style={{marginLeft: '10px',marginRight: '10px', fontWeight: 'bold'}}>{value.phase}</span>{this.getTitle(value.title)}</div>
        )
        const workItems = (this.state.profile.work || []).map((value, key) =>
            <div key={key}>{value.starttime}---{value.endtime}<span style={{marginLeft: '10px',marginRight: '10px', fontWeight: 'bold'}}>{value.place}</span>{value.title}</div>
        )
        const projectItems = (this.state.profile.project ||[]).map((value, key) => 
            <div key={key} style={{display: 'flex', flexDirection: 'column', borderBottom: '0.5px dotted grey', marginBottom: '10px', paddingBottom: '15px'}}>
                <div>
                    <span style={{fontWeight:'bolder'}}>#{key+1}</span>
                    <span style={{marginRight: '10px',marginLeft: '10px', fontSize: '1.3em'}}>{value.name}</span>
                    <Tag color="orange">{value.type}</Tag>
                </div>
                <div>简介：{value.abstract}</div>
                <div>链接：<a target="_blank" rel="noopener noreferrer" href={value.link}>{value.link}</a></div>
                <div>我的贡献: {value.work}</div>
            </div>
        )
        return(
            <div className={styles.container}>
            <div className={styles.firstRow}>
                <div className={styles.cardwrapper} id="focus">
                    <Card
                        title="关注Focus On"
                        style={{ width: "100%" }}
                    >
                        <div>{interestItems}</div>
                    </Card>
                </div>
                <div  className={styles.quickNavs}>
                    <Anchor affix={false}>
                        <Link href="#focus" title="关注" />
                        <Link href="#skill" title="技能" />
                        <Link href="#education" title="教育经历"/>
                        <Link href="#work" title="工作经历" />
                        <Link href="#project" title="项目经历" />
                    </Anchor>
                </div>
            </div>
                <div className={styles.cardwrapper} id="skill">
                    <Card
                        title="技能Skills"
                        style={{ width: "100%" }}
                    >
                        <div>{skillItems}</div>
                    </Card>
                </div>
                <div className={styles.cardwrapper} id="education">
                    <Card
                        title="教育经历Education"
                        style={{ width: "100%" }}
                    >
                        <div>{eduItems}</div>
                    </Card>
                </div>
                <div className={styles.cardwrapper} id="work">
                    <Card
                        title="工作经历WorkingExperience"
                        style={{ width: "100%" }}
                    >
                        <div>{workItems}</div>
                    </Card>
                </div>
                <div className={styles.cardwrapper} id="project">
                    <Card
                        title="项目经历ProjectExperience"
                        style={{ width: "100%" }}
                    >
                        <div>{projectItems}</div>
                    </Card>
                </div>
            </div>
        )
    }
}