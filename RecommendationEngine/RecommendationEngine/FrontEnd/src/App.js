import React from 'react';
import { Route } from 'react-router';
import Layout from './components/NavMenu/Layout';
import Home from './components/Home/Home';
import { hot } from 'react-hot-loader/root';



import './stylesheet.css'

function App(props) {
  return (
    <div id="background">
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    </div>
  );
}

export default hot(App);
