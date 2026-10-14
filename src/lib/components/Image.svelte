<script lang="ts">
  import { asset } from "$app/paths";
  import { dev } from "$app/environment";

  let {
    src,
    alt,
    back,
    flipLabel = "image",
    loading = "lazy",
    class: className = ""
  }: {
    src: string;
    alt: string;
    back?: { image: string; alt: string };
    flipLabel?: string;
    loading?: "lazy" | "eager";
    class?: string;
  } = $props();

  let isFlipped = $state(false);
  let isBackReady = $state(false);
  let preloadGeneration = 0;

  function getVersionedImage(image: string) {
    const displayImage = dev ? image : image.replace(/\.(png|jpe?g)$/i, ".webp");
    return `${asset(displayImage)}?v=${import.meta.env.VITE_BUILD_ID}`;
  }

  let versionedImage = $derived(getVersionedImage(src));
  let versionedBackImage = $derived(back ? getVersionedImage(back.image) : undefined);

  $effect(() => {
    const imageUrl = versionedBackImage;
    const label = flipLabel;
    const generation = ++preloadGeneration;
    isBackReady = !imageUrl;

    if (!imageUrl) return;
    const preloadedImage = new window.Image();
    preloadedImage.src = imageUrl;
    preloadedImage.decode().then(
      () => {
        if (generation === preloadGeneration) isBackReady = true;
      },
      (error: unknown) => {
        console.error(`Failed to preload the back image for "${label}".`, error);
      }
    );
  });
</script>

<span class="image-frame {className}">
  <span class="flip-card" class:flipped={isFlipped}>
    <picture class="face face-front" aria-hidden={isFlipped}>
      {#if !dev}
        <source srcset={versionedImage} type="image/webp" />
      {/if}
      <img src={versionedImage} {alt} {loading} decoding="async" class={className} />
    </picture>

    {#if back && versionedBackImage}
      <picture class="face face-back" aria-hidden={!isFlipped}>
        {#if !dev}
          <source srcset={versionedBackImage} type="image/webp" />
        {/if}
        <img src={versionedBackImage} alt={back.alt} {loading} decoding="async" class={className} />
      </picture>

    {/if}
  </span>

  {#if back}
    <button
      class="flip-button"
      type="button"
      aria-label={isFlipped ? `Show front of ${flipLabel}` : `Show back of ${flipLabel}`}
      aria-pressed={isFlipped}
      disabled={!isBackReady}
      onclick={(event) => {
        event.stopPropagation();
        isFlipped = !isFlipped;
      }}
    >
      Flip
    </button>
  {/if}
</span>

<style>
  .image-frame {
    position: relative;
    display: inline-block;
    perspective: 75rem;
    vertical-align: middle;
  }

  .flip-card {
    position: relative;
    display: block;
    transform-style: preserve-3d;
    transition: transform 700ms cubic-bezier(0.65, 0, 0.35, 1);
    will-change: transform;
  }

  .flip-card.flipped {
    transform: rotateY(180deg);
  }

  .face {
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  .face-back {
    position: absolute;
    inset: 0;
    transform: rotateY(180deg);
  }

  .flip-button {
    position: absolute;
    z-index: 1;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.45rem 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.68);
    color: white;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .flip-button:hover {
    background: rgba(0, 0, 0, 0.88);
  }

  .flip-button:disabled {
    cursor: wait;
  }

  .flip-button:focus-visible {
    outline: 3px solid white;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .flip-card {
      transition-duration: 0.01ms;
    }
  }
</style>
