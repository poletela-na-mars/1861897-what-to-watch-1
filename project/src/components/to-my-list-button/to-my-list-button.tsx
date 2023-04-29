import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import FilmType from '../../types/film-type';
import {changeFavoriteStatusFilm, loadFavoriteFilms, redirectToRoute} from '../../store/action';
import {getFavoriteFilms} from '../../store/films-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';

type ToMyListButtonProps = {
  film: FilmType;
};

export const ToMyListButton = (props: ToMyListButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      dispatch(loadFavoriteFilms());
    }
  }, [authorizationStatus, dispatch, props.film.isFavorite]);

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      dispatch(changeFavoriteStatusFilm({filmId: props.film.id, status: props.film.isFavorite}));
    } else {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
      {
        props.film.isFavorite ? (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list" />
          </svg>) : (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add" />
          </svg>
        )
      }


      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>

  );
};
