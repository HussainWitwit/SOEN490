import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getNestedAssets, getFlatListAssets, getConfiguredRecommendationList} from './redux/SharedReducer/reducer-actions';
import { getTemplateDetails } from './redux/AddRecDialogReducer/reducer-actions';

//Making api capps at first render at top most component of the app.
store.dispatch(getNestedAssets);
store.dispatch(getFlatListAssets);
store.dispatch(getConfiguredRecommendationList);
store.dispatch(getTemplateDetails);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();

