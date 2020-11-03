import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import { FetchData } from './components/FetchData';
import Counter from './components/Counter';
import { hot } from 'react-hot-loader/root';



import './stylesheet.css'

function App (props) {
  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/counter' component={Counter} />
      <Route path='/fetch-data' component={FetchData} />
    </Layout>
  );
}

export default hot(App);
