import { StateType } from '../../types/state-type';
import { NameSpace } from '../../const';

export const getError = (state: StateType): string | null => state[NameSpace.Error].error;
