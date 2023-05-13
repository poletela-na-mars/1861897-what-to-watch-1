import { getMockFilm, getMockReviews } from '../../utils/mocks';
import { Tabs } from './tabs';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Tabs', () => {
  const mockFilm = getMockFilm();
  const mockReviews = getMockReviews();
  it('should render correctly OverviewTab', () => {
    render(<Tabs film={mockFilm} reviews={mockReviews} />);

    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
  });

  it('should render correctly DetailsTab', () => {
    render(<Tabs film={mockFilm} reviews={mockReviews} />);
    fireEvent.click(screen.getByTestId('details-tab'));

    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
  });

  it('should render correctly ReviewsTab', () => {
    render(<Tabs film={mockFilm} reviews={mockReviews} />);
    fireEvent.click(screen.getByTestId('reviews-tab'));

    expect(screen.getByText(mockReviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
  });
});
