import { FilmList, Footer, Logo, SignOut } from '../../components';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-process/selectors';

const MyList = (): JSX.Element => {
  const films = useAppSelector(getFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        {/*<div className="logo">*/}
        {/*  <a href="main.html" className="logo__link">*/}
        {/*    <span className="logo__letter logo__letter--1">W</span>*/}
        {/*    <span className="logo__letter logo__letter--2">T</span>*/}
        {/*    <span className="logo__letter logo__letter--3">W</span>*/}
        {/*  </a>*/}
        {/*</div>*/}
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        {/*<ul className="user-block">*/}
        {/*  <li className="user-block__item">*/}
        {/*    <div className="user-block__avatar">*/}
        {/*      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />*/}
        {/*    </div>*/}
        {/*  </li>*/}
        {/*  <li className="user-block__item">*/}
        {/*    <a className="user-block__link">Sign out</a>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        <SignOut />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmList films={films} />
        </div>
      </section>

      {/*TODO - remove comments*/}
      {/*<footer className="page-footer">*/}
      {/*  <div className="logo">*/}
      {/*    <a href="main.html" className="logo__link logo__link--light">*/}
      {/*      <span className="logo__letter logo__letter--1">W</span>*/}
      {/*      <span className="logo__letter logo__letter--2">T</span>*/}
      {/*      <span className="logo__letter logo__letter--3">W</span>*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div className="copyright">*/}
      {/*    <p>© 2019 What to watch Ltd.</p>*/}
      {/*  </div>*/}
      {/*</footer>*/}
      <Footer />
    </div>
  );
};

export default MyList;
