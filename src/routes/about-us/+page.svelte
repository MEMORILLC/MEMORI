<script lang="ts">
  import { resolve } from "$app/paths";
  import { site } from "$lib/data/site";

  const values = [
    {
      number: "01",
      title: "Thoughtful design",
      description:
        "We believe the best products feel personal. Every detail is considered with your story, style, and everyday life in mind.",
    },
    {
      number: "02",
      title: "Made with care",
      description:
        "From the first idea to the finished piece, we take our time to do things well and create products we are proud to share.",
    },
    {
      number: "03",
      title: "Personal service",
      description:
        "You are never just an order number. We listen, communicate clearly, and make the process feel as meaningful as the result.",
    },
  ];
</script>

<svelte:head>
  <title>About Us | {site.companyName}</title>
  <meta
    name="description"
    content="Learn more about our story, values, and commitment to making products with care."
  />
</svelte:head>

<section class="hero subpage-hero">
  <div class="hero-content">
    <p class="eyebrow">ABOUT {site.companyName.toUpperCase()}</p>
    <h1>{site.tagline}</h1>
    <p class="hero-text">
      We create thoughtful, one-of-a-kind products that help you celebrate the
      people, places, and memories that matter most.
    </p>
  </div>
</section>

<section class="section story" id="our-story">
  <div class="section-inner story-grid">
    <div class="section-heading">
      <p class="eyebrow">OUR STORY</p>
      <h2>A company built around quality.</h2>
    </div>

    <div class="story-text">
      <p>
        {site.companyName} began with a simple idea: the things we keep close should
        feel as unique as the memories behind them.
      </p>
      <p>
        We are passionate about creating quality products and making the process
        personal from beginning to end. Whether you arrive with a clear vision or
        need a little inspiration, we are here to help bring it to life.
      </p>
      <p>
        Every project is an opportunity to make something meaningful, useful, and
        unmistakably yours.
      </p>
    </div>
  </div>
</section>

<section class="section values">
  <div class="section-inner">
    <div class="section-heading">
      <p class="eyebrow">WHAT MATTERS TO US</p>
      <h2>Care in every detail.</h2>
    </div>

    <div class="value-grid">
      {#each values as value (value.number)}
        <article class="value">
          <span class="value-number">{value.number}</span>
          <h3>{value.title}</h3>
          <p>{value.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="cta">
  <div class="cta-inner">
    <p class="eyebrow">LET'S MAKE SOMETHING MEANINGFUL</p>
    <h2>Your idea starts here.</h2>
    <p>Have something special in mind? We would love to hear about it.</p>
    <a href={resolve("/contact")} class="button primary" aria-label="Start your project">Start Your Project</a>
  </div>
</section>

<style>
  .subpage-hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 60vh;
    padding: 6rem 2rem 4rem;
    box-sizing: border-box;
    background: #f5f5f5;
  }

  .hero-content {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
  }

  .eyebrow {
    margin: 0;
    font-size: .85rem;
    font-weight: 600;
    letter-spacing: .15em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 52rem;
    margin: 1rem 0 1.5rem;
    font-size: clamp(2.75rem, 7vw, 5.5rem);
    line-height: 1;
    letter-spacing: -.04em;
  }

  h1::after {
    content: "";
    display: block;
    width: 5rem;
    height: .25rem;
    margin-top: 1.5rem;
    border-radius: 999px;
    background: #111;
  }

  .hero-text {
    max-width: 40rem;
    margin: 0 0 2.5rem;
    color: #555;
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    line-height: 1.5;
  }

  .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .section {
    padding: 6rem 2rem;
  }

  .section-inner {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
  }

  .story {
    background: #fff;
  }

  .story-grid {
    display: grid;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
    gap: 5rem;
    align-items: start;
  }

  h2 {
    margin: .5rem 0 0;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.15;
    letter-spacing: -.02em;
  }

  .story-text {
    max-width: 38rem;
  }

  .story-text p,
  .cta-inner > p:last-of-type {
    margin: 0 0 1.5rem;
    color: #555;
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .story-text p:last-child {
    margin-bottom: 0;
  }

  .values {
    background: #f7f7f7;
  }

  .section-heading {
    max-width: 38rem;
    margin-bottom: 3.5rem;
  }

  .value-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .value-number {
    display: block;
    margin-bottom: 1rem;
    color: #999;
    font-family: monospace;
    font-size: 2.5rem;
    line-height: 1;
  }

  .value h3 {
    margin: 0 0 .75rem;
    font-size: 1.35rem;
  }

  .value p {
    margin: 0;
    color: #555;
    line-height: 1.6;
  }

  .cta {
    padding: 8rem 2rem;
    text-align: center;
    background: #111;
    color: #fff;
  }

  .cta-inner {
    max-width: 42rem;
    margin: 0 auto;
  }

  .cta h2 {
    margin: 1rem 0;
  }

  .cta-inner > p:last-of-type {
    color: #ccc;
  }

  @media (max-width: 50rem) {
    .story-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .value-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 37.5rem) {
    .subpage-hero,
    .section {
      padding-right: 1.125rem;
      padding-left: 1.125rem;
    }

    .subpage-hero {
      min-height: 0;
      padding-top: 5rem;
      padding-bottom: 5rem;
    }

    .cta {
      padding: 6rem 1.125rem;
    }
  }
</style>