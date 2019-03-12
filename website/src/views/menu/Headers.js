import React, { Component } from 'react'
import { Button } from 'antd'
import styles from './Header.css'

export default class Headers extends Component {
    render() {
        const ButtonGroup = Button.Group
        return(
            <div className={styles.container}>
                <div className={styles.brand}>Hello, Welcome to My Blog!</div>
                <ButtonGroup>
                    <Button >主页 Home</Button>
                    <Button >Login 登录</Button>
                </ButtonGroup>
            </div>
        )
    }
}