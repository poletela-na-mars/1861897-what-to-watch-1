import { Link, Navigate } from 'react-router-dom';
import { Logo, ReviewForm, SignIn, SignOut } from '../../components';
import { useAppSelector } from '../../hooks';

import { getCurrentFilm } from '../../store/film-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

import { AppRoute, AuthorizationStatus } from '../../const';

const AddReview = (): JSX.Element => {
  const film = useAppSelector(getCurrentFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <section style={{'background': `${film.backgroundColor}`}} className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <ReviewForm />
    </section>
  );
};

export default AddReview;
