import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MainPage, AddReview, Film, MyList, Player, SignIn, NotFound} from '../../pages';
import {AppRoute, AuthorizationStatus} from '../../const';
import {MainPageProps} from '../../pages/main-page/main-page';
import {PrivateRoute} from '../private-route/private-route';

export const App = (props: MainPageProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.NotFound}
        element={<NotFound />}
      />
      <Route
        path={AppRoute.MainPage}
        element={<MainPage {...props}/>}
      />
      <Route
        path={AppRoute.AddReview}
        element={<AddReview />}
      />
      <Route
        path={AppRoute.Film}
        element={<Film />}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NoAuth}
          >
            <MyList />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Player}
        element={<Player />}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignIn />}
      />
    </Routes>
  </BrowserRouter>
);
