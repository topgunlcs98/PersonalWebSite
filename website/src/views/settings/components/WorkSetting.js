import React, {Component} from 'react'
import { Button, List, Form, Col, Row, Input, message } from 'antd'
import styles from './Edu.css'

import {ProfileApi} from 'src/ajax'

export default class WorkSetting extends Component {
    constructor(props){
        super(props)
        this.state={
            works: [],
            index: '',
            startTime: '',
            endTime: '',
            place: '',
            title: '',
            isShow: false
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({works: nextProp.works, index: nextProp.id})
    }

    openForm = () => {
        this.setState(prevState => ({
            isShow: !prevState.isShow
        }))
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onStartTimeChange = (e) => {
        this.setState({
            startTime: e.target.value
        })
    }

    handleSave = () => {
        const newWork = {
            place: this.state.place,
            starttime: this.state.startTime,
            endtime: this.state.endTime,
            title: this.state.title
        }
        var oldState = this.state.works.slice()
        oldState.push(newWork)
        this.setState({
            works: oldState,
            startTime: '',
            endTime: '',
            place: '',
            title: '',
            isShow: false
        })
    }

    onEndTimeChange = (e) => {
        this.setState({
            endTime: e.target.value
        })
    }

    onPhaseChange = (e) => {
        console.log(e.target.value)
        this.setState({
            place: e.target.value
        })
    }

    submitChange = async() => {
        try{
            const body = {
                index: this.state.index,
                work: this.state.works
            }
            await ProfileApi.changeWork(body)
        } catch(err){
            console.log(err)
        }
        message.success("成功提交修改")
    }

    handleDelete = (index) => {
        const state = this.state.works.slice()
        state.splice(index,1)
        this.setState({
            works: state
        })
    }

    render(){
        const exps = (this.state.works || []).map((value,key) => 
            <List.Item key={key} actions={[<Button type="danger" size="small" shape="circle" icon="close"
                onClick={()=>this.handleDelete(key)} />]}>
                <List.Item.Meta
                    title={<span>{value.starttime} --- {value.endtime}</span>}
                    description={value.place}
                />
                <div>{value.title}</div>
            </List.Item>
        )

        const forms = <div>
            <Form>
                <Row style={{margin: '10px'}}>
                    <Col span={12}>
                        <Input size="small" className={styles.inputSmall} placeholder={"输入开始时间"} 
                            onChange={this.onStartTimeChange} value={this.state.startTime} />
                    </Col>
                    <Col span={12}>
                        <Input size="small" className={styles.inputSmall} placeholder={"输入结束时间"}
                            onChange={this.onEndTimeChange} value={this.state.endTime} />
                    </Col>
                </Row>
                <Row style={{margin: '10px'}}>
                    <Col span={12}>
                        <Input size="small" className={styles.inputLarge} placeholder={"单位名称"} 
                            onChange={this.onPhaseChange} value={this.state.place} />
                    </Col>
                    <Col span={12}>
                         <Input size="small" className={styles.inputLarge} placeholder={"职务名称"} 
                            onChange={this.onTitleChange} value={this.state.title} />
                    </Col>
                </Row>
                <Row>
                    <Col span={18}>
                        <Button type="dashed" block onClick={this.handleSave}>保存Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>

        return(
            <div className={styles.container} >
                <div className={styles.titleContainer}>
                    <div><h3>修改工作经历</h3></div>
                    <div>
                        <Button type="primary" shape="circle" icon="plus" style={{marginRight: '10px'}} onClick={this.openForm} />
                        <Button type="Normal" onClick={this.submitChange} >提交修改</Button>
                    </div>
                </div>
                {this.state.isShow ? forms : null}
                <List
                         className="demo-loadmore-list"
                         itemLayout="horizontal"
                         style={{width: '80%', margin: '0 auto'}}
                    >
                      {exps}
                    </List>
            </div>
        )
    }
}