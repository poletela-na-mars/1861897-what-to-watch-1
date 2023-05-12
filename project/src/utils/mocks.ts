import FilmType from '../types/film-type';
import ReviewType from '../types/review-type';
import UserType from '../types/user-type';

export const getMockFilms = (): FilmType[] => ([
  {
    name: 'Snatch',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/snatch.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/Snatch.jpg',
    backgroundColor: '#FDFDFC',
    description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.',
    rating: 0.2,
    scoresCount: 716577,
    director: 'Guy Ritchie',
    starring: [
      'Jason Statham',
      'Brad Pitt',
      'Benicio Del Toro'
    ],
    runTime: 104,
    genre: 'Comedy',
    released: 2000,
    id: 1,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  },
  {
    name: 'Gangs of new york',
    posterImage: 'https://10.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg',
    previewImage: 'https://10.react.pages.academy/static/film/preview/gangs_of_new_york.jpg',
    backgroundImage: 'https://10.react.pages.academy/static/film/background/gangs_of_new_york.jpg',
    backgroundColor: '#A6B7AC',
    description: 'In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father\'s killer.',
    rating: 8.8,
    scoresCount: 370881,
    director: 'Martin Scorsese',
    starring: [
      'Leonardo DiCaprio',
      'Cameron Diaz',
      'Daniel Day-Lewis'
    ],
    runTime: 167,
    genre: 'Crime',
    released: 2002,
    id: 2,
    isFavorite: false,
    videoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
    previewVideoLink: 'https://10.react.pages.academy/static/film/video/dog.mp4'
  }]);

export const getMockFilm = (): FilmType => (getMockFilms()[0]);

export const getMockReviews = (): ReviewType[] => ([
  {
    id: 1,
    user: {
      id: 17,
      name: 'Emely'
    },
    rating: 9.9,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    date: '2022-06-03T12:25:36.946Z'
  },
  {
    id: 2,
    user: {
      id: 16,
      name: 'Mollie'
    },
    rating: 1.1,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    date: '2022-06-23T12:25:36.946Z'
  }]);

export const getMockReview = (): ReviewType => (getMockReviews()[0]);

export const getMockUser = (): UserType => ({
  avatarUrl: 'test/test.ts',
  email: 'test@test.ru',
  id: 1, name: 'Name',
  token: '12Kjh7893lkmH',
});
