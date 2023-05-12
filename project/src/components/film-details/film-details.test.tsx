import {render, screen} from '@testing-library/react';
import { FilmDetails } from './film-details';
import {getMockFilm} from '../../utils/mocks';

describe('FilmDetails', () => {
  const mockFilm = getMockFilm();

  it('should render correctly', () => {
    render(
      <FilmDetails film={mockFilm} />
    );

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
  });
});
