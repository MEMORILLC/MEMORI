<script lang="ts">
  import { site } from "$lib/data/site";
  import GalleryGrid from "$lib/components/GalleryGrid.svelte";
  import { gallery } from "$lib/data/gallery";
  import { resolve } from "$app/paths";

  const services = [
    {
      title: "Quality Products",
      description:
        "We provide high-quality products made with care and attention to detail.",
    },
    {
      title: "Personalized Service",
      description:
        "Every customer is important to us. We work with you to find the right solution for your needs.",
    },
    {
      title: "Made With Care",
      description:
        "We take pride in the quality of our work and the products we provide.",
    },
  ];
</script>

<svelte:head>
  <title>{site.companyName}</title>
  <meta
    name="description"
    content="Learn more about {site.companyName} and explore our products."
  />
</svelte:head>

<!-- HERO -->
<section class="hero">
  <div class="hero-content">
    <p class="eyebrow">WELCOME TO {site.companyName}</p>

    <h1>Quality products.<br />Personalized service.</h1>

    <p class="hero-text">
      {site.tagline}
    </p>

    <div class="hero-buttons">
      <a href={resolve("/gallery")} class="button primary" aria-label="View Our Products">View Our Products</a>
      <a href={resolve("/contact")} class="button secondary" aria-label="Contact Us">Contact Us</a>
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
        {site.companyName} is dedicated to providing quality products and personalized
        service to our customers.
      </p>

      <p>
        We believe that great products start with attention to detail and that
        every customer deserves a personal experience. Whether you already know
        what you're looking for or need help finding the right option, we're
        here to help.
      </p>

      <a href={resolve("/contact")} class="text-link" aria-label="Get in touch">Get in touch →</a>
    </div>
  </div>
</section>

<!-- SERVICES / FEATURES -->
<section class="section features">
  <div class="section-inner">
    <div class="section-heading">
      <p class="eyebrow">WHAT WE OFFER</p>
      <h2>Why choose {site.companyName}?</h2>
    </div>

    <div class="feature-grid">
      {#each services as service (service)}
        <div class="feature">
          <div class="feature-number">
            {String(services.indexOf(service) + 1).padStart(2, "0")}
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

      <a href={resolve("/gallery")} class="text-link" aria-label="View full gallery">View full gallery →</a>
    </div>

    <GalleryGrid items={gallery} />
  </div>
</section>

<!-- CTA -->
<section class="cta">
  <div class="cta-inner">
    <p class="eyebrow">READY TO GET STARTED?</p>

    <h2>Have a question or interested in our products?</h2>

    <p>Get in touch with us and we'll be happy to help.</p>

    <a href={resolve("/contact")} class="button primary" aria-label="Contact Us">Contact Us</a>
  </div>
</section>

<style>
  .hero {
    min-height: 40.625rem;
    display: flex;
    align-items: center;
    background: #f5f5f5;
  }

  .hero-content {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
    padding: 6.25rem 1.5rem;
  }

  .eyebrow {
    margin: 0 0 1.125rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #666;
  }

  h1 {
    max-width: 53.125rem;
    margin: 0;
    font-size: clamp(3rem, 7vw, 6rem);
    line-height: 0.98;
    letter-spacing: -0.04em;
  }

  h1::after {
    content: "";
    display: block;
    width: 5rem;
    height: 0.25rem;
    margin-top: 1.5rem;
    border-radius: 62.4375rem;
    background: var(--accent-gradient);
  }

  .hero-text {
    max-width: 37.5rem;
    margin: 1.875rem 0 0;
    font-size: 1.2rem;
    line-height: 1.7;
    color: #555;
  }

  .hero-buttons {
    display: flex;
    gap: 0.875rem;
    margin-top: 2.1875rem;
  }

  .button {
    display: inline-block;
    padding: 0.875rem 1.5rem;
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
    border: 0.0625rem solid #ccc;
    background: white;
    color: #111;
  }

  .button.secondary:hover {
    background: #eee;
  }

  .section {
    padding: 6.875rem 0;
  }

  .section-inner {
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .about {
    background: white;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6.25rem;
  }

  h2 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  .about-text {
    max-width: 37.5rem;
    font-size: 1.05rem;
    line-height: 1.8;
    color: #555;
  }

  .about-text p {
    margin: 0 0 1.375rem;
  }

  .text-link {
    display: inline-block;
    margin-top: 0.625rem;
    color: #111;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 0.0625rem solid #111;
    padding-bottom: 0.1875rem;
  }

  .features {
    background: #f5f5f5;
  }

  .section-heading {
    margin-bottom: 3.4375rem;
  }

  .section-heading h2 {
    max-width: 43.75rem;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }

  .feature {
    border-top: 0.0625rem solid #ccc;
    padding-top: 1.5625rem;
  }

  .feature-number {
    margin-bottom: 2.1875rem;
    font-size: 0.8rem;
    color: #616161;
  }

  .feature h3 {
    margin: 0 0 0.875rem;
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
    gap: 1.875rem;
  }

  .cta {
    background: #111;
    color: white;
  }

  .cta-inner {
    max-width: 56.25rem;
    margin: 0 auto;
    padding: 7.5rem 1.5rem;
    text-align: center;
  }

  .cta .eyebrow {
    color: #999;
  }

  .cta h2 {
    margin-bottom: 1.5625rem;
  }

  .cta p:not(.eyebrow) {
    margin: 0 auto 2.1875rem;
    max-width: 34.375rem;
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

  @media (max-width: 43.75rem) {
    .hero {
      min-height: 36.25rem;
    }

    .hero-content {
      padding: 5rem 1.125rem;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: stretch;
    }

    .button {
      text-align: center;
    }

    .section {
      padding: 4.6875rem 0;
    }

    .section-inner {
      padding: 0 1.125rem;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 2.1875rem;
    }

    .feature-grid {
      grid-template-columns: 1fr;
      gap: 2.8125rem;
    }

    .gallery-heading {
      flex-direction: column;
      align-items: flex-start;
    }

    .cta-inner {
      padding: 5rem 1.125rem;
    }
  }
</style>

