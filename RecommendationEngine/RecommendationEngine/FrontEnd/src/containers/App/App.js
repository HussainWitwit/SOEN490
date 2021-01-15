import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../AppLayout/Layout';
import ManageRecommendationPage from '../ManageRecommendationPage/ManageRecommendationPage';
import { hot } from 'react-hot-loader/root';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import JobsPage from '../JobsPage/JobsPage';
import ResultsPage from '../ResultsPage/ResultsPage';
import WorkOrders from '../WorkOrders/WorkOrders';
import Settings from '../Settings/Settings';
import Notifications from '../Notifications/Notifications';

function App (props) {
  return (
    <div id="background">
      <Layout>
        <div id="pageLayout">
          <Route exact path='/' component={Dashboard} />
          <Route path='/recommendations-manage' component={ManageRecommendationPage} />
          <Route path='/recommendations-jobs' component={JobsPage} />
          <Route path='/recommendations-results' component={ResultsPage} />
          <Route path='/work-orders' component={WorkOrders} />
          <Route path='/settings' component={Settings} />
          <Route path='/notifications' component={Notifications} />
        </div>
      </Layout>
    </div>
  );
}

export default hot(App);
