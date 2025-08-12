import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/router.ts',
    output: {
      file: 'dist/router.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [typescript()]
  },
  {
    input: 'src/hooks.ts',
    output: {
      file: 'dist/hooks.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [typescript()]
  },
  {
    input: 'src/elements.ts',
    output: {
      file: 'dist/elements.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [typescript()]
  },
  {
    input: 'src/types.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];