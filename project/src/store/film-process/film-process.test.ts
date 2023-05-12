import {FilmProcess} from '../../types/state-type';
import { filmProcess } from './film-process';
import {
  changeFavoriteStatusFilm,
  loadFilmById,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms
} from '../action';
import {getMockFilm, getMockFilms, getMockReviews} from '../../utils/mocks';

const mockFilm = getMockFilm();
const mockFilms = getMockFilms();
const mockReviews = getMockReviews();

let state: FilmProcess;

describe('Reducer film-process', () => {
  beforeEach(() => {
    state = {
      currentFilm: null,
      isFilmLoading: false,
      isReviewsLoading: false,
      isSimilarFilmsLoading: false,
      promoFilm: null,
      reviews: [],
      similarFilms: [],
    };
  });

  it('should return to the initial state, if the action is unknown', () => {
    expect(filmProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toMatchObject(state);
  });

  describe('loadFilmById', () => {
    it('should set isFilmLoading to true in loadFilmById.pending', () => {
      expect(filmProcess.reducer(state, {type: loadFilmById.pending.type}).isFilmLoading)
        .toEqual(true);
    });

    it('should set isFilmLoading to false in loadFilmById.fulfilled', () => {
      state.isFilmLoading = true;
      expect(filmProcess.reducer(state, {type: loadFilmById.fulfilled.type}).isFilmLoading)
        .toEqual(false);
    });

    it('should fill currentFilm in loadFilmById.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: loadFilmById.fulfilled.type, payload: mockFilm}).currentFilm)
        .toMatchObject(mockFilm);
    });

    it('should set isFilmLoading to false in loadFilmById.rejected', () => {
      state.isFilmLoading = true;
      expect(filmProcess.reducer(state, {type: loadFilmById.rejected.type}).isFilmLoading)
        .toEqual(false);
    });
  });

  describe('loadSimilarFilms', () => {
    it('should set isSimilarFilmsLoading to true in loadSimilarFilms.pending', () => {
      expect(filmProcess.reducer(state, {type: loadSimilarFilms.pending.type}).isSimilarFilmsLoading)
        .toEqual(true);
    });

    it('should set isSimilarFilmsLoading to false in loadSimilarFilms.fulfilled', () => {
      state.isSimilarFilmsLoading = true;
      expect(filmProcess.reducer(state, {type: loadSimilarFilms.fulfilled.type}).isSimilarFilmsLoading)
        .toEqual(false);
    });

    it('should fill similarFilms in loadSimilarFilms.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: loadSimilarFilms.fulfilled.type, payload: mockFilms}).similarFilms)
        .toMatchObject(mockFilms);
    });

    it('should set isSimilarFilmsLoading to false in loadSimilarFilms.rejected', () => {
      state.isSimilarFilmsLoading = true;
      expect(filmProcess.reducer(state, {type: loadSimilarFilms.rejected.type}).isSimilarFilmsLoading)
        .toEqual(false);
    });
  });

  describe('loadReviews', () => {
    it('should set isReviewsLoading to true in loadReviews.pending', () => {
      expect(filmProcess.reducer(state, {type: loadReviews.pending.type}).isReviewsLoading)
        .toEqual(true);
    });

    it('should set isReviewsLoading to false in loadReviews.fulfilled', () => {
      state.isReviewsLoading = true;
      expect(filmProcess.reducer(state, {type: loadReviews.fulfilled.type}).isReviewsLoading)
        .toEqual(false);
    });

    it('should fill reviews in loadReviews.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: loadReviews.fulfilled.type, payload: mockReviews}).reviews)
        .toMatchObject(mockReviews);
    });

    it('should set isReviewsLoading to false in loadReviews.rejected', () => {
      state.isReviewsLoading = true;
      expect(filmProcess.reducer(state, {type: loadReviews.rejected.type}).isReviewsLoading)
        .toEqual(false);
    });
  });

  describe('loadPromoFilm', () => {
    it('should fill promoFilm in loadPromoFilm.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: loadPromoFilm.fulfilled.type, payload: mockFilm}).promoFilm)
        .toMatchObject(mockFilm);
    });
  });

  describe('changeFavoriteStatusFilm', () => {
    const mockFilmWitchNewFavoriteStatus = mockFilm;
    mockFilmWitchNewFavoriteStatus.isFavorite = true;

    beforeEach(() => {
      state.promoFilm = mockFilm;
      state.currentFilm = mockFilm;
    });

    it('should change favorite status from currentFilm in changeFavoriteStatusFilm.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: changeFavoriteStatusFilm.fulfilled.type, payload: mockFilmWitchNewFavoriteStatus}).currentFilm?.isFavorite)
        .toEqual(mockFilmWitchNewFavoriteStatus.isFavorite);
    });

    it('should change favorite status from promoFilm in changeFavoriteStatusFilm.fulfilled', () => {
      expect(filmProcess.reducer(state, {type: changeFavoriteStatusFilm.fulfilled.type, payload: mockFilmWitchNewFavoriteStatus}).promoFilm?.isFavorite)
        .toEqual(mockFilmWitchNewFavoriteStatus.isFavorite);
    });
  });
});
