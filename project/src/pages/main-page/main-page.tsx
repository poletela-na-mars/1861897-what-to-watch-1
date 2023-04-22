import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

import { FilmList, Footer, GenresList, ShowMoreButton, SignOut, SignIn, Logo } from '../../components';
import { AuthorizationStatus, FILM_IN_PAGE } from '../../const';

const MainPage = (): JSX.Element => {
  const films = useAppSelector((state) => state.films);
  const filteredFilms = useAppSelector((state) => state.filteredFilms);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [showedFilmsCount, changeShowedFilmsCount] = useState<number>(FILM_IN_PAGE);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={films[0].backgroundImage} alt={films[0].name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={films[0].posterImage} alt={`${films[0].name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{films[0].name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{films[0].genre}</span>
                <span className="film-card__year">{films[0].released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${films[0].id}`} className="btn btn--play film-card__button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList buttonClickHandler={() => (changeShowedFilmsCount(FILM_IN_PAGE))}/>

          <div className="catalog__films-list">
            <FilmList films={filteredFilms.slice(0, showedFilmsCount)} />
          </div>

          {filteredFilms.length > showedFilmsCount &&
            <ShowMoreButton buttonClickHandler={() => (changeShowedFilmsCount(showedFilmsCount + FILM_IN_PAGE))}/>}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MainPage;
