import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';

import {Player} from '../player/player';

import FilmType from '../../types/film-type';

type FilmCardProps = {
  film: FilmType;
  setActiveFilmCard: (id: number) => void;
  isActive: boolean;
};

export const FilmCard = (props: FilmCardProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (props.isActive){
      const timer = setTimeout(() => setIsPlaying(true), 1000);
      return ()=> {
        clearTimeout(timer);
        setIsPlaying(false);
      };
    }
  }, [props.isActive]);

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => props.setActiveFilmCard(props.film.id)}
      onMouseLeave={() => props.setActiveFilmCard(NaN)}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
      onClick={() => dispatch(redirectToRoute(`/films/${props.film.id}`))}
    >
      <div className="small-film-card__image">
        {isPlaying ?
          <Player videoSrc={props.film.previewVideoLink} posterImageSrc={props.film.previewImage} muted /> :
          <img src={props.film.previewImage} alt={props.film.name} width="280" height="175"/>}
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${props.film.id}`} className="small-film-card__link">{props.film.name}</Link>
      </h3>
    </article>
  );
};
