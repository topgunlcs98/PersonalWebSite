import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import './Header.css'

export default class Headers extends Component {
    render() {
        return(
            <div className="headerContainer">
                <div className="brand">Hello, Welcome to My Blog!</div>
                <ButtonGroup className="mr-2" aria-label="Second group">
                    <Button variant="primary" size="lg">主页</Button>
                    <Button variant="success" size="lg">登陆</Button>
                </ButtonGroup>
            </div>
        )
    }
}