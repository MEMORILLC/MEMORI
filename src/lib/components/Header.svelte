<script lang="ts">
  let menuOpen = $state(false);
  import { site } from "$lib/data/site";
  import { resolve } from "$app/paths";
  import Image from "$lib/components/Image.svelte";

  function closeMenu() {
    menuOpen = false;
  }
</script>

<header class="site-header">
  <div class="header-inner">
    <a href={resolve("/")} aria-label="Home" class="logo-group" onclick={closeMenu}>
      <Image src="/logos/memori_camera.png" alt="Memori Logo" class="camera-logo" />
      <span class="logo-text">MEMORI</span>
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
      <a href={resolve("/")} aria-label="Home" onclick={closeMenu}>Home</a>
      <a href={resolve("/gallery")} aria-label="Gallery" onclick={closeMenu}>Gallery</a>
      <a href={resolve("/contact")} aria-label="Contact" onclick={closeMenu}>Contact</a>
      {#if site.social}
        {#each Object.entries(site.social) as [_name, { url, component, props }] (_name)}
          {@const Component = component}
          <a
            href={url}
            aria-label="Picture"
            target="_blank"
            rel="noopener noreferrer"
            onclick={closeMenu}
          >
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
    border-bottom: 0.0625rem solid #e5e5e5;
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

  .logo-group {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }

  :global(.camera-logo) {
    height: 2.25rem;
    width: auto;
    
    /* Ensures the wide image fits completely without cropping any edges */
    object-fit: contain; 
    display: inline-block;
    vertical-align: middle;

    margin-right: 0.5rem;
  }

  .logo-text {
    background: black;
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
    font-size: 0.95rem;
    font-weight: 500;
  }

  nav a:hover {
    background: grey;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .menu-button {
    display: none;
    border: none;
    background: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  .menu-button span {
    display: block;
    width: 1.5rem;
    height: 0.125rem;
    background: #111;
    margin: 0.3125rem 0;
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
      border-bottom: 0.0625rem solid #e5e5e5;
    }

    nav.open {
      display: flex;
    }

    nav a {
      padding: 1.125rem 1.5rem;
      border-top: 0.0625rem solid #eee;
    }
  }
</style>
