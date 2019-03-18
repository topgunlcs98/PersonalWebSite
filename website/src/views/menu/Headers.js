import React, { Component } from 'react'
import { Button,  Modal, Input } from 'antd'
import styles from './Header.css'

import {userLogin} from 'src/redux/action'
import {connect} from 'react-redux'

@connect()
class Headers extends Component {
    state = {
        visible: false, //浮层可视状态
        userName: '',
        passWord: ''
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = async(e) => {
        const body = {
            userName: this.state.userName,
            passWord: this.state.passWord
        }
        try{
            const {message, isSuccess}= await this.props.dispatch(userLogin(body))
            console.log(message)
        }catch(err) {
            console.log(err)
        }
        
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }

      handleNameChange = (e) => {
          this.setState({
              userName: e.target.value
          })
      }

      handlePwchange = (e) => {
          this.setState({
              passWord: e.target.value
          })
      }

    render() {
        const ButtonGroup = Button.Group
        return(
            <div className={styles.container}>
                <div className={styles.brand}>Hello, Welcome to My Blog!</div>
                <ButtonGroup>
                    <Button >主页 Home</Button>
                    <Button onClick={this.showModal}>Login 登录</Button>
                    <Modal
                        title="登录---管理我的简历和文章"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={300}
                        okText="LogIn"
                    >   
                        <p>
                            <Input placeholder="用户名userName" value={this.state.userName} 
                                onChange={this.handleNameChange}/>
                        </p>
                        <Input.Password placeholder="密码 password" value={this.state.passWord}
                            onChange={this.handlePwchange} />
                    </Modal>
                </ButtonGroup>
            </div>
        )
    }
}
export default Headers