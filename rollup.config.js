import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      name: 'useBindKeys',
      exports: 'named',
    },
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true })],
  external: ['react'],
};
