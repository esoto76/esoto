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
