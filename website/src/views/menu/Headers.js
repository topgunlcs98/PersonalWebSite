import React, { Component } from 'react'
import { Button } from 'antd'
import './Header.css'

export default class Headers extends Component {
    render() {
        const ButtonGroup = Button.Group
        return(
            <div className="headerContainer">
                <div className="brand">Hello, Welcome to My Blog!</div>
                <ButtonGroup>
                    <Button >主页 Menu</Button>
                    <Button >登录 Login</Button>
                </ButtonGroup>
            </div>
        )
    }
}