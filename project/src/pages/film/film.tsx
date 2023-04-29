import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer, Logo, RelatedFilms, SignIn, SignOut, Spinner, Tabs, ToMyListButton } from '../../components';
import NotFound from '../not-found/not-found';

import { loadFilmById, loadReviews, loadSimilarFilms } from '../../store/action';
import { getCurrentFilm, getIsFilmLoading, getIsReviewsLoading, getIsSimilarFilmsLoading, getReviews, getSimilarFilms } from '../../store/film-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { AuthorizationStatus } from '../../const';

const Film = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);

  useEffect(() => {
    dispatch(loadFilmById(id));
    dispatch(loadReviews(id));
    dispatch(loadSimilarFilms(id));
  }, [id, dispatch]);

  const isFilmLoading = useAppSelector(getIsFilmLoading);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const isSimilarFilmsLoading = useAppSelector(getIsSimilarFilmsLoading);

  const reviews = useAppSelector(getReviews);
  const similarFilms = useAppSelector(getSimilarFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useAppSelector(getCurrentFilm);

  if (isFilmLoading || isReviewsLoading || isSimilarFilmsLoading) {
    return <Spinner />;
  }

  if (!film) {
    return (<NotFound />);
  }

  return (
    <>
      <section style={{'background': `${film.backgroundColor}`}} className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${film.id}`} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
                <ToMyListButton film={film} />
                {authorizationStatus === AuthorizationStatus.Auth &&
                  <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>
            <Tabs film={film} reviews={reviews} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <RelatedFilms films={similarFilms} currentFilm={film} />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Film;
