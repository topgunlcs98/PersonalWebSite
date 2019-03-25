import React, {Component} from 'react'
import { Button, List, Form, Col, Row, Input, Radio, message } from 'antd'

import styles from './Edu.css'
import {ProfileApi} from 'src/ajax'

export default class EducationSetting extends Component {
    constructor(props){
        super(props)
        this.state={
            edus: [],
            index: '',
            startTime: '',
            endTime: '',
            phase: '',
            title: 0,
            isShow: false
        }
    }

    componentWillReceiveProps(nextProp){
        this.setState({edus: nextProp.educations, index: nextProp.id})
    }

    getTitle = (num) => {
        let title = ''
        switch(num) {
            case 0:
                title = '中学/MiddleSchool'
                break
            case 1:
                title = '本科/Bachelor'
                break
            case 2:
                title = '硕士/Master'
                break
            case 3:
                title = '博士/Phd'
                break
            default:
                break
        }
        return title
    }

    openForm = () => {
        this.setState(prevState => ({
            isShow: !prevState.isShow
        }))
    }
    
    onRadioChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onStartTimeChange = (e) => {
        this.setState({
            startTime: e.target.value
        })
    }

    onEndTimeChange = (e) => {
        this.setState({
            endTime: e.target.value
        })
    }

    onPhaseChange = (e) => {
        this.setState({
            phase: e.target.value
        })
    }

    handleSave = () => {
        const newEdu = {
            phase: this.state.phase,
            starttime: this.state.startTime,
            endtime: this.state.endTime,
            title: this.state.title
        }
        var oldState = this.state.edus.slice()
        oldState.push(newEdu)
        this.setState({
            edus: oldState,
            startTime: '',
            endTime: '',
            phase: '',
            title: 0,
            isShow: false
        })
    }

    submitChange = async() => {
        try{
            const body = {
                index: this.state.index,
                edu: this.state.edus
            }
            await ProfileApi.changeEdu(body)
        } catch(err){
            console.log(err)
        }
        message.success("成功提交修改")
    }

    handleDelete = (index) => {
        const state = this.state.edus.slice()
        state.splice(index,1)
        this.setState({
            edus: state
        })
    }

    render(){
        const exps = this.state.edus.map((value,key) => 
            <List.Item key={key} actions={[<Button type="danger" size="small" shape="circle" icon="close"
                onClick={()=>this.handleDelete(key)} />]}>
                <List.Item.Meta
                    title={<span>{value.starttime} --- {value.endtime}</span>}
                    description={value.phase}
                />
                <div>{this.getTitle(value.title)}</div>
            </List.Item>
        )

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          }

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
                        <Input size="small" className={styles.inputLarge} placeholder={"学校名称"} 
                            onChange={this.onPhaseChange} value={this.state.phase} />
                    </Col>
                    <Col span={12}>
                        <div>选择获得学位</div>
                        <Radio.Group value={this.state.title} onChange={this.onRadioChange}>
                            <Radio style={radioStyle} value={0}>高中</Radio>
                            <Radio style={radioStyle} value={1}>本科</Radio>
                            <Radio style={radioStyle} value={2}>硕士</Radio>
                            <Radio style={radioStyle} value={3}>博士</Radio>
                        </Radio.Group>
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
                    <div><h3>修改教育经历</h3></div>
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