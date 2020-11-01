import React from 'react';
import {Route} from 'react-router';
import Layout from './components/NavMenu/Layout';
import Home from './components/Home/Home';
import {FetchData} from './components/NavMenu/FetchData';
import { hot } from 'react-hot-loader/root';

import './stylesheet.css'

function App (props) {
    return (
      <div id="background">
           <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
      </div>
   
    );
}

export default hot(App);
