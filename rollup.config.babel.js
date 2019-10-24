// @flow

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'messa-resizer',
    sourcemap: true,
    compact: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    peerDepsExternal(),
    filesize(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    minify({
      comments: false,
    }),
  ],

  external: ['react', 'react-dom'],
};
