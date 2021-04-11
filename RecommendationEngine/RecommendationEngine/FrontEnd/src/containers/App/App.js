import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../AppLayout/Layout';
import ManageRecommendationPage from '../ManageRecommendationPage/ManageRecommendationPage';
import { hot } from 'react-hot-loader/root';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import JobsPage from '../JobsPage/JobsPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import Notifications from '../Notifications/Notifications';

function App () {
  return (
    <div id="background">
      <Layout>
        <div>
          <Route exact path='/' component={Dashboard} />
          <Route path='/recommendations-manage' component={ManageRecommendationPage} />
          <Route path='/recommendations-jobs' component={JobsPage} />
          <Route path='/recommendations-results' component={ResultsPage} />
          <Route path='/notifications' component={Notifications} />
        </div>
      </Layout>
    </div>
  );
}

export default hot(App);
