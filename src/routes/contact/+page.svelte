<script lang="ts">
	const companyName = 'MEMORI';

	let submitted = $state(false);

	function handleSubmit() {
		// We'll connect Web3Forms in the final step.
		submitted = true;
	}
</script>

<svelte:head>
	<title>Contact | {companyName}</title>

	<meta
		name="description"
		content={`Get in touch with ${companyName}.`}
	/>
</svelte:head>

<section class="contact-page">
	<div class="contact-header">
		<p class="eyebrow">GET IN TOUCH</p>

		<h1>Contact Us</h1>

		<p>
			Have a question, want more information, or interested in one of
			our products? Send us a message and we'll get back to you.
		</p>
	</div>

	<div class="contact-layout">
		<div class="contact-info">
			<h2>Let's talk.</h2>

			<p>
				Fill out the form and we'll respond by email as soon as
				possible.
			</p>

			<div class="info-item">
				<span>Email</span>
				<p>your@email.com</p>
			</div>

			<div class="info-item">
				<span>Phone</span>
				<p>(555) 555-5555</p>
			</div>
		</div>

		<div class="form-wrapper">
			{#if submitted}
				<div class="success-message">
					<div class="success-icon">✓</div>

					<h2>Thank you!</h2>

					<p>
						Your message has been submitted successfully. We'll
						get back to you soon.
					</p>

					<button type="button" onclick={() => (submitted = false)}>
						Send another message
					</button>
				</div>
			{:else}
				<form onsubmit={(event) => {
					event.preventDefault();
					handleSubmit();
				}}>
					<div class="form-row">
						<div class="field">
							<label for="name">Name *</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Your name"
								autocomplete="name"
								aria-describedby="Name-error"
  							aria-invalid="true"
								required
							/>
							<span id="Name-error" class="error-msg">
								Error: Please enter your name.
							</span>
						</div>

						<div class="field">
							<label for="email">Email *</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="you@example.com"
								autocomplete="email"
								aria-describedby="Email-error"
								aria-invalid="true"
								required
							/>
							<span id="Email-error" class="error-msg">
								Error: Please enter a valid email address.
							</span>
						</div>
					</div>

					<div class="form-row">
						<div class="field">
							<label for="address">Address</label>
							<input
								id="address"
								name="address"
								type="text"
								placeholder="Your address"
								aria-describedby="Address-error"
								aria-invalid="true"
								required
							/>
							<span id="Address-error" class="error-msg">
								Error: Please enter your address.
							</span>
						</div>
					</div>

					<div class="form-row">
						<div class="field">
							<label for="phone">Phone</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								placeholder="(555) 555-5555"
								autocomplete="tel"
								aria-describedby="Phone-error"
								aria-invalid="true"
								required
							/>
							<span id="Phone-error" class="error-msg">
								Error: Please enter a valid phone number.
							</span>
						</div>

						<div class="field">
							<label for="interest">What are you interested in?</label>

							<select id="interest" name="interest">
								<option value="">Select an option</option>
								<option value="Product information">
									Product information
								</option>
								<option value="Pricing">Pricing</option>
								<option value="Custom order">Custom order</option>
								<option value="General question">
									General question
								</option>
								<option value="Other">Other</option>
							</select>
						</div>
					</div>

					<div class="field">
						<label for="message">Message *</label>

						<textarea
							id="message"
							name="message"
							rows="7"
							placeholder="How can we help?"
							required
						></textarea>
					</div>

					<button class="submit-button" type="submit">
						Send Message
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-page {
		max-width: 75rem;
		margin: 0 auto;
		padding: 5.625rem 1.5rem;
	}

	.contact-header {
		max-width: 43.75rem;
		margin-bottom: 4.375rem;
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

	.contact-header > p:last-child {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: #666;
	}

	.contact-layout {
		display: grid;
		grid-template-columns: 0.8fr 1.5fr;
		gap: 5rem;
		align-items: start;
	}

	.contact-info {
		padding-top: .625rem;
	}

	.contact-info h2 {
		margin: 0 0 1rem;
		font-size: 2rem;
		letter-spacing: -0.02em;
	}

	.contact-info > p {
		margin: 0 0 2.8125rem;
		color: #666;
		line-height: 1.7;
	}

	.info-item {
		padding: 1.25rem 0;
		border-top: .0625rem solid #e5e5e5;
	}

	.info-item span {
		display: block;
		margin-bottom: .375rem;
		font-size: .75rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #707070;
	}

	.info-item p {
		margin: 0;
		font-size: 1rem;
	}

	.form-wrapper {
		padding: 2.5rem;
		background: #f7f7f7;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: .5rem;
	}

	label {
		font-size: .9rem;
		font-weight: 600;
	}

	input,
	select,
	textarea {
		width: 100%;
		border: .0625rem solid #d5d5d5;
		background: white;
		padding: .875rem .9375rem;
		border-radius: .125rem;
		outline: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: #111;
		box-shadow: 0 0 0 .125rem rgba(0, 0, 0, 0.08);
	}

	textarea {
		resize: vertical;
		min-height: 10rem;
	}

	.submit-button,
  .success-message button {
    align-self: flex-start;
    border: none;
    background: var(--accent-gradient);
    color: white;
    padding: .9375rem 1.625rem;
    font-weight: 600;
    cursor: pointer;

    background-size: 200% 100%;
    background-position: 0% 50%;

    transition: background-position 0.3s ease;
  }

	.submit-button:hover,
	.success-message button:hover {
		background-position: 100% 50%;
	}

	.success-message {
		padding: 2.5rem 1.25rem;
		text-align: center;
	}

	.success-icon {
    width: 3.125rem;
    height: 3.125rem;
    margin: 0 auto 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--accent-gradient);
    color: white;
    font-size: 1.5rem;
  }

	.success-message h2 {
		margin: 0 0 .625rem;
		font-size: 1.8rem;
	}

	.success-message p {
		max-width: 28.125rem;
		margin: 0 auto 1.5625rem;
		color: #666;
		line-height: 1.6;
	}

	.success-message button {
		align-self: auto;
	}

	@media (max-width: 50rem) {
		.contact-layout {
			grid-template-columns: 1fr;
			gap: 3.125rem;
		}

		.contact-header {
			margin-bottom: 3.125rem;
		}
	}

	@media (max-width: 37.5rem) {
		.contact-page {
			padding: 4.0625rem 1.125rem;
		}

		.form-wrapper {
			padding: 1.5625rem 1.25rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
