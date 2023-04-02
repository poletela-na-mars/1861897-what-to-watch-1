import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

//TODO - add styles to 404 page
const NotFound = (): JSX.Element => (
  <div>
    <h1>404. Page not found</h1>
    <Link to={AppRoute.MainPage}>Go Back Home</Link>
  </div>
);

export default NotFound;
