import {render, screen} from '@testing-library/react';
import {getMockReviews} from '../../utils/mocks';
import { FilmReviews } from './film-reviews';

describe('FilmReviews', () => {
  const mockReviews = getMockReviews();

  it('should render correctly', () => {
    render(
      <FilmReviews reviews={mockReviews}/>
    );

    expect(screen.getByText('Emely')).toBeInTheDocument();
    expect(screen.getByText('Mollie')).toBeInTheDocument();
  });
});
