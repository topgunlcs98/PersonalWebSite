import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Container, Col, Row } from 'react-bootstrap'
import { Layout, Row, Col } from 'antd';

import Headers from './views/menu/Headers'
import SideBar from './views/menu/SideBar'

class App extends Component {
  render() {
    const {Header, Footer, Content} = Layout
    return (
      <div>
        <Layout>
          <Header>
            <Row>
              <Col span={12} offset={6}><Headers /></Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={6}><SideBar f14/></Col>
            </Row>
          </Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
