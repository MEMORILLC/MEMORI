import { expect, test } from '@playwright/test';

const navigationPages = [
	{ name: 'About us', path: '/MEMORI/about-us' },
	{ name: 'How it works', path: '/MEMORI/how-it-works' },
];

test('header navigation opens the About Us and How It Works pages', async ({ page }) => {
	await page.goto('/MEMORI/');

	for (const { name, path } of navigationPages) {
		await page.getByRole('link', { name, exact: true }).click();
		await expect(page).toHaveURL(new RegExp(`${path.replaceAll('/', '\\/')}$`));
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	}
});

test('mobile menu navigates and closes after selecting a page', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/MEMORI/');

	const menuButton = page.getByRole('button', { name: 'Toggle navigation' });
	const howItWorksLink = page.getByRole('link', { name: 'How it works', exact: true });

	await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	await expect(howItWorksLink).toBeHidden();

	await menuButton.click();
	await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
	await expect(howItWorksLink).toBeVisible();

	await howItWorksLink.click();
	await expect(page).toHaveURL(/\/MEMORI\/how-it-works$/);
	await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('visible images load on the main pages', async ({ page }) => {
	for (const path of [
		'/MEMORI/',
		'/MEMORI/about-us',
		'/MEMORI/how-it-works',
		'/MEMORI/gallery',
		'/MEMORI/contact',
	]) {
		await page.goto(path);

		const images = page.locator('img:visible');
		const imageCount = await images.count();
		expect(imageCount, `Expected at least one visible image on ${path}`).toBeGreaterThan(0);

		for (let index = 0; index < imageCount; index++) {
			const image = images.nth(index);
			await image.scrollIntoViewIfNeeded();
			await expect
				.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
				.toBeGreaterThan(0);
		}
	}
});

test('contact form validates required fields and submits successfully', async ({ page }) => {
	await page.route('https://api.web3forms.com/submit', (route) =>
		route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ success: true, message: 'Submission successful' }),
		}),
	);

	await page.goto('/MEMORI/contact');
	await page.getByRole('button', { name: 'Send Message' }).click();

	await expect
		.poll(() =>
			page.locator('#name').evaluate((element: HTMLInputElement) => element.validity.valid),
		)
		.toBe(false);

	await page.locator('#name').fill('Taylor Example');
	await page.locator('#email').fill('taylor@example.com');
	await page.locator('#interest').selectOption('Custom order');
	await page.getByRole('button', { name: 'Send Message' }).click();

	await expect
		.poll(() =>
			page
				.locator('#order-date')
				.evaluate((element: HTMLInputElement) => element.validity.valid),
		)
		.toBe(false);

	await page.locator('#order-date').fill('2026-12-01');
	await page.locator('#order-quantity').fill('25');
	await page.locator('#message').fill('A custom order for a celebration.');

	const submission = page.waitForRequest(
		(request) =>
			request.url() === 'https://api.web3forms.com/submit' && request.method() === 'POST',
	);
	await page.getByRole('button', { name: 'Send Message' }).click();

	const request = await submission;
	expect(request.postDataJSON()).toMatchObject({
		name: 'Taylor Example',
		email: 'taylor@example.com',
		interest: 'Custom order',
		orderQuantity: 25,
		message: 'A custom order for a celebration.',
	});
	await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();

	await page.getByRole('button', { name: 'Send another message' }).click();
	await expect(page.locator('#name')).toHaveValue('');
});

test('contact form keeps entered values and reports a failed submission', async ({ page }) => {
	await page.route('https://api.web3forms.com/submit', (route) =>
		route.fulfill({
			status: 400,
			contentType: 'application/json',
			body: JSON.stringify({ success: false, message: 'Please try again later.' }),
		}),
	);

	await page.goto('/MEMORI/contact');
	await page.locator('#name').fill('Taylor Example');
	await page.locator('#email').fill('taylor@example.com');
	await page.locator('#interest').selectOption('General question');
	await page.locator('#message').fill('I have a question about an order.');
	await page.getByRole('button', { name: 'Send Message' }).click();

	await expect(page.getByText('Please try again later.')).toBeVisible();
	await expect(page.locator('#name')).toHaveValue('Taylor Example');
	await expect(page.locator('#email')).toHaveValue('taylor@example.com');
	await expect(page.locator('#message')).toHaveValue('I have a question about an order.');
});
