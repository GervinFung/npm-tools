import { build } from 'esbuild';
import puppeteer from 'puppeteer';
import { describe, expect, it } from 'vitest';

import { Defined } from '../src/defined';
import {
	formQueryParamRecordFromString,
	formQueryParamStringFromRecord,
	getPreferredMode,
	isBrowser,
} from '../src/web';

describe('Browser utils', () => {
	it('should form query params record to string', () => {
		const output =
			'name=man&age=33&isMale=true&characters=Batman%2CSuperman%2CSpiderman&randomValues=true%2C1';

		const record = {
			name: 'man',
			woman: '',
			age: 33,
			isMale: true,
			hasKid: undefined,
			hasWife: null,
			characters: ['Batman', 'Superman', 'Spiderman'],
			randomValues: [true, '', 1, undefined, null],
		};

		const allStringRecord = {
			name: 'man',
			age: '33',
			isMale: 'true',
			characters: ['Batman', 'Superman', 'Spiderman'],
			randomValues: ['true', '1'],
		};

		expect(formQueryParamStringFromRecord(record)).toBe(output);
		expect(formQueryParamRecordFromString(output)).toStrictEqual(
			allStringRecord
		);
	});

	describe('In node', () => {
		it('should return values that were not in browser', () => {
			expect(isBrowser()).toBe(false);
			expect(getPreferredMode()).toBe('dark');
		});
	});

	describe('In browser', () => {
		it('should return values that were in browser', async () => {
			const browser = await puppeteer.launch({
				headless: true,
			});

			const page = await browser.newPage();

			await page.emulateMediaFeatures([
				{ name: 'prefers-color-scheme', value: 'light' },
			]);

			const outputResult = await build({
				minify: true,
				bundle: true,
				write: false,
				entryPoints: [`${__dirname}/dummy/web.ts`],
			});

			const code = new TextDecoder().decode(
				Defined.parse(outputResult.outputFiles.at(0)?.contents).orThrow(
					new Error('No output file')
				)
			);

			const result = await page.evaluate((code) => {
				// eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
				new Function(code)();

				return {
					isBrowser: window.isBrowser,
					getPreferredMode: window.getPreferredMode,
				};
			}, code);

			await browser.close();

			expect(result.isBrowser).toBe(true);
			expect(result.getPreferredMode).toBe('light');
		});
	});
});
