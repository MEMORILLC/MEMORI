<script lang="ts">
  import { site } from "$lib/data/site";
  import { resolve } from "$app/paths";

  // Detailed step-by-step process timeline
  const steps = [
    {
      title: "Discovery & Consultation",
      description:
        "We start by listening to your ideas and understanding your needs. Whether you have a specific vision or need creative guidance, we work together to map out the perfect plan.",
    },
    {
      title: "Design & Personalization",
      description:
        "Every project is uniquely yours. We meticulously draft concepts, select premium materials, and fine-tune the details to make sure the final product aligns perfectly with your expectations.",
    },
    {
      title: "Meticulous Craftsmanship",
      description:
        "This is where the magic happens. Combining modern techniques with dedicated attention to detail, we craft your items with the utmost care, ensuring high quality that stands the test of time.",
    },
    {
      title: "Delivery & Joy",
      description:
        "Your finished product is carefully inspected, securely packaged, and safely delivered to you. We don't consider the job done until you are absolutely thrilled with the result.",
    },
  ];
</script>

<svelte:head>
  <title>How It Works | {site.companyName}</title>
  <meta
    name="description"
    content="Discover our process and learn how we bring your custom products from concept to reality at {site.companyName}."
  />
</svelte:head>

<!-- HERO SECTION -->
<section class="hero subpage-hero">
  <div class="hero-content">
    <p class="eyebrow">OUR PROCESS</p>

    <h1>How it works.</h1>

    <p class="hero-text">
      From your initial idea to the final product in your hands, we follow a precise,
      carefully managed process to guarantee perfection at every step.
    </p>

    <div class="hero-buttons">
      <a href="#process-steps" class="button primary" aria-label="Explore our steps">See the Steps</a>
      <a href={resolve("/contact")} class="button secondary" aria-label="Get in touch">Start Your Project</a>
    </div>
  </div>
</section>

<!-- THE STEPS SECTION -->
<section class="section process" id="process-steps">
  <div class="section-inner">
    <div class="section-heading">
      <p class="eyebrow">STEP-BY-STEP</p>
      <h2>From concept to creation.</h2>
    </div>

    <div class="feature-grid">
      {#each steps as step, index (step)}
        <div class="feature">
          <div class="feature-number">
            {String(index + 1).padStart(2, "0")}
          </div>

          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- QUALITY COMMITMENT SECTION -->
<section class="section promise">
  <div class="section-inner">
    <div class="promise-content">
      <p class="eyebrow">OUR PROMISE</p>
      <h2>No shortcuts. Just pure quality.</h2>

      <div class="promise-text">
        <p>
          At {site.companyName}, we believe that a great final product is the natural result of
          a transparent and honest workflow. We never cut corners or settle for "good enough."
        </p>

        <p>
          Throughout the journey, we keep you updated so you always know exactly where your
          project stands. Experience a personalized service designed entirely around you.
        </p>

        <a href={resolve("/gallery")} class="text-link" aria-label="View full gallery">See examples of our work →</a>
      </div>
    </div>
  </div>
</section>

<!-- CTA SECTION -->
<section class="cta">
  <div class="cta-inner">
    <p class="eyebrow">READY TO TRANSLATE YOUR VISION?</p>

    <h2>Let's build something beautiful together.</h2>

    <p>Now that you know how we work, let's take the first step today.</p>

    <a href={resolve("/contact")} class="button primary" aria-label="Contact Us">Get Started Now</a>
  </div>
</section>

<style>
  /* --- HERO SUBPAGE VARIANT --- */
  .subpage-hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 60vh;
    padding: 6rem 2rem 4rem 2rem;
    box-sizing: border-box;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 1.1;
    margin: 1rem 0 1.5rem 0;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .hero-text {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    line-height: 1.5;
    color: var(--color-text-muted, #555);
    margin-bottom: 2.5rem;
    max-width: 600px;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* --- GENERAL SECTIONS & GRIDS --- */
  .section {
    padding: 6rem 2rem;
  }

  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .section-heading {
    margin-bottom: 4rem;
    max-width: 600px;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.2;
    margin-top: 0.5rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .eyebrow {
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--color-primary, #000);
    margin: 0;
  }

  /* --- PROCESS / FEATURE GRID --- */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem 2rem;
  }

  .feature {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .feature-number {
    font-size: 2.5rem;
    font-weight: 300;
    font-family: monospace;
    opacity: 0.25;
    margin-bottom: 1rem;
    line-height: 1;
  }

  .feature h3 {
    font-size: 1.35rem;
    margin: 0 0 0.75rem 0;
    font-weight: 600;
  }

  .feature p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-muted, #555);
    margin: 0;
  }

  /* --- PROMISE SECTION (CENTERED) --- */
  .promise-content {
    max-width: 700px;
    margin: 0 auto;
  }

  .promise-content h2 {
    margin-bottom: 2.5rem;
  }

  .promise-text p {
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--color-text-muted, #555);
    margin: 0 0 1.5rem 0;
  }

  .promise-text p:last-of-type {
    margin-bottom: 2.5rem;
  }

  /* --- CALL TO ACTION (CTA) --- */
  .cta {
    padding: 8rem 2rem;
    background-color: var(--color-surface-muted, #f9f9f9);
    text-align: center;
  }

  .cta-inner {
    max-width: 700px;
    margin: 0 auto;
  }

  .cta h2 {
    margin: 1rem 0 1rem 0;
  }

  .cta p {
    font-size: 1.2rem;
    color: var(--color-text-muted, #555);
    margin: 0 0 2.5rem 0;
  }

  /* --- BUTTONS & LINKS --- */
  .button {
    display: inline-block;
    padding: 0.85rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .button.primary {
    background-color: var(--color-primary, #000);
    color: var(--color-on-primary, #fff);
  }

  .button.primary:hover {
    background-color: var(--color-primary-hover, #222);
  }

  .button.secondary {
    background-color: transparent;
    color: var(--color-primary, #000);
    border: 1px solid var(--color-border, #ccc);
  }

  .button.secondary:hover {
    background-color: var(--color-surface-hover, #eee);
  }

  .text-link {
    display: inline-block;
    font-weight: 600;
    color: var(--color-primary, #000);
    text-decoration: none;
    transition: transform 0.2s ease;
  }

  .text-link:hover {
    transform: translateX(4px);
  }
</style>
