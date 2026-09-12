<script lang="ts">
  import type { GalleryItem } from "$lib/data/gallery";
  import Image from "$lib/components/Image.svelte";

  let { items }: { items: GalleryItem[] } = $props();
  let selectedItem: GalleryItem | null = $state(null);
  
  let isZoomed = $state(false);
  let zoomX = $state(50);
  let zoomY = $state(50);

  // REAL-TIME GESTURE STATES
  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let currentTranslateX = $state(0);
  let isDragging = $state(false);

  function openImage(item: GalleryItem) {
    selectedItem = item;
  }

  function closeImage() {
    selectedItem = null;
    isZoomed = false;
    currentTranslateX = 0;
  }

  function navigate(direction: 'next' | 'prev') {
    if (!selectedItem) return;
    isZoomed = false; 
    currentTranslateX = 0; // Snap the new image straight to the center
    
    const currentIndex = items.findIndex(item => item.image === selectedItem?.image);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= items.length) newIndex = 0;
    if (newIndex < 0) newIndex = items.length - 1;

    selectedItem = items[newIndex];
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (!selectedItem) return;
    if (event.key === "ArrowRight") navigate("next");
    else if (event.key === "ArrowLeft") navigate("prev");
    else if (event.key === "Escape") closeImage();
  }

  // UPDATED: Advanced touch handlers to calculate active drag/pan vectors
  function handleTouchStart(event: TouchEvent) {
    isDragging = true;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging || !selectedItem) return;

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    if (isZoomed) {
      // IF ZOOMED IN: Adjust the focus center variables to map smooth panning
      if (event.cancelable) event.preventDefault();
      
      // Speed multiplier (45) determines how fast the pane pans across your image
      zoomX = Math.max(0, Math.min(100, zoomX - (deltaX / window.innerWidth) * 45));
      zoomY = Math.max(0, Math.min(100, zoomY - (deltaY / window.innerHeight) * 45));
      
      touchStartX = currentX; 
      touchStartY = currentY;
    } else {
      // IF ZOOMED OUT: Slide the whole image horizontally underneath the finger
      currentTranslateX = deltaX;
    }
  }

  function handleTouchEnd() {
    isDragging = false;
    if (isZoomed) return;

    const swipeThreshold = 75; // Amount of pixels needed to switch slide
    
    if (currentTranslateX < -swipeThreshold) {
      navigate("next");
    } else if (currentTranslateX > swipeThreshold) {
      navigate("prev");
    } else {
      currentTranslateX = 0; // Return smoothly to center if let go too early
    }
  }

  function handleImageClick(event: MouseEvent) {
    event.stopPropagation();

    if (isZoomed) {
      isZoomed = false;
      currentTranslateX = 0;
      return;
    }
    const container = event.currentTarget as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    
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
      <div class="overlay"><span>{item.title}</span></div>
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
      <button class="close-button" type="button" aria-label="Close image" onclick={closeImage}>×</button>

      <button
        class="nav-button prev-button"
        type="button"
        aria-label="Previous image"
        onclick={(e) => { e.stopPropagation(); navigate('prev'); }}
      >
        ‹
      </button>

      <!-- UPDATED: Injected the live translation vector transform values into the style parameters -->
      <div
        class="zoom-container"
        class:zoomed={isZoomed}
        class:dragging={isDragging}
        onclick={handleImageClick}
        style="--zoom-x: {zoomX}%; --zoom-y: {zoomY}%; --tx: {currentTranslateX}px;"
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
        {#if selectedItem.description}<p>{selectedItem.description}</p>{/if}
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
    touch-action: none; /* Disables generic page bouncing behaviors */
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
    padding-bottom: 0.5rem;
  }

  .nav-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .prev-button { left: -4.5rem; }
  .next-button { right: -4.5rem; }

  /* UPDATED: Dynamic translate parameters and animation states */
  .zoom-container {
    position: relative;
    max-width: 100%;
    max-height: 75vh;
    overflow: hidden;
    cursor: zoom-in;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    
    transform: translateX(var(--tx, 0px));
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }

  /* Clears the slide lag animation exclusively when dragging your thumb */
  .zoom-container.dragging {
    transition: none;
  }

  .zoom-container :global(img) {
    max-width: 100%;
    max-height: 75vh;
    object-fit: contain;
    transform-origin: var(--zoom-x, 50%) var(--zoom-y, 50%);
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform, transform-origin;
  }

  /* Swaps cursors and drops transformation timelines during panning */
  .zoom-container.zoomed {
    cursor: zoom-out;
    transition: none;
  }
  .zoom-container.zoomed :global(img) {
    transition: none;
    transform: scale(2.2);
  }

  .lightbox-info {
    width: 100%;
    padding-top: 1.25rem;
    color: white;
    text-align: center;
  }

  .lightbox-info h2 { margin: 0 0 0.5rem; font-size: 1.4rem; }
  .lightbox-info p { margin: 0; color: #ccc; }

  @media (max-width: 72rem) {
    .prev-button { left: 1rem; }
    .next-button { right: 1rem; }
  }

  @media (max-width: 50rem) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .lightbox { padding: 1.25rem; }
    .nav-button { width: 2.75rem; height: 2.75rem; font-size: 2.25rem; }
  }

  @media (max-width: 31.25rem) {
    .gallery-grid { grid-template-columns: 1fr; }
  }
</style>
