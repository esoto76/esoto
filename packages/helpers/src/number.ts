import { IsDef } from './misc';
import { ISFN } from './types';

export const IsNum: ISFN = v =>
  IsDef(v) && typeof v === 'number' ? true : false;
