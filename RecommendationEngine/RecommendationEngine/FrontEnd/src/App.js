import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './containers/AppLayout/Layout';
import ManageRecommendationPage from './containers/ManageRecommendationPage/ManageRecommendationPage';
import { hot } from 'react-hot-loader/root';
import './stylesheet.css';
import Dashboard from './containers/Dashboard/Dashboard';
import JobsPage from './containers/JobsPage/JobsPage';
import ResultsPage from './containers/ResultsPage/ResultsPage';
import WorkOrders from './containers/WorkOrders/WorkOrders';
import Settings from './containers/Settings/Settings';
import Notifications from './containers/Notifications/Notifications';

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
