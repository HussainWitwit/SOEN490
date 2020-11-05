import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { hot } from 'react-hot-loader/root';

import './custom.css'

function App (props) {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
    </Layout>
  );
}

export default hot(App);
