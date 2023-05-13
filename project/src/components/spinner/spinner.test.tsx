import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Spinner />
      </BrowserRouter>);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
