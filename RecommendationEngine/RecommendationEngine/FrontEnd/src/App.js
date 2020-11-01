import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import Counter from './components/Counter';
import SideMenu from './components/SideMenu';



import './custom.css'

function App (props) {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/counter' component={Counter} />
      <Route path='/fetch-data' component={FetchData} />
      <Route path='/side-menu' component={SideMenu} />
    </Layout>
  );
}

export default App;