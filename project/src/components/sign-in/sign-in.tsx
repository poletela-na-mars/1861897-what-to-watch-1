import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export const SignIn = () => (
  <div className="user-block">
    <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
  </div>
);
