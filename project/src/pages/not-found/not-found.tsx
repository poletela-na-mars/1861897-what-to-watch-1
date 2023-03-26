import {Link} from 'react-router-dom';

//TODO - add styles to 404 page
const NotFound = (): JSX.Element => (
  <div>
    <h1>404. Page not found</h1>
    <Link to='/'>Go Back Home</Link>
  </div>
);

export default NotFound;
