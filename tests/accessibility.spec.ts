import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
	{ name: 'Home', path: '/' },
	{ name: 'Gallery', path: '/gallery' },
	{ name: 'Contact', path: '/contact' },
];

for (const { name, path } of pages) {
	test(`${name} page has no automatically detectable WCAG 2.1 AA violations`, async ({
		page,
	}) => {
		await page.goto(path);

		const results = await new AxeBuilder({ page })
			.withTags([
				'wcag2a',
				'wcag2aa',
				'wcag21a',
				'wcag21aa',
			])
			.analyze();

		await test.info().attach('accessibility-results', {
			body: JSON.stringify(results, null, 2),
			contentType: 'application/json',
		});

		expect(results.violations).toEqual([]);
	});

  test('Contact form has no accessibility violations', async ({ page }) => {
    await page.goto('/contact');

    await page.getByRole('heading', { name: /contact/i }).waitFor();

    const results = await new AxeBuilder({ page })
      .withTags([
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
      ])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
