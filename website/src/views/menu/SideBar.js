import React, { Component } from 'react'
import { Card } from 'antd'
import SidBarPic from 'src/assets/avatar1.jpg'
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
            <div style={{marginLeft: '20px', marginTop: '20px' }}>
                <Card
                  hoverable
                  style={{ width: 250 }}
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