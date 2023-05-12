import {ErrorProcess} from '../../types/state-type';
import { errorProcess, setError } from './error-process';

const state: ErrorProcess = {
  error: null,
};

describe('Reducer error-process', () => {
  it('should return to the initial state, if the action is unknown', () => {
    expect(errorProcess.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toMatchObject(state);
  });

  it('should set error in setError', () => {
    expect(errorProcess.reducer(state, {type: setError.type, payload: 'new error'}).error)
      .toEqual('new error');
  });
});
