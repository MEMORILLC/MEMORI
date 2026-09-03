<script lang="ts">
	let menuOpen = $state(false);
	import { site } from '$lib/data/site';

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header class="site-header">
	<div class="header-inner">
		<a href="/" class="logo" onclick={closeMenu}>
			MEMORI
		</a>

		<button
			class="menu-button"
			type="button"
			aria-label="Toggle navigation"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<nav class:open={menuOpen}>
			<a href="/" onclick={closeMenu}>Home</a>
			<a href="/gallery" onclick={closeMenu}>Gallery</a>
			<a href="/contact" onclick={closeMenu}>Contact</a>
			{#if site.social}
				{#each Object.entries(site.social) as [name, { url, component, props }]}
				{@const Component = component}
					<a href={url} target="_blank" rel="noopener noreferrer" onclick={closeMenu}>
						<Component {...props} />
					</a>
				{/each}
			{/if}
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: white;
		border-bottom: .0625rem solid #e5e5e5;
	}

	.header-inner {
		max-width: 75rem;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 4.75rem;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
    background: var(--accent-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

	nav {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	nav a {
		color: #333;
		text-decoration: none;
		font-size: .95rem;
		font-weight: 500;
	}

  nav a:hover {
    background: var(--accent-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

	.menu-button {
		display: none;
		border: none;
		background: none;
		padding: .5rem;
		cursor: pointer;
	}

	.menu-button span {
		display: block;
		width: 1.5rem;
		height: .125rem;
		background: #111;
		margin: .3125rem 0;
	}

	@media (max-width: 43.75rem) {
		.header-inner {
			height: 4.25rem;
			padding: 0 1.125rem;
		}

		.menu-button {
			display: block;
		}

		nav {
			display: none;
			position: absolute;
			top: 4.25rem;
			left: 0;
			right: 0;

			flex-direction: column;
			align-items: stretch;
			gap: 0;

			background: white;
			border-bottom: .0625rem solid #e5e5e5;
		}

		nav.open {
			display: flex;
		}

		nav a {
			padding: 1.125rem 1.5rem;
			border-top: .0625rem solid #eee;
		}
	}
</style>
