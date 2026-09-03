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
		max-width: 1200px;
		margin: 0 auto;
		padding: 90px 24px;
	}

	.page-header {
		max-width: 700px;
		margin-bottom: 60px;
    position: relative;
	}

	.eyebrow {
		margin: 0 0 16px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: #666;
	}

	h1 {
		margin: 0 0 20px;
		font-size: clamp(3rem, 7vw, 5rem);
		line-height: 1;
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

	.intro {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: #666;
	}

	@media (max-width: 700px) {
		.gallery-page {
			padding: 65px 18px;
		}

		.page-header {
			margin-bottom: 40px;
		}
	}
</style>
