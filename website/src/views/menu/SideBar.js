import React, { Component } from 'react'
import { Card } from 'antd'
import SidBarPic from './avatar1.jpg'
export default class SideBar extends Component {
    render() {
        const description = (
          <div>
            <p>student/coder</p>
            <p>Stay huangry, Stay foolish</p>
          </div>
        ) 
        const { Meta } = Card
        return(
            <div style={{margin: '20px' }}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={SidBarPic} />}
                >
                  <Meta
                  title="Topgun"
                  description={description}
                  />
                </Card>
            </div>
        )
    }
}