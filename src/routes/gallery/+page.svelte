<script lang="ts">
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';
	import { gallery } from '$lib/data/gallery';

	const companyName = 'MEMORI';
</script>

<svelte:head>
	<title>Gallery | {companyName}</title>

	<meta
		name="description"
		content={`Explore the products and work from ${companyName}.`}
	/>
</svelte:head>

<section class="gallery-page">
	<div class="page-header">
		<p class="eyebrow">OUR WORK</p>

		<h1>Gallery</h1>

		<p class="intro">
			Take a look at some of our products and work.
		</p>
	</div>

	<GalleryGrid items={gallery} />
</section>

<style>
	.gallery-page {
		max-width: 75rem;
		margin: 0 auto;
		padding: 5.625rem 1.5rem;
	}

	.page-header {
		max-width: 43.75rem;
		margin-bottom: 3.75rem;
    position: relative;
	}

	.eyebrow {
		margin: 0 0 1rem;
		font-size: .75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: #666;
	}

	h1 {
		margin: 0 0 1.25rem;
		font-size: clamp(3rem, 7vw, 5rem);
		line-height: 1;
		letter-spacing: -0.04em;
	}

  h1::after {
    content: '';
    display: block;
    width: 5rem;
    height: .25rem;
    margin-top: 1.5rem;
    border-radius: 62.4375rem;
    background: var(--accent-gradient);
  }

	.intro {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: #666;
	}

	@media (max-width: 43.75rem) {
		.gallery-page {
			padding: 4.0625rem 1.125rem;
		}

		.page-header {
			margin-bottom: 2.5rem;
		}
	}
</style>
