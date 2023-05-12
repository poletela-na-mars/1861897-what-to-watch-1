import {render, screen} from '@testing-library/react';
import { ShowMoreButton } from './show-more-button';

describe('ShowMoreButton', () => {
  it('should render correctly', () => {
    render(<ShowMoreButton buttonClickHandler={() => ({})}/>);
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
