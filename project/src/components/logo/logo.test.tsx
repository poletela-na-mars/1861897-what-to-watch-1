import { render, screen } from '@testing-library/react';
import { HistoryRouter } from '../history-route/history-route';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Logo } from './logo';

const history = createMemoryHistory();
history.push('/logo');

describe('Logo', () => {
  it('should redirect to MainScreen, when click by Link', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path={'/logo'} element={<Logo />} />
          <Route path={AppRoute.MainPage} element={<p>MainPage</p>} />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('MainPage')).toBeInTheDocument();
  });
});
