<script lang="ts">
	const companyName = 'MEMORI';

	const services = [
		{
			title: 'Quality Products',
			description:
				'We provide high-quality products made with care and attention to detail.'
		},
		{
			title: 'Personalized Service',
			description:
				'Every customer is important to us. We work with you to find the right solution for your needs.'
		},
		{
			title: 'Made With Care',
			description:
				'We take pride in the quality of our work and the products we provide.'
		}
	];
</script>

<svelte:head>
	<title>{companyName}</title>
	<meta
		name="description"
		content="Learn more about {companyName} and explore our products."
	/>
</svelte:head>

<!-- HERO -->
<section class="hero">
	<div class="hero-content">
		<p class="eyebrow">WELCOME TO {companyName}</p>

		<h1>Quality products.<br />Personalized service.</h1>

		<p class="hero-text">
			Discover our products and learn more about what we can do for you.
		</p>

		<div class="hero-buttons">
			<a href="/gallery" class="button primary">View Our Products</a>
			<a href="/contact" class="button secondary">Contact Us</a>
		</div>
	</div>
</section>

<!-- ABOUT -->
<section class="section about">
	<div class="section-inner about-grid">
		<div>
			<p class="eyebrow">ABOUT US</p>
			<h2>A company built around quality.</h2>
		</div>

		<div class="about-text">
			<p>
				{companyName} is dedicated to providing quality products and
				personalized service to our customers.
			</p>

			<p>
				We believe that great products start with attention to detail and
				that every customer deserves a personal experience. Whether you
				already know what you're looking for or need help finding the right
				option, we're here to help.
			</p>

			<a href="/contact" class="text-link">Get in touch →</a>
		</div>
	</div>
</section>

<!-- SERVICES / FEATURES -->
<section class="section features">
	<div class="section-inner">
		<div class="section-heading">
			<p class="eyebrow">WHAT WE OFFER</p>
			<h2>Why choose {companyName}?</h2>
		</div>

		<div class="feature-grid">
			{#each services as service}
				<div class="feature">
					<div class="feature-number">
						{String(services.indexOf(service) + 1).padStart(2, '0')}
					</div>

					<h3>{service.title}</h3>
					<p>{service.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- GALLERY PREVIEW -->
<section class="section gallery-preview">
	<div class="section-inner">
		<div class="section-heading gallery-heading">
			<div>
				<p class="eyebrow">OUR WORK</p>
				<h2>Take a look at what we offer.</h2>
			</div>

			<a href="/gallery" class="text-link">View full gallery →</a>
		</div>

		<div class="gallery-placeholder">
			<div class="placeholder-card">Product Photo</div>
			<div class="placeholder-card">Product Photo</div>
			<div class="placeholder-card">Product Photo</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="cta">
	<div class="cta-inner">
		<p class="eyebrow">READY TO GET STARTED?</p>

		<h2>Have a question or interested in our products?</h2>

		<p>
			Get in touch with us and we'll be happy to help.
		</p>

		<a href="/contact" class="button primary">Contact Us</a>
	</div>
</section>

<style>
	.hero {
		min-height: 650px;
		display: flex;
		align-items: center;
		background: #f5f5f5;
	}

	.hero-content {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 100px 24px;
	}

	.eyebrow {
		margin: 0 0 18px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: #666;
	}

	h1 {
		max-width: 850px;
		margin: 0;
		font-size: clamp(3rem, 7vw, 6rem);
		line-height: 0.98;
		letter-spacing: -0.04em;
	}

  h1::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    margin-top: 24px;
    border-radius: 999px;
    background: var(--accent-gradient);
  }

	.hero-text {
		max-width: 600px;
		margin: 30px 0 0;
		font-size: 1.2rem;
		line-height: 1.7;
		color: #555;
	}

	.hero-buttons {
		display: flex;
		gap: 14px;
		margin-top: 35px;
	}

	.button {
		display: inline-block;
		padding: 14px 24px;
		text-decoration: none;
		font-size: 0.9rem;
		font-weight: 600;
		transition: 0.2s ease;
	}

	.button.primary {
		background: var(--accent-gradient);
    background-size: 200% 100%;
    background-position: 0% 50%;
    transition: background-position 0.3s ease;
	}

	.button.primary:hover {
		background-position: 100% 50%;
	}

	.button.secondary {
		border: 1px solid #ccc;
		background: white;
		color: #111;
	}

	.button.secondary:hover {
		background: #eee;
	}

	.section {
		padding: 110px 0;
	}

	.section-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.about {
		background: white;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 100px;
	}

	h2 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3.5rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
	}

	.about-text {
		max-width: 600px;
		font-size: 1.05rem;
		line-height: 1.8;
		color: #555;
	}

	.about-text p {
		margin: 0 0 22px;
	}

	.text-link {
		display: inline-block;
		margin-top: 10px;
		color: #111;
		font-weight: 600;
		text-decoration: none;
		border-bottom: 1px solid #111;
		padding-bottom: 3px;
	}

	.features {
		background: #f5f5f5;
	}

	.section-heading {
		margin-bottom: 55px;
	}

	.section-heading h2 {
		max-width: 700px;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 40px;
	}

	.feature {
		border-top: 1px solid #ccc;
		padding-top: 25px;
	}

	.feature-number {
		margin-bottom: 35px;
		font-size: 0.8rem;
		color: #777;
	}

	.feature h3 {
		margin: 0 0 14px;
		font-size: 1.3rem;
	}

	.feature p {
		margin: 0;
		color: #666;
		line-height: 1.7;
	}

	.gallery-preview {
		background: white;
	}

	.gallery-heading {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 30px;
	}

	.gallery-placeholder {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.placeholder-card {
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eee;
		color: #999;
	}

	.cta {
		background: #111;
		color: white;
	}

	.cta-inner {
		max-width: 900px;
		margin: 0 auto;
		padding: 120px 24px;
		text-align: center;
	}

	.cta .eyebrow {
		color: #999;
	}

	.cta h2 {
		margin-bottom: 25px;
	}

	.cta p:not(.eyebrow) {
		margin: 0 auto 35px;
		max-width: 550px;
		color: #aaa;
		line-height: 1.7;
	}

	.cta .button.primary {
		background: white;
		color: #111;
	}

	.cta .button.primary:hover {
		background: #ddd;
	}

	@media (max-width: 700px) {
		.hero {
			min-height: 580px;
		}

		.hero-content {
			padding: 80px 18px;
		}

		.hero-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.button {
			text-align: center;
		}

		.section {
			padding: 75px 0;
		}

		.section-inner {
			padding: 0 18px;
		}

		.about-grid {
			grid-template-columns: 1fr;
			gap: 35px;
		}

		.feature-grid {
			grid-template-columns: 1fr;
			gap: 45px;
		}

		.gallery-heading {
			flex-direction: column;
			align-items: flex-start;
		}

		.gallery-placeholder {
			grid-template-columns: 1fr;
		}

		.cta-inner {
			padding: 80px 18px;
		}
	}
</style>
```
