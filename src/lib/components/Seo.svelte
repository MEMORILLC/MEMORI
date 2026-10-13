<script lang="ts">
	import { site } from '$lib/data/site';

	type Props = {
		title: string;
		description: string;
		path: string;
	};

	let { title, description, path }: Props = $props();

	const canonicalUrl = $derived(`${site.url}${path}`);
	const imageUrl = `${site.url}/logos/social-preview.jpg`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.companyName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageUrl} />
	<meta
		property="og:image:alt"
		content="Memori personalized gifts and custom keepsakes, featuring engraved cutting boards."
	/>
</svelte:head>
