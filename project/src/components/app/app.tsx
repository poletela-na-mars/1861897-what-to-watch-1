import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { PrivateRoute } from '../private-route/private-route';
import { AddReview, Film, MainPage, MyList, NotFound, Player, SignIn } from '../../pages';
import { Spinner } from '../spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterFilmsByCurrentGenre } from '../../store/action';
import { AppRoute } from '../../const';
import browserHistory from '../../services/browser-history';
import { HistoryRouter } from '../history-route/history-route';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterFilmsByCurrentGenre());
  }, [dispatch]);

  const isDataLoading = useAppSelector((state) => state.isFilmsLoading);

  if (isDataLoading) {
    return (<Spinner />);
  }

  return (
    <HistoryRouter history={browserHistory}>
      {isDataLoading && <Spinner />}
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<Film />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />
        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
};
