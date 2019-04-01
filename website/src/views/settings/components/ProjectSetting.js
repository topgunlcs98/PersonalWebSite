import React, {Component} from 'react'
import {Button, List, Drawer, Icon, Col, Row, Input, message} from 'antd'

import {ProfileApi} from 'src/ajax'
import styles from './Edu.css'

export default class ProjectSetting extends Component {
    constructor(props) {
        super(props)
        this.state={
            name:'',
            type: '',
            link: '',
            work: '',
            abstract: '',
            visible: false,
            projects:[],
            index:''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            projects: nextProps.projects,
            index: nextProps.id
        })
    }


    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleTypeChange =(e) => {
        this.setState({
            type: e.target.value
        })
    }

    handleLinkChange = (e) => {
        this.setState({
            link: e.target.value
        })
    }

    handleAbstractChange =(e) => {
        this.setState({
            abstract: e.target.value
        })
    }
    
    handleWorkChange = (e) => {
        this.setState({
            work: e.target.value
        })
    }

    handleOk = () => {
        const project = {
            name: this.state.name,
            type: this.state.type,
            link: this.state.link,
            abstract: this.state.abstract,
            work: this.state.work
        }
        let state = this.state.projects.slice()
        state.push(project)
        this.setState({
            projects: state,
            name:'',
            type: '',
            link: '',
            work: '',
            abstract: '',
            visible: true,
        })
    }

    OnDelete = (index) => {
        const state = this.state.projects.slice()
        state.splice(index,1)
        this.setState({
            projects: state
        })
    }

    submitChange = async() => {
        try{
            const body = {
                index: this.state.index,
                projects: this.state.projects
            }
            await ProfileApi.changeProjects(body)
        } catch(err){
            console.log(err)
            return
        }
        message.success("成功提交修改")
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        })
      }
    
      onClose = () => {
        this.setState({
          visible: false,
        })
      }

    render() {
        const projects = (this.state.projects).map((value, key) => 
            <List.Item key={key}
            actions={[<Button type="danger" shape="round" icon="close" 
            onClick={()=>this.OnDelete(key)}  size={'small'}>Delete</Button>]}
            >
                <List.Item.Meta
                    title={<div><a href={value.link}>{value.name}</a>   {value.type}</div>}
                    description = {value.abstract}
                />
                <div>{value.work}</div>
            </List.Item>
        )
        return(
            <div className={styles.container} >
                <div className={styles.titleContainer}>
                    <div><h3>修改项目经历</h3></div>
                    <div>
                        <Button.Group>
                            <Button type="primary" onClick={this.showDrawer}>
                                <Icon type="plus" /> 添加项目
                            </Button>
                            <Button type="Normal" onClick={this.submitChange} >
                                提交修改<Icon type="upload" />
                            </Button>
                        </Button.Group>
                    </div>
                    <Drawer
                        title="Create a new Project"
                        placement="right"
                        width={500}
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Row>
                            <Col span={10}>
                                <span>项目名称</span>
                                <Input placeholder="填写名称" value={this.state.name} onChange={this.handleNameChange} />
                                <p />
                            </Col>
                            <Col span={10} offset={4}>
                                <span>项目类型</span>
                                <Input placeholder="填写类型" value={this.state.type} onChange={this.handleTypeChange} />
                                <p />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}>
                                <span>项目连接</span>
                                <Input placeholder="项目链接" value={this.state.link} onChange={this.handleLinkChange} />
                                <p />
                            </Col>
                        </Row>
                        <Row span={20}>
                            <span>项目简介</span>
                            <Input.TextArea rows={3} placeholder="please enter abstract" value={this.state.abstract} onChange={this.handleAbstractChange} />
                            <p />
                        </Row>
                        <Row span={20}>
                            <span>我的贡献</span>
                            <Input.TextArea rows={5} placeholder="please enter your work" value={this.state.work} onChange={this.handleWorkChange} />
                            <p />
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Button block onClick={this.handleOk}>确定</Button>
                            </Col>
                        </Row>
                    </Drawer>
                </div>
                <List
                         className="demo-loadmore-list"
                         itemLayout="vertical"
                         style={{width: '80%', margin: '0 auto'}}
                    >
                    {projects}
                </List>
            </div>
        )
    }
}