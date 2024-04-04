import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
		},
		{
			file: 'dist/index.es.js',
			format: 'esm',
		},
	],
	plugins: [
		typescript({
			useTsconfigDeclarationDir: true,
		}),
		resolve(),
		commonjs(),
		terser(),
	],
};
