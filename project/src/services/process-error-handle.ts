import {clearError, setError} from '../store/action';
import {store} from '../store';

const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};

export default processErrorHandle;
