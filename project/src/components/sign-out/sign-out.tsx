import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/action';
import { getUser } from '../../store/user-process/selectors';

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const avatarImage = user?.avatarUrl;

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          {/*eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call*/}
          <img src={avatarImage} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <a onClick={async () => await dispatch(logout())} className="user-block__link">Sign out</a>
      </li>
    </ul>
  );
};
