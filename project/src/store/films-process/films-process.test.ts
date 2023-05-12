import {FilmsProcess} from '../../types/state-type';
import { changeGenre, filmsProcess } from './films-process';
import {loadFavoriteFilms, loadFilms} from '../action';
import {DEFAULT_GENRE} from '../../const';
import {getMockFilms} from '../../utils/mocks';

const mockFilms = getMockFilms();

let state: FilmsProcess = {
  currentGenre: DEFAULT_GENRE,
  favoriteFilms: [],
  films: [],
  isFavoriteFilmsLoading: false,
  isFilmsLoading: false,
};

describe('Reducer films-process', () => {
  it('should return to the initial state, if the action is unknown', () => {
    expect(filmsProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toMatchObject(state);
  });

  describe('loadFilms', () => {
    beforeEach(() => {
      state = {
        currentGenre: DEFAULT_GENRE,
        favoriteFilms: [],
        films: [],
        isFavoriteFilmsLoading: false,
        isFilmsLoading: false,
      };
    });

    it('should set isFilmsLoading to true in loadFilms.pending', () => {
      expect(filmsProcess.reducer(state, {type: loadFilms.pending.type}).isFilmsLoading)
        .toEqual(true);
    });

    it('should set isFilmsLoading to false in loadFilms.fulfilled', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFilms.fulfilled.type}).isFilmsLoading)
        .toEqual(false);
    });

    it('should fill films loadFilms.fulfilled', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFilms.fulfilled.type, payload: mockFilms}).films)
        .toMatchObject(mockFilms);
    });

    it('should set isFilmsLoading to false in loadFilms.rejected', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFilms.rejected.type}).isFilmsLoading)
        .toEqual(false);
    });
  });

  describe('loadFavoriteFilms', () => {
    beforeEach(() => {
      state = {
        currentGenre: DEFAULT_GENRE,
        favoriteFilms: [],
        films: [],
        isFavoriteFilmsLoading: false,
        isFilmsLoading: false,
      };
    });

    it('should set isFavoriteFilmsLoading to true in loadFavoriteFilms.pending', () => {
      expect(filmsProcess.reducer(state, {type: loadFavoriteFilms.pending.type}).isFavoriteFilmsLoading)
        .toEqual(true);
    });

    it('should set isFilmsFavoriteLoading to false in loadFavoriteFilms.fulfilled', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFavoriteFilms.fulfilled.type}).isFavoriteFilmsLoading)
        .toEqual(false);
    });

    it('should fill favoriteFilms loadFavoriteFilms.fulfilled', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFavoriteFilms.fulfilled.type, payload: mockFilms}).favoriteFilms)
        .toMatchObject(mockFilms);
    });

    it('should set isFavoriteFilmsLoading to false in loadFavoriteFilms.rejected', () => {
      state.isFilmsLoading = true;
      expect(filmsProcess.reducer(state, {type: loadFavoriteFilms.rejected.type}).isFavoriteFilmsLoading)
        .toEqual(false);
    });
  });

  describe('changeGenre', () => {
    beforeEach(() => {
      state = {
        currentGenre: DEFAULT_GENRE,
        favoriteFilms: [],
        films: [],
        isFavoriteFilmsLoading: false,
        isFilmsLoading: false,
      };
    });

    it('should update currentGenre in changeGenre', () => {
      expect(filmsProcess.reducer(state, {type: changeGenre.type, payload: 'new genre'}).currentGenre)
        .toEqual('new genre');
    });
  });
});
