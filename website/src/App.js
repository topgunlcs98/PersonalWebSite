import React, { Component } from 'react';
import { Layout, Row, Col, Anchor } from 'antd';
import {Provider} from 'react-redux'
import Store from 'src/redux/Store'
import Headers from './views/menu/Headers'
import SideBar from './views/menu/SideBar'
import NavCard from './views/menu/navCard/NavCard'
import CalendarCard from './views/menu/CalendarCard'
import CommentBar from './views/menu/commentBar/CommentBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Manage from 'src/views/Manage'

class App extends Component {
  render() {
    const {Header, Footer, Content} = Layout
    const { Link } = Anchor
    return (
      <div>
        <Layout>
          <Header>
            <Row>
              <Col span={14} offset={5}><Headers /></Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={6}><SideBar /></Col>
              <Col span={12} id="menu-page"><NavCard /></Col>
              <Col span={6}>
                <Col><CalendarCard /></Col>
                <Col span={18} offset={2}>
                  <Anchor>
                    <Link title="Quick Link">
                      <Link href="#menu-page" title="文章-关于我-简历" />
                      <Link href="#message-board" title="留言板" />
                    </Link>
                  </Anchor>
                </Col>
              </Col>
            </Row>
          </Content>
          <Footer>
            <Row>
              <Col span={12} offset={6} id="message-board"><CommentBar /></Col>
            </Row>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default ()=> (
  <Provider store={Store}>
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/manage" component={Manage} />
    </Router>
  </Provider>
);
