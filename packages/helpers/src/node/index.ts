import { ISFN, IsStrDef } from "../core";
import { existsSync } from "fs";

export const IsPkg: ISFN = v =>
  IsStrDef(v) && existsSync(v) && existsSync(`${v}/package.json`)
    ? true
    : false;

export const GetPkg: (p: string) => { [key: string]: string } = p =>
  IsPkg(p) ? require(`${p}/package.json`) : {};
