import { ISFN } from './types';

export const IsDef: ISFN = v => (v !== undefined ? true : false);

export const IsLength: ISFN = v =>
  IsDef(v) && IsDef(v.length) && v.length > 0 ? true : false;

export const IsArr: ISFN = v => (IsDef(v) && Array.isArray(v) ? true : false);

export const IsArrDef: ISFN = v => (IsArr(v) && IsLength(v) ? true : false);

export const IsStr: ISFN = v =>
  IsDef(v) && typeof v === 'string' ? true : false;

export const IsStrDef: ISFN = v => (IsStr(v) && IsLength(v) ? true : false);
