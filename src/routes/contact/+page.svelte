<script lang="ts">
	import { site } from '$lib/data/site';

	// 1. Manage form state, individual field values, and errors using Svelte 5 Runes
	let submitted = $state(false);
	let isSubmitting = $state(false);
	let submitError = $state<string | null>(null);

	let formData = $state({
		name: '',
		email: '',
		address: '',
		phone: '',
		interest: '',
		customOrderDate: '',
		orderQuantity: '',
		message: '',
		botcheck: false // Honeypot field for spam prevention
	});

	let errors = $state<{ name?: string; email?: string }>({});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;

		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		isSubmitting = true;
		submitError = null;
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Please enter your name.';
		}

		if (!formData.email.trim()) {
			errors.email = 'Please enter your email address.';
		}

		if (Object.keys(errors).length > 0) {
			isSubmitting = false;
			return;
		}

		try {
			// Submit to Web3Forms using fetch
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					access_key: 'YOUR_ACCESS_KEY_HERE', // <-- Put your Web3Forms Access Key here
					subject: `New Contact Form Submission - ${site.companyName}`,
					// If a bot checks the box, formData.botcheck becomes true, triggering the spam filter
					...formData,
					...(formData.interest === 'Custom order'
						? {}
						: {
								customOrderDate: undefined,
								orderQuantity: undefined
							})
				})
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Unable to submit the form.');
			}
			submitted = true;

			formData = {
				name: '',
				email: '',
				address: '',
				phone: '',
				interest: '',
				customOrderDate: '',
				orderQuantity: '',
				message: '',
				botcheck: false
			};
		} catch (err) {
			console.error('Submission failed:', err);
			// Save the error so a banner displays. formData is preserved!
			submitError = 
				err instanceof Error
				? err.message
				:	'We are unable to send your message. Please try sending again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact | {site.companyName}</title>
	<meta name="description" content={`Get in touch with ${site.companyName}.`} />
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
		<div class="form-wrapper">
			{#if submitted}
				<div class="success-message">
					<div class="success-icon">✓</div>
					<h2>Thank you!</h2>
					<p>Your message has been submitted successfully. We'll get back to you soon.</p>
					<button type="button" onclick={() => (submitted = false)}>
						Send another message
					</button>
				</div>
			{:else}
				<form 
					name="contact"
					onsubmit={handleSubmit}
				>

					<input 
						type="checkbox" 
						name="botcheck" 
						bind:checked={formData.botcheck} 
						style="display: none !important;" 
						tabindex="-1" 
						autocomplete="off" 
					/>
					
					<!-- Failure Recovery Banner -->
					{#if submitError}
						<div class="error-banner">
							<p><strong>⚠️ Submission Failed</strong></p>
							<p>{submitError}</p>
						</div>
					{/if}

					<div class="form-row">
						<div class="field">
							<label for="name">Name *</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Your name"
								autocomplete="name"
								bind:value={formData.name}
								aria-invalid={errors.name ? "true" : "false"}
								aria-describedby={errors.name ? "name-error" : undefined}
								required
							/>
							{#if errors.name}
								<span id="name-error" class="error-msg">Error: {errors.name}</span>
							{/if}
						</div>

						<div class="field">
							<label for="email">Email *</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="you@example.com"
								autocomplete="email"
								bind:value={formData.email}
								aria-invalid={errors.email ? "true" : "false"}
								aria-describedby={errors.email ? "email-error" : undefined}
								required
							/>
							{#if errors.email}
								<span id="email-error" class="error-msg">Error: {errors.email}</span>
							{/if}
						</div>
					</div>

					<div class="form-row">
						<div class="field">
							<label for="interest">What are you interested in? *</label>
							<select
								id="interest"
								name="interest"
								bind:value={formData.interest}
								required
							>
								<option value="" disabled hidden>Select an option</option>
								<option value="Custom order">Custom order</option>
								<option value="General question">General question</option>
							</select>
						</div>
					</div>

					<div class="field">
						{#if formData.interest === "Custom order"}
							<label for="order-date">Estimated Fulfillment Date *</label>
							<input
								id="order-date"
								name="customOrderDate"
								type="date"
								bind:value={formData.customOrderDate}
								required={formData.interest === "Custom order"}
							/>

							<label for="order-quantity">Estimated Quantity *</label>
							<input
								id="order-quantity"
								name="orderQuantity"
								type="number"
								placeholder="How many?"
								bind:value={formData.orderQuantity}
								required={formData.interest === "Custom order"}
							/>

							<label for="message">Tell us about your product. *</label>
							<textarea
								id="message"
								rows="7"
								name="message"
								placeholder="Describe what you would like with as much detail as possible."
								bind:value={formData.message}
								required={formData.interest === "Custom order"}
							></textarea>
						{/if}
						{#if formData.interest === "General question"}
							<label for="message">Message *</label>
							<textarea
								id="message"
								rows="7"
								name="message"
								placeholder="How can we help?"
								bind:value={formData.message}
								required={formData.interest === "General question"}
							></textarea>
						{/if}
					</div>

					<button class="submit-button" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-page {
		width: 100%;
		padding: clamp(4rem, 8vw, 7rem) clamp(1.125rem, 5vw, 4rem);
		background: #f7f7f7;
	}

	.contact-header {
		max-width: 75rem;
		margin: 0 auto clamp(3rem, 6vw, 5rem);
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
		font-size: clamp(2.75rem, 7vw, 5rem);
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
		background: #111;
	}

	.contact-header > p:last-child {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.7;
		color: #666;
	}

	.contact-layout {
		width: 100%;
		max-width: 75rem;
		margin: 0 auto;
	}

	.form-wrapper {
		width: 100%;
		padding: clamp(1.5rem, 4vw, 3.5rem);
		background: white;
		border: .0625rem solid #e5e5e5;
		box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.05);
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

	.form-row .field:only-child {
		grid-column: 1 / -1;
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

	select:invalid {
		color: #888;
	}

	select option {
		color: #000000;
	}

	input,
	select,
	textarea {
		box-sizing: border-box;
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
		background: black;
		color: white;
		padding: .9375rem 1.625rem;
		font-weight: 600;
		cursor: pointer;
		border-radius: .125rem;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
	}

	.submit-button:hover:not(:disabled),
	.success-message button:hover {
		background: #333;
	}

	.submit-button:active:not(:disabled),
	.success-message button:active {
		transform: translateY(1px);
	}

	.submit-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-banner {
		background: #fdf2f2;
		border-left: 4px solid #de2a2a;
		padding: 1rem;
		color: #9b1c1c;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.error-msg {
		font-size: 0.8rem;
		color: #de2a2a;
		font-weight: 500;
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
    background: black;
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
		.form-row {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 37.5rem) {
		.contact-page {
			padding: 3.5rem 1rem;
		}

		.form-wrapper {
			padding: 1.25rem;
		}
	}
</style>
