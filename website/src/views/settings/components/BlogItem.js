import React, {Component} from 'react'
import {List, Button, Modal, Input} from 'antd'

import { PostApi } from 'src/ajax'

export default class BlogItem extends Component {
    constructor(props) {
        super(props)
        this.state={
            visible: false,
            title: this.props.title,
            body: this.props.body
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = async() => {
        try {
          const body = {
              index: this.props.id,
              content: this.state.body,
              title: this.props.title
          }
          console.log(body)
          await PostApi.modifyPost(body)
        } catch(err) {
          console.log(err)
        }
        this.setState({
          visible: false,
        });
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
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        })
      }

    render() {
        const { TextArea } = Input
        return(
           <div>
               <List.Item actions={[<Button type="primary" size="small" onClick={this.showModal}>edit</Button>, <Button type="danger" size="small">delete</Button>]}>
                    <List.Item.Meta
                        title={this.props.title}
                        description={this.props.tag}
                    />
                </List.Item>
                <Modal
                    title="修改文章"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={'70%'}
                >
                    <p><Input value={this.state.title} onChange={this.handleTitleChange}/></p>
                    <TextArea value={this.state.body } onChange={this.handleBodyChange} rows={10}/>
                </Modal>
           </div>
        )
    }
}