import ReviewType from '../types/review-type';

const REVIEWS : ReviewType[] = [
  {
    id: 1,
    user: {
      id: 17,
      name: 'Ann'
    },
    rating: 9.9,
    comment: 'Excellent!',
    date: '2022-06-03T12:25:36.946Z'
  },
  {
    id: 2,
    user: {
      id: 16,
      name: 'Sam'
    },
    rating: 1.1,
    comment: 'I personally found this movie to be boring. Definitely one of the most boring movies I\'ve ever seen.',
    date: '2022-06-23T12:25:36.946Z'
  },
  {
    id: 3,
    user: {
      id: 17,
      name: 'John'
    },
    rating: 8.4,
    comment: 'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2022-06-05T12:25:36.946Z'
  },
  {
    id: 4,
    user: {
      id: 16,
      name: 'Kate'
    },
    rating: 6,
    comment: 'I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.',
    date: '2022-06-23T12:25:36.946Z'
  },
  {
    id: 5,
    user: {
      id: 17,
      name: 'Ed'
    },
    rating: 1.2,
    comment: 'The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. ',
    date: '2022-06-20T12:25:36.946Z'
  }
];

export default REVIEWS;
