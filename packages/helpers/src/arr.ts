import { ISFN } from './types';
import { IsDef, IsLength } from './misc';

export const IsArr: ISFN = v => (IsDef(v) && Array.isArray(v) ? true : false);

export const IsArrDef: ISFN = v => (IsArr(v) && IsLength(v) ? true : false);
