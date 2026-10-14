import { expect, test } from '@playwright/test';

const navigationPages = [
	{ name: 'About us', path: '/MEMORI/about-us' },
	{ name: 'How it works', path: '/MEMORI/how-it-works' },
];

const contentPages = [
	{ path: '/MEMORI/', heading: /one of a kind.*and uniquely yours/i },
	{ path: '/MEMORI/about-us', heading: /made by your moments/i },
	{ path: '/MEMORI/how-it-works', heading: /how it works/i },
	{ path: '/MEMORI/gallery', heading: /gallery/i },
	{ path: '/MEMORI/contact', heading: /contact us/i },
];

test('content pages have one descriptive h1 and a logical heading hierarchy', async ({ page }) => {
	for (const { path, heading } of contentPages) {
		await page.goto(path);

		const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((elements) =>
			elements.map((element) => ({
				level: Number(element.tagName.slice(1)),
				text: element.textContent?.trim() ?? '',
			})),
		);
		const h1s = headings.filter(({ level }) => level === 1);

		expect(h1s).toHaveLength(1);
		expect(h1s[0].text).toMatch(heading);

		for (let index = 1; index < headings.length; index += 1) {
			expect(headings[index].level).toBeLessThanOrEqual(headings[index - 1].level + 1);
		}
	}
});

test('crawler discovery files are served from the site root', async ({ request }) => {
	const [robots, sitemap, llms] = await Promise.all([
		request.get('/MEMORI/robots.txt'),
		request.get('/MEMORI/sitemap.xml'),
		request.get('/MEMORI/llms.txt'),
	]);

	expect(robots.ok()).toBe(true);
	expect(await robots.text()).toContain('Sitemap: https://www.memoricustom.com/sitemap.xml');
	expect(sitemap.ok()).toBe(true);
	expect(await sitemap.text()).toContain('<loc>https://www.memoricustom.com/</loc>');
	expect(llms.ok()).toBe(true);
	expect(await llms.text()).toContain('https://www.memoricustom.com/how-it-works');
});

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

test('gallery groups product views and provides accessible view navigation', async ({ page }) => {
	await page.goto('/MEMORI/gallery');

	await expect(page.locator('.gallery-item')).toHaveCount(3);

	const cuttingBoardCard = page.locator('.gallery-item').filter({
		has: page.getByRole('button', { name: 'Next view of Carved with Care' }),
	});
	await cuttingBoardCard.hover();
	await expect(cuttingBoardCard.locator('.overlay')).toHaveCSS('opacity', '1');
	await expect(cuttingBoardCard.locator('.overlay span')).toBeVisible();
	await expect(
		cuttingBoardCard.getByRole('button', { name: 'Next view of Carved with Care' }),
	).toBeVisible();
	const titleBounds = await cuttingBoardCard.locator('.overlay').boundingBox();
	const controlsBounds = await cuttingBoardCard.locator('.view-controls').boundingBox();
	expect(titleBounds).not.toBeNull();
	expect(controlsBounds).not.toBeNull();
	expect(titleBounds!.x + titleBounds!.width).toBeLessThan(controlsBounds!.x);

	const mugCard = page.locator('.gallery-item').filter({
		has: page.getByRole('button', { name: 'View Love, Laughter, and Lattes' }),
	});
	await mugCard.hover();
	const mugTitleBounds = await mugCard.locator('.overlay').boundingBox();
	expect(mugTitleBounds).not.toBeNull();
	expect(mugTitleBounds!.width).toBeGreaterThan(titleBounds!.width);

	await cuttingBoardCard.getByRole('button', { name: 'Next view of Carved with Care' }).click();
	await expect(cuttingBoardCard.locator('img')).toHaveAttribute(
		'alt',
		'Back view of a personalized wooden cutting board.',
	);
	await expect(cuttingBoardCard.locator('.view-count')).toHaveText('2 / 2');
	await cuttingBoardCard.getByRole('button', { name: 'Next view of Carved with Care' }).click();
	await expect(cuttingBoardCard.locator('.view-count')).toHaveText('1 / 2');

	await page.getByRole('button', { name: 'View Carved with Care' }).click();
	const dialog = page.getByRole('dialog');
	const currentSlide = dialog.locator('.slider-track .slide-wrapper').nth(1);
	await expect(currentSlide.locator('img')).toHaveAttribute(
		'alt',
		'Front view of a personalized wooden cutting board.',
	);
	await dialog.getByRole('button', { name: 'Next view of Carved with Care' }).click();
	await expect(currentSlide.locator('img')).toHaveAttribute(
		'alt',
		'Back view of a personalized wooden cutting board.',
	);

	await page.keyboard.press('ArrowRight');
	await expect(
		currentSlide.locator('img'),
	).toHaveAttribute('alt', 'Front view of a personalized wooden cutting board.');
	await expect(currentSlide.locator('.view-count')).toHaveText('1 / 2');

	await dialog.getByRole('button', { name: 'Next image' }).focus();
	await page.keyboard.press('Enter');
	await expect(dialog.getByRole('heading', { name: 'A Recipe for Forever' })).toBeVisible();
	await expect(
		dialog.locator('.slider-track .slide-wrapper').nth(1).locator('.view-count'),
	).toHaveText('1 / 2');

	await dialog.focus();
	await page.keyboard.press('ArrowRight');
	await expect(dialog.getByRole('heading', { name: 'Love, Laughter, and Lattes' })).toBeVisible();
	await page.keyboard.press('ArrowLeft');
	await expect(dialog.getByRole('heading', { name: 'A Recipe for Forever' })).toBeVisible();

	await dialog.getByRole('button', { name: 'Previous image' }).click();
	await expect(dialog.getByRole('heading', { name: 'Carved with Care' })).toBeVisible();
	await expect(
		dialog.locator('.slider-track .slide-wrapper').nth(1).locator('.view-count'),
	).toHaveText('1 / 2');
});

test('gallery lightbox supports keyboard opening, focus trapping, and focus restoration', async ({ page }) => {
	await page.goto('/MEMORI/gallery');

	const openButton = page.getByRole('button', { name: 'View Carved with Care' });
	await openButton.focus();
	await page.keyboard.press('Enter');

	const dialog = page.getByRole('dialog', { name: 'Carved with Care' });
	await expect(dialog).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(dialog.getByRole('button', { name: 'Close image' })).toBeFocused();
	await page.keyboard.press('Shift+Tab');
	await expect(dialog.getByRole('button', { name: 'Next image' })).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(dialog.getByRole('button', { name: 'Close image' })).toBeFocused();
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await page.keyboard.press('Tab');
	await expect(
		dialog.getByRole('button', { name: 'Next view of Carved with Care' }),
	).toBeFocused();
	await page.keyboard.press('ArrowRight');
	await expect(
		dialog.locator('.slider-track .slide-wrapper').nth(1).locator('img'),
	).toHaveAttribute('alt', 'Back view of a personalized wooden cutting board.');
	await expect(dialog.getByRole('heading', { name: 'Carved with Care' })).toBeVisible();
	await page.keyboard.press('Enter');
	await expect(
		dialog.locator('.slider-track .slide-wrapper').nth(1).locator('img'),
	).toHaveAttribute('alt', 'Front view of a personalized wooden cutting board.');

	await page.keyboard.press('Escape');
	await expect(dialog).toBeHidden();
	await expect(openButton).toBeFocused();
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
