<script lang="ts">
  import { asset } from "$app/paths";
  import { dev } from "$app/environment";

  let {
    src,
    alt,
    views = [],
    galleryLabel = "image",
    loading = "lazy",
    controlsEnabled = true,
    viewIndex = $bindable(0),
    class: className = ""
  }: {
    src: string;
    alt: string;
    views?: { image: string; alt: string }[];
    galleryLabel?: string;
    loading?: "lazy" | "eager";
    controlsEnabled?: boolean;
    viewIndex?: number;
    class?: string;
  } = $props();

  function getVersionedImage(image: string) {
    const displayImage = dev ? image : image.replace(/\.(png|jpe?g)$/i, ".webp");
    return `${asset(displayImage)}?v=${import.meta.env.VITE_BUILD_ID}`;
  }

  let allViews = $derived([{ image: src, alt }, ...views]);
  let currentView = $derived(allViews[viewIndex] ?? allViews[0]);
  let versionedImage = $derived(getVersionedImage(currentView.image));

  $effect(() => {
    if (allViews.length <= 1) return;

    for (const view of allViews.slice(1)) {
      const preloadedImage = new window.Image();
      preloadedImage.src = getVersionedImage(view.image);
      preloadedImage.decode().catch((error: unknown) => {
        console.error(`Failed to preload a gallery view for "${galleryLabel}".`, error);
      });
    }
  });

  function navigateView(direction: "next" | "prev", event: MouseEvent) {
    event.stopPropagation();
    viewIndex = (viewIndex + (direction === "next" ? 1 : -1) + allViews.length) % allViews.length;
  }
</script>

<span class="image-frame {className}">
  <picture class="gallery-view">
    {#if !dev}
      <source srcset={versionedImage} type="image/webp" />
    {/if}
    <img src={versionedImage} alt={currentView.alt} {loading} decoding="async" class={className} />
  </picture>

  {#if controlsEnabled && allViews.length > 1}
    <div class="view-controls" role="group" aria-label={`Views of ${galleryLabel}`}>
      <button
        class="view-button previous-view"
        type="button"
        aria-label={`Previous view of ${galleryLabel}`}
        onclick={(event) => navigateView("prev", event)}
      >‹</button>
      <span class="view-count" aria-live="polite">{viewIndex + 1} / {allViews.length}</span>
      <button
        class="view-button next-view"
        type="button"
        aria-label={`Next view of ${galleryLabel}`}
        onclick={(event) => navigateView("next", event)}
      >›</button>
    </div>
  {/if}
</span>

<style>
  .image-frame {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  .gallery-view {
    position: relative;
    display: block;
  }

  .view-controls {
    position: absolute;
    z-index: 4;
    right: 0.75rem;
    bottom: 0.75rem;
    left: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }

  .view-button,
  .view-count {
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.68);
    color: white;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .view-button {
    display: grid;
    width: 2rem;
    height: 2rem;
    padding: 0;
    place-items: center;
    cursor: pointer;
    pointer-events: auto;
  }

  .view-count {
    padding: 0.35rem 0.65rem;
  }

  .view-button:hover {
    background: rgba(0, 0, 0, 0.88);
  }

  .view-button:focus-visible {
    outline: 3px solid white;
    outline-offset: 3px;
  }
</style>
