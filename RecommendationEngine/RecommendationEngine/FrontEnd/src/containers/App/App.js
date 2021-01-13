import React from 'react';
import { Route } from 'react-router';
import Layout from '../AppLayout/Layout';
import ManageRecommendationPage from '../ManageRecommendationPage/ManageRecommendationPage';
import { hot } from 'react-hot-loader/root';
import './App.css';

function App (props) {
  return (
    <div id="background">
      <Layout>
        <div id="pageLayout">
          <Route exact path='/' component={ManageRecommendationPage} />
        </div>
      </Layout>
    </div>
  );
}

export default hot(App);
