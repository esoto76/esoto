// @ts-nocheck
import { sep } from "path";
import alias from "@rollup/plugin-alias";
import autoExternal from "rollup-plugin-auto-external";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "@rollup/plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "@wessberg/rollup-plugin-ts";

const input = {
  index: "scripts/index.ts",
};

const formats = ["es", "cjs"];

const chunkFileNames = "[name].[format].js";
const dir = "src";
const entryFileNames = chunkFileNames;
const freeze = false;
const hoistTransitiveImports = true;
const preferConst = true;
const minifyInternalExports = false;

const external = [];

const extensions = [
  ".js",
  ".jsx",
  ".es6",
  ".es",
  ".mjs",
  ".ts",
  ".tsx",
  ".vue",
  ".json",
];

const preserveEntrySignatures = "strict";

const treeshake = {
  annotations: true,
  moduleSideEffects: true,
  propertyReadSideEffects: true,
  tryCatchDeoptimization: true,
  unknownGlobalSideEffects: true,
};

const watch = {
  include: "scripts/**/*",
};

const IdPathParser = (id) =>
  id
    .replace(__dirname, "")
    .split(sep)
    .filter((s) => s && s.length > 0)
    .join("/");

const GetEntryName = (id) =>
  Object.keys(input).find((k) => input[k] === IdPathParser(id));

const manualChunks = (id, { getModuleInfo }) => {
  const mod = getModuleInfo(id);

  if (mod.isEntry) return GetEntryName(id);

  const { importers } = mod;

  if (importers.length > 0) {
    const entry = importers.find((v) => getModuleInfo(v).isEntry);
    if (entry) return GetEntryName(entry);
  }
};

const output = formats.map((format) => ({
  dir,
  format,
  freeze,
  hoistTransitiveImports,
  preferConst,
  minifyInternalExports,
  manualChunks,
  chunkFileNames,
  entryFileNames,
}));

const customResolver = nodeResolve({ extensions });

export default {
  input,
  external,
  preserveEntrySignatures,
  treeshake,
  watch,
  output,
  plugins: [
    autoExternal(),
    globals(),
    builtins(),
    customResolver,
    alias({ customResolver }),
    commonjs(),
    ts({
      browserslist: false,
    }),
  ],
};
