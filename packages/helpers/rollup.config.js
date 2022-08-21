// @ts-nocheck
import Alias from "@rollup/plugin-alias";
import Babel from "@rollup/plugin-babel";
import Commonjs from "@rollup/plugin-commonjs";
import Externals from "rollup-plugin-node-externals";
import Json from "@rollup/plugin-json";
import Replace from "@rollup/plugin-replace";
import Resolve from "@rollup/plugin-node-resolve";
import TS from "rollup-plugin-ts";
import { resolve, sep } from "path";
import { readdirSync, statSync } from "fs";
import { description, name, version } from "./package.json";

const buildDir = "src";
const entryName = "index.ts";
const extensions = [
  ".mjs",
  ".js",
  ".jsx",
  ".json",
  ".sass",
  ".scss",
  ".ts",
  ".tsx",
  ".vue",
];
const external = [];
const formats = ["es", "cjs"];
const main = name.replace("@", "").replace("/", "-");

const input = { [main]: "src/index.ts" };

const root = resolve(__dirname);

const customResolver = Resolve({ extensions });

const entries = [
  {
    find: "@/",
    replacement: resolve(root, buildDir),
  },
];

const OKeys = (obj) => Object.keys(obj);

const FileNames = "[name].[format].js";

const GetFileNames = ({ facadeModuleId }) =>
  `${
    facadeModuleId.replace(`${root}${sep}${buildDir}${sep}`, "").split(sep)
      .length < 2
      ? ""
      : "shared/"
  }${FileNames}`;

const GetManualChunks = () => {
  const keys = OKeys(input);
  if (keys.length < 2) return;
  return function (id) {
    return keys.find(
      (k) =>
        id.replace(`${root}${sep}`, "").split(sep).join("/").indexOf(input[k]) >
        -1
    );
  };
};

const Output = {
  dir: "dist",
  chunkFileNames: GetFileNames,
  entryFileNames: GetFileNames,
  preferConst: true,
  freeze: false,
  exports: "named",
  interop: "default",
  esModule: true,
};

const watch = {
  exclude: "node_modules/**",
  include: "src/**",
  chokidar: {
    paths: "src/**",
  },
};

const treeshake = "recommended";

const GetOutput = () => {
  Output.manualChunks = GetManualChunks();
  const output = [];

  for (let format of formats) output.push({ ...Output, format });

  return output;
};

const plugins = [
  Replace({
    preventAssignment: true,
    values: {
      __PKG__DESCRIPTION__: description,
      __PKG__NAME__: name,
      __PKG__VERSION__: `v${version}`,
    },
  }),
  Alias({ entries, customResolver }),
  Externals(),
  Resolve({ extensions, preferBuiltins: true }),
  TS({
    transpiler: { typescriptSyntax: "typescript", otherSyntax: "babel" },
    browserslist: false,
    babelConfig: {
      plugins: [
        "@babel/plugin-transform-spread",
        "@babel/plugin-transform-arrow-functions",
      ],
    },
    tsconfig: "tsconfig.json",
    hook: {
      outputPath: (path, kind) => {
        if (kind !== "declaration" && kind !== "declarationMap") return;

        const format = formats.find((v) => path.indexOf(`.${v}`) > -1);
        if (!format) return;
        return path.replace(`.${format}`, "");
      },
    },
  }),
  Json({ namedExports: true, preferConst: true }),
  Babel({
    babelHelpers: "bundled",
  }),
  Commonjs({
    extensions,
  }),
];

const GetInputPaths = async (dir = buildDir, file = entryName) => {
  try {
    const paths = await readdirSync(dir);

    if (paths.length === 0) return [];

    let inputs = [];

    for (let path of paths) {
      path = `${dir}/${path}`;

      if (path.indexOf(file) !== -1) inputs.push(path);
      else if (statSync(path).isDirectory())
        inputs = [...inputs, ...(await GetInputPaths(path, file))];
    }
    return inputs.length < 2
      ? inputs
      : inputs.sort((a, b) => b.length - a.length);
  } catch (e) {
    console.error(e);
    return;
  }
};

export default async () => {
  try {
    const configs = {
      input,
      output: GetOutput(),
      watch,
      external,
      treeshake,
      plugins,
    };

    return configs;
  } catch (e) {
    console.error(e);
    return;
  }
};
