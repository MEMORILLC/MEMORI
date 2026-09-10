import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',

	fullyParallel: true,

	forbidOnly: false,

	retries: 0,

	workers: undefined,

	reporter: 'html',

	use: {
		baseURL: 'http://127.0.0.1:4173/MEMORI/',
		trace: 'on-first-retry',
	},

	webServer: {
		command: 'npm run build && npm run preview -- --host 127.0.0.1',
		url: 'http://127.0.0.1:4173/MEMORI/',
		reuseExistingServer: true,
		timeout: 120000,
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
