import { IsDef, IsArr, IsLength } from './is-fns';
import { ISFN } from './types';

export const IsObj: ISFN = v =>
  IsDef(v) && !IsArr(v) && typeof v === 'object' ? true : false;

export const OKeys: (v: any) => string[] = v =>
  IsObj(v) ? Object.keys(v) : [];

export const IsObjDef: ISFN = v =>
  IsObj(v) && IsLength(OKeys(v)) ? true : false;
