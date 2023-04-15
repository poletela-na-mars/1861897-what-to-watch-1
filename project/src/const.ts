export enum AppRoute {
  MainPage = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ALL_GENRES = 'All genres';
export const DEFAULT_GENRE = ALL_GENRES;

export const FILM_IN_PAGE = 8;
