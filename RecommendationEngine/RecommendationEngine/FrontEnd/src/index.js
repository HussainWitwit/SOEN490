import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getNestedAssets, getFlatListAssets, getConfiguredRecommendationList, getJobs, getResults } from './redux/SharedReducer/reducer-actions';
import { getTemplateDetails } from './redux/ManageRecommendationReducer/reducer-actions';

//Making api calls at first render at top most component of the app.
store.dispatch(getNestedAssets);
store.dispatch(getFlatListAssets);
store.dispatch(getConfiguredRecommendationList);
store.dispatch(getTemplateDetails);
store.dispatch(getJobs);
store.dispatch(getResults);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router basename={baseUrl}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  rootElement);
registerServiceWorker();

