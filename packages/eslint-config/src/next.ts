import type { ConfigWithExtends } from 'typescript-eslint';

import eslintPluginNext from '@next/eslint-plugin-next';

import { react } from './react';

const next: ConfigWithExtends = {
	...react,
	plugins: {
		...react.plugins,
		'@next/next': eslintPluginNext,
	},
	// @ts-expect-error: Value of nextjs rules is 'string' not 'RuleEntry'
	rules: {
		...react.rules,
		...eslintPluginNext.configs['core-web-vitals'].rules,
	},
};

export { next };
