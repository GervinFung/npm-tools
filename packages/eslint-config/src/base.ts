import type { ConfigWithExtends } from 'typescript-eslint';

import eslintPluginImport from 'eslint-plugin-import';

const base: ConfigWithExtends = {
	linterOptions: {
		reportUnusedDisableDirectives: 'error',
	},
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: process.cwd(),
		},
	},
	plugins: {
		import: eslintPluginImport,
	},
	rules: {
		...{
			...eslintPluginImport.flatConfigs.recommended.rules,
			['import/no-unresolved']: 'off',
			'import/max-dependencies': [
				'error',
				{
					max: 16,
					ignoreTypeImports: true,
				},
			],
			'import/extensions': [
				'error',
				{
					json: 'always',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'type',
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/no-unassigned-import': [
				'error',
				{
					allow: ['**/*.css'],
				},
			],
		},
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'generic',
			},
		],
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^ignore',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{
				allowNumber: true,
				allowBoolean: true,
			},
		],
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'off',
		'@typescript-eslint/non-nullable-type-assertion-style': 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'arrow-body-style': ['error', 'always'],
		'no-restricted-syntax': [
			'error',
			{
				selector: 'TSEnumDeclaration',
				message: "Don't declare enums",
			},
		],
	},
};

export { base };
