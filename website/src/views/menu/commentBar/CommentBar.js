import React, {Component} from 'react'
import { Input, Button, Icon} from 'antd'

import guest from 'src/assets/guest.jpg'
import styles from './Comment.css'
import CommentItem from './CommentItem'
import {CommentApi} from 'src/ajax'

const { TextArea } = Input

export default class CommentBar extends Component {
    constructor(props) {
        super(props)
        this.state={
            replies: [],
            num: 0,
            value: '',
            guestName: ''
        }
    }

    componentDidMount () {
        this.fetchComments()
    }   
    
    async fetchComments() {
        try{
            const {data} = await CommentApi.fetchComments()
            this.setState({
                replies: data,
                num: data.length
            })
        }catch(err){
            console.log(err)
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ guestName: '' });
      }
    
      onChangeUserName = (e) => {
        this.setState({ guestName: e.target.value });
      }

       submit = async() => {
         const comment = {
             name: this.state.guestName,
             body: this.state.value
         }
         try{
            await CommentApi.setComment(comment)
         } catch(err) {
             console.log(err)
         }
         this.setState({
            value: '',
            guestName: ''
         }, this.fetchComments)
      }
    render() {
        const suffix = this.state.guestName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null
        return(
            <div className={styles.container}>
                <div className={styles.commentContainer}>
                    <div className={styles.title}><h1>留言板 Message Board</h1></div>
                    <div>共有<span className={styles.label}>{this.state.num}</span>条评论</div>
                    {   
                        (this.state.replies || []).map((value,key) =>
                        <CommentItem key={key} author={value.name} content={value.body} date={value.date} id={value.id}/>
                        )
                        }
                </div>
                <div className={styles.input}>
                    <div className={styles.avatarContainer}>
                        <img src={guest} className={styles.avatar} alt='guest' />
                    </div>
                    <div className={styles.inputContainer}>
                        <div>
                            <Input
                                placeholder="Enter your username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                value={this.state.guestName}
                                onChange={this.onChangeUserName}
                                ref={node => this.userNameInput = node}
                            />
                        </div>
                        <div className={styles.textArea}>
                            <TextArea 
                                rows={4} 
                                value={this.state.value} 
                                onChange={this.handleChange}
                                placeholder="Enter your comment here"
                            />
                        </div>
                        <div>
                            <Button type="primary" onClick={this.submit}>Add Comment</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}