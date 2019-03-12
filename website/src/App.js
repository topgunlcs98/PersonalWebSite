import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import Headers from './views/menu/Headers'
import SideBar from './views/menu/SideBar'
import NavCard from './views/menu/navCard/NavCard'
import CalendarCard from './views/menu/CalendarCard'

class App extends Component {
  render() {
    const {Header, Footer, Content} = Layout
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
              <Col span={12}><NavCard /></Col>
              <Col span={6}><CalendarCard /></Col>
            </Row>
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
