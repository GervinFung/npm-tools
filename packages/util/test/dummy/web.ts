import { getPreferredMode, isBrowser } from '../../src/web';

declare global {
	interface Window {
		isBrowser: ReturnType<typeof isBrowser>;
		getPreferredMode: ReturnType<typeof getPreferredMode>;
	}
}

window.isBrowser = isBrowser();
window.getPreferredMode = getPreferredMode();
