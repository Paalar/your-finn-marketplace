import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";

const config = {
  input: "client/index.jsx",
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: [".js", ".jsx"],
    }),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
  ],
  output: [
    {
      sourcemap: true,
      format: "esm",
      file: "dist/index.js",
    },
  ],
};

export default config;
