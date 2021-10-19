import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      name: 'BindKeys',
      exports: 'named',
    },
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    process.env.NODE_ENV === 'production' && uglify(),
  ],
  external: ['react'],
};
