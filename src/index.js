import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './theme.scss';
import registerServiceWorker from './registerServiceWorker';
import seedDatabase from './Utils/dbSeed';
import App from './App';


seedDatabase().then(() => {

});

ReactDOM.render(
  <App />
  ,
  document.getElementById('root'),
);

registerServiceWorker();
