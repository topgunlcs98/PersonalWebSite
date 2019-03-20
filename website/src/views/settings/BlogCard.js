import React, {Component} from 'react'
import { Input, Button, Tag, message } from 'antd'

import { PostApi } from 'src/ajax'
import styles from './BlogCard.css'

const { TextArea } = Input
const { CheckableTag } = Tag
export default class BlogCard extends Component {
    constructor(props) {
        super(props)
        this.state={
            title: '',
            body: '',
            type: '',
            checked : [false,false,false,false,false,false,false]
        }
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleBodyChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }
    
    handleTagClick = (index,value) => {
        let defaultValue = [false,false,false,false,false,false,false] 
        defaultValue[index] = true
        this.setState({
            type: value,
            checked: defaultValue
        })
    }

    submit = async() => {
        const {title,body,type} = this.state
        if(title === '' || body === '' || type === '') {
            message.warning('请完善信息')
            return
        }
        const postBody = {
            title: this.state.title,
            body: this.state.body,
            tag: this.state.type
        }
        try{
            await PostApi.createPost(postBody)
        }catch(err) {
            console.log(err)
        }
        message.success('发布成功！')
    }

    render(){
        const labelSet = ['POLITICS','ECONOMY', 'EDUCATION','IT', 'HISTORY','MILITARY','OTHER']
        const lasbels = labelSet.map((value, key) =>
            <CheckableTag key={key} checked={this.state.checked[key]} onChange={()=>this.handleTagClick(key,value)}>
                <span style={{fontSize: '1.2em'}}>{value}</span>
            </CheckableTag>
        )
        return(
            <div className={styles.container}>
                <div className={styles.item}>
                    <Input placeholder="标题Title" value={this.state.title} 
                        onChange={this.handleTitleChange}/>
                </div>
                <div className={styles.item}>
                    <span style={{fontSize: '1.3em', fontWeight: 'bold'}}>标签：</span>
                    {lasbels}
                </div>
                <div className={styles.item}>
                    <TextArea rows = {10} placeholder="正文Body"
                    value={this.state.body} onChange={this.handleBodyChange}/>
                </div>
                <div className={styles.item}>
                <Button type="primary" block onClick={this.submit}>发表Publish</Button>
                </div>
            </div>
        )
    }
}