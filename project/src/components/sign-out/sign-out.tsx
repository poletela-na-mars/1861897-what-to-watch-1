import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout } from '../../store/action';

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const avatarImage = useAppSelector((state) => state.user?.avatarUrl);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
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
