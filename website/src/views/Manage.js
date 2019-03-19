import React, {Component} from 'react'
import { Layout, Row, Col } from 'antd'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"

import Headers from 'src/views/menu/Headers'

const mapStateToProps = (state) => {
    return{
        loginState: state.LogInReducer
    }
}
@connect(mapStateToProps)
class Manage extends Component {
    componentWillMount() {
        if(!this.props.loginState.isSuccess) {
            this.props.history.push('/')
        }
    }
    render() {
        const {Header, Footer, Content} = Layout
        return(
            <div>
                <Layout>
                    <Header>
                        <Row>
                            <Col span={14} offset={5}><Headers /></Col>
                        </Row>
                    </Header>
                    <Content>
                    </Content>
                    <Footer>
                    </Footer>
                </Layout>
            </div>
        )
    }
}
export default withRouter(Manage)