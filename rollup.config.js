import cleaner from 'rollup-plugin-cleaner';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import scss from 'rollup-plugin-scss';

const input = './src/index.js';
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled'
};
const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true,
  configFile: './babel.config.js'
};
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element'
    ],
    './node_modules/react-is/index.js': [
      'ForwardRef',
      'isElement',
      'isFragment',
      'isLazy',
      'isMemo',
      'Memo',
      'isValidElementType'
    ],
    './node_modules/lodash/lodash.js': [
      'keys', 'omit', 'difference', 'includes', 'assign'
    ]
  }
};


export default [
  {
    input,
    output: {
      file: 'lib/carbon-react.min.js',
      format: 'umd',
      name: 'CarbonReact',
      globals
    },
    external: Object.keys(globals),
    plugins: [
      cleaner({
        targets: ['./lib']
      }),
      copy({
        targets: [
          { src: 'src/style/fonts/carbon-icons-webfont.woff', dest: 'lib/style/fonts' }
        ]
      }),
      resolve(),
      babel(babelOptions),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      scss(),
      visualizer(),
      terser()
    ]
  }
];
