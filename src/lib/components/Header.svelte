<script lang="ts">
	let menuOpen = $state(false);

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
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: white;
		border-bottom: 1px solid #e5e5e5;
	}

	.header-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
		height: 76px;

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
		gap: 32px;
	}

	nav a {
		color: #333;
		text-decoration: none;
		font-size: 0.95rem;
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
		padding: 8px;
		cursor: pointer;
	}

	.menu-button span {
		display: block;
		width: 24px;
		height: 2px;
		background: #111;
		margin: 5px 0;
	}

	@media (max-width: 700px) {
		.header-inner {
			height: 68px;
			padding: 0 18px;
		}

		.menu-button {
			display: block;
		}

		nav {
			display: none;
			position: absolute;
			top: 68px;
			left: 0;
			right: 0;

			flex-direction: column;
			align-items: stretch;
			gap: 0;

			background: white;
			border-bottom: 1px solid #e5e5e5;
		}

		nav.open {
			display: flex;
		}

		nav a {
			padding: 18px 24px;
			border-top: 1px solid #eee;
		}
	}
</style>
