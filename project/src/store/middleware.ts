import reducer from './reducer';
import {Middleware} from 'redux';
import browserHistory from '../services/browser-history';
import {redirectToRoute} from './action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (action.type === redirectToRoute.type) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
          browserHistory.push(action.payload);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return next(action);
      };
