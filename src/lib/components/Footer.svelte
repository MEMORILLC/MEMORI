<footer class="site-footer">
	<div class="footer-inner">
		<div>
			<p class="company-name">MEMORI</p>
			<p class="description">
				Quality products and personalized service.
			</p>
		</div>

		<div class="footer-links">
			<a href="/">Home</a>
			<a href="/gallery">Gallery</a>
			<a href="/contact">Contact</a>
		</div>
	</div>

	<div class="copyright">
		© {new Date().getFullYear()} MEMORI. All rights reserved.
	</div>
</footer>

<style>
	.site-footer {
		margin-top: 5rem;
		background: #111;
		color: white;
	}

	.footer-inner {
		max-width: 75rem;
		margin: 0 auto;
		padding: 3.125rem 1.5rem;

		display: flex;
		justify-content: space-between;
		gap: 2.5rem;
	}

  .company-name {
    margin: 0 0 .5rem;
    font-size: 1.2rem;
    font-weight: 700;

    background: var(--accent-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

	.description {
		margin: 0;
		color: #aaa;
	}

	.footer-links {
		display: flex;
		gap: 1.5rem;
	}

	.footer-links a {
		color: #ddd;
		text-decoration: none;
	}

	.footer-links a:hover {
    background: var(--accent-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

	.copyright {
		border-top: .0625rem solid #333;
		padding: 1.25rem 1.5rem;
		text-align: center;
		color: #888;
		font-size: .85rem;
	}

	@media (max-width: 43.75rem) {
		.footer-inner {
			flex-direction: column;
			padding: 2.5rem 1.125rem;
		}

		.footer-links {
			flex-direction: column;
			gap: .75rem;
		}

		.copyright {
			padding: 1.25rem 1.125rem;
		}
	}
</style>
