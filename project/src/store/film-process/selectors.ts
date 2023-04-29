import { StateType } from '../../types/state-type';
import FilmType from '../../types/film-type';
import { NameSpace } from '../../const';
import ReviewType from '../../types/review-type';

export const getCurrentFilm = (state: StateType): FilmType | null => state[NameSpace.Film].currentFilm;
export const getReviews = (state: StateType): ReviewType[] => state[NameSpace.Film].reviews;
export const getSimilarFilms = (state: StateType): FilmType[] => state[NameSpace.Film].similarFilms;
export const getIsFilmLoading = (state: StateType): boolean => state[NameSpace.Film].isFilmLoading;
export const getIsReviewsLoading = (state: StateType): boolean => state[NameSpace.Film].isReviewsLoading;
export const getIsSimilarFilmsLoading = (state: StateType): boolean => state[NameSpace.Film].isSimilarFilmsLoading;
export const getPromoFilm = (state: StateType): FilmType | null => state[NameSpace.Film].promoFilm;
