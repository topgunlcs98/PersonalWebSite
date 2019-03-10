import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Container, Col, Row } from 'react-bootstrap'
import { Layout } from 'antd';

import Headers from './views/menu/Headers'
import SideBar from './views/menu/SideBar'

class App extends Component {
  render() {
    const {Header, Footer, Content} = Layout
    return (
      <div>
       <Container>
         <Layout>
           <Header>
         <Row>
           <Col md={12}><Headers /></Col>
         </Row>
         </Header>
         <Content>
         <Row>
           <Col md={3}><SideBar /></Col>
           <Col md={{ span: 6, offset:3 }}>{`md={{ span: 6, offset:3 }}`}</Col>
           <Col md={{ span:3, offset: 3}}>{`md={{ span:3, offset: 3}}`}</Col>
         </Row>
         </Content>
         <Footer>
         <Row>
           <Col md={{ span:8, offset:4 }}>21314</Col>
         </Row>
         </Footer>
         </Layout>
        </Container>
      </div>
    );
  }
}

export default App;
