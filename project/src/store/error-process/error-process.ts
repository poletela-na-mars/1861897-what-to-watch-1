import { ErrorProcess } from '../../types/state-type';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

const initialState: ErrorProcess = {
  error: null,
};

export const errorProcess = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: ((state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.error = action.payload;
    })
  }
});

export const {setError} = errorProcess.actions;
