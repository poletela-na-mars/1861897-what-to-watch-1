import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components';

const PromoFilm = {
  nameFilm: 'The Grand Budapest Hotel',
  genreFilm: 'Drama',
  releaseYearFilm: 2014
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App nameFilm={PromoFilm.nameFilm} genreFilm={PromoFilm.genreFilm} releaseYearFilm={PromoFilm.releaseYearFilm} />
  </React.StrictMode>,
);
