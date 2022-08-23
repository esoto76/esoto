import { IsDef } from "./misc";
import { IsArr, IsArrDef } from "./arr";
import { ISFN, GEN_OBJ } from "./types";

export const IsObj: ISFN = v =>
  IsDef(v) && !IsArr(v) && typeof v === "object" ? true : false;

export const OKeys: (v: any) => string[] = v =>
  IsObj(v) ? Object.keys(v) : [];

export const IsObjDef: ISFN = v =>
  IsObj(v) && IsArrDef(OKeys(v)) ? true : false;

export const MergeObjs: (v: GEN_OBJ[]) => GEN_OBJ = v => {
  if (IsObj(v)) return v;
  if (!IsArrDef(v)) return {};

  const obj = {};

  for (let o of v) if (IsObjDef(o)) for (let k in o) obj[k] = o[k];

  return obj;
};

export const ObjDeepMerge: (x: GEN_OBJ, y: GEN_OBJ) => GEN_OBJ = (x, y) => {
  if (!IsObj(x) && !IsObj(y)) return {};
  if (!IsObjDef(y)) return x;
  if (!IsObjDef(x)) return y;

  for (let k in y) {
    const _o = x[k];
    const _n = y[k];
    if (!IsDef(_o) || (!IsObjDef(_o) && !IsArrDef(_o))) {
      x[k] = _n;
      continue;
    }
    if (!IsObjDef(_n) && !IsArrDef(_n)) continue;
    if (IsObjDef(_n) && IsObjDef(_o)) {
      x[k] = ObjDeepMerge(_o, _n);
      continue;
    }
    if (IsArrDef(_n) && IsArr(_o)) {
      for (let v of _n) _o.push(v);
      x[k] = _o;
      continue;
    }
  }

  return x;
};

export const ObjDeepMergeAll: (arr: GEN_OBJ[]) => GEN_OBJ = arr => {
  if (!IsArr(arr)) return {};
  arr = arr.filter(o => IsObjDef(o));
  if (!IsArrDef(arr)) return {};
  if (arr.length === 1) return arr[0];

  let obj = {};

  for (let o of arr) if (IsObjDef(o)) obj = ObjDeepMerge(obj, o);

  return obj;
};
