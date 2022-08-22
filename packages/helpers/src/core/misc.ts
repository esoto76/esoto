import { ISFN } from "./types";
import { IsArr } from "./arr";

export const IsDef: ISFN = v => (v !== undefined ? true : false);

export const IsLength: ISFN = v =>
  IsDef(v) && IsDef(v.length) && v.length > 0 ? true : false;

export const GetTypeOf: (v: any) => string = v =>
  IsDef(v) ? (IsArr(v) ? "array" : typeof v) : "";

export const IsTypeOf: (x: any, y: any) => boolean = (x, y) =>
  IsDef(x) && IsDef(y) && GetTypeOf(x) === GetTypeOf(y) ? true : false;
