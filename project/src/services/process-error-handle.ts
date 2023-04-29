import {clearError} from '../store/action';
import { setError } from '../store/error-process/error-process';
import {store} from '../store';

const processErrorHandle = (message: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  store.dispatch(setError(message));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  store.dispatch(clearError());
};

export default processErrorHandle;
