<script lang="ts">
  import type { GalleryItem } from "$lib/data/gallery";
  import Image from "$lib/components/Image.svelte";

  let { items }: { items: GalleryItem[] } = $props();
  let selectedItem: GalleryItem | null = $state(null);
  let isZoomed = $state(false);
  let zoomX = $state(0);
  let zoomY = $state(0);

  let touchStartX = $state(0);
  let touchEndX = $state(0);
  const swipeThreshold = 50; // Minimum distance in pixels for a swipe to be registered

  function openImage(item: GalleryItem) {
    selectedItem = item;
  }

  function closeImage() {
    selectedItem = null;
  }

  // Navigation Logic: Shifts the active selection left or right across the item array
  function navigate(direction: 'next' | 'prev') {
    if (!selectedItem) return;
    isZoomed = false; // Reset zoom state when navigating
    
    const currentIndex = items.findIndex(item => item.image === selectedItem?.image);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    // Wrap-around logic: loops back to the start or end of your collection seamlessly
    if (newIndex >= items.length) newIndex = 0;
    if (newIndex < 0) newIndex = items.length - 1;

    selectedItem = items[newIndex];
  }

  // Global Keydown Handler: Adds native desktop accessibility support
  function handleKeyDown(event: KeyboardEvent) {
    if (!selectedItem) return;

    if (event.key === "ArrowRight") {
      navigate("next");
    } else if (event.key === "ArrowLeft") {
      navigate("prev");
    } else if (event.key === "Escape") {
      closeImage();
    }
  }

  function handleTouchStart(event: TouchEvent) {
    if (isZoomed) return; // Ignore swipes when zoomed in
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event: TouchEvent) {
    if (isZoomed) return; // Ignore swipes when zoomed in
    if (Math.abs(event.changedTouches[0].clientX - touchStartX) > 10) {
      if (event.cancelable) {
        event.preventDefault(); // Prevents scrolling when swiping
      }
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (isZoomed) return; // Ignore swipes when zoomed in
    touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -swipeThreshold) {
      navigate("next");
    } else if (swipeDistance > swipeThreshold) {
      navigate("prev");
    }
  }

  function handleImageClick(event: MouseEvent) {
    event.stopPropagation(); // Prevents the click from bubbling up to the lightbox

    if (isZoomed) {
      isZoomed = false; // Reset zoom state if already zoomed
      return;
    }
    const container = event.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    
    // Converted to 0-100% ratios so the CSS origin variable moves perfectly
    zoomX = ((event.clientX - rect.left) / rect.width) * 100;
    zoomY = ((event.clientY - rect.top) / rect.height) * 100;
    isZoomed = true;
  }

</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="gallery-grid">
  {#each items as item (item)}
    <button
      class="gallery-item"
      type="button"
      onclick={() => openImage(item)}
      aria-label={`View ${item.title}`}
    >
      <Image src={item.image} alt={item.alt} />

      <div class="overlay">
        <span>{item.title}</span>
      </div>
    </button>
  {/each}
</div>

{#if selectedItem}
  <div
    class="lightbox"
    role="presentation"
    onclick={closeImage}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeImage(); }}
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
  >
    <div 
      class="lightbox-content" 
      role="presentation" 
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <button
        class="close-button"
        type="button"
        aria-label="Close image"
        onclick={closeImage}
      >
        ×
      </button>

      <button
        class="nav-button prev-button"
        type="button"
        aria-label="Previous image"
        onclick={(e) => { e.stopPropagation(); navigate('prev'); }}
      >
        ‹
      </button>

      <div
        class="zoom-container"
        class:zoomed={isZoomed}
        onclick={handleImageClick}
        style="--zoom-x: {zoomX}%; --zoom-y: {zoomY}%;"
        role="presentation"
      >
        <Image src={selectedItem.image} alt={selectedItem.alt} />
      </div>

      <button
        class="nav-button next-button"
        type="button"
        aria-label="Next image"
        onclick={(e) => { e.stopPropagation(); navigate('next'); }}
      >
        ›
      </button>

      <div class="lightbox-info">
        <h2>{selectedItem.title}</h2>

        {#if selectedItem.description}
          <p>{selectedItem.description}</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  .gallery-item {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: #eee;
    cursor: pointer;
    overflow: hidden;
    aspect-ratio: 1 / 1;
  }

  .gallery-item :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .gallery-item:hover :global(img) {
    transform: scale(1.04);
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;

    background: linear-gradient(transparent 45%, rgba(0, 0, 0, 0.7));

    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .gallery-item:hover .overlay {
    opacity: 1;
  }

  .overlay span {
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }

  .lightbox {
    position: fixed;
    z-index: 1000;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.875rem;
    background: rgba(0, 0, 0, 0.9);
  }

  .lightbox-content {
    position: relative;
    width: min(62.5rem, 100%);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lightbox-content :global(img) {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
  }

  .close-button {
    position: absolute;
    top: -2.8125rem;
    right: 0;

    border: none;
    background: none;
    color: white;

    font-size: 2.5rem;
    line-height: 1;
    cursor: pointer;
  }

  /* NEW CAROUSEL BUTTON STYLES */
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 3rem;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    z-index: 1010;
    user-select: none;
    padding-bottom: 0.5rem; /* Optical center adjustment for unicode arrows */
  }

  .nav-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .prev-button {
    left: -4.5rem;
  }

  .next-button {
    right: -4.5rem;
  }

  /* Bounding box for the interactive zoom engine */
  .zoom-container {
    position: relative;
    max-width: 100%;
    max-height: 75vh;
    overflow: hidden;
    cursor: zoom-in; /* Changes mouse to a magnifying glass (+) */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: cursor 0.25s ease;
  }

  /* Target the inner image inside our custom component */
  .zoom-container :global(img) {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
    /* transform-origin determines WHICH spot remains locked in focus when zooming */
    transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }

  /* When zoomed in: scale up the file and switch to a zoom-out cursor (-) */
  .zoom-container.zoomed {
    cursor: zoom-out;
  }

  .zoom-container.zoomed :global(img) {
    transform: scale(2.2); /* Squeezes up to 220% enlargement. Tweak this value to zoom closer! */
  }


  .lightbox-info {
    width: 100%;
    padding-top: 1.25rem;
    color: white;
    text-align: center;
  }

  .lightbox-info h2 {
    margin: 0 0 0.5rem;
    font-size: 1.4rem;
  }

  .lightbox-info p {
    margin: 0;
    color: #ccc;
  }

  @media (max-width: 50rem) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .lightbox {
      padding: 1.25rem;
    }
  }

  @media (max-width: 31.25rem) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
