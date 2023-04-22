import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {PrivateRoute} from '../private-route/private-route';
import {MainPage, AddReview, Film, MyList, Player, SignIn, NotFound} from '../../pages';
import {Spinner} from '../spinner/spinner';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {filterFilmsByCurrentGenre} from '../../store/action';

import ReviewType from '../../types/review-type';
import {AppRoute, AuthorizationStatus} from '../../const';

type AppProps = {
  reviews: ReviewType[];
};

// TODO - вынести header
export const App = (props: AppProps): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch(filterFilmsByCurrentGenre());
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (isDataLoading) {
    return (<Spinner/>);
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.MainPage}
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignIn />}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <MyList />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<Film reviews={props.reviews} />}
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
      </BrowserRouter>
    );
  }
};
