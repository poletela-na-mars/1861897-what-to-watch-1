import {useAppSelector} from '../../hooks';
import './error-message.css';

export const ErrorMessage = (): JSX.Element | null => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
  const error = useAppSelector((state) => state.error);

  return ((error)
    ? <div className='error-message'>{error}</div>
    : null);
};
