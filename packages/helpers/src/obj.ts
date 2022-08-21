import { IsDef } from './misc';
import { IsArr, IsArrDef } from './arr';
import { ISFN } from './types';

export const IsObj: ISFN = v =>
  IsDef(v) && !IsArr(v) && typeof v === 'object' ? true : false;

export const OKeys: (v: any) => string[] = v =>
  IsObj(v) ? Object.keys(v) : [];

export const IsObjDef: ISFN = v =>
  IsObj(v) && IsArrDef(OKeys(v)) ? true : false;
