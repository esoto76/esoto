import { ISFN } from "./types";
import { IsDef, IsLength } from "./misc";
import { sep } from "path";

export const IsStr: ISFN = v =>
  IsDef(v) && typeof v === "string" ? true : false;

export const IsStrDef: ISFN = v => (IsStr(v) && IsLength(v) ? true : false);

export const NormalizePath: (str: string) => string = str =>
  IsStrDef(str) ? str.split(sep).join("/") : "";
