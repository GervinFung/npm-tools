import type { ConfigWithExtends } from 'typescript-eslint';

import { fixupPluginRules } from '@eslint/compat';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

import { base } from './base';

const react: ConfigWithExtends = {
	...base,
	files: ['**/*.tsx'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	languageOptions: {
		parserOptions: {
			...base.languageOptions?.parserOptions,
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	plugins: {
		...base.plugins,
		react: eslintPluginReact,
		'react-hooks': fixupPluginRules(eslintPluginReactHooks),
		'jsx-a11y': eslintPluginJsxA11y,
	},
	rules: {
		...base.rules,
		...eslintPluginJsxA11y.flatConfigs.strict.rules,
		...{
			...eslintPluginReact.configs.all.rules,
			'react/jsx-filename-extension': [
				'error',
				{
					extensions: ['.tsx'],
				},
			],
			'react/jsx-indent-props': ['error', 'tab'],
			'react/jsx-indent': ['error', 'tab'],
			'react/jsx-newline': 'off',
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
				},
			],
			'react/destructuring-assignment': 'off',
			'react/jsx-one-expression-per-line': 'off',
			'react/no-multi-comp': 'off',
			'react/jsx-no-literals': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-max-props-per-line': 'off',
			'react/jsx-no-bind': [
				'error',
				{
					allowArrowFunctions: true,
				},
			],
			'react/jsx-fragments': ['error', 'element'],
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-max-depth': 'off',
		},
		...eslintPluginReactHooks.configs.recommended.rules,
	},
};

export { react };
