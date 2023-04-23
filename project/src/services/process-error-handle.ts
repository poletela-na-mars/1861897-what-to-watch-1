import {clearError, setError} from '../store/action';
import {store} from '../store';

const processErrorHandle = (message: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  store.dispatch(setError(message));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  store.dispatch(clearError());
};

export default processErrorHandle;
