import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

import './not-found.css';

const NotFound = (): JSX.Element => (
  <div className='error-container'>
    <h1>404. Page not found</h1>
    <Link to={AppRoute.MainPage}>Go Back Home</Link>
  </div>
);

export default NotFound;
