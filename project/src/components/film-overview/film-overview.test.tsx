import {render, screen} from '@testing-library/react';
import {getMockFilm} from '../../utils/mocks';
import { FilmOverview } from './film-overview';

describe('FilmOverview', () => {
  const mockFilm = getMockFilm();

  it('should render correctly', () => {
    render(
      <FilmOverview film={mockFilm} />
    );

    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(screen.getByText(/Director:/i)).toBeInTheDocument();
  });
});
