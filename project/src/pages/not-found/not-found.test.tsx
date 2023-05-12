import {render, screen} from '@testing-library/react';
import NotFound from './not-found';
import {BrowserRouter} from 'react-router-dom';

describe('NotFound', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go Back Home')).toBeInTheDocument();
  });
});
