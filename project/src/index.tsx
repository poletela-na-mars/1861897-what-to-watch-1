import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import { App, ErrorMessage } from './components';
import {store} from './store';
import { checkAuthorizationStatus, loadFilm } from './store/action';

import REVIEWS from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(loadFilm());
store.dispatch(checkAuthorizationStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App reviews={REVIEWS}/>
    </Provider>
  </React.StrictMode>,
);
