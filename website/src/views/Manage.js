import React, {Component} from 'react'
import { Layout, Row, Col, Menu } from 'antd'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"

import Headers from 'src/views/menu/Headers'
import BlogCard from 'src/views/settings/BlogCard'
import ResumeCard from 'src/views/settings/ResumeCard'

const mapStateToProps = (state) => {
    return{
        loginState: state.LogInReducer
    }
}

@connect(mapStateToProps)
class Manage extends Component {
    constructor(props){
        super(props)
        this.state={
            cardId: 0
        }
    }

    componentWillMount() {
        if(!this.props.loginState.isSuccess) {
            this.props.history.push('/')
        }
    }

    changeCard(value) {
        this.setState({
            cardId: value
        })
    }

    getCard(value) {
        let card = null
        if(value === 0) {
            card = <BlogCard />
        } else if(value === 1) {
            card = <ResumeCard />
        }
        return card
    }

    render() {
        const {Header, Content, Sider} = Layout
        return(
            <Layout>
                <Header >
                    <Row>
                        <Col span={14} offset={5}>
                            <Headers />
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                 
                            <Menu.Item key="1" onClick={()=>this.changeCard(0)}>发博客</Menu.Item>
                            <Menu.Item key="2" onClick={()=>this.changeCard(1)}>设置简历</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: '80vh',
                        }}
                        >
                        {this.getCard(this.state.cardId)}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default withRouter(Manage)