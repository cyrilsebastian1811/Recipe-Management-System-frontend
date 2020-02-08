import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/Home/index";
import Recipes from "./components/Recipes/index";
import logo from './logo.svg';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ mainHeight: "100vh" }}>
      <Router>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
            <Link to="/home" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="folder" />
            <span>Recipes</span>
            <Link to="/recipes" />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0}} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, margin: '16px 0', background: "#fff", minHeight: "85vh" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/recipes" component={Recipes} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Webapp Frontend ©2020</Footer>
      </Layout>
      </Router>
    </Layout>
  );
}

export default App;
