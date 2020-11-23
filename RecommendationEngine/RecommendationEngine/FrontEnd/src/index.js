import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import Modal from "./components/AddRecommendation/Modal";
// import ManageRecommendationTable from "./components/ManageRecommendationTable/ManageRecommendationTable";
// import TemplateConfiguration from "./components/AddRecommendation/TemplateConfiguration";
// import DateConfiguration from "./components/AddRecommendation/DateConfiguration";

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(

  <BrowserRouter basename={baseUrl}>
    {/* <Switch>
      <Route path="/ManageRecommendationTable" component={ManageRecommendationTable}/>
      <Route path="/Modal" component={Modal} />
      <Route path="/TemplateConfiguration" component={TemplateConfiguration}/>
      <Route path="/DateConfiguration" component={DateConfiguration}/>
    </Switch> */}
      <App />
  </BrowserRouter>,
  rootElement);
registerServiceWorker();

