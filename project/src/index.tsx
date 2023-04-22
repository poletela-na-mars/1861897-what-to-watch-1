import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components';
import {store} from './store';
import { loadFilm } from './store/action';

import REVIEWS from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(loadFilm());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={REVIEWS}/>
    </Provider>
  </React.StrictMode>,
);
