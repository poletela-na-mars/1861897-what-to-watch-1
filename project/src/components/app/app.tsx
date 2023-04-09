import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {PrivateRoute} from '../private-route/private-route';
import {MainPage, AddReview, Film, MyList, Player, SignIn, NotFound} from '../../pages';

import FilmType from '../../types/film-type';
import ReviewType from '../../types/review-type';
import {AppRoute, AuthorizationStatus} from '../../const';

type AppProps = {
  films: FilmType[];
  reviews: ReviewType[];
};

// TODO - вынести header, добавить недостающую маршрутизацию
export const App = (props: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.NotFound}
        element={<NotFound />}
      />
      <Route
        path={AppRoute.MainPage}
        element={<MainPage films={props.films} />}
      />
      <Route
        path={AppRoute.AddReview}
        element={<AddReview films={props.films} />}
      />
      <Route
        path={AppRoute.Film}
        element={<Film films={props.films} reviews={props.reviews} />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NoAuth}
          >
            <MyList films={props.films} />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Player}
        element={<Player films={props.films}/>}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignIn />}
      />
    </Routes>
  </BrowserRouter>
);
