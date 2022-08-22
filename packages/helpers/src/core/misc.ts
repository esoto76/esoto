import { ISFN } from './types';

export const IsDef: ISFN = v => (v !== undefined ? true : false);

export const IsLength: ISFN = v =>
  IsDef(v) && IsDef(v.length) && v.length > 0 ? true : false;
