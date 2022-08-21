import { ISFN } from './types';
import { IsDef, IsLength } from './misc';

export const IsStr: ISFN = v =>
  IsDef(v) && typeof v === 'string' ? true : false;

export const IsStrDef: ISFN = v => (IsStr(v) && IsLength(v) ? true : false);
