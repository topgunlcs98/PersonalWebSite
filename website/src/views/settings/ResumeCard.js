import React, {Component} from 'react'

import SkillSetting from './components/SkillSetting'
import InterestSetting from './components/InterestSetting'
import { ProfileApi } from 'src/ajax'

export default class ResumeCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            skills: [],
            interest: [],
            education: [],
            project: [],
            work: []
        }
    }

    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile = async() => {
        try{
            const {data} = await ProfileApi.fetchProfile()
            const {_id, skills,interest, education,project,work} = data[0]
            this.setState({
                id: _id,
                skills: skills,
                interest: interest,
                education: education,
                project: project,
                work: work
            })
        } catch(err){
            console.log(err)
        }
    }

    render(){
        return(
            <div style={{
                width: "100%",
                margin: "0 auto"
            }}>
            <p><SkillSetting id={this.state.id} skills={this.state.skills} /></p>
            <p><InterestSetting id={this.state.id} interests={this.state.interest} /></p>
            </div>
        )
    }
}