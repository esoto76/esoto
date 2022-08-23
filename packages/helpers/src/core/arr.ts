import { ISFN } from "./types";
import { IsDef, IsLength } from "./misc";

export const IsArr: ISFN = v => (IsDef(v) && Array.isArray(v) ? true : false);

export const IsArrDef: ISFN = v => (IsArr(v) && IsLength(v) ? true : false);

export const ArrMerge: (x: any[], y: any[]) => any[] = (x, y) => {
  if (!IsArrDef(x) && !IsArrDef(y)) return [];
  if (IsArr(x) && !IsArrDef(y)) return x;
  if (!IsArrDef(x)) return y;

  for (let v of y) x.push(v);

  return x;
};
