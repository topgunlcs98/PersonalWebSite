import React, { Component } from 'react'
import { Calendar } from 'antd';

export default class CalendarCard extends Component {
    render() {
        return(
            <div style={{margin: '20px'}}>
            <div style={{ width: 280, border: '1px solid #d9d9d9', borderRadius: 4,backgroundColor: 'white'}}>
            <Calendar fullscreen={false} />
            </div>
          </div>
        )
    }
}