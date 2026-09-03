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
		margin-top: 80px;
		background: #111;
		color: white;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 24px;

		display: flex;
		justify-content: space-between;
		gap: 40px;
	}

  .company-name {
    margin: 0 0 8px;
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
		gap: 24px;
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
		border-top: 1px solid #333;
		padding: 20px 24px;
		text-align: center;
		color: #888;
		font-size: 0.85rem;
	}

	@media (max-width: 700px) {
		.footer-inner {
			flex-direction: column;
			padding: 40px 18px;
		}

		.footer-links {
			flex-direction: column;
			gap: 12px;
		}

		.copyright {
			padding: 20px 18px;
		}
	}
</style>
