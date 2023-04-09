import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components';
import FILMS from './mocks/films';
import REVIEWS from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App films={FILMS} reviews={REVIEWS}/>
  </React.StrictMode>,
);
